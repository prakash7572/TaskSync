using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Account;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Security.Claims;
using Utility;

namespace TaskSync.Controllers
{
    
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        readonly IService.IService _profile;

        public HomeController(ILogger<HomeController> logger, IService.IService profile)
        {
            _logger = logger;
            _profile = profile;
        }
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }
        public  async Task<IActionResult> Login(Profile profile)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Name, profile.Email, profile.Password));
                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var principal = new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(principal));

                    DataResponse data = await _profile.Login(profile);
                    return Content(JsonConvert.SerializeObject(data));
                }
                else
                {
                    return Content("All field required !!");
                }
            }
            catch (Exception)
            {
                return Content("Technical Error !!");
            }

        }
        
        public IActionResult Dashboard()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
