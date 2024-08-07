using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.TaskMaster
{
    [Table("StatusMaster")]
    public class StatusMaster
    {
        public int ID { get; set; }
        public string? Status { get; set; }
        public string? Code { get; set; }
    }
}
