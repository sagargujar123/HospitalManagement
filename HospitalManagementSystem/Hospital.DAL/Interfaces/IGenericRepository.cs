using Hospital.Common.Helpers;

namespace Hospital.DAL.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<PagedResult<T>> GetAllAsync(int pageNumber = 1, int pageSize = 10, IQueryable<T>? query = null);

        Task<T> GetByIdAsync(int id);

        Task<T> CreateAsync(T entity);

        Task<T> UpdateAsync(int id, T entity);

        Task<T> DeleteAsync(int id);
    }
}
