using HospitalManagementSystem.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    [Table("MedicalRecords")]
    public class MedicalRecord : AuditableBase
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        public int PatientId { get; set; }
        [ForeignKey(nameof(PatientId))]
        public Patient Patient { get; set; }

        [Required]
        public int DoctorId { get; set; }
        [ForeignKey(nameof(DoctorId))]
        public Doctor Doctor { get; set; }

        [Required, StringLength(250)]
        public string Diagnosis { get; set; }

        [StringLength(250)]
        public string? Prescription { get; set; }

        [StringLength(250)]
        public string? TestResults { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }

        public DateTime? FollowUpDate { get; set; }

    }

}
