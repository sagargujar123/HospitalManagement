using Hospital.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Doctor : AuditableBase
    {
        [Key]
        public int DoctorId { get; set; }

        [Required, StringLength(100)]
        public string FullName { get; set; }

        [Required, StringLength(50)]
        public string Specialization { get; set; }

        [Required, StringLength(10)]
        public string ContactNumber { get; set; }

        [StringLength(200)]
        public string Email { get; set; }

        [StringLength(100)]
        public string? Qualification { get; set; }

        public int? ExperienceYears { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal ConsultationFee { get; set; }

        public bool AvailabilityStatus { get; set; } = true;


        // Navigation property
        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<Patient> Patients { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<LabTest> LabTests { get; set; }
    }
}
