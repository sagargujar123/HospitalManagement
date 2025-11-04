using HospitalManagementSystem.DAL.Entities;

namespace Hospital.DAL.Interfaces
{
    public interface IAuthRepository
    {
        Task<Roles?> GetRoleWithPermissionsAsync(int roleId);
    }
}
