using Persistence;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;
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
