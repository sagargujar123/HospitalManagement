using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required, StringLength(20)]
        public string Status { get; set; } // e.g., Scheduled, Completed, Cancelled

        public bool IsDeleted { get; set; } = false;

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
    }
}
