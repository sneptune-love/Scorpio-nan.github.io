using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day11
{
    class Program
    {
        static void Main(string[] args)
        {
            // 使用数组的两个小问题;
            // 1. 数组初始化必须指定大小;
            // 2. 读写元素必须通过索引;

            User u1 = new User("zhangsan","123456");

            UserList userArray = new UserList(8);
            
            for(int i = 0; i < 8; i++)
            {
                userArray.Add(new User("zhangsan" + i, "123456"));
            }

            userArray.Add(new User("lisi00", "123456"));
            userArray.Add(new User("lisi01", "123456"));
            userArray.Add(new User("lisi02", "123456"));
            userArray.Add(new User("lisi03", "123456"));
            userArray.Add(new User("lisi04", "123456"));
            userArray.Add(new User("lisi05", "123456"));
            userArray.Add(new User("lisi06", "123456"));



            List<User> listUser = new List<User>(3);

            listUser.Add(new User());
            listUser.RemoveAt(0);
            listUser.Insert(3, new User());


            Dictionary<string, User> dic = new Dictionary<string, User>();
            dic.Add("nxy", new User("zhangsan", "abc132"));
            User user = dic["nxy"];


            /*
             * 练习: 创建一个 UserList 替代数组;
             * */
        }
    }
}
