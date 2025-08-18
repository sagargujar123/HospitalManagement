using HospitalManagementSystem.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospital.DAL.Interfaces
{
    public interface IDoctorRepository : IGenericRepository<Doctor>
    {
        Task<Doctor> GetAllPatientsByDoctorIdAsync(int? doctorId);
    }
}
