using System.ComponentModel.DataAnnotations.Schema;

namespace TaskSync.Models
{
    [Table("Profile")]
    public class Profile
    {
        public int ID { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }

    }
}
