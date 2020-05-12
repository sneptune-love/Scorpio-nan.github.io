using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day10
{
    class Wife
    {
        private string name;
        private int age;

        public Wife() { }

        public Wife(string name, int age)
        {
            this.name = name;
            this.age = age;
        }

        public string Name {
            set
            {
                this.name = value;
            }
            get
            {
                return this.name;
            }
        }

        public int Age
        {
            set
            {
                this.age = value;
            }
            get
            {
                return this.age;
            }
        }
    }
}
