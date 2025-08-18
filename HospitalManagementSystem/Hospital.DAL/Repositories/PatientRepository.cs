using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Hospital.DAL.Repositories
{
    public class PatientRepository : GenericRepository<Patient>, IPatientRepository
    {
        public PatientRepository(HospitalDbContext context) : base(context){ }
    }
}
