using Microsoft.EntityFrameworkCore;
using Model.Model.Account;
using Model.Model.TaskMaster;

namespace Persistence
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> o) : base(o) { }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<StatusMaster> StatusMasters { get; set; }
    }
}
