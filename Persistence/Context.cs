using Microsoft.EntityFrameworkCore;
using Model.Account;

namespace Persistence
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> o) : base(o) { }
        public DbSet<Profile> Profiles { get; set; }

        //Code CHANGES ON MASTER
    }
}
