using HospitalManagementSystem.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    [Table("LabTests")]
    public class LabTest : AuditableBase
    {
        [Key]
        public int TestId { get; set; }

        [Required]
        public int PatientId { get; set; }
        [ForeignKey(nameof(PatientId))]
        public Patient Patient { get; set; }

        [Required]
        public int DoctorId { get; set; }
        [ForeignKey(nameof(DoctorId))]
        public Doctor Doctor { get; set; }

        [Required, StringLength(100)]
        public string TestName { get; set; }

        [StringLength(250)]
        public string? Result { get; set; }

        [Required]
        public DateTime TestDate { get; set; }

        public byte[]? ReportFile { get; set; }

    }

}
