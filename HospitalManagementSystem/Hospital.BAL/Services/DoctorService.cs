using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.DAL.Interfaces;
using HospitalManagementSystem.DAL.Entities;
using Hospital.Models;
using Hospital.Common.Helpers;

namespace Hospital.BAL.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;
        public DoctorService(IDoctorRepository doctorRepository, IMapper mapper) 
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<DoctorDto>> GetAllDoctorsAsync(int pageNumber = 1, int pageSize = 10)
        {
            var doctors = await _doctorRepository.GetAllAsync(pageNumber, pageSize);
            return new PagedResult<DoctorDto>
            {
                Items = _mapper.Map<IEnumerable<DoctorDto>>(doctors.Items),
                TotalCount = doctors.TotalCount,
                PageNumber = doctors.PageNumber,
                PageSize = doctors.PageSize
            };
        }


        public async Task<DoctorDto> GetDoctorByIdAsync(int id)
        {
            var doctor = await _doctorRepository.GetByIdAsync(id);
            return _mapper.Map<DoctorDto>(doctor);
        }


        public async Task<DoctorDto> AddDoctorAsync(DoctorDto doctorDto)
        {
            var doctor = _mapper.Map<Doctor>(doctorDto);
            await _doctorRepository.CreateAsync(doctor);
            return _mapper.Map<DoctorDto>(doctor);
        }


        public async Task<DoctorDto> UpdateDoctorAsync(int id, DoctorDto doctorDto)
        {
            var existingDoctor = await _doctorRepository.GetByIdAsync(id);
            if(existingDoctor == null)
            {
                return null;
            }
            _mapper.Map(doctorDto, existingDoctor);
            var updateDoctor = await _doctorRepository.UpdateAsync(id, existingDoctor);
            return _mapper.Map<DoctorDto>(updateDoctor);

        }


        public async Task<DoctorDto> DeleteDoctorAsync(int id)
        {
            var existingDoctor = await _doctorRepository.DeleteAsync(id);
            return _mapper.Map<DoctorDto>(existingDoctor);
        }

        public async Task<DoctorWithPatientsDto> GetDoctorWithPatientsAsync(int doctorId)
        {
            var doctor = await _doctorRepository.GetAllPatientsByDoctorIdAsync(doctorId);

            if (doctor == null)
                return null;

            var doctorDto = _mapper.Map<DoctorWithPatientsDto>(doctor);

            // add status mapping manually because each patient only needs one status
            doctorDto.Patients = doctor.Appointments
        .Where(a => a.DoctorId == doctorId) // ensure only this doctor's appointments
        .Select(a => new PatientListResponseDto
        {
            PatientId = a.Patient.PatientId,
            FullName = a.Patient.FullName,
            DateOfBirth = a.Patient.DateOfBirth,
            Gender = a.Patient.Gender,
            ContactNumber = a.Patient.ContactNumber,
            Address = a.Patient.Address,
            AppointmentId = a.AppointmentId,
            AppointmentDate = a.AppointmentDate,
            Status = a.Status
        })
        .ToList();
            return doctorDto;
        }
    }
}
