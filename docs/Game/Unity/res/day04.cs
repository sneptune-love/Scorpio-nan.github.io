using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day04
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine(GetRecursion(8));


            //int[] array = new int[7];

            //array[0] = 10;
            //array[1] = 15;
            //array[2] = 6;
            //array[5] = 8;

            //for(int i = 0; i < array.Length; i++)
            //{
            //    Console.WriteLine(array[i]);
            //}

            //Console.ReadLine();


            //GetScoreArray();



            //Console.WriteLine(GetMax(arr));
            //Console.WriteLine(new int[] { 10, 5, 6, 30, 600 });


            //int[] arr = RandomBall();

            //foreach (var item in arr)
            //{
            //    Console.WriteLine(item);
            //}

            Console.WriteLine(GetResult());

            Console.ReadLine();

        }

        // 练习
        // 1. 根据分钟数计算总秒数
        // 2. 根据分钟数,小时数,计算总秒数
        // 3. 根据分钟数,小时数,天数,计算总秒数

        // 根据分钟获取秒数
        private static int GetTotalSecond(int minute)
        {
            return minute * 60;
        }

        // 根据分钟,小时获取秒数
        private static int GetTotalSecond(int hour,int minute)
        {
            return GetTotalSecond(hour * 60 + minute);
        }

        // 根据分钟数,小时数,天数,计算总秒数
        private static int GetTotalSecond(int day,int hour, int minute)
        {
            return GetTotalSecond( hour + day * 24, minute);
        }
        
        // 编写一个函数计算当参数为 8 时的结果是多少;
        // 规律: 1 - 2 + 3 - 4 + 5....

        private static int GetRecursion(int num)
        {
            if (num == 1) return num;
            return num % 2 == 0 ? GetRecursion(num - 1) - num : GetRecursion(num - 1) + num;
        }


        private static float[] GetScoreArray()
        {
            Console.WriteLine("请输入学生总数:");
            int count = int.Parse(Console.ReadLine());

            float[] array = new float[count];

            for(int i = 0; i < count;)
            {
                Console.WriteLine("请输入第{0}个学生的成绩:",i + 1);
                float score = float.Parse( Console.ReadLine());

                if(score >= 0 && score <= 100)
                {
                    array[i++] = score;
                }
                else
                {
                    Console.WriteLine("成绩输入有误~");
                }
            }
            return array;
        }


        // 查找数组元素最大值的方法
        private static int GetMax(int[] array)
        {
            int max = array[0];
            for(int i = 1; i < array.Length; i++)
            {
                if(array[i] > max)
                {
                    max = array[i];
                }
            }
            return max;
        }

        // 根据输入的年月日计算当天是一年的第多少天;
        // “1、3、5、7、8、10、12月每月31天 2月闰年29天,不是闰年就是28天. 其他的月份就是三十天每月. 闰年366,不是闰年365 . 区别就是二月的天数
        private static int GetDayByYMD(int year,int month,int day)
        {
            int[] days = new int[12] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
            if (IsLeapYear(year)) days[1] = 29;
            if (month == 1) return day;

            int sum = 0;
            for(int i = 1; i < month; i++)
            {
                sum += days[i - 1];
            }
            return sum + day;
        }

        // 判断是否是闰年
        private static bool IsLeapYear(int year)
        {
            return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        }

        /**
         * 彩票生成器
         * 红球: 1 - 33
         * 篮球: 1 - 16
         * 
         * 每期从红球里面抽出 6 个, 篮球里面抽出 1 个
         * (1).在控制台中购买彩票的方法;
         *     请输入第一个红球号码;
         *     校验号码已存在和不存在;
         * (2).随机产生一组彩票;
         *     random.next(1,34);
         *     红球号码不能重复, 并且按照从小到大排序;
         * (3).返回两组彩票的比较结果;
         *     
         * */


        

        // 产生随机数
        static Random random = new Random();

        //接收控制台输入的彩票号码
        private static int[] GetInputNumber()
        {
            int[] arr = new int[7];
            for(int i = 0; i < 7;)
            {
                Console.WriteLine("请输入第{0}个号码",i + 1);
                int num = int.Parse(Console.ReadLine());
                if(Array.IndexOf(arr,num) >= 0)
                {
                    Console.WriteLine("球号已存在,请重新输入~");
                }
                else if (num <= 0 || num > 33)
                {
                    Console.WriteLine("球号输入有误,请重新输入~");
                }
                else
                {
                    arr[i] = num;
                    i++;
                }
            }
            Array.Sort(arr);
            return arr;
        }

        // 产生一个随机不重复的 7 位数组;
        private static int[] RandomBall()
        {
            int[] arr = new int[7];
            for(int i = 0; i < 7;)
            {
                int temp = random.Next(1, 34);
                if(Array.IndexOf(arr,temp) < 0)
                {
                    arr[i++] = temp;
                }
                else
                {
                    arr[i] = temp;
                }
                
            }
            Array.Sort(arr);
            return arr;
        }

        //返回两组彩票的中奖结果
        private static string GetResult()
        {
            int[] machine = RandomBall();
            int[] userInput = GetInputNumber();

            int leval = 0;
            
            for(int i = 0; i < machine.Length; i++)
            {
                if(machine[i] == userInput[i])
                {
                    leval += 1;
                }
            }
            foreach (var item in machine)
            {
                Console.WriteLine(item);
            }
            return leval == 0 ? "很遗憾您没有中奖~" : "恭喜您中了" + (8 - leval) + "等奖~"; 
        }

    }
}
