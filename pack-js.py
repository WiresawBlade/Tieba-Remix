"""

Pack-JS 2.2.3
by 锯刃Blade

2.2.3
支持向脚本写入 meta 数据

2.2.2
使用 tsconfig.json 作为编译配置文件

2.2.1
现在只有扩展名为.ts的文件会被识别为源文件
添加构建完成状态显示

2.2
支持 TypeScript，现在会执行 tsc 编译等操作
适配项目的构建工具
增加读取命令行参数等功能

2.1.1
内容修正

2.1
现在会区分开发脚本与发行脚本，打包时会将所有资源合并至发行脚本

2.0
重写程序，现在由python实现
打印信息改进

1.1.0
现在扫描stylesheets目录中的文件时，也会扫描其子文件夹的文件
写入CSS到JS时，现在会考虑缩进问题
打印信息改进

1.0.1
添加说明信息
修复部分问题

"""

#################################################
import sys
import os
import shutil
import time
#################################################
scriptName     = "Pack-JS"
version        = "2.2.3"

cssDir         = "stylesheets/"
backupDir      = "backup/"
devPath        = "src/remix.developer.ts"
relPath        = "dist/tieba-remix.nometa.js"
comPath        = "dist/compiled.js"
metaPath       = "src/_meta.ts"
distPath       = "dist/tieba-remix.js"

cssStartFlag   = "// CSS START"
cssEndFlag     = "// CSS END"

charset        = "UTF-8"
tscCommand     = "tsc"
maxBackups     = 5
#################################################

# 遍历目录下所有文件，包含子文件夹中的文件，且不包含任何目录
# 返回：文件路径列表
def scanFiles(path: str) -> list[str]:
    fileList: list[str] = []
    if not os.path.isdir(path):
        return fileList

    for root, [], files in os.walk(path):
        for name in files:
            fileList.append(os.path.join(root, name))
    return fileList

# 获取去除扩展名的文件名
def removeExtension(filename: str) -> str:
    if not "." in filename:
        return filename
    else:
        nameList: list[str] = filename.split(".")
        outputString: str = ""
        nameList.pop(-1)
        for s in nameList:
            outputString += s + "."
        return outputString.strip(".")

def mergeFiles(headpath: str, tailpath: str, descpath: str):
    if not os.path.isfile(headpath): return
    if not os.path.isfile(tailpath): return

    # 先删除目标文件
    if os.path.isfile(descpath): os.remove(descpath)

    headfile = open(headpath, "r", encoding=charset)
    tailfile = open(tailpath, "r", encoding=charset)
    descfile = open(descpath, "a", encoding=charset)

    headstr = headfile.read()
    tailstr = tailfile.read()
    descfile.write(headstr)
    descfile.write("\n")
    descfile.write(tailstr)

    headfile.close()
    tailfile.close()
    descfile.close()

#################################################

# 打印版本信息
print(scriptName, version)

# 预备操作
# 读取命令行参数
argLen = len(sys.argv)
if argLen <= 1:
    if os.path.isfile(sys.argv[0]):
        # 1 个参数有效
        if sys.argv[0].split('.')[-1] == "ts": devPath = sys.argv[0]
elif argLen == 2:
    if os.path.isfile(sys.argv[0]):
        # 2 个参数有效
        if sys.argv[0].split('.')[-1] == "ts": devPath = sys.argv[0]
        relPath = sys.argv[1]
    elif os.path.isfile(sys.argv[1]):
        # 1 个参数有效
        if sys.argv[0].split('.')[-1] == "ts": devPath = sys.argv[0]
elif argLen == 3:
    # 当传递 3 个参数时，只取后两个
    if os.path.isfile(sys.argv[1]):
        if sys.argv[1].split('.')[-1] == "ts": devPath = sys.argv[1]
        relPath = sys.argv[2]

# 检测 backup 目录文件数
backupCount = len(scanFiles(backupDir))
print("当前剩余备份数：", backupCount, sep="")

# 备份操作
if not os.path.isfile(distPath):
    # 如果未找到目标 JS 文件，则不进行备份
    print("未找到文件：" + distPath + "，本次不进行备份")
else:
    # 如果 backupCount >= maxBackups 先删除多余的
    if backupCount >= maxBackups:
        for i in range(backupCount - maxBackups + 1, 0, -1):
            backupFiles = scanFiles(backupDir)
            print("删除备份：", backupFiles[0], sep="")
            os.remove(backupFiles[0])

    # 备份原 JS 文件
    timeStamp = time.strftime("%Y%m%d%H%M%S", time.localtime())
    print("备份 JS：" + distPath + " => " + timeStamp + ".js")
    shutil.copy(distPath, backupDir + timeStamp + ".js")

# 打包 JS
# 删除之前打包留下的临时文件
if os.path.exists(comPath):
    print("删除残留文件：" + comPath)
    os.remove(comPath)

# 编译 TypeScript
print("编译 TS：" + devPath + " => " + comPath)
os.system(tscCommand)

# 删除旧文件
print("删除旧文件：" + distPath)
if os.path.exists(distPath): os.remove(distPath)

# 读取 JS 文件
print("读取 JS 文件：" + comPath)
pakFile = open(comPath, "r", encoding=charset)
relFile = open(relPath, "a", encoding=charset)
cssList = scanFiles(cssDir)

# 写入
try:
    i = 0
    isMeta = True;  # 是否为元数据
    jsLines = pakFile.readlines()
    while i < len(jsLines):
        jsLine = jsLines[i]
        # 判断元数据
        # if isMeta:
        # else:
        
        # 写入内容
        relFile.write(jsLine)

        # 找到开始标记
        if cssStartFlag in jsLine:
            print("CSS START FLAG：第 ", i + 1, " 行", sep="")

            # 写入 CSS内容
            for j in range(1, len(cssList) + 1, 1):
                # 遍历每个 CSS 文件
                print("写入 CSS：" + cssList[j - 1])
                varName = os.path.basename(cssList[j - 1]).replace("-", "_").replace(".css", "")
                relFile.write("\tlet " + varName + " = '")
                cssFile = open(cssList[j - 1], "r", encoding=charset)

                css = cssFile.readlines()
                for line in css:
                    # 遍历 CSS 文件的每行
                    relFile.write(line.replace("\n", "").replace("    ", ""))
                relFile.write("';\n")
                cssFile.close()

            # 跳过文件内容直到找到结束标记
            while not cssEndFlag in jsLine:
                i += 1
                jsLine = jsLines[i]
            
            print("CSS END FLAG：第 ", i + 1, " 行", sep="")
            relFile.write(jsLine)

        # 结束标记
        # if endFlag in jsLine:
        #     print("CSS END FLAG：第 ", i + 1, " 行", sep="")
        i += 1

    # 释放文件
    pakFile.close()
    relFile.close()
    os.remove(comPath)

    # 合并 meta
    print("写入 meta 数据：" + metaPath + " => " + relPath)
    mergeFiles(metaPath, relPath, distPath)
    if os.path.exists(relPath): os.remove(relPath)

    # 构建完成
    print("\033[7;32m" "构建完成" "\033[0m")
    exit(0)
except Exception as ex:
    # 构建失败
    print("\033[7;31m" "构建失败" "\033[0m")
    print(ex)
    exit(1)
finally:
    pakFile.close()
    relFile.close()
