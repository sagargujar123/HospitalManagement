using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Hospital.DAL.Entities
{
    public class Medicine : AuditableBase
    {
        [Key]
        public int MedicineId { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }

        [StringLength(50)]
        public string? Brand { get; set; }

        public int StockQuantity { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Required]
        public DateTime ExpiryDate { get; set; }

    }

}
