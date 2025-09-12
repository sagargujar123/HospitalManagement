using AutoMapper;
using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.DAL.Interfaces;
using Hospital.Models;
using HospitalManagementSystem.DAL.Entities;

namespace Hospital.BAL.Services
{
    public class AppointmentService:IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;

        public AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<AppointmentDetailDto>> GetAllAppointmentAsync(int pageNumber = 1, int pageSize = 10, string? status = null)
        {
            // Call repository method with pagination + status filter
            var pagedAppointments = await _appointmentRepository.GetAllAsync(pageNumber, pageSize, status);

            // Map only the items but keep pagination metadata
            return new PagedResult<AppointmentDetailDto>
            {
                Items = _mapper.Map<IEnumerable<AppointmentDetailDto>>(pagedAppointments.Items),
                TotalCount = pagedAppointments.TotalCount,
                PageNumber = pagedAppointments.PageNumber,
                PageSize = pagedAppointments.PageSize
            };
        }


        public async Task<AppointmentDto> GetAppointmentByIdAsync(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            return _mapper.Map<AppointmentDto>(appointment);
        }


        public async Task<AppointmentDto> AddAppointmentAsync(AppointmentDto appointmentDto)
        {
            var appointment = _mapper.Map<Appointment>(appointmentDto);
            await _appointmentRepository.CreateAsync(appointment);
            return _mapper.Map<AppointmentDto>(appointment);
        }

        public async Task<AppointmentDto> UpdateAppointmentAsync(int id, AppointmentDto appointmentDto)
        {
            var existingAppointment = await _appointmentRepository.GetByIdAsync(id);
            if (existingAppointment == null)
            {
                return null;
            }
            _mapper.Map(appointmentDto, existingAppointment);
            var updatedAppointment = await _appointmentRepository.UpdateAsync(id, existingAppointment);
            return _mapper.Map<AppointmentDto>(updatedAppointment);
        }


        public async Task<AppointmentDto> DeleteAppointmentAsync(int id)
        {
            var existingAppointment = await _appointmentRepository.DeleteAsync(id);
            return _mapper.Map<AppointmentDto>(existingAppointment);
        }

        public async Task<AppointmentDetailDto> GetAppointmentDetailByIdAsync(int id)
        {
            var appointment = await _appointmentRepository.GetDetailByIdAsync(id);
            return _mapper.Map<AppointmentDetailDto>(appointment);
        }

        public async Task<AppointmentDto> UpdateStatusByIdAsync(int id, string status)
        {
            var appointmentStatus = await _appointmentRepository.UpdateStatusByIdAsync(id, status);
            return _mapper.Map<AppointmentDto>(appointmentStatus);
        }
    }
}
