using Hospital.DAL.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class User : AuditableBase
    {
        [Key]
        public int UserId { get; set; }

        [Required, StringLength(50)]
        public string Username { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required, StringLength(20)]
        public string Role { get; set; } // Admin, Doctor, Patient

        [Required, StringLength(50)]
        public string FirstName { get; set; }

        [Required, StringLength(50)]
        public string LastName { get; set; }

        public DateTime? LastLogin { get; set; }

        public int? RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }

    }
}
