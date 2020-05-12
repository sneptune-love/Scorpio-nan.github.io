using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day02
{
    class Program
    {
        static void Main(string[] args)
        {
            //string name = "张三";
            //string age = "26";

            //string person = string.Format("他的名字是:{0},他的年龄是:{1}", name, age);

            //Console.WriteLine(person);



            //// 标准字符串格式化
            //Console.WriteLine("金额:{0:c}元", 100);

            //// 不足两位用 0 来填充
            //Console.WriteLine("{0:d2}", 5);         // 输出为 05
            //Console.WriteLine("{0:d2}", 15);        // 输出为 15

            //// 以指定精度显示四舍五入
            //Console.WriteLine("{0:f1}", 1.26);      // 输出为 1.3

            //// 以百分数显示
            //Console.WriteLine("{0:p}", 0.1);        // 输出为 10.00%


            //string strNumber = "18";
            //int a = int.Parse(strNumber);
            //float b = float.Parse(strNumber);

            //Console.WriteLine(a);
            //Console.WriteLine(b);


            //int number1 = 25;
            //float number2 = 18.2f;

            //Console.WriteLine(number1.ToString());
            //Console.WriteLine(number2.ToString());


            //练习: 让用户在控制台中输入 4 位整数, 
            //      计算每一位数相加的总和
            //例如: 1234  -->  1 + 2 + 3 + 4 = 10
            //方案1:从整数中获取每一位
            //方案2:从字符串中获取每一个字符
            #region
            //Console.WriteLine("请输入需要计算的四位数字:");
            //string input = Console.ReadLine();
            //int num = int.Parse(input);
            //int num1 = int.Parse(input[0].ToString());
            //int num2 = int.Parse(input[1].ToString());
            //int num3 = int.Parse(input[2].ToString());
            //int num4 = int.Parse(input[3].ToString());

            //Console.WriteLine(num1 + num2 + num3 + num4);
            #endregion

            //int num1 = num / 1000;
            //int num2 = (num / 100) % 10;
            //int num3 = (num / 10) % 10;
            //int num4 = num % 10;

            //Console.WriteLine(num1 + num2 + num3 + num4);

            //Console.ReadLine();



            // 语句

            // 选择语句;  循环语句;  跳转语句
            Console.WriteLine("请输入性别:");
            string sex = Console.ReadLine();

            if (sex == "男")
            {
                Console.WriteLine("您好, 先生~");
            } else if (sex == "女") {
                Console.WriteLine("您好, 女士~");
            }else{
                Console.WriteLine("性别未知~");
            }

            Console.ReadLine();
        }
    }
}
