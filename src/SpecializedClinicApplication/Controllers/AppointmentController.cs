using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpecializedClinicApplication.Data;
using SpecializedClinicApplication.Data.Models.Inventory;
using SpecializedClinicApplication.Model;

namespace SpecializedClinicApplication.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class AppointmentController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppointmentController(
        ApplicationDbContext context
        )
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var appointment = await _context.Appointments.Include(x => x.Client)
            .Include(x => x.Service)
            .SingleAsync(x => x.Id == id);
        return Ok(appointment.Adapt<AppointmentModel>());
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var appointments = await _context.Appointments.Include(x => x.Client)
            .Include(x=>x.Service).
            ToListAsync();
        return Ok(appointments.Adapt<List<AppointmentModel>>());
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] AppointmentModel request)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        var newAppointment = request.Adapt(appointment);
        _context.Appointments.Update(newAppointment);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(AppointmentModel request)
    {
        await _context.Appointments.AddAsync(request.Adapt<Appointment>());
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return Ok();
    }
}