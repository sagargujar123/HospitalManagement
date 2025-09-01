using Hospital.BAL.Interfaces;
using Hospital.Common.Helpers;
using Hospital.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Doctor")]
    
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet]

        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? status = null)
        {
            var appointments = await _appointmentService.GetAllAppointmentAsync(pageNumber, pageSize, status);
            return Ok(ResponseHelper.Success(appointments, AppointmentMsgs.APPOINTMENTS_RETRIEVED));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (appointment == null)
            {
                return NotFound(ResponseHelper.Failure(AppointmentMsgs.APPOINTMENT_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(appointment, AppointmentMsgs.APPOINTMENT_RETRIEVED));
        }

        [HttpPost]
        public async Task<IActionResult> AddAppointment([FromBody] AppointmentDto appointmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdAppointment = await _appointmentService.AddAppointmentAsync(appointmentDto);

            return CreatedAtAction(nameof(GetById), new { id = createdAppointment.AppointmentId }, ResponseHelper.Success(createdAppointment, AppointmentMsgs.APPOINTMENT_CREATED));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody] AppointmentDto appointmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedAppointment = await _appointmentService.UpdateAppointmentAsync(id, appointmentDto);

            if(updatedAppointment == null)
            {
                return NotFound(ResponseHelper.Failure(AppointmentMsgs.APPOINTMENT_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(updatedAppointment, AppointmentMsgs.APPOINTMENT_UPDATED));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _appointmentService.DeleteAppointmentAsync(id);
            if(appointment == null)
            {
                return NotFound(ResponseHelper.Failure(AppointmentMsgs.APPOINTMENT_NOT_FOUND));
            }
            return Ok(ResponseHelper.Success(appointment, AppointmentMsgs.APPOINTMENT_DELETED));
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetAppointmentDetailById(int id)
        {
            var appointment = await _appointmentService.GetAppointmentDetailByIdAsync(id);
            return Ok(ResponseHelper.Success(appointment, AppointmentMsgs.APPOINTMENT_RETRIEVED));
        }
    }
}
