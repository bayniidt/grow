### Java

## 10-22

1. 编写java需要安装jdk，jdk会将.java文件编译成.class字节码文件计器才可以运行。

2. class类是java中最小的单位，每一个java项目至少拥有一个类

3. java入口函数main编写 格式是固定的

	```java
	// main入口方法快捷键： psvm
	public class demo1 {
		public static void main(String[] args){
			// 输出语句快捷键： sout 
			Ststem.out.println("DEMO1");
		}
	}
	```

4. java程序开发与运行的原理：
	
	- 1 通过javac.exe(jdk中的编译程序) 将.java源文件编译成.class字节码文件

	- 2 通过java.ext(jdk中的编译程序) 执行.class代码，在控制台打印结果

- 常量

	在程序执行的过程中，其值不可改变的量

	```java
	字符串常量 "HelloWorld"  // 双引号
	整数常量 12 
	小数常量 12.34
	字符常量 'a', '1' // 单引号
	布尔常量 true false
	空常量 null
	```

- 变量

	在程序执行过程中，其值可以在某个范围内发生改变的量. **变量未赋值，不能使用**

	变量的本质： 内存中的一小块区域

	变量的定义格式： 数据类型 变量名 = 初始化值;
	
	```java

	int number = 10

	数据类型： 变量变化的范围就是数据类型， 一旦定义后不可改变
	变量名： 每个变量都有唯一的标识，方便存储
	初始化值： 使用变量前，需要给变量赋值

	```



- java中的八种数据类型

	8种基本类型

	```java
	整数型
		1.字节型： byte b = 10;
		2.短整型： short s = 20;
		3.整型：	 int i = 30;
		4.长整型： long l = 10000000L;  // long类型后面加L

	浮点型
		5.单精度浮点型： float f = 10.3F; // float类型后面加F
		6.双精度浮点型： double d = 10.2;

	字符型
		7.字符型： char c = 'a';

	布尔型
		8.布尔型： boolean b1 = true;
	```

	引用类型

	```java
	类

	接口

	数组
	```

- 关键字

	<img :src="$withBase('/image/gjz1.png')">

	<img :src="$withBase('/image/gjz2.png')">

	<img :src="$withBase('/image/gjz3.png')">

	<img :src="$withBase('/image/gjz4.png')">

- 类型转换

	自动（隐式）类型转换： 小类型转大类型，自动提升为大类型，运算结果是大类型

	强制（显式）类型转换： 手动将大类型转换成小类型，运算结果是小类型
	
	转换格式： 小类型 变量名 = (小类型)大类型数据;

	```java
	/* 
		强制类型转换
		int类型与byte类型相运算，会将byte类型提升为int类型
		运算的结果是一个int类型
	*/
	int aa = 10;
	byte bb = 20;
	byte cc = (byte)(aa+bb);

	// 使用强制类型转换时可能会出现丢精度问题
	double d1 = 3.14;
	int i1 = (int)d1; // 3
	```


- 运算符

	整数除以整数 ，结果还是整数。 /表示两数相除的商，%表示两数相除的余，浮点数参与运算，结果还是浮点数。

		++ -- ： 
		单独使用，结果都一样。
		参与运算：
			在变量前，先自增，在以新值进行其他运算
			在变量后，先以原值进行其他运算，再自增

	```java
	算术运算符： + % - * / ++ --
	赋值运算符： = /= +=
	关系运算符： > <
	逻辑运算符： && || !
	三元运算符： ?:
	```

- 赋值运算符
	
	基本赋值运算符： =

	拓展赋值运算符： += -+ /= *= %=

	```java
	// 省略强制类型转换的操作
	short s = 1;
	// s = s + 1; // 报错
	s += 1; // 正确 等同于 s = (short)(s + 1);

	```
			
					

- 关系运算符

	== != > >= < <=

- Scanner 扫描器

	```java
	// 导包
	import java.util.Scanner

	public class demo4 {
		public static void main(String[] args) {
			Scanner sc = new Scanner(System.in); // 创建一个scanner对象
			System.out.println("请输入一个整数") // 提示用户输入一个整数

			// 调用scanner键盘记录方法，只允许用户输入整数型数据，并使用变量i接收
			int i = sc.nextInt(); 
			System.out.println(i); // 打印 i
		}
	}
	```

	```java
	// 输入两个值，求和案例
	import java.util.Scanner;

	public class demo {
		public static void main(String[] args) {
			Scanner sc = new Scanner(System.in);

			System.out.println("请输入第一个值");
			int aa = sc.nextInt();

			System.out.println("请输入第二个值");
			int bb = sc.nextInt();

			int sum = aa + bb;
			System.out.println("总和为：" + sum)
		}
	}
	```

## 10-27

- Random 随机数

	```java
	import java.util.Random;

	public class demo7 {
		public static void main(String[] args) {
			Random r = new Random;

			// 传入10 ， 获取到的是0 - 9 之间的随机数；
			// 前闭后开： 可以取得到0 ，但是取不到10
			int num = r.nextInt(10);  

			System.out.println(num)
		}
	}
	```

	```java
	// 猜数字案例
	import java.util.Random;
	import java.util.Scanner;

	public class demo8 {

		public static void main(String[] args) {
			Random r = new Random();
			int num = r.nextInt(100) + 1;

			Scanner sc = new Scanner(System.in);

			while(true) {
				System.out.println("请输入一个数字（1-100）")
				int guessNum = sc.nextInt();

				if(guessNum > num) { "猜大了"}
				else if(guessNum < num) { "猜小了"}
				else { "猜中了"; break;}
			}
		}
	}
	```

- 方法

	<img :src="$withBase('/image/fn-java.png')">

	```java
	修饰符： public static
	返回值类型： void 空
	方法名： main
	参数类型： String[]
	参数： args
	方法体： { ... }
	```

	```java
	// 求和方法案例
	public class demo11 {

		public static void main(String[] args) {
			// 调用sum方法， 传入的参数为： 实参
			int x = sum(1, 2);
			System.out.println(x); // 3
		}

		// 此处的参数为：形参
		public static int sum(int a, int b) {
			return a + b;
		}
	}
	```