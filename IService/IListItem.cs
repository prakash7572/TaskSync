using Model.TaskMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService
{
    public interface IListItem
    {
        Task<List<StatusMaster>> StatusMaster();
    }
}
