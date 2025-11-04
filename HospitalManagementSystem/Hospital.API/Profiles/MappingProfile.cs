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

            // AppointmentDetailDto map_to -> patientObj & doctorObj so separate map required for patient -> respPatientDto & doctor -> respDoctorDto
            CreateMap<Appointment, AppointmentDetailDto>()
                .ForMember(dest => dest.Patient, opt => opt.MapFrom(src => src.Patient))
                .ForMember(dest => dest.Doctor, opt => opt.MapFrom(src => src.Doctor));

            // User → UserDto (for GET)
            CreateMap<User, UserDto>();

            // UserDto → User (for UPDATE/CREATE) 
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore()); // Ignore only in DTO → Entity


            // User → UpdateUserDto (for GET)
            CreateMap<User, UpdateUserDto>();

            // UpdateUserDto → User (for UPDATE only)
            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordSalt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore());


            // Patient → PatientListResponseDto
            CreateMap<Patient, PatientListResponseDto>()
                .ForMember(dest => dest.Status, opt => opt.Ignore()) // handled in service
                .ForMember(dest => dest.AppointmentId, opt => opt.Ignore())
                .ForMember(dest => dest.AppointmentDate, opt => opt.Ignore());

            // Doctor → DoctorWithPatientsDto
            CreateMap<Doctor, DoctorWithPatientsDto>()
                .ForMember(dest => dest.Patients, opt => opt.MapFrom(src => src.Patients));

            CreateMap<CreateRoleDto, Roles>()
                .ForMember(dest => dest.RoleId, opt => opt.Ignore())
                .ReverseMap(); // Ignore PK on update;

            CreateMap<RolesDto, Roles>()
                .ForMember(dest => dest.RoleId, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<CreatePermissionDto, Permissions>()
                .ForMember(dest => dest.PermissionId, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<PermissionsDto, Permissions>()
                .ForMember(dest => dest.PermissionId, opt => opt.MapFrom(src => src.PermissionId))
                .ReverseMap();

            CreateMap<Permissions, AuthPermissionDto>();
            CreateMap<Roles, AuthRolePermissionsDto>();
        }
    }
}
