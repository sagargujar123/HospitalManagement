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

        public async Task<Roles> GetByIdAsync(int id)
        {
            return await _dbContext.Roles
                .Include(r => r.Permissions)
                .FirstOrDefaultAsync(r => r.RoleId == id);
        }

        public async Task<Roles> UpdateAsync(int id, Roles entity)
        {
            var existingEntity = await _dbContext.Roles
                .Include(r => r.Permissions)
                .FirstOrDefaultAsync(r => r.RoleId == id);

            if (existingEntity == null) return null;

            // Update scalar properties manually (ignore PK)
            existingEntity.RoleName = entity.RoleName;

            if (entity.Permissions != null && entity.Permissions.Any())
            {
                // Remove old ones not in the new list
                var toRemove = existingEntity.Permissions
                    .Where(p => !entity.Permissions.Any(ep => ep.PermissionId == p.PermissionId))
                    .ToList();

                _dbContext.Permissions.RemoveRange(toRemove);

                foreach (var perm in entity.Permissions)
                {
                    var existingPerm = existingEntity.Permissions
                        .FirstOrDefault(p => p.PermissionId == perm.PermissionId);

                    if (existingPerm != null)
                    {
                        // Update existing tracked permission
                        existingPerm.EntityName = perm.EntityName;
                        existingPerm.ColumnName = perm.ColumnName;
                        existingPerm.IsVisible = perm.IsVisible;
                        existingPerm.CanEdit = perm.CanEdit;
                        existingPerm.CanDelete = perm.CanDelete;
                        existingPerm.CanView = perm.CanView;
                    }
                    else
                    {
                        // Attach instead of adding blindly
                        perm.RoleId = id; // ensure FK set
                        _dbContext.Permissions.Attach(perm);
                        existingEntity.Permissions.Add(perm);
                    }
                }
            }
            else
            {
                // If no permissions provided, clear all
                _dbContext.Permissions.RemoveRange(existingEntity.Permissions);
                existingEntity.Permissions.Clear();
            }

            await _dbContext.SaveChangesAsync();
            return existingEntity;
        }



    }
}
