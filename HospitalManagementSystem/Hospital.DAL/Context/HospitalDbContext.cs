using Microsoft.EntityFrameworkCore;
using HospitalManagementSystem.DAL.Entities;
using System.Linq.Expressions;
using Hospital.DAL.Entities;

namespace HospitalManagementSystem.DAL.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<LabTest> LabTests { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }
        public DbSet<Medicine> Medicines { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Permissions> Permissions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Doctor>()
                .HasMany(d => d.Patients)
                .WithOne(p => p.Doctor)
                .HasForeignKey(p => p.DoctorId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Roles>()
                .HasIndex(r => r.RoleName)
                .IsUnique();

            modelBuilder.Entity<Roles>()
                .HasMany(r => r.Permissions)
                .WithOne(p => p.Roles)
                .HasForeignKey(p => p.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Apply soft delete filter for all entities
            //modelBuilder.Entity<Appointment>().HasQueryFilter(a => !a.IsDeleted);
            //modelBuilder.Entity<Doctor>().HasQueryFilter(d => !d.IsDeleted);
            //modelBuilder.Entity<Patient>().HasQueryFilter(p => !p.IsDeleted);
            //modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);

            // Apply Global Soft Delete Filter (for all entities with BaseEntity)
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(AuditableBase).IsAssignableFrom(entityType.ClrType))
                {
                    var parameter = Expression.Parameter(entityType.ClrType, "e");
                    var property = Expression.Property(parameter, nameof(AuditableBase.IsDeleted));
                    var compare = Expression.Equal(property, Expression.Constant(false));
                    var lambda = Expression.Lambda(compare, parameter);

                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }
        }


    }
}
