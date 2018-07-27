// UTF-8
'use strict'

// Interceptor.attach(target, callbacks)：
// 功能是hook指定的native函数。
// target表示目标函数的内存地址，callbacks表示目标函数执行时的回调对象，也就是注入的功能代码

// target = Module.findExportByName(module, function):
// 功能是查找指定模块中的目标函数(变量)的内存地址。
// 此处的例子是查找libc.so模块中的系统函数open()的内存地址
// 关于open()该函数的标准文档：http://man7.org/linux/man-pages/man2/open.2.html

// 执行以下代码后，当target处的代码被执行时，Frida会调用callback这个回调对象
Interceptor.attach(Module.findExportByName("libc.so", "open"), {
    // onEnter()函数在目标函数被执行前执行
    // args表示目标函数的参数，但是args是一个JavaScript对象数组，需要转换为C/C++数据类型
    onEnter: function (args) {
        // 这里是自定义的功能
        // Memory.readCString(args[0])表示将第一个参数转换为C语言的字符串类型
        console.log("[+]  open file => " + Memory.readCString(args[0]))
    },
    // onLeave()函数在目标函数被执行后执行
    // retval表示目标函数的返回值
    onLeave: function (retval) {
        // 这里是自定义的功能
        // toInt32()表示将一个JavaScript数据对象转换为C语言的int数据类型
        console.log("[+]  open return: " + retval.toInt32())
    }
});