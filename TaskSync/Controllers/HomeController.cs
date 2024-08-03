using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json.Serialization;
using TaskSync.Helpher;
using TaskSync.Interface;
using TaskSync.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaskSync.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        readonly IProfile _profile;

        public HomeController(ILogger<HomeController> logger, IProfile profile)
        {
            _logger = logger;
            _profile = profile;
        }
        public  async Task<IActionResult> Login(Profile profile)
        {
            try
            {
                List<DataResponse> data = await _profile.Login(profile);
                return Json(data);
            }
            catch (Exception)
            {
                return Json("Technical Error !!");
            }

        }
        public IActionResult Index()
        {
            return View();
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
