# coding=utf-8

"""
演示注入记事本进程。
运行此脚本需要首先打开记事本。
"""

import frida

# 附加到记事本进程
session = frida.attach("notepad.exe")
# 获取记事本进程加载的所有模块(动态库、程序)
modules = session.enumerate_modules()

print("=========== modules ===========")
for module in modules:
    print(module.name)          # 加载的模块名称
    # print(module.base_address)  # 模块在内存中的基址
    # print(module.size)          # 模块占空间大小
    # print(module.path)          # 模块文件位置

print("=========== exports ===========")
m1st = modules[1]
# 模块的导出函数表
exports = m1st.enumerate_exports()
for export in exports:
    print(export)

print("=========== ranges ===========")
# 模块在内存中的映射
ranges = m1st.enumerate_ranges("rwx")
for a_range in ranges:
    print(a_range)

# 取消附加进程
session.detach()
















