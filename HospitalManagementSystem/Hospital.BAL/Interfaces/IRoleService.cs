using Hospital.Common.Helpers;
using Hospital.Models;

namespace Hospital.BAL.Interfaces
{
    public interface IRoleService
    {
        Task<PagedResult<RolesDto>> GetAllRolesAsync(int pageNumber = 1, int pageSize = 10);
        Task<RolesDto> GetRoleByIdAsync(int id);
        Task<RolesDto> CreateRoleAsync(RolesDto dto);
        Task<RolesDto> UpdateRoleAsync(int id, RolesDto dto);
        Task<RolesDto> DeleteRoleAsync(int id);
    }
}
