using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpecializedClinicApplication.Data;
using SpecializedClinicApplication.Data.Models.Inventory;

namespace SpecializedClinicApplication.Controllers;


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
    public async Task<IActionResult> Patch(int id, [FromBody] Client request)
    {
        var client = await _context.Clients.FindAsync(id);
        var newClient = (client, request).Adapt<Client>();
        _context.Clients.Update(newClient);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Client request)
    {
        await _context.Clients.AddAsync(request);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        _context.Clients.Remove(client);
        return Ok();
    }
}