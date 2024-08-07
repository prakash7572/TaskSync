using IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.TaskMaster;
using Newtonsoft.Json;
using Service;

namespace TaskSync.Controllers
{
    [Authorize]
    public class TaskMasterController : Controller
    {
        private readonly IListItem _listItem;
        public TaskMasterController(IListItem listItem) => _listItem = listItem;
        
        public async Task<IActionResult> Index()
        {
            List<StatusMaster> dyn = await _listItem.StatusMaster();
            return Content(JsonConvert.SerializeObject(dyn));
        }
    }
}
