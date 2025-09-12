using Hospital.DAL.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Patient : AuditableBase
    {
        [Key]
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

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(100)]
        public string? EmergencyContact { get; set; }

        [StringLength(10)]
        public string? BloodGroup { get; set; }


        //[Required]
        public int? DoctorId { get; set; }

        [ForeignKey("DoctorId")]
        public Doctor Doctor { get; set; }


        // Navigation property
        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<Billing> Billings { get; set; }
        public ICollection<LabTest> LabTests { get; set; }
    }
}
