using Hospital.Common.Helpers;
using Hospital.Models;

namespace Hospital.BAL.Interfaces
{
    public interface IPermissionService
    {
        Task<PagedResult<PermissionsDto>> GetAllPermissionsAsync(int pageNumber = 1, int pageSize = 10);
        Task<CreatePermissionDto> GetPermissionByIdAsync(int id);
        Task<CreatePermissionDto> CreatePermissionAsync(CreatePermissionDto dto);
        Task<CreatePermissionDto> UpdatePermissionAsync(int id, CreatePermissionDto dto);
        Task<CreatePermissionDto> DeletePermissionAsync(int id);
    }
}
