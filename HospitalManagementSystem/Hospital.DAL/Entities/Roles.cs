using Hospital.DAL.Entities;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Roles : AuditableBase
    {
        [Key]
        public int RoleId { get; set; }

        [Required, StringLength(50)]
        public string RoleName { get; set; }

        public bool CanAdd { get; set; }
        public bool CanEdit { get; set; }
        public bool CanDelete { get; set; }
        public bool CanView { get; set; }

        public ICollection<Permissions> Permissions { get; set; }
    }
}