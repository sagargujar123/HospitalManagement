using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class DoctorDto
    {
        public int DoctorId { get; set; }

        [Required, StringLength(100)]
        public string FullName { get; set; }

        [Required, StringLength(50)]
        public string Specialization { get; set; }

        [Required, StringLength(10)]
        public string ContactNumber { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        public bool IsDeleted { get; set; } = false;
    }

    public class DoctorWithPatientsDto 
    {
        public int DoctorId { get; set; }
        public string FullName { get; set; }
        public string Specialization { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public List<PatientListResponseDto> Patients { get; set; } = new List<PatientListResponseDto>();
    }
}
