using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hospital.DAL.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly HospitalDbContext _dbContext;
        public AuthRepository(HospitalDbContext context)
        {
            _dbContext = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<Roles?> GetRoleWithPermissionsAsync(int roleId)
        {
            return await _dbContext.Roles
                .Include(r => r.Permissions)
                .FirstOrDefaultAsync(r => r.RoleId == roleId);
        }
    }
}
