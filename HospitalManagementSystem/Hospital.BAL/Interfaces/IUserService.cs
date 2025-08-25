using Hospital.Models;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Interfaces
{
    public interface IUserService
    {
        Task<PagedResult<UserDto>> GetAllUserAsync(int pageNumber = 1, int pageSize = 10);

        Task<UserDto> GetUserByIdAsync(int id);

        Task<UserDto> AddUserAsync(UserDto userDto);

        Task<UpdateUserDto> UpdateUserAsync(int id, UpdateUserDto userDto);

        Task<UserDto> DeleteUserAsync(int id);
    }
}
