using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class UserDto
    {
        public int UserId { get; set; }

        [Required, StringLength(50)]
        public string Username { get; set; }

        [Required, StringLength(100)]
        public string Password { get; set; }

        [Required, StringLength(20)]
        public string Role { get; set; } // Admin, Doctor, Patient

        [Required, StringLength(50)]
        public string FirstName { get; set; }

        [Required, StringLength(50)]
        public string LastName { get; set; }

        public bool IsDeleted { get; set; } = false;
    }

    public class UpdateUserDto
    {
        public int UserId { get; set; }

        [Required, StringLength(50)]
        public string Username { get; set; }

        [StringLength(50)]
        public string? Password { get; set; }

        [Required, StringLength(20)]
        public string Role { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }

        [Required, StringLength(50)]
        public string LastName { get; set; }
    }

    public class AuthRequestDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class AuthResponseDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Password {get; set;}
        public string FullName { get; set; }
        public int UserId { get; set; }
        public AuthRolePermissionsDto RoleWithPermissions { get; set; }
    }
}
