using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day09
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,] map = new int[4, 4]
            {
                {2,4,2,0 },
                {2,4,2,0 },
                {2,4,2,0 },
                {2,4,2,0 }
            };

            Move(map, MoveDerection.Up);
        }

        private static void Move(int[,] map , MoveDerection derection)
        {
            switch (derection)
            {
                case MoveDerection.Up:
                    break;
                case MoveDerection.Down:
                    break;
                case MoveDerection.Left:
                    break;
                case MoveDerection.Right:
                    break;
                default:
                    break;
            }
        }

        private static void PrintPerson(PersonStyle style)
        {
            switch (style)
            {
                case PersonStyle.tall:
                    Console.WriteLine("大高个子~");
                    break;
                case PersonStyle.rich:
                    Console.WriteLine("土豪~");
                    break;
                case PersonStyle.handsome:
                    Console.WriteLine("大帅比~");
                    break;
                case PersonStyle.white:
                    Console.WriteLine("洁白~");
                    break;
                case PersonStyle.beauty:
                    Console.WriteLine("美丽动人~");
                    break;
                default:
                    break;
            }
        }

    }
}
