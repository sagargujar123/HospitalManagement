using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class AppointmentDto
    {
        public int AppointmentId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        public bool IsDeleted { get; set; } = false;
    }

    public class AppointmentDetailDto
    {
        public int AppointmentId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }


        public RespPatientDto Patient { get; set; }
        public RespDoctorDto Doctor { get; set; }
    }

    public class RespPatientDto
    {
        //public int PatientId { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string ContactNumber { get; set; }
    }

    public class RespDoctorDto
    {
        //public int DoctorId { get; set; }
        public string FullName { get; set; }
        public string Specialization { get; set; }
        public string ContactNumber { get; set; }
    }

    public class UpdateAppointmentStatusDto
    {
        public string Status { get; set; }
    }
}
