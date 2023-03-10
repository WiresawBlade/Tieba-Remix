<div align="center">

![](images/main/icon64.png)

</div>

<div align="center">

# *Tieba Remix*

### “贴吧网页端重塑”

**·**

### ~~*更现代的UI设计*~~（未动工）

### *适应系统设置的深色主题*

### *屏蔽无关内容*

### *更纯净的使用体验*

### *功能扩展与增强*

**·**

[📙 项目概述](#-项目概述)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
[📦 安装](#-安装)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
[⚠ 需要留意](#-需要留意)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
[🔧 构建自己的版本](#-构建自己的版本)

</div>

---

## 📙 项目概述

`Tieba Remix` 是一个基于油猴脚本的贴吧网页端插件，旨在为贴吧用户提供更好的体验。由于贴吧网页端多年没有较大改动，用起来已经比较勉强，UI更是有一种复古的美感。

每一次打开贴吧，都好像被卷进了互联网的蛮荒时代。我在这个陌生的世界里不知所措，本能地想要跑，双腿却像被灌了铅一样寸步难移，我发觉自己已然无法逃离，只有被动接受。瞳孔抽搐般地快速扫视着电脑上的内容，刺眼的屏幕将眼珠灼得酸痛，豆大的汗珠滴滴滑落，砸得双手生疼。我越看越激动、越看越害怕，心脏仿佛要将胸骨击碎，双眼还是机械地一行行搜索。恐惧逐渐耗尽了我最后一丝体力，就在我即将瘫软在电脑椅之际，我突然触了电似地打了个寒颤，视线停在了某个本该给我嗑一个的黄牌的楼层。“终于，还是被我逮着了！”看到吧里的水比们熟悉的复制粘贴，我又找回了往日的自信，一蹦三尺高。伴随着指尖肌肉记忆般地一阵快速抽动，我的笑容逐渐放肆，网页版限定的“经验+1”浮现在屏幕上。我长舒一口气，全然忘记了刚刚发生的一切。靠在椅背上放松，才发觉后背早已被汗水浸透。“果然，这个冬天还是太暖和了啊。”我不禁这样感慨。

于是乎，`Tieba Remix` 来了。通过对原版贴吧的缝缝补补，该插件尽力让贴吧更像一个现代的网页，有更好的界面与交互。同时，该插件也会对看贴无关的内容进行屏蔽，力求做到简洁纯净。

## 📦 安装

油猴脚本的安装与使用十分简便，如果你第一次接触相关信息，下面的内容将帮助你快速上手。

### 浏览器插件

你的浏览器需要运行驱动油猴脚本的插件，它一般是 [Tampermonkey](https://www.tampermonkey.net/)（推荐）。

### 获取脚本

如果你的浏览器已经成功启用油猴脚本插件，点击下面的链接可以获取 `Tieba Remix` 最新的版本

| [GitHub BETA](https://raw.githubusercontent.com/WiresawBlade/Tieba-Remix/beta/dist/tieba-remix.user.js) | [Gitee BETA](https://gitee.com/WiresawBlade/Tieba-Remix/raw/beta/dist/tieba-remix.user.js) | [Greasy Fork](https://greasyfork.org/zh-CN/scripts/460113-tieba-remix) |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |

### 其他
目前你可能需要将此脚本与广告屏蔽插件（如 [AdBlock](https://getadblock.com/) ）配合使用才能有更完整的体验

## ⚠ 需要留意

+ 脚本的部分功能可能会对性能有较大影响，可自行开关，介意者勿用
+ 现阶段，本脚本需要配合 [AdBlock](https://getadblock.com/) 等广告屏蔽插件使用，后续版本会逐渐完善广告屏蔽功能，逐渐脱离对其他插件的依赖
+ 脚本包含大量外部资源，会造成额外流量消耗。由于大多数国内用户访问 github 存在困难，故脚本的所有资源都链接至 gitee，两个平台的源代码会同步更新。[点击访问 gitee 仓库](https://gitee.com/WiresawBlade/Tieba-Remix)

## 🔧 构建自己的版本

对目前的 `Tieba Remix` 不满意？你可以构建属于自己的版本。下面的内容会引导你如何进行修改。

### 准备工作

> git

Windows 用户使用如下命令快速安装：

```bash
winget install --id Git.Git -e --source winget
```

> TypeScript
  
本项目使用 TypeScript 编写，如需获得完整开发环境请安装：

```bash
npm install -g typescript
```

> Python（可选）
  
本项目的自定义构建工具使用 [Python](https://www.python.org/) 编写，想要正常运行则需要提前安装

### 克隆

本插件完全开源，你可以将整个工程克隆到你的设备：

```bash
git clone https://github.com/WiresawBlade/Tieba-Remix.git
```

如果你更倾向使用 `gitee` ，则可以使用如下命令，后不赘述：
```bash
git clone https://gitee.com/WiresawBlade/Tieba-Remix.git
```

### 自定义工具：Pack-JS

克隆的工程除了包含全部的源码文件以外，还提供了一个自定义构造工具 `Pack-JS` 。该工具适用于 [Visual Studio Code](https://code.visualstudio.com/) ，且需要提前安装 Python 才能正常使用。若你不想使用这些工具，也可以自行编写构建工具。

> 使用

在 VSCode 中，进入项目目录，按下 `F6` 运行任务，选择 `python: pack-js` 。

![F6 任务列表](images/docs/devtools-0.png)

> 行为

该工具会将 `src` 目录下的所有 .ts 文件编译为 JavaScript 代码，最后写入元数据。所有的 TypeScript 代码与 `stylesheets` 目录下的所有 css 文件都会合并为一个 .js 文件，发送到 `dist` 目录。

每次构建，都会对之前的已编译脚本进行一次备份，备份目录为 `backup` 。
