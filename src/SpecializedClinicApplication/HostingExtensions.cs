using IdentityModel;
using JavaScriptClient.Data.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Security.Claims;

namespace JavaScriptClient
{
    public static class HostingExtensions
    {
        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            InitializeDatabase(app);

            return app;
        }

        private static void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                context.Database.EnsureDeleted();

                context.Database.Migrate();

                context.SaveChanges();
            }
        }
    }
}
