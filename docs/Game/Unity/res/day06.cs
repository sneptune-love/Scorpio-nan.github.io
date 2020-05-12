using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day06
{
    class Program
    {
        static Random aaa = new Random();

        static void Main(string[] args)
        {
            Multiplication();

            Console.WriteLine(Program.aaa.Next(1, 50));

            //ArraySortByDesc();

            //Console.WriteLine(HasSameValue(new int[] { 10,1,2,3,4,5,6,9,10}));

            int[,] arr = PrintStudentTable();

            foreach (var item in arr)
            {
                Console.WriteLine(item);
            }

            Console.ReadLine();
        }

        /**
         *  #
         *  ##
         *  ###
         *  ####
         * */
        private static void Multiplication()
        {
            for (int i = 0; i <= 4; i++)
            {
                for(int j = 0; j < i; j++)
                {
                    Console.Write("#");
                }
                Console.WriteLine();
            }
        }

        // 数组排序;
        private static int[] ArraySortByDesc(int[] array)
        {
            int[] arr = array;
            for(int i = 0; i < arr.Length - 1; i++)
            {
                for(int j = i + 1; j < arr.Length; j++)
                {
                    if(arr[i] > arr[j])
                    {
                        int temp = arr[i];

                        arr[i] = arr[j];

                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        
        // 判断数组里面是否有重复的值
        private static bool HasSameValue(int[] array)
        {
            //取出元素
            for(int i = 0; i < array.Length - 1; i++)
            {
                //与后面的进行比较
                for(int j = i + 1; j < array.Length; j++)
                {
                    return array[i] == array[j];
                }

            }
            return false;
        }

        /**
         * 1. 在控制台中录入学生成绩:
         * "请输入学生总数:"
         * "请输入科目数:"
         *          科目1    科目2
         * 学生1: 
         * 学生2:
         * 2. 在控制台中以表格显示二维数组元素:
         * */

        private static int[,] PrintStudentTable()
        {
            Console.WriteLine("请输入学生总数:");
            int col = int.Parse(Console.ReadLine());

            Console.WriteLine("请输入科目数:");
            int row = int.Parse(Console.ReadLine());

            int[,] array = new int[col, row];

            for(int i = 0; i < array.GetLength(0); i++)
            {
                for(int j = 0; j < array.GetLength(1); j++)
                {
                    Console.WriteLine("第{0}个学生的第{1}门成绩:", i + 1, j + 1);
                    array[i, j] = int.Parse(Console.ReadLine());
                }
            }

            return array;
        }

    }
}
