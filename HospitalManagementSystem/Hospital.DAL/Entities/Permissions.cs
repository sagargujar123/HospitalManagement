using Hospital.DAL.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Permissions : AuditableBase
    {
        [Key]
        public int PermissionId { get; set; }

        [Required]
        public string EntityName { get; set; }

        [Required]
        public string ColumnName { get; set; }

        public bool IsVisible { get; set; }

        //public bool CanAdd { get; set; }
        //public bool CanEdit { get; set; }
        //public bool CanDelete { get; set; }
        //public bool CanView { get; set; }

        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles Roles { get; set; }
    }
}