using Hospital.DAL.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Appointment:AuditableBase
    {
        [Key]
        public int AppointmentId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; } // e.g., Scheduled, Completed, Cancelled

        // Foreign Keys
        [Required]
        public int PatientId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        // Navigation properties
        [ForeignKey(nameof(PatientId))]
        public Patient Patient { get; set; }

        [ForeignKey(nameof(DoctorId))]
        public Doctor Doctor { get; set; }

        [StringLength(250)]
        public string? Notes { get; set; }


        // Navigation
        public ICollection<Billing> Billings { get; set; }
    }
}
