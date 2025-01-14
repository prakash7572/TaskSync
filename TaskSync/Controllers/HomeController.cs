using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Model.Model.Account;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Security.Claims;
using Utility;
using System.Net.Http;
using System.Text.Json;

namespace TaskSync.Controllers
{
    //[TaskSync.Healpher.Authentication]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        readonly IService.IService _profile;

        public HomeController(ILogger<HomeController> logger, IService.IService profile)
        {
            _logger = logger;
            _profile = profile;
        }

        [HttpGet]
        public IActionResult Index() => View();

        //[TaskSync.Healpher.Authentication]
        public IActionResult Dashboard()
        {
             GetPrivicy();
            return View();
        }

        async Task GetPrivicy()
        {
            string apiUrl = "https://ipinfo.io/json"; 
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync(apiUrl);
                    response.EnsureSuccessStatusCode();

                    string responseBody = await response.Content.ReadAsStringAsync();

                    var locationData = System.Text.Json.JsonSerializer.Deserialize<dynamic>(responseBody);
                }
                catch (Exception e)
                {
                    throw e;
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Registration(Model.Model.Account.Profile profile)
        {
            DataResponse response = await _profile.Registration(profile);
            return Content(JsonConvert.SerializeObject(response));
        }

        [HttpPost]
        public async Task<IActionResult> Login(Model.ViewModel.Account.Profile profile)
        {
            try
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, profile.Email ?? string.Empty) };
                var principal = new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme));

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal,
                    new AuthenticationProperties
                    {
                        IsPersistent = profile.RememberMe,
                        ExpiresUtc = profile.RememberMe ? DateTimeOffset.UtcNow.AddDays(7) : (DateTimeOffset?)null
                    });

                var data = await _profile.Login(profile);
                return Content(JsonConvert.SerializeObject(data));
            }
            catch
            {
                return Content("Technical Error !!");
            }
        }


        [HttpPost]
        public async Task<IActionResult> LogOut()
        {
            try
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() => View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });

    }
}
