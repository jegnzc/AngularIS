using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpecializedClinicApplication.Data;
using SpecializedClinicApplication.Data.Models.Inventory;

namespace SpecializedClinicApplication.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ServiceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ServiceController(
        ApplicationDbContext context
        )
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var service = await _context.Services.FindAsync(id);

        return Ok(service);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var services = await _context.Services.ToListAsync();
        return Ok(services);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] ServiceModel request)
    {
        var service = await _context.Services.FindAsync(id);
        var updatedService = request.Adapt(service);
        _context.Services.Update(updatedService);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(ServiceModel request)
    {
        await _context.Services.AddAsync(request.Adapt<Service>());
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var service = await _context.Services.FindAsync(id);
        _context.Services.Remove(service);
        await _context.SaveChangesAsync();

        return Ok();
    }
}