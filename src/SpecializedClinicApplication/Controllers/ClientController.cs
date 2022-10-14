using Duende.Bff;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SpecializedClinicApplication.Controllers;

//[Authorize]
//[Route("test")]
//public class IdentityController : ControllerBase
//{
//    [HttpGet]
//    public IActionResult Get()
//    {
//        return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
//    }
//}

[Authorize]
[Route("client")]
public class ClientController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
    }
}