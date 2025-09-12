using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Update_dbcontext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Billing_Appointments_AppointmentId",
                table: "Billing");

            migrationBuilder.DropForeignKey(
                name: "FK_Billing_Patients_PatientId",
                table: "Billing");

            migrationBuilder.DropForeignKey(
                name: "FK_LabTest_Doctors_DoctorId",
                table: "LabTest");

            migrationBuilder.DropForeignKey(
                name: "FK_LabTest_Patients_PatientId",
                table: "LabTest");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecord_Doctors_DoctorId",
                table: "MedicalRecord");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecord_Patients_PatientId",
                table: "MedicalRecord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecord",
                table: "MedicalRecord");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LabTest",
                table: "LabTest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Billing",
                table: "Billing");

            migrationBuilder.RenameTable(
                name: "MedicalRecord",
                newName: "MedicalRecords");

            migrationBuilder.RenameTable(
                name: "LabTest",
                newName: "LabTests");

            migrationBuilder.RenameTable(
                name: "Billing",
                newName: "Billings");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecord_PatientId",
                table: "MedicalRecords",
                newName: "IX_MedicalRecords_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecord_DoctorId",
                table: "MedicalRecords",
                newName: "IX_MedicalRecords_DoctorId");

            migrationBuilder.RenameIndex(
                name: "IX_LabTest_PatientId",
                table: "LabTests",
                newName: "IX_LabTests_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_LabTest_DoctorId",
                table: "LabTests",
                newName: "IX_LabTests_DoctorId");

            migrationBuilder.RenameIndex(
                name: "IX_Billing_PatientId",
                table: "Billings",
                newName: "IX_Billings_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Billing_AppointmentId",
                table: "Billings",
                newName: "IX_Billings_AppointmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecords",
                table: "MedicalRecords",
                column: "RecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LabTests",
                table: "LabTests",
                column: "TestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Billings",
                table: "Billings",
                column: "BillId");

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    MedicineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    StockQuantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicines", x => x.MedicineId);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    RoomId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    RoomType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    IsAvailable = table.Column<bool>(type: "bit", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.RoomId);
                    table.ForeignKey(
                        name: "FK_Rooms_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "PatientId");
                });

            migrationBuilder.CreateTable(
                name: "Staffs",
                columns: table => new
                {
                    StaffId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Shift = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    JoinedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Staffs", x => x.StaffId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_PatientId",
                table: "Rooms",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Billings_Appointments_AppointmentId",
                table: "Billings",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "AppointmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Billings_Patients_PatientId",
                table: "Billings",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabTests_Doctors_DoctorId",
                table: "LabTests",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabTests_Patients_PatientId",
                table: "LabTests",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Doctors_DoctorId",
                table: "MedicalRecords",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Billings_Appointments_AppointmentId",
                table: "Billings");

            migrationBuilder.DropForeignKey(
                name: "FK_Billings_Patients_PatientId",
                table: "Billings");

            migrationBuilder.DropForeignKey(
                name: "FK_LabTests_Doctors_DoctorId",
                table: "LabTests");

            migrationBuilder.DropForeignKey(
                name: "FK_LabTests_Patients_PatientId",
                table: "LabTests");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Doctors_DoctorId",
                table: "MedicalRecords");

            migrationBuilder.DropForeignKey(
                name: "FK_MedicalRecords_Patients_PatientId",
                table: "MedicalRecords");

            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Staffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicalRecords",
                table: "MedicalRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LabTests",
                table: "LabTests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Billings",
                table: "Billings");

            migrationBuilder.RenameTable(
                name: "MedicalRecords",
                newName: "MedicalRecord");

            migrationBuilder.RenameTable(
                name: "LabTests",
                newName: "LabTest");

            migrationBuilder.RenameTable(
                name: "Billings",
                newName: "Billing");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecords_PatientId",
                table: "MedicalRecord",
                newName: "IX_MedicalRecord_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_MedicalRecords_DoctorId",
                table: "MedicalRecord",
                newName: "IX_MedicalRecord_DoctorId");

            migrationBuilder.RenameIndex(
                name: "IX_LabTests_PatientId",
                table: "LabTest",
                newName: "IX_LabTest_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_LabTests_DoctorId",
                table: "LabTest",
                newName: "IX_LabTest_DoctorId");

            migrationBuilder.RenameIndex(
                name: "IX_Billings_PatientId",
                table: "Billing",
                newName: "IX_Billing_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Billings_AppointmentId",
                table: "Billing",
                newName: "IX_Billing_AppointmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicalRecord",
                table: "MedicalRecord",
                column: "RecordId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LabTest",
                table: "LabTest",
                column: "TestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Billing",
                table: "Billing",
                column: "BillId");

            migrationBuilder.AddForeignKey(
                name: "FK_Billing_Appointments_AppointmentId",
                table: "Billing",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "AppointmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Billing_Patients_PatientId",
                table: "Billing",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabTest_Doctors_DoctorId",
                table: "LabTest",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LabTest_Patients_PatientId",
                table: "LabTest",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecord_Doctors_DoctorId",
                table: "MedicalRecord",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MedicalRecord_Patients_PatientId",
                table: "MedicalRecord",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
