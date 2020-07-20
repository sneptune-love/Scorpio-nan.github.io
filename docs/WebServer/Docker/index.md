### 初识 Docker
+ 1. Docker 是什么: 
    - Build, Ship and Run Any App, Anywhere — 一次封装, 到处执行;
    - 基于Linux的高效、敏捷、轻量级的容器 (轻量虚拟) 方案;
    - 虚拟技术:
        - 完全虚拟化 VMware Workstation , VirtualBox;
        - 硬件辅助虚拟化 InterVT AMD-V
        - 超虚拟化 Xen
        - 操作系统级 Docker LXC 容器
        

+ 2. 特点
    - 高效的利用系统资源
    - 快速的启动时间
    - 一致的运行环境
    - 持续交付和部署
    - 更轻松的迁移

+ 3. 对比传统虚拟机总结

    <table>
        <thead>
            <tr>
                <th>特性</th>
                <th>容器</th>
                <th>虚拟机</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>启动</td>
                <td>秒级</td>
                <td>分钟级</td>
            </tr>
            <tr>
                <td>硬盘使用</td>
                <td>一般为  MB</td>
                <td>一般为  GB</td>
            </tr>
            <tr>
                <td>性能</td>
                <td>接近原生</td>
                <td>弱于</td>
            </tr>
            <tr>
                <td>系统支持量</td>
                <td>单机支持上千个容器</td>
                <td>一般几十个</td>
            </tr>
        </tbody>
    </table>

### Docker 安装




