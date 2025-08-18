using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hospital.DAL.Repositories
{
    public class DoctorRepository: GenericRepository<Doctor>, IDoctorRepository
    {
        private readonly HospitalDbContext _context;
        public DoctorRepository(HospitalDbContext context) : base(context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context)); ;
        }

        public async Task<Doctor> GetAllPatientsByDoctorIdAsync(int? doctorId)
        {
            if (doctorId.HasValue)
            {
                // Return doctor with only patients who have matching DoctorId
                return await _context.Doctors
                    .Include(d => d.Patients.Where(p => p.DoctorId == doctorId))
                    .FirstOrDefaultAsync(d => d.DoctorId == doctorId);
            }
            else
            {
                // For null doctorId request → fake doctor object with patients that have no doctor assigned
                var patientsWithoutDoctor = await _context.Patients
                    .Where(p => p.DoctorId == null)
                    .ToListAsync();

                // Return as a dummy Doctor object so your service mapping still works
                return new Doctor
                {
                    DoctorId = 0,
                    FullName = "Admin",
                    Specialization = "Unassigned Patients",
                    Patients = patientsWithoutDoctor
                };
            }
        }

    }
}
