using Hospital.Common.Helpers;
using Hospital.BAL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Hospital.Models;
using Microsoft.AspNetCore.Authorization;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Doctor")]
    public class DoctorsController : Controller
    {
       private readonly IDoctorService _doctorService;

        public DoctorsController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var doctors = await _doctorService.GetAllDoctorsAsync(pageNumber, pageSize);
            return Ok(ResponseHelper.Success(doctors, DoctorMessages.DOCTORS_RETRIEVED));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _doctorService.GetDoctorByIdAsync(id);
            if(doctor == null)
            {
                return NotFound(ResponseHelper.Failure(DoctorMessages.DOCTOR_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(doctor, DoctorMessages.DOCTOR_RETRIEVED));
        }


        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] DoctorDto doctorDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdDoctor = await _doctorService.AddDoctorAsync(doctorDto);

            return CreatedAtAction(nameof(GetById), new { id = createdDoctor.DoctorId }, ResponseHelper.Success(createdDoctor, DoctorMessages.DOCTOR_CREATED));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromBody] DoctorDto doctorDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedDoctor = await _doctorService.UpdateDoctorAsync(id, doctorDto);

            if(updatedDoctor == null)
            {
                return NotFound(ResponseHelper.Failure(DoctorMessages.DOCTOR_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(updatedDoctor, DoctorMessages.DOCTOR_UPDATED));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _doctorService.DeleteDoctorAsync(id);
            if(doctor == null)
            {
                return NotFound(ResponseHelper.Failure(DoctorMessages.DOCTOR_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(doctor, DoctorMessages.DOCTOR_DELETED));
        }


        [HttpGet("{doctorId}/patients")]
        public async Task<IActionResult> GetAllPatientsByDoctorId(int doctorId)
        {
            var result = await _doctorService.GetDoctorWithPatientsAsync(doctorId);
            if(result == null)
            {
                return NotFound(ResponseHelper.Failure(DoctorMessages.DOCTOR_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(result, DoctorMessages.DOCTOR_WITH_PATIENTS_RETRIEVED));
        }

    }
}
