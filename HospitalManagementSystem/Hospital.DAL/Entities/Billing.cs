using HospitalManagementSystem.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    [Table("Billings")]
    public class Billing : AuditableBase
    {
        [Key]
        public int BillId { get; set; }

        [Required]
        public int PatientId { get; set; }
        [ForeignKey(nameof(PatientId))]
        public Patient Patient { get; set; }

        [Required]
        public int AppointmentId { get; set; }
        [ForeignKey(nameof(AppointmentId))]
        public Appointment Appointment { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        [Required, StringLength(50)]
        public string PaymentStatus { get; set; } = "Pending";

        public DateTime? PaymentDate { get; set; }

        [StringLength(50)]
        public string? ModeOfPayment { get; set; }  // Cash, Card, UPI

    }

}
