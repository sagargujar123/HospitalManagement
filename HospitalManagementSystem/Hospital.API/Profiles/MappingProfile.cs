using AutoMapper;
using HospitalManagementSystem.DAL.Entities;
using Hospital.Models; // Your DTO namespace

namespace HospitalManagementSystem.API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Patients
            CreateMap<Patient, PatientDto>()
                .ReverseMap()
                .ForMember(dest => dest.PatientId, opt => opt.Ignore()); // Ignore PK on update

            // Doctors
            CreateMap<Doctor, DoctorDto>()
                .ReverseMap()
                .ForMember(dest => dest.DoctorId, opt => opt.Ignore()); // Ignore PK on update

            // Appointments
            CreateMap<Appointment, AppointmentDto>()
                .ReverseMap()
                .ForMember(dest => dest.AppointmentId, opt => opt.Ignore()); // Ignore PK on update

            // For Appointment Response DTOs
            CreateMap<Patient, RespPatientDto>();
            CreateMap<Doctor, RespDoctorDto>();

            CreateMap<Appointment, AppointmentDetailDto>()
                .ForMember(dest => dest.Patient, opt => opt.MapFrom(src => src.Patient))
                .ForMember(dest => dest.Doctor, opt => opt.MapFrom(src => src.Doctor));

            // Users (ignore PasswordHash/Salt for mapping from DTO → Entity)
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()); // Ignore PK on update

            CreateMap<User, UserDto>().ReverseMap()
                .ForMember(dest => dest.UserId, opt => opt.Ignore()); // Ignore PK on update

            // Users (ignore PasswordHash/Salt for mapping from DTO → Entity)
            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()); // Ignore PK on update

            CreateMap<User, UpdateUserDto>().ReverseMap()
               .ForMember(dest => dest.UserId, opt => opt.Ignore()); // Ignore PK on update

            // Patients By doctorId
            CreateMap<Doctor, DoctorWithPatientsDto>()
               .ReverseMap();
                // Ignore PK on update
        }
    }
}
