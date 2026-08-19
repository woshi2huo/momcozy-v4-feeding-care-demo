# Momcozy V4 双端交互原型

基于 Figma 文件 `GWaREkdfme4eVzdMQ4AY4v` 的 `755:11403`「院端使用流程」节点制作。原型使用 Figma 原始页面截图作为视觉层，并叠加等比缩放的交互热区。

## 运行

```bash
cd /Users/user/Documents/IoT项目
python3 -m http.server 4173
```

- 双端串联：`http://localhost:4173/demo/feeding-care-flow/`
- 院端 Demo：`http://localhost:4173/demo/feeding-care-flow/hospital.html`
- 居家 Demo：`http://localhost:4173/demo/feeding-care-flow/home.html`

## 演示流程

1. 院端从设备页添加 V4，依次完成发现设备、扫描、验证码和绑定。
2. 绑定成功后，居家端自动解锁设备教学。
3. 居家端完成教学，进入吸乳控制并开始吸乳。
4. 点击吸乳中页面的设备图结束本次吸乳，保存记录后进入数据页。
5. 两个独立入口通过同源 `localStorage` 共享设备绑定和吸乳记录状态。

每个独立 Demo 顶部提供上一步、下一步和重置控制，便于演示时快速切换状态。

## 版本与回滚

```bash
git log --oneline -- demo/feeding-care-flow
git tag --list 'feeding-care-demo-*'
```

临时查看历史版本：

```bash
git switch --detach feeding-care-demo-v0.2.0
```

返回当前版本：

```bash
git switch main
```

恢复某个标签中的原型目录：

```bash
git restore --source feeding-care-demo-v0.2.0 -- demo/feeding-care-flow
```

## 文件

- `index.html`：双端串联入口
- `hospital.html`：院端独立入口
- `home.html`：居家端独立入口
- `app.js`：页面状态、交互热区和跨端同步
- `styles.css`：原型容器与响应式布局
- `assets/figma-755/`：Figma 节点截图资产
- `CHANGELOG.md`：版本记录
