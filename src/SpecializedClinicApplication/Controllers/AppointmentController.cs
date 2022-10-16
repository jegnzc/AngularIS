using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpecializedClinicApplication.Data;
using SpecializedClinicApplication.Data.Models.Inventory;

namespace SpecializedClinicApplication.Controllers;


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
        var client = await _context.Appointments.FindAsync(id);

        return Ok(client);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var clients = await _context.Appointments.ToListAsync();
        return Ok(clients);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] Appointment request)
    {
        var client = await _context.Appointments.FindAsync(id);
        var newAppointment = (client, request).Adapt<Appointment>();
        _context.Appointments.Update(newAppointment);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Appointment request)
    {
        await _context.Appointments.AddAsync(request);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var client = await _context.Appointments.FindAsync(id);
        _context.Appointments.Remove(client);
        return Ok();
    }
}