using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hospital.DAL.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        private readonly HospitalDbContext _context;
        public DoctorRepository(HospitalDbContext context) : base(context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context)); ;
        }

        public async Task<Doctor?> GetAllPatientsByDoctorIdAsync(int doctorId)
        {
            var doctorExist = await _context.Doctors.FindAsync(doctorId);
            if (doctorExist == null)
            {
                return null;
            }

            return await _context.Doctors
                .Where(d => d.DoctorId == doctorId)
                .Include(d => d.Appointments)
                    .ThenInclude(a => a.Patient)
                .FirstOrDefaultAsync();
        }


    }
}
