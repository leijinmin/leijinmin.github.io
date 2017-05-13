using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StrategyPattern
{
    public struct NameEmail
    {
        private string name, email;

        public NameEmail(string name, string email): this()
        {
            this.name = name;
            this.email = email;
        }
        public string Name
        {
            get { return name; }
        }

        public string Email
        {
            get { return email; }
        }


    }
}
