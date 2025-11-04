using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.DAL.Interfaces;
using Hospital.Models;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Hospital.BAL.Services
{
    public class AuthService:IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly HospitalDbContext _context;
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;

        public AuthService(IConfiguration configuration, HospitalDbContext context, IAuthRepository authRepository, IMapper mapper)
        {
            _configuration = configuration;
            _context = context;
            _authRepository = authRepository;
            _mapper = mapper;
        }

        public async Task<AuthRolePermissionsDto> GetRoleWithPermissions(int roleId)
        {
            var role = await _authRepository.GetRoleWithPermissionsAsync(roleId);
            if (role == null)
                return null;

            return _mapper.Map<AuthRolePermissionsDto>(role);
        }

        public async Task<AuthResponseDto> AuthenticateAsync(AuthRequestDto request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);
            if (user == null || !VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
                return null;

            var roleWithPermissions = await GetRoleWithPermissions(Convert.ToInt32(user.RoleId));

            var token = GenerateJwtToken(user);

            return new AuthResponseDto
            {
                Token = token,
                Username = user.Username,
                Role = roleWithPermissions.RoleName,
                Password = request.Password,
                FullName = user.FirstName +" "+ user.LastName,
                UserId = user.UserId,
                RoleWithPermissions = roleWithPermissions,
            };
        }

        private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
