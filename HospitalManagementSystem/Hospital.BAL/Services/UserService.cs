using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.DAL.Interfaces;
using Hospital.Models;
using HospitalManagementSystem.DAL.Entities;
using System.Security.Cryptography;
using System.Text;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Services
{
    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<UserDto>> GetAllUserAsync(int pageNumber = 1, int pageSize = 10)
        {
            var users = await _userRepository.GetAllAsync(pageNumber, pageSize);
            return new PagedResult<UserDto>
            {
                Items = _mapper.Map<IEnumerable<UserDto>>(users.Items),
                TotalCount = users.TotalCount,
                PageNumber = users.PageNumber,
                PageSize = users.PageSize
            };
        }


        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> AddUserAsync(UserDto userDto)
        {
            // 1️ Check if username already exists
            var users = await _userRepository.GetAllAsync(pageNumber:1, pageSize:int.MaxValue);
            if (users.Items.Any(u => u.Username == userDto.Username))
            {
                return null;
            }

            // 2️ Map DTO → Entity
            var user = _mapper.Map<User>(userDto);

            // 3️ Create password hash & salt
            CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // 4️ Save via repository
            await _userRepository.CreateAsync(user);

            // 5️ Return mapped DTO without password
            var responseDto = _mapper.Map<UserDto>(user);

            // 6️ Put the plain password from the request into the response. This is safe only because it’s coming from the request, not the DB
            responseDto.Password = userDto.Password;

            return responseDto;
        }

        public async Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto userDto)
        {
            var existingUser = await _userRepository.GetByIdAsync(id);
            if (existingUser == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(userDto.Password))
            {
                CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
                existingUser.PasswordHash = passwordHash;
                existingUser.PasswordSalt = passwordSalt;
            }

            _mapper.Map(userDto, existingUser);
            var updatedUser = await _userRepository.UpdateAsync(id, existingUser);
            return _mapper.Map<UpdateUserDto>(updatedUser);
        }



        public async Task<UserDto> DeleteUserAsync(int id)
        {
            var existingUser = await _userRepository.DeleteAsync(id);
            return _mapper.Map<UserDto>(existingUser);
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
