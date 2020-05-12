using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace day11
{
    class UserList
    {
        private User[] data = null;
        private int Count = 0;
        private int capacity = 0;

        public int Lenght {
            get
            {
                return this.Count;
            }
        }

        public UserList():this(8) { }
        public UserList(int capacity)
        {
            this.data = new User[capacity];
            this.capacity = capacity;
        }

        public void Add(User user)
        {
            CheckCapacity();
            this.data[this.Count++] = user;
        }

        
        // 获取指定索引的数据
        public User GetEleByIndex(int index)
        {
            return this.data[index];
        }

        // 复制数组
        private void CheckCapacity()
        {
            if(this.Count >= this.data.Length)
            {
                User[] newData = new User[this.data.Length * 2];

                this.data.CopyTo(newData, 0);
                this.data = newData;
            }
        }
    }
}
