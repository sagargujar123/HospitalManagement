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
    }

    public class DoctorWithPatientsDto : DoctorDto
    {
        public List<PatientDto> Patients { get; set; } = new List<PatientDto>();
    }
}
