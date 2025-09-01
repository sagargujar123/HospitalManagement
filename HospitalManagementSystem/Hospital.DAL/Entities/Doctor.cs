using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementSystem.DAL.Entities
{
    public class Doctor
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

        public bool IsDeleted { get; set; } = false;

        // Navigation property
        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<Patient> Patients { get; set; }
    }
}
