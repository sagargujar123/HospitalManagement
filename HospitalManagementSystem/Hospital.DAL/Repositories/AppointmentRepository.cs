using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Hospital.Common.Helpers;

namespace Hospital.DAL.Repositories
{
    public class AppointmentRepository:GenericRepository<Appointment>, IAppointmentRepository
    {
        private readonly HospitalDbContext _dbContext; // Local copy for this repo
        public AppointmentRepository(HospitalDbContext context) : base (context)
        {
            _dbContext = context;
        }


        public async Task<PagedResult<Appointment>> GetAllAsync(int pageNumber, int pageSize, string? status = null)
        {
            var query = _dbContext.Set<Appointment>()
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(a => a.Status == status);
            }

            return await base.GetAllAsync(pageNumber, pageSize, query);
        }

        public async Task<IEnumerable<Appointment>> GetByStatusAsync(string status)
        {
            return await _dbContext.Appointments
                                    .Where(a => a.Status == status)
                                    .ToListAsync();
        }

    }
}
