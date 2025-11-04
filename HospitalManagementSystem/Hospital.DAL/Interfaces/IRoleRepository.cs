using Hospital.Common.Helpers;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.DAL.Interfaces
{
    public interface IRoleRepository : IGenericRepository<Roles>
    {
        Task<PagedResult<Roles>> GetAllAsync(int pageNumber, int pageSize);

        Task<Roles> GetByNameAsync(string roleName);

        Task<List<Roles>> GetAllRoleAsync();
    }
}
