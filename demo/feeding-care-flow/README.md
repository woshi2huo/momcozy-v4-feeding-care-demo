# Momcozy V4 双场景独立原型

基于 Figma 文件 `GWaREkdfme4eVzdMQ4AY4v` 的 `755:11403`「院端使用流程」节点制作。原型使用 Figma 原始页面截图作为视觉层，并叠加等比缩放的交互热区。院端和居家端只保留设备连接方式的差异；从设备教学开始，页面定义、视觉、操作与跳转逻辑完全共用。

两个独立 Demo 均使用 iPhone 17 的 `402 × 874` 逻辑视口展示；超出视口的长控制页在手机内部滚动。

## 运行

```bash
cd /Users/user/Documents/IoT项目/momcozy-v4-feeding-care-demo
python3 -m http.server 4173
```

- 院端 Demo：`http://localhost:4173/demo/feeding-care-flow/hospital.html`
- 居家 Demo：`http://localhost:4173/demo/feeding-care-flow/home.html`

根目录地址会直接跳转到院端 Demo，不再并排加载两个 Demo。

## GitHub Pages

- 院端 Demo：`https://woshi2huo.github.io/momcozy-v4-feeding-care-demo/demo/feeding-care-flow/hospital.html?v=0.5.20`
- 居家 Demo：`https://woshi2huo.github.io/momcozy-v4-feeding-care-demo/demo/feeding-care-flow/home.html?v=0.5.20`

## 演示流程

1. 院端从设备页添加 V4，依次完成发现设备、扫描、验证码和绑定；居家端从设备空态发现并连接 V4，依次经过 `Connect`、`Connecting`、`Done` 和设备已添加状态。这是两端唯一不同的流程。
2. 连接完成后，两端进入同一套设备教学、控制、模式、检查、吸乳、记录、数据洞察、设备、CozyAI 与社区页面；后续页面顺序和交互行为完全一致。设备页只保留设备卡和底部导航，不再叠加洞察及社区入口；点击 `Breast Pump` 设备卡进入 `吸乳子首页`，吸乳子首页左上角返回固定进入设备页。
3. 两端教学按最新版 Figma 依次展示 `V4 Setup` 的 Step 1 和 Step 2；两步右上角均提供 CozyAI 入口，且所有动态 CozyAI 入口统一使用 Step 2 的粉色兔子 logo，可进入 AI 助手并返回真实来源页。
4. 两端控制页均通过 `Switch` 进入独立模式列表，不再先打开模式切换底部弹层；List 左上角 `×` 始终关闭列表并返回控制页。Manual 模式和 `Programs` 卡片正文点击后先显示二次确认窗口，确认 `Switch` 才应用并返回控制页，取消则保留当前模式。`Details` 进入独立韵律详情页并支持返回 List；也可创建并命名自定义模式，编辑两段吸乳参数、查看模式说明，点击 `Save` 后返回 List。
5. 两端在设备教学完成页点击 `Start using V4` 后，会直接在吸奶控制页上弹出不可关闭的首次使用 Workflow，用户必须完成 `组装和穿戴 → 穿戴检测 → 调节吸力 → 泌乳中` 后才能进入正常控制；第三页通过“开始吸奶并检测穿戴”明确启动后将依次完成穿戴检测和最佳档位设置。
6. 穿戴检测支持双侧通过、左侧异常、右侧异常、双侧异常和状态未知；异常结果不会自动继续，调整法兰后必须从头检测 5 秒。正常后自动进入调节吸力，完成页显示倒计时，也可手动点击“继续吸奶”。
7. `Standard mode` 只保留“刺激模式”和“吸乳模式”；两种模式均在档位旁显示“最佳档位”入口。调节吸力支持 1–15 档逐级调整，调档后重新计算 5 秒自动确认，同时保留“立即确认”和设备指令失败反馈。
8. 数据页不再展示独立的 Daily summary 卡片；每日总结、趋势依据、CozyAI 入口和 `More` 详情入口统一收拢到 Pumping Trend 卡片，Lactation 继续通过 `Key insight + More` 进入详情。
9. CozyAI 对话页按 Figma 新节点 `961:55521` 展示粉白渐变、完整兔子角色、`Momcozy Air 1` 标题、三条推荐问题与底部输入区；同时保留推荐问题、自定义输入、即时回复、洞察上下文和真实来源返回。
10. 数据页继续向下提供 Expert guidance 和紧凑的 Pumping moms 入口；已连接设备控制条按 Figma 节点 `817:50147` 以 178px 酒红至粉红渐变双行结构固定在手机底部，设备缩略图使用 V4 控制器实物图，并保留白色 Home Indicator。
11. 泌乳中页面常驻显示四步 Workflow，前三步完成、第四步保持激活，并在卡片底部持续展示左右穿戴状态。轻度漏气使用黄色提示且吸奶继续；严重漏气会暂停输出并自动持续检测，检测通过后才启用“继续吸奶”；压力过高暂停输出并等待用户确认继续；连接中断后不沿用旧检测结果。
12. 泌乳中调档立即作用于本次吸奶，但不会自动覆盖已保存的最佳档位；新档位稳定使用 60 秒后可选择“更新为新档位”或“仅本次使用”。长按“长按结束”1.2 秒结束本次吸奶；记录页左右奶量支持纵向滑动、直接输入 `0–300 ml` 和上下微调。
13. 两个 Demo 中所有可见返回按钮均可回到实际访问的上一个页面；没有访问历史时按当前流程顺序回退。
14. 两个入口分别使用独立的 `localStorage` 状态，互不读取、修改或重置对方的进度。
15. 手机 Demo 右侧提供仅用于评审的“使用流程”面板，标题下方包含简短使用说明；可切换首次/日常场景、预设下次检测结果、触发运行中异常与断连、模拟设备指令失败，并将最佳档位候选计时快进到 1 分钟。窄屏下控制区自动移到手机下方。

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
- `assets/figma-755/`：Figma 节点截图资产；新版文件使用版本后缀，旧 PNG 保留用于回滚
- `CHANGELOG.md`：版本记录
