# Momcozy CareLink 双端交互原型

院端工作台与居家移动端共享一套浏览器本地状态，用于演示从院内评估、方案发布、设备绑定、出院交接，到居家冲调、喂养记录、异常上报和远程预警闭环的完整流程。

## 运行

```bash
cd /Users/user/Documents/IoT项目
python3 -m http.server 4173
```

访问 `http://localhost:4173/demo/feeding-care-flow/`。

## 推荐演示路径

1. 院端进入“喂养方案”，调整参数并发布到居家端。
2. 院端进入“出院交接”，绑定设备并完成交接。
3. 顶部切换到“居家端”，进入“调奶”并完成四步智能冲调。
4. 查看新增喂养记录，或在首页上报异常。
5. 切回院端“远程预警”，确认家庭上报已经同步并完成闭环。

## 数据说明

演示状态存储在浏览器 `localStorage` 中。院端“总览”或“系统设置”可重置数据。

## 版本与回滚

查看版本：

```bash
git log --oneline -- demo/feeding-care-flow
git tag --list 'feeding-care-demo-*'
```

临时查看历史版本：

```bash
git switch --detach feeding-care-demo-v0.1.0
```

返回当前版本：

```bash
git switch main
```

如需在当前分支恢复某个版本的原型目录：

```bash
git restore --source feeding-care-demo-v0.1.0 -- demo/feeding-care-flow
```

## 文件

- `index.html`：页面入口
- `styles.css`：双端视觉与响应式布局
- `app.js`：路由、共享状态和流程交互
- `CHANGELOG.md`：版本变更记录
