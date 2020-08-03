create table if not exists tb_temp(
		id int(11),
		name varchar(25),
		deptId int(11),
		salary float,
		primary key (id)
) default charset=utf8;

-- 查看表结构
desc tb_temp5;

-- 修改表名
alter table tb_temp rename to tb_salary;

-- 修改表字符集
alter table tb_salary default character set gb2312 default collate gb2312_chinese_ci;

-- 修改表字段名和数据类型
alter table tb_salary change deptId descId char(11);

-- 字段的数据类型转换成另一种数据类型
alter table tb_salary modify descId int(11);

-- 删除表字段
alter table tb_salary drop descId;

-- 删除数据表
drop table if exists tb_salary;


-- 创建关联表
create table if not exists tb_temp4(
		id int(11) primary key,
		name varchar(25),
		location varchar(50)
);

create table if not exists tb_temp5(
		id int(11) primary key,
		name varchar(25),
		deptId int(11),
		salary float,
		constraint fk_emp4_emp5 foreign key (deptId) references tb_temp4(id)
);

show create table tb_temp5;

-- 删除 tb_temp4 表
drop table tb_temp;

-- 解除表约束
alter table tb_temp5 drop foreign key fk_emp4_emp5;


-- 添加字段(末尾)
alter table tb_temp add discont int(15);

-- 在开头添加字段
alter table tb_temp add infomation varchar(30) first;

-- 在表中间添加字段
alter table tb_temp add address varchar(50) after name;

create table tb_temp(
		num int(15),
		num1 int(15),
		num2 int(15),
		num3 int(15),
		num4 int(15),
		num5 int(15),
		num6 int(15),
		num7 int(15),
		num8 int(15)
);

-- 算数运算符
select num, num + 10, num - 5, num * 2, num / 15, num % 3 from tb_temp;

-- 逻辑运算符
select not 10, not (1,-1), not -5, not null, not 1 + 1;


create table if not exists students(
		id int(11) primary key auto_increment,
		name varchar(10),
		age int(10),
		deptId int(10),
		sex varchar(10),
		height int(10)
)

insert into students (id,name,age,deptId,sex,height) values (1,"张三",25,001,"F",150);

-- 表别名查询
select b.name, b.age from students as b;

-- 字段别名查询
select name as student_name, age as student_age from students;

-- limit 限制查询条数
select * from students limit 2,5;

-- 从第二条开始往后面查询三条
select * from students limit 3 offset 2;

-- 以 height 字段排序查询
select * from students order by height;

-- 以 height 字段降序查询, name字段升序查询
select name, height from students order by height desc, name asc;

-- 条件查询 heigth = 150
select name, height from students where height=150;

select name, height from students where age <= 25;

select name, height from students where age = 25 && height = 150;

select name, height from students where age > 20 || height >= 150;

select name, height from students where age > 21 xor height >= 170; 

-- 模糊查询 以张开头的名字
select name from students where name like "张%";

select name from students where name not like "张%";

-- 查询 name 字段里面包含 e 字符的
select name from students where name like "%e%";

-- 占位符查询, 结尾是三, 并且前面之后一个字符
select name from students where name like "_三";

-- 条件查询, age 在 20 - 25 之间
select * from students where age between 20 and 25; 

select * from students where age not between 20 and 25; 

-- 条件查询, login_date 字段不为 null
select * from students where login_date is not null;

-- 分组查询, 以 sex 字段分组
select "name", "sex" from students group by sex;

-- 对表中的 sex 字段进行分组查询, 将每个分组的 name 字段的值都显示出来;   结果为对 sex 字段进行分组, 女为一组, 男为一组, 并把 name 字段都展示出来
select "sex", group_concat(name) from students group by age, sex;

-- 先按照 age 字段进行分组, 当 age 字段值相等时, 再把 age 字段值相等的记录按照 sex 字段进行分组;
select age, sex, group_concat(name) from students group by age, sex;

-- 对表中的 sex 进行分组查询, 并使用 count() 函数计算每一组的记录数;
select sex, count(sex) from students group by sex;

-- 对表中的 sex 字段进行分组查询, 并使用 WITH ROLLUP 显示记录的总和;
select sex, group_concat(name) from students group by sex with rollup;

-- 查找表中身高大于 150 的学生姓名，性别和身高
select name, sex, height from students having height > 150;

-- 表中的数据进行分组，并使用 HAVING 和 WHERE 关键字分别查询出分组后平均身高大于 170 的学生姓名、性别和身高
select group_concat(name), height from students group by height having avg(height) > 150;



-- ------------------------------------------------------------------------------------------------- -----------------------------------
-- 交叉连接

create table if not exists coruse(
		id int(11) primary key auto_increment,
		coruseName varchar(25)
);

insert into coruse (coruseName) values ("Java");
insert into coruse (coruseName) values ("JavaScript");
insert into coruse (coruseName) values ("C++");
insert into coruse (coruseName) values ("Csharp");
insert into coruse (coruseName) values ("Lua");
insert into coruse (coruseName) values ("Python");
insert into coruse (coruseName) values ("Go");
insert into coruse (coruseName) values ("Mysql");
insert into coruse (coruseName) values ("Typescript");

create table if not exists students(
		id int(11) primary key auto_increment,
		name varchar(10),
		age int(10),
		deptId varchar(10),
		sex varchar(10),
		height int(10)
);

select * from coruse cross join students;

-- -- 查询 course 表中的 id 字段和 students 表中的 id 字段相等的内容;
select * from coruse as a cross join students as b where a.id = b.id;

-- 使用内连接查询学生姓名和相对应的课程名称
select s.name, c.coruseName from students as s inner join coruse as c on s.id = c.id;

-- 表中查询所有学生姓名和相对应的课程名称，包括没有课程的学生
select s.name, c.coruseName from students as s left outer join coruse as c on s.coruseId = c.id;

-- 在 students 表和 course 表中查询学习 Java 课程的学生姓名
select name from students where coruseId in (select id from coruse where coruseName="Java");

-- 在 SELECT 语句中使用 NOT IN 关键字，查询没有学习 Java 课程的学生姓名
select name from students where coruseId not in (select id from coruse where coruseName="Java");

-- 在 course 表和 students 表中查询出所有学习 Python 课程的学生姓名;
select name from students where coruseId = (select id from coruse where coruseName="Python");

-- 在 course 表和 students 表中查询出没有学习 Python 课程的学生姓名
select name from students where coruseId <> (select id from coruse where coruseName="Python");

-- course 表中存在 id=1 的记录，因此 EXISTS 表达式返回 TRUE，外层查询语句接收 TRUE 之后对表 tb_students_info 进行查询，返回所有的记录
select * from students where exists (select coruseName from coruse where id = 1);
select * from students where not exists (select coruseName from coruse where id = 1);

-- course 表中是否存在 id=1 的课程, 如果存在, 就查询出 students 表中 age 字段大于 24 的记录;
select * from students where age > 24 and exists (select coruseName from coruse where id = 1);

-- 查询 name 字段以 J 开头的记录;
select * from students where name regexp "^J";

-- 查询 name 字段以 y 结尾的记录;
select * from students where name regexp "y$";

-- 查询 name 字段值包含 n 和 y , 且两个字母之间只有一个字母的记录
select * from students where name regexp "n.y";

-- -- 查询 name 字段值包含字母 T, 且 T 后面出现字母 m 的记录;
select * from students where name regexp "^Tm*";

-- 查询 name 字段值包含字母T, 且 T 后面至少出现 m 一次的记录;
select * from students where name regexp "^Tm+";

-- 查询 name 字段值包含 an 的记录;
select * from students where name regexp "an";

-- 匹配 name 字段里面包含 an | om 的数据
select * from students where name regexp "an|om";

-- 查询 name 字段里面包含 i | o 字符的数据;
select *  from students where name regexp "[io]";

-- 查询 name 字段值包含字母 a~t 以外的字符的记录;
select *  from students where name regexp "[^a-t]";

-- 查询 name 字段值出现字母 e 至少 2 次的记录;
select * from students where name regexp "e{2,}";

-- 查询 name 字段值出现字符串 i 最少 1 次, 最多 3 次的记录;
select * from students where name regexp "i{1,3}";


create table if not exists courses(
		id int primary key auto_increment,
		name char(40) not null,
		grade float not null,
		info char(100) not null
);

insert into courses (id, name, grade, info) values (1, "Network",3.0,"Computer Network");

insert into courses values (2,"Database", 3 , "Mysql");

insert into courses (name, grade, info) values ("System",3, "Operation System");


create table if not exists coursesNew(
		id int primary key auto_increment,
		name char(40) not null,
		grade float not null,
		info char(100) not null
);

insert into courses (id,name,grade,info) select id, name, grade, info from coursesNew;


-- 更新所有行的 grade 字段的值为 4;
update courses set grade = 4;

-- 更新 id 为 2 的行, 将 grade 字段的值修改为 5, 将 name 字段的值修改为 DB;
update courses set grade = 5, name = "DB" where id = 2;

delete from courses where id = 3;

delete from courses;

truncate table courses;
