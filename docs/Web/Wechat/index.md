
### 微信公众号

#### 公众号开发准备

- 注册微信订阅号
- 注册小程序测试号
- sunny-ngrok 工具安装及注册账号
- 模拟公网ip, 有三种方式:
 - 申请一台阿里云 ECS
 - 公司网络有一个公网 ip 路由器端口映射
 - ngrok 内网穿透 tunnel

#### Ngrok 环境搭建

[Ngrok 的使用教程](http://www.ngrok.cc/_book/start/ngrok_windows.html)

- 1. 打开 [Ngrok 官网](https://www.ngrok.cc/) 申请一个账号并登陆;
- 2. 点击隧道管理, 打开通道, 选择一个免费版的隧道, 点击立即购买;
- 3. 编辑隧道信息 -- 填入隧道名(随便填写), 前置域名(例如 www.abc.baidu.com 中的 abc, 其实就是在该域名下面开了个前缀, 只要写前缀就行, 选一个别人没用过的), 本地映射的端口则是要和 web 项目的 http 端口对应;

![ngrok](./img/ngrok.png)

- 4. 确定添加并启用, 到隧道管理页面可以看到刚刚添加成功的隧道, 复制隧道 id;

![ngrok](./img/ngrok_2.png)

- 5. 启动 ngrok, 在窗口粘贴管理页面的隧道 id, 按 enter 键;

![ngrok-start](./img/ngrok_sehll.png)

- 6. 启动之后的界面如下, 本地的 80 端口被映射到外网 ip 上, 访问 `127.0.0.1:4040` 可以看到访问日志;

![ngrok-run](./img/ngrok_run.png)




