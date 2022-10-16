using Mapster;
using MapsterMapper;
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
public class ClientController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClientController(
        ApplicationDbContext context
        )
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var client = await _context.Clients.FindAsync(id);

        return Ok(client);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var clients = await _context.Clients.ToListAsync();
        return Ok(clients);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] ClientModel request)
    {
        var client = await _context.Clients.FindAsync(id);
        var newClient = request.Adapt(client);
        _context.Clients.Update(newClient);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(ClientModel request)
    {
        await _context.Clients.AddAsync(request.Adapt<Client>());
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        _context.Clients.Remove(client);
        await _context.SaveChangesAsync();

        return Ok();
    }
}