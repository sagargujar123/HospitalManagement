using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hospital.DAL.Repositories
{
    public class PermissionRepository : GenericRepository<Permissions>, IPermissionRepository
    {
        private readonly HospitalDbContext _dbContext;
        public PermissionRepository(HospitalDbContext context) : base(context) 
        {
            _dbContext = context;
        }

        public async Task<Permissions> GetByEntityAndColumnAsync(string entityName, string columnName)
        {
            return await _dbContext.Permissions
                .FirstOrDefaultAsync(p => p.EntityName.ToLower() == entityName.ToLower()
                                       && p.ColumnName.ToLower() == columnName.ToLower());
        }
    }
 }
