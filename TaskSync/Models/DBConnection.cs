using Microsoft.EntityFrameworkCore;

namespace TaskSync.Models
{
    public class DBConnection : DbContext
    {
        public DBConnection(DbContextOptions<DBConnection> o) : base(o) { }

        public DbSet<Models.Profile> Profile { get; set; }
    }
}
