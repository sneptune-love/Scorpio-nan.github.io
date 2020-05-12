using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day03
{
    class Program
    {
        static void Main(string[] args)
        {
            // 循环语句
            // 练习
            // 一个球从一百米落下, 每次落地之后, 弹回原来高度的一半
            // 计算, 总共弹起多少次最终落地, （最小弹起高度为 0.01米）
            //   总共经过多少米

            /*
            float height = 100;
            int count = 0;
            float miter = height;
            // 下次弹出的高度如果低于 0.01f 就跳出循环
            while (height / 2 >= 0.01f)
            {
                height /= 2;
                count++;
                miter += height * 2;
                Console.WriteLine("第{0}次弹起的高度为：{1}", count, height);
            }

            Console.WriteLine("总共弹了{0}次", count);
            Console.WriteLine("总共经过了{0}米", miter);
            */


            /*
            // 猜数字
            // 程序产生一个 1-100 之内的随机数;
            // 让玩家重复猜测, 直到猜对位置;
            // "大了", "小了", "恭喜, 猜对了, 总共猜了 ? 次";

            // 产生一个随机数工具
            Random random = new Random();
            //产生一个随机数 1-100 之间;
            int number = random.Next(1, 101);

            int count = 0;
            int inpNumber;
            do
            {
                count++;
                Console.WriteLine("请输入一个数字:");
                inpNumber = int.Parse(Console.ReadLine());

                if(inpNumber > number)
                {
                    Console.WriteLine("大了~");
                }else if (inpNumber < number)
                {
                    Console.WriteLine("小了~");
                }else{
                    Console.WriteLine("猜对了~,您总共猜了{0}次", count);
                }
            
            } while (number != inpNumber);
            
            */

            Console.WriteLine("请输入年份:");
            int year = int.Parse( Console.ReadLine());
            PrintYearCalendar(year);

            Console.ReadLine();
        }

        // 练习: 在控制台中输出和 windows 系统显示一样的日历;
        // 要求: 用户在控制台中输入年份;
        /* 思路: 调用12遍显示月历的方法;
         *       根据年月日计算星期数;
         *       计算指定月份的天数;
         *       判断是否是闰年, 如果是闰年 2 月份有29号, 平年2月份只有28号
         * */




        // 根据当前天数获取当前星期几
        private static int GetWeekByDay(int year, int month, int day)
        {
            DateTime dt = new DateTime(year,month,day);

            return (int)dt.DayOfWeek;
        }

        // 判断是否是闰年
        private static bool IsLeapYear(int year)
        {
            return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        }

        // 计算一个月有多少天
        private static int GetDaysByMonth(int year,int month)
        {
            if (month < 1 || month > 12) return 0;

            switch (month)
            {
                case 2:
                    return IsLeapYear(year) ? 29 : 28;
                case 4:
                case 6:
                case 9:
                case 11:
                    return 30;
                default:
                    return 31;
            }
        }

        // 显示月历
        private static void PrintMonthCalendar(int year,int month)
        {
            // 1. 显示表头
            Console.WriteLine("{0}年{1}月", year, month);
            Console.WriteLine("日\t一\t二\t三\t四\t五\t六");

            // 2. 根据1日星期数显示空白
            int week = GetWeekByDay(year, month, 1);
            for(int i = 0; i < week; i++)
            {
                Console.Write("\t");
            }

            // 3. 根据当月总天数显示日
            int days = GetDaysByMonth(year, month);
            for(int i = 1; i <= days; i++)
            {
                Console.Write(i + "\t");
                // 4. 每到周六换行
               if( GetWeekByDay(year, month, i) == 6)
                {
                    Console.WriteLine();
                }
            }

            
        }

        // 打印年历
        private static void PrintYearCalendar(int year)
        {
            for(int i = 1; i <= 12; i++)
            {
                PrintMonthCalendar(year, i);
                Console.WriteLine();
            }
        }
    }
}
