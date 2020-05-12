using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day05
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] Myticket = ByTicket();
           
            int level;

            int count = 0;

            do
            {
                count++;

                int[] randomTicket = CreateRandomTicket();

                level = TicketEquals(Myticket, randomTicket);
               
                if(level != 0)
                {
                    Console.WriteLine("恭喜您中了{0}等奖,一共花费了{1} 元", level, count * 2);
                }

            } while (level != 1);
            

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

        static Random random = new Random();


        // 获取用户输入的球号
        private static int[] ByTicket()
        {
            int[] tiket = new int[7];
            // 前6个红球
            for(int i = 0; i < 6;)
            {
                Console.WriteLine("请输入第{0}个红球号码:",i + 1);
                int redBall = int.Parse(Console.ReadLine());
                if(redBall < 1 || redBall > 33)
                {
                    Console.WriteLine("购买的号码超过范围~");
                }
                else if (Array.IndexOf(tiket,redBall) >= 0)
                {
                    Console.WriteLine("号码已存在,请重新输入~");
                }
                else
                {
                    tiket[i++] = redBall;
                }
            }

            // 第7个篮球
            while(true)
            {
                Console.WriteLine("请输入第七个篮球号码:");
                int blueBall = int.Parse(Console.ReadLine());
                if (blueBall >= 1 && blueBall <= 16)
                {
                    tiket[6] = blueBall;
                    break;
                }
                else
                {
                    Console.WriteLine("购买的球号超出范围~");
                }
            }

            return tiket;
        }


        // 机选一组 7 位随机号码的球号
        private static int[] CreateRandomTicket()
        {
            int[] ticket = new int[7];
            // 前6个红色球
            for(int i = 0; i < 6;)
            {
                int num = random.Next(1, 34);
                if(Array.IndexOf(ticket,num) < 0)
                {
                    ticket[i++] = num;
                }
            }
            ticket[6] = random.Next(1, 17);

            // 前面6个球进行排序;
            Array.Sort(ticket, 0, 6);
            return ticket;
        }

        // 两组彩票比较的功能
        private static int TicketEquals(int[] myTicket, int[] randomTicket)
        {
            // 计算红球, 蓝球中奖数量
            int blueCount = myTicket[6] == randomTicket[6] ? 1 : 0;

            int count = 0;

            // 判断用户输入的球号在机选数组里面存不存在;
            for(int i = 0;i < 6; i++)
            {
                if(Array.IndexOf(randomTicket,myTicket[i],0,6) >= 0)
                {
                    count++;
                }
            }

            int level;
            if(blueCount + count == 7)
            {
                level = 1;
            }
            else if(count == 6)
            {
                level = 2;
            }
            else if(blueCount + count == 6)
            {
                level = 3;
            }
            else if (blueCount + count == 5)
            {
                level = 4;
            }
            else if (blueCount + count == 4)
            {
                level = 5;
            }
            else if (blueCount == 1)
            {
                level = 6;
            }
            else
            {
                level = 0;
            }

            return level;
        }

    }
}
