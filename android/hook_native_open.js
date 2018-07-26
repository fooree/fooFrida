// UTF-8
'use strict'

// 查找libc.so模块中的系统函数open()在内存中的地址
// 关于open()该函数的标准文档参考：http://man7.org/linux/man-pages/man2/open.2.html
target_address = Module.findExportByName("libc.so", "open");

// 回调对象
callback = {
    // onEnter()函数在目标方法被执行前执行
    // args表示目标方法的参数，但是args是一个JavaScript对象数组，需要转换为C/C++数据类型
    onEnter: function (args) {
        // Memory.readCString(args[0])表示将第一个参数转换为C语言的字符串类型
        console.log("[+]  open file => " + Memory.readCString(args[0]))
    },
    // onLeave()函数在目标方法被执行后执行
    // retval表示目标方法的返回值
    onLeave: function (retval) {
        // toInt32()表示将一个JavaScript数据对象转换为C语言的int数据类型
        console.log("[+]  open return: " + retval.toInt32())
    }
}
// 执行HOOK
// target_address参数表示目标函数的内存地址
// 执行以下代码后，当target_address内存地址处的代码被执行时,Frida会调用callback这个回调对象
Interceptor.attach(target_address, callback);