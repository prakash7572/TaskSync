using Microsoft.EntityFrameworkCore;
using Model.Account;
using Model.TaskMaster;

namespace Persistence
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> o) : base(o) { }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<StatusMaster> StatusMasters { get; set; }
    }
}
