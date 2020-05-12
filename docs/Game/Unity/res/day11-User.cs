using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day11
{
    class User
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public User() { }
        public User(string username,string password)
        {
            this.UserName = username;
            this.Password = password;
        }
    }
}
