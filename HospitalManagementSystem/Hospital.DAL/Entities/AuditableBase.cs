using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    public abstract class AuditableBase
    {
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [StringLength(100)]
        public string CreatedBy { get; set; } = "System";
        public DateTime? UpdatedDate { get; set; }
        [StringLength(100)]
        public string? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
