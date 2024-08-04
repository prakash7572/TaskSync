using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Account
{
    [Table("Profile")]
    public class Profile
    {
        [Key]
        public int ID { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }

    }
}
