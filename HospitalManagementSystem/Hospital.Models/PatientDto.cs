using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class PatientDto
    {
 
        public int PatientId { get; set; }

        [Required, StringLength(100)]
        public string FullName { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        [Required, StringLength(10)]
        public string Gender { get; set; }

        [Required, StringLength(15)]
        public string ContactNumber { get; set; }

        [StringLength(200)]
        public string Address { get; set; }

        //[Required]
        public int? DoctorId { get; set; }
    }
}
