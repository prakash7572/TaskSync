using IService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Model.Account;
using Newtonsoft.Json;
using System.Data;
using System.Diagnostics;
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
        public  async Task<IActionResult> Login(Profile profile)
        {
            try
            {
                if (ModelState.IsValid)
                {
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
