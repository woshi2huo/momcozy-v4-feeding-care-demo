# Momcozy V4 双场景独立原型

基于 Figma 文件 `GWaREkdfme4eVzdMQ4AY4v` 的 `755:11403`「院端使用流程」节点制作。原型使用 Figma 原始页面截图作为视觉层，并叠加等比缩放的交互热区。

两个独立 Demo 均使用 iPhone 17 的 `402 × 874` 逻辑视口展示；超出视口的长控制页在手机内部滚动。

## 运行

```bash
cd /Users/user/Documents/IoT项目
python3 -m http.server 4173
```

- 院端 Demo：`http://localhost:4173/demo/feeding-care-flow/hospital.html`
- 居家 Demo：`http://localhost:4173/demo/feeding-care-flow/home.html`

根目录地址会直接跳转到院端 Demo，不再并排加载两个 Demo。

## 演示流程

1. 院端从设备页添加 V4，依次完成发现设备、扫描、验证码和绑定；绑定成功后继续完成设备教学、吸乳控制、奶量记录并进入吸乳子场景卡。
2. 居家端先从设备空态发现并连接 V4，依次经过 `Connect`、`Connecting`、`Done` 和设备已添加状态，再进入原有设备教学。
3. 居家控制页可通过 `Switch` 进入模式列表；Manual 模式会先打开底部韵律弹窗，选择并应用韵律后返回控制页。也可创建并命名自定义模式，编辑两段吸乳参数、查看模式说明并保存使用。
4. 两端点击 `Start Pumping` 后会自动进入泌乳启动和佩戴检测，不再重复展示穿戴提示或要求再点一次开始。
   顶部统一显示两步的当前、通过和未开始状态；佩戴通过后可直接开始吸乳。
5. 只有在控制页切换到 `Lactation` 泌乳模式时，档位旁才显示 `Best level test` 可选入口；测试结果会回填为预设吸乳档位。
6. 控制页顶部帮助与设置、`Switch`、四种标准模式、1–12 档、1–5 频率、灯光开关与 `Glow / Soft / Clear` 均可交互，并同步显示当前选中状态。
7. 吸乳中页面长按 `Hold to finish` 1.2 秒结束本次吸乳，保存记录后进入数据页。
8. 吸乳中页面沿用控制页预设档位，并可通过 `− / +` 在 1–12 档之间继续调节。
9. 两个 Demo 中所有可见返回按钮均可回到实际访问的上一个页面；没有访问历史时按当前流程顺序回退。
10. 两个入口分别使用独立的 `localStorage` 状态，互不读取、修改或重置对方的进度。

每个独立 Demo 左侧提供分组页面目录，可直接跳转任意步骤或在院端/居家端之间切换；顶部保留上一步、下一步和重置控制。窄屏下目录会收入左侧抽屉。

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

- `index.html`：跳转至院端独立 Demo 的兼容入口
- `hospital.html`：院端独立入口
- `home.html`：居家端独立入口
- `app.js`：独立页面状态与交互热区
- `styles.css`：原型容器与响应式布局
- `assets/figma-755/`：Figma 节点截图资产
- `CHANGELOG.md`：版本记录
