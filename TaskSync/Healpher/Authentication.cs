using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace TaskSync.Healpher
{
    public class Authentication : ActionFilterAttribute 
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.HttpContext.User.Identity.IsAuthenticated)
            {
                context.Result = new RedirectToRouteResult(new RouteValueDictionary
            {
                { "controller", "" },
                { "action", "" }
            });
            }
            base.OnActionExecuting(context);
        }
    }

}
