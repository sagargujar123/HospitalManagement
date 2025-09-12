using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    public class Staff : AuditableBase
    {
        [Key]
        public int StaffId { get; set; }

        [Required, StringLength(100)]
        public string FullName { get; set; }

        [Required, StringLength(50)]
        public string Role { get; set; }  // Nurse, Receptionist, Admin, etc.

        [Required, StringLength(20)]
        public string ContactNumber { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string Shift { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Salary { get; set; }

        public DateTime JoinedDate { get; set; } = DateTime.Now;

    }

}
