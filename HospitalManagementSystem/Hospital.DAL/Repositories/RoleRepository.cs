using Hospital.Common.Helpers;
using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Hospital.DAL.Repositories
{
    public class RoleRepository : GenericRepository<Roles>, IRoleRepository
    {
        private readonly HospitalDbContext _dbContext;
        public RoleRepository(HospitalDbContext context) : base(context) 
        {
            _dbContext = context;
        }

        public async Task<PagedResult<Roles>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = _dbContext.Roles
                .Include(r => r.Permissions); 

            return await GetAllAsync(pageNumber, pageSize, query);
        }

        public async Task<List<Roles>> GetAllRoleAsync()
        {
            return await _dbContext.Roles.ToListAsync();
        }

        public async Task<Roles> GetByNameAsync(string roleName)
        {
            return await _dbContext.Roles.FirstOrDefaultAsync(r => r.RoleName.ToLower() == roleName.ToLower());

        }

    }
}
