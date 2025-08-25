using Hospital.Common.Helpers;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.DAL.Interfaces
{
    public interface IAppointmentRepository:IGenericRepository<Appointment>
    {
        Task<PagedResult<Appointment>> GetAllAsync(int pageNumber, int pageSize, string? status = null);

        Task<Appointment> GetDetailByIdAsync(int id);
    }
}
