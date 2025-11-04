using Hospital.Common.Helpers;
using Hospital.Models;

namespace Hospital.BAL.Interfaces
{
    public interface IRoleService
    {
        Task<PagedResult<RolesDto>> GetAllRolesAsync(int pageNumber = 1, int pageSize = 10);
        Task<CreateRoleDto> GetRoleByIdAsync(int id);
        Task<CreateRoleDto> CreateRoleAsync(CreateRoleDto dto);
        Task<CreateRoleDto> UpdateRoleAsync(int id, CreateRoleDto dto);
        Task<CreateRoleDto> DeleteRoleAsync(int id);
        Task<List<CreateRoleDto>> GetRoleListAsync();
    }
}
