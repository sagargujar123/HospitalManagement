using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Data;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.DAL.Repositories
{
    public class UserRepository:GenericRepository<User>, IUserRepository
    {
        public UserRepository(HospitalDbContext context) : base(context) { }
    }
}
