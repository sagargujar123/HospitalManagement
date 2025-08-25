using Hospital.Common.Helpers;
using Hospital.Models;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.BAL.Interfaces
{
    public interface IAppointmentService
    {
        Task<PagedResult<AppointmentDetailDto>> GetAllAppointmentAsync(int pageNumber = 1, int pageSize = 10, string? status = null);

        Task<AppointmentDto> GetAppointmentByIdAsync(int id);

        Task<AppointmentDto> AddAppointmentAsync(AppointmentDto appointmentDto);

        Task<AppointmentDto> UpdateAppointmentAsync(int id, AppointmentDto appointmentDto);

        Task<AppointmentDto> DeleteAppointmentAsync(int id);

        Task<AppointmentDetailDto> GetAppointmentDetailByIdAsync(int id);
    }
}
