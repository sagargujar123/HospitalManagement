using Hospital.Models;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Interfaces
{
    public interface IPatientService
    {
        Task<PagedResult<PatientDto>> GetAllPatientsAsync(int pageNumber = 1, int pageSize = 10);

        Task<PatientDto> GetPatientByIdAsync(int id);

        Task<PatientDto> AddPatientAsync(PatientDto patientDto);

        Task<PatientDto> UpdatePatientAsync(int id, PatientDto patientDto);

        Task<PatientDto> DeletePatientAsync(int id);

    }
}
