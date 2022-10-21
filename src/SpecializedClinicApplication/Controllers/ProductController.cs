using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpecializedClinicApplication.Data;
using SpecializedClinicApplication.Data.Models.Inventory;
using Mapster;
using Microsoft.AspNetCore.Authorization;

namespace SpecializedClinicApplication.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController(
        ApplicationDbContext context
        )
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await _context.Products.FindAsync(id);

        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Patch(int id, [FromBody] Product request)
    {
        var product = await _context.Products.FindAsync(id);
        var newProduct = request.Adapt(product);
        _context.Products.Update(newProduct);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Product request)
    {
        await _context.Products.AddAsync(request);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return Ok();
    }
}