using IService;
using Microsoft.AspNetCore.Mvc;
using Model.Model.TaskMaster;
using Newtonsoft.Json;

namespace TaskSync.Controllers
{
    //[TaskSync.Healpher.Authentication]
    public class TaskMasterController : Controller
    {
        private readonly IListItem _listItem;
        public TaskMasterController(IListItem listItem) => _listItem = listItem;

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<StatusMaster> dyn = await _listItem.StatusMaster();
            return Content(JsonConvert.SerializeObject(dyn));
        }
    }
}
