using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using SpecializedClinicAuth.Data;
using SpecializedClinicAuth.Models;
using static Duende.IdentityServer.IdentityServerConstants;

namespace SpecializedClinicAuth.Controllers
{
    [ApiController]
    [Route("localApi")]
    [Authorize(LocalApi.PolicyName)]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            return "Que onda";
        }
    }
}