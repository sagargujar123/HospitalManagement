using HospitalManagementSystem.DAL.Entities;

namespace Hospital.DAL.Interfaces
{
    public interface IPermissionRepository : IGenericRepository<Permissions>
    {
        Task<Permissions> GetByEntityAndColumnAsync(string entityName, string columnName);
    }
}
