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

        public async Task<Appointment?> GetDetailByIdAsync(int id)
        {
            return await _dbContext.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);
        }

        public async Task<Appointment> UpdateStatusByIdAsync(int id, string status)
        {
            var appointment = await _dbContext.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return null; 
            }

            appointment.Status = status;
            _dbContext.Appointments.Update(appointment);
            await _dbContext.SaveChangesAsync();

            return appointment;
        }

    }
}
