using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day10
{
    class Person
    {
        private string name;

        private string sex;

        private int age;

        public Person() {

        }

        //调用这个构造函数的时候同时调用无参数的构造函数
        public Person(string name):this()
        {

        }

        //调用这个构造函数的时候同时调用上面一个参数的构造函数
        public Person(string name,int age):this(name)
        {

        }

        public void SetName(string name)
        {
            this.name = name;
        }

        public string GetName()
        {
            return this.name;
        }

        public void SetAge(int age)
        {
            this.age = age;
        }

        public int GetAge()
        {
            return this.age;
        }
    }
}
