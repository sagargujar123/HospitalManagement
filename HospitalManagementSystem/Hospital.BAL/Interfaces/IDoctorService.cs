using Hospital.Models;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Interfaces
{
    public interface IDoctorService
    {
        Task<PagedResult<DoctorDto>> GetAllDoctorsAsync(int pageNumber = 1, int pageSize = 10);

        Task<DoctorDto> GetDoctorByIdAsync(int id);

        Task<DoctorDto> AddDoctorAsync(DoctorDto doctor);

        Task<DoctorDto> UpdateDoctorAsync(int id, DoctorDto doctor);

        Task<DoctorDto> DeleteDoctorAsync(int id);

        Task<DoctorWithPatientsDto> GetDoctorWithPatientsAsync(int? doctorId);
    }
}
