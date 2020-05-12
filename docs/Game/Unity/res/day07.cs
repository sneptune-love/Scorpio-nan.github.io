using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day07
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,] map = new int[,]{
                  {2,0,4,0},
                  {4,2,0,0},
                  {4,0,2,0},
                  {8,4,0,0}
            };

            Print(map);

            Console.WriteLine("上移");
            map = MoveUp(map);
            Print(map);

            Console.WriteLine("下移");
            map = MoveDown(map);
            Print(map);

            Console.ReadLine();
        }

        /**
        * 2048 游戏核心算法     https://www.bilibili.com/video/BV12s411g7gU?p=74      
        *                      https://www.bilibili.com/video/BV12s411g7gU?p=111
        * 
        * 上移
        *  2 2 0 0  ==>  4 0 0 0
        *  2 2 2 0  ==>  4 0 2 0  ==>  4 2 0 0
        *  2 0 2 0  ==>  2 2 0 0  ==>  4 0 0 0
        *  2 0 2 4  ==>  2 2 4 0  ==>  4 0 4 0 ==>  4 4 0 0 
        * 
        *  -- 从上到下,获取列数据, 形成一维数组
        *  -- 合并数据
        *     -- 去零: 将0元素移动至末尾
        *     -- 相邻相同则合并(将后一个元素累加到前一个元素上, 后一个元素清零) 
        *     -- 去零: 将0元素移动至末尾
        *  -- 将一维数组元素还原至原数组
        *  
        * 
        * 下移
        *  -- 从下到上,获取列数据, 形成一维数组
        * 
        * 
        * 左移
        * 
        * 右移
        * 
        * int[,] map = new int[,]{
        *      {2,0,4,0},
        *      {4,2,0,0},
        *      {4,0,2,0},
        *      {8,4,0,0}
        * }
        * 
        * [需求分析]
        * 1. 定义去零的方法(针对一维数组):将 0 元素移动至末尾
        * 2. 合并数据的方法(针对一维数组):
        *    -- 去零: 将0元素移动至末尾
        *    -- 相邻相同则合并(将后一个元素累加到前一个元素上, 后一个元素清零) 
        *    -- 去零: 将0元素移动至末尾
        * 3. 上移
        *    -- 从上到下获取数据,形成一维数组;
        *    -- 调用合并数据的方法;
        *    -- 将一维数组还原至原列;
        * 4. 
        * */


        // 将非0元素移动至数组的尾部
        // 2 0 2 0 
        // 思路: 创建一个新的数组, 将原数组的非0元素添加到新的数组里面;
        private static int[] RemoveZero(int[] array)
        {
            int[] newArray = new int[array.Length];

            int index = 0;

            for(int i = 0; i < array.Length; i++)
            {
                if(array[i] != 0)
                {
                    newArray[index++] = array[i];
                }
            }
            return newArray;
        }


        //合并数组
        private static int[] Merge(int[] array)
        {
            array = RemoveZero(array);

            for(int i = 0; i < array.Length -1; i++)
            {
                //相邻相同
                if(array[i] !=0 && array[i] == array[i + 1])
                {
                    array[i] += array[i + 1];
                    array[i + 1] = 0;

                    //统计合并位置,用来添加动画

                }
            }
            array = RemoveZero(array);
            return array;
        }


        //上移
        private static int[,] MoveUp(int[,] map)
        {
            // 从上到下获取数据,形成一维数组;
            /**
             *  0,0   0,1   0,2   0,3
             *  1,0   1,1   1,2   1,3
             *  2,0   2,1   2,2   2,3
             *  3,0   3,1   3,2   3,3
             *  
             * */
            int[] mergeArray = new int[map.GetLength(0)];

            for(int c = 0; c < map.GetLength(1); c++)
            {
                for (int r = 0; r < map.GetLength(0); r++)
                {
                    mergeArray[r] = map[r, c];
                }

                mergeArray = Merge(mergeArray);

                for (int r = 0; r < map.GetLength(0); r++)
                {
                    map[r, c] = mergeArray[r];
                }
            }
            return map;
        }

        //下移
        private static int[,] MoveDown(int[,] map)
        {
            int[] mergeArray = new int[map.GetLength(0)];

            for(int c = 0; c < map.GetLength(1); c++)
            {
                for (int r = map.GetLength(0) - 1; r >= 0; r--)
                {
                    mergeArray[map.GetLength(0) - 1 - r] = map[r, c];
                }

                mergeArray = Merge(mergeArray);

                for(int r = map.GetLength(0) - 1; r >= 0; r--)
                {
                    map[r, c] = mergeArray[map.GetLength(0) - 1 - r];
                }
            }
            return map;
        }


        //左移



        //打印表格
        private static void Print(Array array)
        {
            for(int i = 0; i < array.GetLength(0); i++)
            {
                for(int j = 0; j < array.GetLength(1); j++)
                {
                    Console.Write(array.GetValue(i,j) + "\t");
                }
                Console.WriteLine();
            }
        }
    }
}
