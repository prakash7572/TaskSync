using Persistence;
using IService;
using Model.TaskMaster;
using Microsoft.EntityFrameworkCore;
namespace Service
{
    public class ListItem : IListItem
    {
        private readonly Context _context;
        public ListItem(Context context) => _context = context;

        public async Task<List<StatusMaster>> StatusMaster()
        {
            var statusMasters = await _context.StatusMasters.ToListAsync();
            return statusMasters;
        }

    }

}
