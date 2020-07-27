### 概述
> 一直想写一下 git 的笔记, 只是都没有时间去做, 只能空闲的时候慢慢的补齐了; 

此篇只对工作中常用的 `git ` 操作进行归纳, 想要获取更多 `git ` 的操作方式详见 [git book](https://git-scm.com/book/zh/v2); 以及 [廖雪峰 git 教程](https://www.liaoxuefeng.com/wiki/896043488029600)

毫无疑问, `git ` 是目前最优秀的分布式版本控制工具, 没有之一; 作为一个码农, `git ` 已经是一项必备的技能了, 许多优秀的社区都是基于 `git ` 去做的版本控制; 比如全球最大的程序猿同性交友网站 `github `;

git 有很多种使用方式, 我们可以使用 `git bash` 这种命令行模式, 也可以使用 `TortoiseGit` 或者是 `SourceTree` 这样的 GUI 工具, 这些 GUI 工具也能提供多种功能; 而个人还是比较倾向于命令行的方式, 第一个是逼格比较高, 第二个是大多数的 GUI 软件都只实现了 git 所有功能的一个子集以降低操作难度; 命令行的模式下才能执行所有的 git 命令, 虽然大多数是开发中用不到的;

### 安装和配置
git 的安装也是比较简单的, [git 下载官网](https://git-scm.com/download/win) 找到和操作系统相对应的版本, 一路 next 就可以了;

安装完之后, 快捷菜单里面会出现 `Git GUI Here` 和 `Git Bash Here`; 我们可以打开 `Git Bash`, 在命令行界面里面输入:
`````bash
$ git --version

  git version 2.18.0.windows.1
`````
能出现 `git ` 的版本号, 就表示我们的 git 已经安装成功; 我们后面所有的操作都是基于 `Git Bash` 来进行的;

安装完成之后, 我们可以使用 `git `来获取 git 的升级:
`````bash
$ git clone git://git.kernel.org/pub/scm/git/git.git
`````
#### 初始化配置
`git` 自带一个 `git config` 的工具来帮助设置 `git` 的外观和行为的配置变量;
当安装完 `git` 之后, 应做的第一件事就是设置用户名和邮件地址;
`````bash
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
`````
因为 `git` 是分布式管理系统, `git`的每一次提交都会记录上用户名和邮箱, 并且不可修改; 需要注意的是 `--global` 选项只要运行一次, 之后无论在改系统上做任何事情, 都会使用 global 的配置; 当然也可以对某个仓库指定不同的用户名和Email地址.
#### 文本编辑器
`git`会使用操作系统默认的编辑器, 通常是 `vim`, 如果想使用其他的编辑器, 可以这样设置:
`````bash
$ git config --global core.editor emacs
`````
#### 检查配置项
如果想要检查配置项, 可以使用 `git config --list` 命令来列出所有 `git `能找到的配置;
`````bash
$ git config --list

  core.symlinks=false
  core.autocrlf=true
  core.fscache=true
  color.diff=auto
  color.status=auto
  ...
`````
也可以使用 `git config <key>` 来检查某一项的配置:
`````bash
$ git config user.name
`````
### Git 版本库
版本库又名仓库, 英文名 `repository`, 可以理解为版本库就是一个目录, 这个目录里面的所有文件都能被 git 管理, 每一个文件的增, 删, 改都会被 git 跟踪, 以便任何时候都可以找到文件记录;

创建版本库有两种方法, 第一种是通过 `git init` 把当前文件夹变成一个 git 可以管理的仓库; 第二个是直接 clone 一个已有的仓库;

#### 创建版本库
进入到一个空的目录下, 通过鼠标右键的菜单打开 `bash ` 并输入:
`````bash
$ git init
`````
执行完 init 之后, 文件夹里面会多一个 `.git `的隐藏文件夹, 如果没看到这个文件夹, 可以设置文件夹属性; 这个目录是 git 用来记录文件版本用的, 一般都不会去修改;

这个时候, 我们只是做了一个初始化的动作, 目录里面的文件还没有被追踪, 可以使用 `git add <file>` 命令来实现对文件的追踪, 然后执行 `commit` 提交;
`````bash
$ git add reademe.txt 
$ git commit -m "首次提交的内容"      
`````
`git add` 命令就是将文件添加到仓库, 可以一次添加多个文件只需要在参数后面添加文件名然后按 `tab`键; 也可以一次添加全部文件, 使用 `git add * ` 或者是 `git add --all`命令;

#### 克隆仓库
如果想要获得已存在的 git 仓库的拷贝, 为某个开源项目贡献自己的一份力量, 这个时候就要用到 `git clone <url>` 命令:
`````bash
$ git clone https://gitlab.com/Scorpio-nan/myproject
````` 
这将把远程的仓库克隆到本地, 并创建一个 `myproject` 的 git 仓库;

`git` 支持多种数据传输协议, 上面的例子就是用的 `https://` 协议, 不过也可以使用 `git://` 协议或者是 `SSH` 传输协议;

#### 查看文件状态
`git ` 目录下面的文件都只有两种状态: 已跟踪或者未跟踪. 已跟踪的文件都是指那些已经被纳入版本控制的文件, 在日志中都有它们的记录, 在工作一段时间后, 它们的状态可能处于未修改, 已修改或已放入暂存区.

要查看哪些文件处于什么状态, 可以用 `git status` 命令; 现在, 我们在目录下面新建一个 `README.txt`文件, 如果之前并不存在这个文件, 使用 `git status`就会看到一个未追踪的文件;
`````bash
$ git status

  On branch master
  No commits yet
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          README.txt
  nothing added to commit but untracked files present (use "git add" to track)
`````
在上面的文件状态中, 我们可以看到新建的 `README`文件出现在 `Untracked files `下面;表示该文件还没有被纳入 `git` 的版本控制;

#### 添加文件
使用 `git add <key>` 命令开始追踪一个文件;
`````bash
$ git add README.txt
````` 
现在, 我们再一次查看文件状态, 可以看到文件 `README.txt` 已经被追踪, 并处于暂存状态;
`````bash
$ git status

  On branch master
  No commits yet
  Changes to be committed:
    (use "git rm --cached <file>..." to unstage)
          new file:   README.txt
`````
只要在 `Changes to be committed `  这行下面的, 就说明是已暂存状态.

#### 暂存修改文件
现在, 我们来修改一个已经被追踪的文件; 在 `README.txt` 里面添加一些内容, 并查看文件状态;
`````bash
$ git status

  On branch master
  No commits yet
  Changes to be committed:
    (use "git rm --cached <file>..." to unstage)
          new file:   README.txt
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
          modified:   README.txt
`````
`Changes not staged for commit `说明文件内容已经发生了变化, 但是还没有添加到暂存区, 要更新到暂存区, 需要再一次执行 `git add `命令;

`git status`命令的输出十分详细, 但是详细信息有些繁琐, 我们还可以使用 `git status -s` 或者是 `git status --short`命令来查看状态;
`````bash
$ git stauts -s

  AM README.txt
`````
- `??` 表示新添加, 还没追踪的文件;
- `A`  表示新添加到暂存区中的文件;
- `M`  表示修改过的文件;
M 有两个可以出现的位置, 左边表示文件被修改了并放入了暂存区; 右边表示文件被修改了, 但是还没添加到暂存区;

#### 忽略文件
有些时候, 我们必须把文件放到 `git` 的目录中, 但又不能提交它们; 在这种情况下, 我们可以创建一个 `.gitignore` 的文件, 列出需要忽略的文件列表, 每次操作的时候 `git` 就会忽略这些文件;

完整的 `.gitignore` 配置详见 [gitignore](https://github.com/github/gitignore);

我们在开发 `vue` 项目的时候, 如果是用的 `git` 来管理版本, 我们可以在 `.gitignore` 里面添加如下内容;
`````txt
dist
node_modules
`````
当我们每次执行添加和提交操作的时候, `git` 就会自动忽略项目的开发依赖;

#### 查看修改
`git status` 命令可以查看文件状态, 但是不能完整的查看文件修改了哪些内容, 这个时候, 我们就可以使用 `git diff` 命令来查看文件具体发生了哪些改变;
`````bash
$ git diff

  diff --git a/README.txt b/README.txt
  index 4632e06..5737925 100644
  --- a/README.txt
  +++ b/README.txt
  @@ -1 +1 @@
  -123456
  \ No newline at end of file
  +随便写点什么;
  \ No newline at end of file
`````
此命令比较的是工作目录中当前文件和暂存区域快照之间的差异, 也就是修改之后还没有暂存起来的变化内容

#### 提交更新
每次提交更新之前, 最好都先使用一下 `git status` 查看一下文件状态, 一定要确认还有什么修改的或新建的文件没有 `git add` 过, 否则提交的时候不会记录这些文件的变化;
`````bash
$ git commit -m "首次提交 2019年9月6日11:25:11"

  [master (root-commit) 424efbe] 首次提交 2019年9月6日11:25:11
   2 files changed, 4 insertions(+)
   create mode 100644 .gitignore
   create mode 100644 README.txt
`````
`git commit `命令, `-m` 后面的输入是本次提交的日志, 类似于 `svn` 提交信息, 可以输入任何内容, 但最好是有意义的, 这样我们就能从历史记录里面方便的查找到修改的记录;

#### 删除文件
要从 `git` 中移除某个文件, 就必须要从暂存区移除, 然后提交; 可以使用 `git rm <file> [param]` 命令完成操作; 

如果只是简单的从目录里面手动删除文件, 运行 `git status` 时就会在 `Changes not staged for commit` 看到:
`````bash
$ git status

  On branch master
  Changes not staged for commit:
    (use "git add/rm <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
          deleted:    test.txt
  no changes added to commit (use "git add" and/or "git commit -a")
`````
然后运行 `git rm` 记录此次移除的操作
`````bash
$ git rm test.txt

  rm 'test.txt'

$ git status
  On branch master
  Changes to be committed:
    (use "git reset HEAD <file>..." to unstage)
          deleted:    test.txt
`````
下次提交的时候就不会纳入版本管理了;

`rm ` 后面的参数可以是单个的文件, 也可是整个文件夹, 但是要注意的是如果是删除文件夹, 就需要在后面添加 `-r` 参数:
`````bash
$ git rm dir -r
`````

#### 查看历史记录
在提交了多次更新后, 我们可以通过 `git log <key>` 命令来查看当前项目的提交日志;
`````bash
$ git log
  commit d9fcc0f21f254c59f13d302f77f608d573c51e09 (HEAD -> master)
  Author: Hope <2639319517@qq.com>
  Date:   Fri Sep 6 13:38:53 2019 +0800
      45546

  commit 379abcbace5c87823c3ab51ff54efcd20deaa487
  Author: Hope <2639319517@qq.com>
  Date:   Fri Sep 6 11:30:30 2019 +0800
      添加修改后的文件 2019年9月6日11:30:29

  commit 424efbec89f2ebc759866b03053bcf074b33b453
  Author: Hope <2639319517@qq.com>
  Date:   Fri Sep 6 11:25:12 2019 +0800
      首次提交 2019年9月6日11:25:11
`````
默认不用任何参数的话, `git log ` 会按提交时间列出所有的更新, 最近的更新排在最上面;

`git log` 有许多选项可以选择, 这里列举一些常用的选项;
- `git log -p -2`               `-p` 用来显示每次提交内容的差异;也可以加上 `-2` 来仅显示最近两次提交；
- `git log --pretty=oneline`    `--pretty` 可以指定使用不同于默认格式的方式展示提交历史; `oneline`将每个提交放在一行显示; 另外还有 `short`, `full` 和 `fuller` 可以用;
- `git log --stat`              `--stat`    查看每次提交的简略的统计信息；
- `git log --shortstat`         `--shortstat` 只显示 --stat 中最后的行数修改添加移除统计
- `git log --name-only`         `--name-only` 仅在提交信息后显示已修改的文件清单
- `git log --name-status`       `--name-status` 显示新增、修改、删除的文件清单
- `git log --graph`             `--graph` 显示 ASCII 图形表示的分支合并历史

#### 撤销操作
在任何阶段, 我们可能都需要撤销某些操作; 现在, 我们在 `README.txt` 里面修改一些内容, 并用 `git status` 命令查看一下：
````bash
$ git status
  On branch master
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
          modified:   README.txt
  no changes added to commit (use "git add" and/or "git commit -a")
````
`git` 会告诉我们文件已经被修改, 本次修改还未添加到暂存区; 并且提示可以使用 `git add <file>...`更新操作 和 `git checkout -- <file>...`丢弃本次修改;

接下来, 对该文件使用撤销操作后, 再一次查看文件状态(也可以手动打开 `README.txt` 文件, 查看文件内容):
`````bash
$ git checkout README.txt
$ git status

  On branch master
  nothing to commit, working tree clean
`````
刚刚修改过的文件就还原到了修改之前的状态; 

`git checkout` 命令还可以添加 `--` 参数, 表示把 `README.txt` 文件在工作区的修改全部撤销, 这里分两种情况:
- 一种是 `README.txt` 自修改后还没有被放到暂存区, 现在, 撤销修改就回到和版本库一模一样的状态;
- 一种是 `README.txt` 经添加到暂存区后, 又作了修改, 现在, 撤销修改就回到添加到暂存区后的状态;

总之, 就是让这个文件回到最近一次 `git commit`或 `git add` 时的状态;

如果被修改的文件已经执行了 `git add` 添加操作, 但还未 `commit` 我们还可以使用 `git reset HEAD <file>` 把暂存区的文件修改撤销掉, 还原到工作区;
`````bash
$ git reset HEAD README.txt

  Unstaged changes after reset:
  M       README.txt
`````
`git reset `命令既可以回退版本, 也可以把暂存区的修改回退到工作区.  当我们用HEAD时, 表示最新的版本;再用 `git status` 看一下, 就可以看到文件回到了 `git add` 之前的状态;

##### 总结:
- 1. 如果想要丢弃工作区的修改, 使用 `git checkout -- file` 命令;
- 2. 修改的内容被添加到了缓存区, 想要丢弃修改, 需要先执行命令 `git reset HEAD <file>` , 就回到了 1. 的操作步骤, 然后再执行 `git checkout -- file` 命令;

#### 版本回退
上面的查看历史的章节里面, 我们可以看到, 执行`git log` 命令的时候, 日志的签名都会有一长串数字和字母组合的字符串, 类似这样的 `f4c0417dd64876552e17ff63dcb76c2baa33feee`;

和 `SVN` 不一样的是, `SVN`每次提交的日志(也可以称之为版本号)都是累加的, 而 `git` 是 `SHA1` 计算出来的一个非常大的数字, 用十六进制表示;

在日常工作中, 如果我们不小心将修改错误的文件提交到了远程仓库上, 我们也可以借助 `git `的版本回退命令将版本退回到之前的某一个版本;

首先, `git` 必须知道当前版本是哪个版本, 在 `git `中, 用 `HEAD`表示当前版本, 上一个版本就是 `HEAD^`, 上上一个版本就是 `HEAD^^`...再往上 N 多个版本, 写 `^` 比较容易数不过来, 可以直接用 `HEAD~n` 来替代, 这里的 n 指的是具体数值;

现在, 我们要把当前版本退回到上一个版本就可以直接使用:
````bash
$ git reset --hard HEAD

 HEAD is now at b560ce1 修改.md里面的文件内容
````
如果我们的日志里面记录的版本非常的多, 而且, 上一次回退版本之前的新版本也找不到了, 这个时候如果 `bash` 还没有被关闭的话, 我们还能幸运的看到之前新版本的版本号; 我们可以使用 `reset` 命令回退到之前的新版本;
````bash
$ git reset --hard f4c041

  HEAD is now at f4c0417 提交修改
````
`--hard` 后面接的是版本号, 不用写全, 只需要输入版本号的前面几位, `git` 就会自动去找到完整的版本号;

然而, 上面的回退操作是在 `bash` 还没有被关闭的时候, 我们还能通过操作记录查找到之前的操作, 但是, 当我们使用 `$ git reset --hard HEAD^` 回退版本的时候, 如果是关闭掉 `bash` 或者是关闭了电脑, 想要再恢复到之前的版本, 就必须找到之前版本的版本号;

所幸, `git `还为我们提供了一个 `git reflog` 命令, 用来记录每一次的命令:
`````bash
$ git reflog
  f4c0417 (HEAD -> master, origin/master) HEAD@{0}: reset: moving to f4c041
  f4c0417 (HEAD -> master, origin/master) HEAD@{1}: reset: moving to HEAD
  f4c0417 (HEAD -> master, origin/master) HEAD@{2}: commit: 提交修改
  b560ce1 HEAD@{3}: commit: 修改.md里面的文件内容
  2872d97 HEAD@{4}: initial pull 
`````
这个时候, 我们又可以使用 `reset `命令来指定回退到哪一个版本了;

### 远程仓库
为了能在任意 `Git ` 项目上协作, 我们得需要知道如何管理自己的远程仓库; `Git `是分布式版本控制系统, 同一个`Git`仓库, 可以分布到不同的机器上; 后面我们可以自己搭建一台运行 `Git` 的服务器;

不过现阶段, 为了学习使用 `git`, 我们可以先使用 `Github` 免费的仓库托管服务来获取我们的远程仓库, 这个章节也是 `git` 关联我们的远程仓库的最佳实践;

`Github` 的使用也是比较简单, 我们只需要在 [`Github`](https://github.com/) 上面注册一个账号, 就可以免费使用了;

#### 添加远程仓库
> 本章节是将前面基本的 `git` 的指令结合起来的实践章节; 我们会从 0 开始创建一个远程仓库;

首先, 在我们的磁盘上找到一个空的目录, 然后执行以下命令:
`````bash
$ mkdir GithubTest
$ cd GithubTest/
$ git init
`````
这个时候, 我们就在本地已经创建了一个 `git`仓库; 然后我们打开 [`Github`](https://github.com/) 并登入;

登入成功之后, 可以看到右上角上面有一个 `+` 图标, 选择 `New repository`, 会出现下面的表单项:

![Alt text](/img/createRepository.png)

创建完成之后, 我们可以看到一个空的仓库就创建好了, 并且还为我们自动创建了 3 个文件, `.gitignore` , `LICENSE` , `README.md`; 

如果不做任何操作的话, 这个仓库货默认将 `README.md` 文件作为主页; `.md` 文件是 `markdown` 的缩写; 

> (强烈推荐使用 `marckdown` 语法来写笔记或者是博客);

![Alt text](/img/repository.png)

做完以上操作之后, 我们可以将生成的 `git` 地址复制出来, 并切换到我们本地的 `bash` 命令行中来, 在命令行中输入一下命令:
````bash
$ git remote add origin https://github.com/Scorpio-nan/GithubTest.git
````
添加完成之后, 远程仓库的名称就是 `origin` , 这个是 `git` 的默认叫法, 也可以改成别的;

由于我们在 `Github` 创建的仓库不是一个空的仓库, 我们需先执行一下 `git pull <name> [param]` 命令, 将远程仓库的内容拉取到本地;
`````bash
$ git pull origin master

  remote: Enumerating objects: 5, done.
  remote: Counting objects: 100% (5/5), done.
  remote: Compressing objects: 100% (4/4), done.
  remote: Total 5 (delta 0), reused 0 (delta 0), pack-reused 0
  Unpacking objects: 100% (5/5), done.
  From https://github.com/Scorpio-nan/GithubTest
   * branch            master     -> FETCH_HEAD
   * [new branch]      master     -> origin/master
`````
`origin` 是我们的仓库名, `master` 代表的是主线(主分支); (后面 `git ` 分支的章节会详细介绍)

执行完成之后, 我们可以看到之前新建的空文件夹下面多了几个文件, 并且都有标记为追踪文件(windows 上面的 git 标记一版是一个绿色的 `√` 号图标);

现在, 我们把 `README.md` 里面的文件内容做一些修改; 
***README.md***
`````txt
#### 使用方法
````bash
$ git clone https://github.com/marmelab/react-admin.git

$ cd react-admin
$ npm install
$ npm start
````
`````
然后一次执行 `git `的文件操作命令:
`````bash
$ git status
  ...

$ git add README.md
$ git commit -m "修改.md里面的文件内容"
  ...

$ git push origin master
  Enumerating objects: 5, done.
  Counting objects: 100% (5/5), done.
  Delta compression using up to 8 threads.
  Compressing objects: 100% (3/3), done.
  Writing objects: 100% (3/3), 439 bytes | 439.00 KiB/s, done.
  Total 3 (delta 1), reused 0 (delta 0)
  remote: Resolving deltas: 100% (1/1), completed with 1 local object.
  To https://github.com/Scorpio-nan/GithubTest.git
     2872d97..b560ce1  master -> master
`````
执行完成之后, 我们就把本次对 `README.md` 作出的修改推送到了远程的 `git` 服务器上; 下面我们切回到 `Gitbub` 页面验证一下我们的提交是否成功;

可以看到, `github` 上面的 `GithubTest` 这个仓库里面的内容已经更新了;

#### 从远程仓库克隆
克隆仓库的操作和创建的操作差不多, 不过, 不用在本地先创建好空的仓库, 只需要把 `Github` 上面创建好的仓库的地址复制下来, 然后在 `bash` 里输入命令 `git clone` 即可;
`````bash
$ git clone https://github.com/Scorpio-nan/GithubTest.git
  
$ cd GithubTest
$ ls
  LICENSE  README.md
`````
如果有多人协助开发, 那么每个人各自从远程克隆一份就可以了;

#### 查看远程仓库
如果想查看已经配置的远程仓库服务器, 可以运行 `git remote` 命令;
`````bash
$ git remote

  origin
`````
`origin` 就是 `git `给克隆仓库的默认名称;

当然, 也可以指定 `-v` 项, 会显示需要读写远程仓库的使用的 `git `保存的简写和对应的 URL;
`````bash
$ git remote -v

  origin  https://github.com/Scorpio-nan/GithubTest.git (fetch)
  origin  https://github.com/Scorpio-nan/GithubTest.git (push)
`````
#### 从远程仓库拉取
从远程仓库拉取数据, 可以执行 `git fetch [remote-name]`:
`````bash
$ git fetch origin
`````
`fetch `命令会将数据拉取到本地的仓库, 但并不会自动合并或修改当前的工作; 这个时候我们可以使用 `git pull` 命令来自动的抓取然后合并远程分支到当前分支;
`````bash
$ git pull
`````
通常, 在多人协作的项目中, 如果操作不当, 执行`git pull` 的过程中就会发生冲突; 并且, 命令行里面会提示错误信息;

`error: Your local changes to the following files would be overwritten by merge`; 

这表明, 本地的文件与远程仓库上的文件不一致, 本地的文件将会被服务器上的文件覆盖, 这个时候我们可以有两个选择:

###### 1. 如果想保留刚才本地修改的代码，并把 git 上面的代码 pull 到本地 ( 本地刚刚才修改的代码会被缓存起来 )
`````bash
$ git stash
$ git pull origin master
$ git stash pop
`````
如此一来, 服务器上的代码更新到了本地, 而且本地刚修改的代码也没有被覆盖, 之后使用 `add commit push `就可以更新本地代码到服务器了;

###### 2. 如果想完全覆盖本地代码，已服务器上面 pull 下来的代码为准，那我们可以直接退回到上一个版本之后再 pull
`````bash
$ git reset --hard
$ git pull origin master
`````

#### Git 别名
`Git `并不会在你输入部分命令时自动推断出你想要的命令.  如果不想每次都输入完整的 `Git `命令, 可以通过 `git config` 文件来轻松地为每一个命令设置一个别名;
`````bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
`````
这意味着, 当要输入 `git commit` 时, 只需要输入 `git ci`

### Git 分支
`git ` 分支是为了将修改记录的流程分开存储, 让分开的分支不受其他分支的影响, 所以在同一个仓库里可以同时进行多个不同版本的修改; 

试想一下, 在工作中如果我们有新的需求, 会直接在代码里面去添加需求的业务代码, 但是如果这个时候已上线的项目里面需要紧急上线一个小版本, 解决程序里面的 bug; 

这个时候就坑爹了, 因为本地的代码里面已经加上了未来新版本的需求, 有可能这个需求是需要同后台 api 一起上线才能正常使用, 如果想要使用新需求之前的代码, 只能将版本回退到添加需求之前, 这也就意味着后面的工作都是无用功; 当然, 也可以把现有的代码备份起来, 等还原之后再同步过去, 不过这样效率会非常低, 而且比较容易出错; 

分支可以帮助我们更好的管理不同版本的代码;

#### 创建与合并分支
`git` 在执行 `git init` 的时候, 其实就是相当于为我们自动创建了一个 `master `分支; 使用 `git branch` 可以看到我们当前所在的分支; `git branch` 会为我们列出所有的分支, 当前分支前面会显示 `*`
`````bash
$ git branch
 
* master
`````
假设 `master` 里面存储的是我们在线上已经正式运营的产品的代码, 下面我们会在 `master` 下面新建一个 `dev` 开发环境的代码;
`````bash
$ git checkout -b dev

  Switched to a new branch 'dev'
`````
上面的 `git checkout -b` 命令, 相当于以下两条命令：
`````bash
$ git branch dev
$ git checkout dev

  Switched to branch 'dev'
`````
我们在 `master` 下面创建了一个 `dev`分支, 并且还自动为我们切换到了 `dev` 分支上, 让我们再一次 `git branch` 查看一下;
`````bash
$ git branch

* dev
  master
`````
然后, 我们可以在 `dev` 分支上正常的提交, 比如在 `README.md` 文件里面添加一些内容, 然后提交;
`````bash
$ git add *
$ git commit -m "这是我们在dev分支上做出的修改;"

  [dev 4fee0ed] 这是我们在dev分支上做出的修改;
   1 file changed, 19 insertions(+)
`````
现在, 我们在 `dev` 分支上的工作已经做完了, 让我们切换到 `master` 分支上;
`````bash
$ git checkout master

  Switched to branch 'master'

$ git branch
  dev
* master
`````
切换到 `master` 分支之后, 在查看一下 `README.txt` 文件, 发现我们刚刚添加上去的内容不见了, 因为刚刚的修改是在 `dev` 分支上进行的, 而 `master` 分支此刻的状态并没有改变;

>这个也就是 `git` 分支的妙用, 对应到开发工作中就是 `dev` 是为我们开发需求使用的, 而 `master` 是当前线上正在运行的版本;

现在, 我们需要将 `dev` 分支上面做出的修改合并到 `master` 分支上;我们可以使用 `git merge` 命令:
`````bash
$ git merge dev

  Updating f4c0417..4fee0ed
  Fast-forward
   README.md | 19 +++++++++++++++++++
   1 file changed, 19 insertions(+)
`````
`git merge <branch>` 命令用于将指定分支合并到当前分支上; 合并之后我们再查看一下 `README.md` 的内容, 就可以看到已经和 `dev` 分支上面的内容是一模一样的了;

注意到上面的 `Fast-forward `信息, `Git `告诉我们, 这次合并是`快进模式`, 也就是直接把 `master` 指向 `dev` 的当前提交, 所以合并速度非常快;

合并完成之后, 就可以删除 `dev` 分支了;
`````bash
$ git branch -d dev

  Deleted branch dev (was 4fee0ed).

$ git branch
* master
`````
#### 合并冲突
合并分支, 往往不是像上述的快速合并这么简单的; 例如: `dev` 分支上, 我们对开发版本做了许多的修改; 但是这个时候 `master` 的版本里面也需要做一些修改; 现在 `master` 和 `dev` 分支上各自都有了新的提交; 

这种情况下`git ` 是无法执行快速合并的, 只能试图将各自修改的版本合并起来, 但是这种合并往往会有冲突;
`````bash
$ git merge dev

  Auto-merging README.md
  CONFLICT (content): Merge conflict in README.md
  Automatic merge failed; fix conflicts and then commit the result.
`````
`git ` 告诉我们 `README.md` 文件存在冲突, 必须手动解决冲突之后再提交; 我们可以在合并冲突后的任意时刻使用 `git status` 命令来查看那些因包含合并冲突而处于未合并 `unmerged` 状态的文件：
`````bash
$ git status

  On branch master
  You have unmerged paths.
    (fix conflicts and run "git commit")
    (use "git merge --abort" to abort the merge)

  Unmerged paths:
    (use "git add <file>..." to mark resolution)
          both modified:   README.md
  no changes added to commit (use "git add" and/or "git commit -a")
`````
任何有冲突而有待解决的文件, 都会以未合并状态标识出来, `git` 会在有冲突的文件中加入冲突标记, 出现冲突的文件会包含一些特殊的区段：
`````txt
<<<<<<< HEAD
随便改一改东西
=======
这是在 dev 分支上做出的修改


>>>>>>> dev
`````
` HEAD ` 所指示的版本(也就是 `master` 分支所在的位置), 在这个区段的上半部分(`=======` 以上的部分) , 而 `dev` 分支所指示的版本是在 `=======` 的下半部分. 为了解决冲突, 我们必须选择由 `=======` 分割的两个部分中的一个; 或者我们可以自行合并这些冲突, 删除掉某半的内容;

或者我们可以使用 `git merge --abort ` 来撤销本次合并; 在手动解决完这些冲突之后, 再对每个文件使用 `git add`命令来将其标记为冲突已解决;

#### 强制push到远程

`````
$ git push -u origin master -f
`````

#### 分支开发流程
在实际开发中, 我们应该按照几个基本的原则进行分支的管理:
- 1. 首先 `master` 分支是非常稳定的, 也就是仅用来发布版本, 不能在上面做开发;
- 2. `dev` 分支是不稳定的, 用来做新版本的迭代, 开发完成之后再合并到 `master` 分支上去;
- 3. 在多人协作的项目开发中, 每个人都在 `dev` 分支上开发, 每个人都有自己的分支, 经常往 `master `分支上合并就行了;

#### 远程分支
远程引用是对远程仓库的引用, 包括分支和标签等; 我们可以通过 `git ls-remote` 来显示的查看远程引用的完整列表; 或者是通过 `git remote show` 来获得远程分支的更多信息;

我司的自动化运维架构就是基于 `git` 分支去管理站点代码的; 协作流程大概为开发人员开发完新版本之后, 将不同的站点的业务代码提交到 `git` 相对应的分支上, 然后服务端根据不同的站点标识去拉取分支上的代码, 并推送到服务器上;

##### Git 快速克隆大项目
随着公司的业务线增多, 产品也越来越多, 单个的 `git` 仓库已经满足不了业务需求, 我们要使用多个仓库去管理项目; 并且, 多个项目不停迭代的同时, 我们还需要使用多个分支去做版本控制; 

而随着业务量的增多, 一些项目变的非常的庞大, 如果我们只是想获取到项目的代码以及之后的更新, 我们就不需要去关注项目的历史提交记录, 那么我们就只用克隆某一个分支的最后一次提交;
- 选择克隆单个分支：`git clone --branch <branch_name> <remote-address>`
- 只克隆最新的提交记录: `git clone <remote-address> --depth 1`
- 组合: `git clone --branch <branch_name> <remote-address> --depth 1`

`-- depth` 代表克隆的深度, `--depth 1`代表只克隆最新一次提交记录以及这次提交之后的最新内容, 不克隆历史提交, 所造成的影响就是不能查看历史提交记录, 但是克隆速度大大提升;
`````bash
$ git clone --branch=dev http://git.nbet-group.com dev --depth=1
`````
`git clone` 命令, `url` 后面如果添加名称的话, 那克隆下来的文件夹名称就是命令行添加的名称, 如果不加则以克隆下来的项目名命名文件夹;

##### Git 强制覆盖本地代码
Git 强制覆盖:
````bash
git fetch --all                     #  拉取所有更新，不同步
git reset --hard origin/master      #  本地代码同步线上最新版本(会覆盖本地所有与远程仓库上同名的文件)
git pull                            #  更新一次（其实也可以不用，第二步命令做过了其实）
````
git强制覆盖本地命令(单条执行):
````bash
git fetch --all && git reset --hard origin/master && git pull
````

##### Git 取消本地所有修改
本地修改了许多文件, 其中有些是新增的, 因为开发需要这些都不要了, 想要丢弃掉, 或者是因为实现某个功能, 但是没有成功, 反而把代码搞得一团糟糕, 这个时候我们可以取消本地所有的更改, 回复到更改之前的状态, 可以使用如下命令:

```bash
git checkout . #本地所有修改的。没有的提交的，都返回到原来的状态
git stash #把所有没有提交的修改暂存到stash里面。可用git stash pop回复。
git reset --hard HASH #返回到某个节点，不保留修改。
git reset --soft HASH #返回到某个节点。保留修改
 
git clean -df #返回到某个节点
git clean 参数
    # -n 显示 将要 删除的 文件 和  目录
    # -f 删除 文件
    # -df 删除 文件 和 目录
```
单条执行:
```bash
git checkout . && git clean -xdf
```
