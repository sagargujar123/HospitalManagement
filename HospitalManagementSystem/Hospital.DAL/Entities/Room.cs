using HospitalManagementSystem.DAL.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    public class Room : AuditableBase
    {
        [Key]
        public int RoomId { get; set; }

        [Required, StringLength(20)]
        public string RoomNumber { get; set; }

        [Required, StringLength(50)]
        public string RoomType { get; set; } // General, ICU, Private

        public bool IsAvailable { get; set; } = true;


        public int? PatientId { get; set; }
        [ForeignKey(nameof(PatientId))]
        public Patient? Patient { get; set; }
    }

}
