using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using SpecializedClinicAuth.Data;
using SpecializedClinicAuth.Models;
using System.Security.Claims;
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
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<GetUserBasicDataResponse> Get(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            var role = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == System.Security.Claims.ClaimTypes.Role)
                .Select(c => c.Value).FirstOrDefault();
            return new GetUserBasicDataResponse()
            {
                Email = user.Email,
                Role = role,
                UserName = user.UserName,
            };
        }

        [HttpPost("UpdateUser")]
        public async Task<IActionResult> Post(UpdateUser request)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            var role = ((ClaimsIdentity)User.Identity).Claims
                            .Where(c => c.Type == System.Security.Claims.ClaimTypes.Role)
                            .Select(c => c.Value).FirstOrDefault();
            await _userManager.RemoveFromRoleAsync(user, role);
            await _userManager.AddToRoleAsync(user, request.Role);
            await _userManager.UpdateAsync(user);

            return Ok();
        }
    }
}