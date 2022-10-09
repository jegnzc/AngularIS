using JavaScriptClient.Data.Models.Inventory;
using Microsoft.EntityFrameworkCore;

namespace JavaScriptClient.Data.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Inventory> Inventories { get; set; }
    public DbSet<Product> Products { get; set; }
}