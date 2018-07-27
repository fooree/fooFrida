# coding=utf-8
import codecs
import sys

import frida

"""
使用本脚本需要一个JavaScript脚本文件
"""
if __name__ == "__main__":
    if len(sys.argv) > 1:
        javaScriptFile = sys.argv[1]

        # 获取通过UBS数据线连接到电脑的手机设备
        device = frida.get_usb_device()
        # 附加到目标进程，此处以chrome浏览器为例
        session = device.attach("com.android.chrome")

        # 读取JavaScript脚本文件
        fp = codecs.open(javaScriptFile, "r", "utf-8")
        script_data = fp.read()
        fp.close()

        # 创建Frida注入脚本
        script = session.create_script(script_data)
        # 加载脚本
        script.load()
        print('[*] load script finish')
        # 命令行等待
        sys.stdin.read()
