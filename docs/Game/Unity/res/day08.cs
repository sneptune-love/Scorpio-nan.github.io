using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day08
{
    class Program
    {
        static void Main1(string[] args)
        {
            int area;
            int perimeter;
            CalculateRact(10, 100,out area,out perimeter);
            Console.WriteLine(area);        //1000

            int result;
            bool bo = int.TryParse("250+", out result);

            // int.TryParse()方法, 返回 2 个结果
            // out: 转换后的结果;
            // 返回值: true or false, 表示该数是否可以进行转换;
        }

        private static void CalculateRact(int lenght, int width, out int area, out int perimeter)
        {
            area = lenght * width;
            perimeter = (lenght + width) * 2;
        }


        static void Main(string[] args)
        {
            string s1 = "哈哈";
            string s2 = "哈哈";


            // 判断两个字符串的引用是不是同一个;
            bool r1 = object.ReferenceEquals(s1, s2);       //true


            string s3 = new string(new char[] { '哈', '哈' });
            string s4 = new string(new char[] { '哈', '哈' });

            bool r2 = object.ReferenceEquals(s3, s4);       //false


            // 可变字符串
            StringBuilder str = new StringBuilder(10);
            for(int i = 0; i < 10; i++)
            {
                str.Append(i);
            }

            string result = str.ToString();


            /**
             * [练习]
             * 1. 单词反转   How are you    ==>  you are How;
             * 2. 字符反转   How are you    ==>  uoy era woH;
             * 3. 查找字符串中不重复出现的文字(重复的文字保留一个);
             */

            string res = "How are you";
            


        }
    }
}
