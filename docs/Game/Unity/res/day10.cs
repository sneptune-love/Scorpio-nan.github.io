using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day10
{
    class Program
    {
        static void Main(string[] args)
        {
            Person p1 = new Person();

            p1.SetName("张三");
            Console.WriteLine( p1.GetName());


            Wife w01 = new Wife();
            w01.Name = "01";
            w01.Age = 20;


            Wife w02 = new Wife();

            Wife[] wifeArray = new Wife[5];

            wifeArray[0] = w01;
            wifeArray[1] = w02;
            wifeArray[2] = new Wife("03", 18);
            wifeArray[3] = new Wife("04", 26);
            wifeArray[4] = new Wife("05", 28);

            /*
             * 查找数组里面年龄最小的对象
             */
            Wife min = GetMinAge(wifeArray);

        }

        private static Wife GetMinAge(Wife[] wifes)
        {
            Wife minWife = wifes[0];
            for(int i = 1; i < wifes.Length; i++)
            {
                if(minWife.Age > wifes[i].Age)
                {
                    minWife = wifes[i];
                }
            }
            return minWife;
        }




    }
}
