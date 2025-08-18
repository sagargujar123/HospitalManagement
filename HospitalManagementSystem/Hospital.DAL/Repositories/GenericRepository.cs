using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using Microsoft.EntityFrameworkCore;
using Hospital.Common.Helpers;

namespace Hospital.DAL.Repositories
{
    public class GenericRepository<T>: IGenericRepository<T> where T : class
    {
        private readonly HospitalDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(HospitalDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        //public virtual async Task<IEnumerable<T>> GetAllAsync(string? status = null)
        //{
        //    return await _dbSet.ToListAsync();
        //}

        public virtual async Task<PagedResult<T>> GetAllAsync(int pageNumber = 1, int pageSize = 10, IQueryable<T>? query = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;

            query ??= _dbSet.AsQueryable();

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<T>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> CreateAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync(int id, T entity)
        {
            var existingEntity = await _dbSet.FindAsync(id);
            if(existingEntity == null)
            {
                return null;
            }
            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }

        public async Task<T> DeleteAsync(int id)
        {
            var existingEntity = await _dbSet.FindAsync(id);
            if(existingEntity == null)
            {
                return null;
            }
            _dbSet.Remove(existingEntity);
            await _context.SaveChangesAsync();
            return existingEntity;
        }
    }
}
