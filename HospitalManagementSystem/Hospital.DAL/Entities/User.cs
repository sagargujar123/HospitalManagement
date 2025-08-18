using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.DAL.Entities
{
    public class User
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
    }
}
