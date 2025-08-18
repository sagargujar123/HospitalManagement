using Hospital.BAL.Interfaces;
using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Entities;
using Hospital.Models;
using AutoMapper;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Services
{
    public class PatientService:IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
        public PatientService(IPatientRepository patientRepository, IMapper mapper) 
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<PatientDto>> GetAllPatientsAsync(int pageNumber = 1, int pageSize = 10)
        {
            var patients = await _patientRepository.GetAllAsync(pageNumber, pageSize);
            return new PagedResult<PatientDto>
            {
                Items = _mapper.Map<IEnumerable<PatientDto>>(patients.Items),
                TotalCount = patients.TotalCount,
                PageNumber = patients.PageNumber,
                PageSize = patients.PageSize
            };
        }
        

        public async Task<PatientDto> GetPatientByIdAsync(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<PatientDto> AddPatientAsync(PatientDto patientDto)
        {
            var patient = _mapper.Map<Patient>(patientDto);
            await _patientRepository.CreateAsync(patient);
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<PatientDto> UpdatePatientAsync(int id, PatientDto patientDto)
        {
            var existingPatient = await _patientRepository.GetByIdAsync(id);
            if(existingPatient == null)
            {
                return null;
            }
            _mapper.Map(patientDto, existingPatient);
            var updatePatient = await _patientRepository.UpdateAsync(id, existingPatient);
            return _mapper.Map<PatientDto>(updatePatient);
        }

        public async Task<PatientDto> DeletePatientAsync(int id)
        {
            var existingPatient = await _patientRepository.DeleteAsync(id);
            return _mapper.Map<PatientDto>(existingPatient);
        }
    }
}
