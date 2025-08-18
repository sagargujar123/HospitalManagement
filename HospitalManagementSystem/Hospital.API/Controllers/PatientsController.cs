using Hospital.BAL.Interfaces;
using Hospital.Models;
using Microsoft.AspNetCore.Mvc;
using Hospital.Common.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Patient")]
   
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var patients = await _patientService.GetAllPatientsAsync(pageNumber, pageSize);
            return Ok(ResponseHelper.Success(patients, Messages.PATIENTS_RETRIEVED));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _patientService.GetPatientByIdAsync(id);
            if(patient == null)
            {
                //return NotFound();
                return NotFound(ResponseHelper.Failure(Messages.PATIENT_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(patient, Messages.PATIENTS_RETRIEVED));
        }


        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] PatientDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdPatient = await _patientService.AddPatientAsync(patientDto);
            //return CreatedAtAction(nameof(GetById), new { id = createdPatient.PatientId }, createdPatient);
           
            return CreatedAtAction(nameof(GetById), new { id = createdPatient.PatientId }, ResponseHelper.Success(createdPatient, Messages.PATIENT_CREATED));
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] PatientDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedPatient = await _patientService.UpdatePatientAsync(id, patientDto);
            if(updatedPatient == null)
            {
                //return NotFound();
                return NotFound(ResponseHelper.Failure(Messages.PATIENT_NOT_FOUND));
            }
            //return Ok(updatedPatient);
            return Ok(ResponseHelper.Success(updatedPatient, Messages.PATIENT_UPDATED));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult>DeletePatient(int id)
        {
            var patient = await _patientService.DeletePatientAsync(id);
            if(patient == null)
            {
                //return NotFound();
                return NotFound(ResponseHelper.Failure(Messages.PATIENT_NOT_FOUND));
            }
            //return Ok(patient);
            return Ok(ResponseHelper.Success(patient, Messages.PATIENT_DELETED));
        }
    }
}
