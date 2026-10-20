# Momcozy V4 English Demo V2

这是从 `demo/feeding-care-flow-en/` 独立复制出的英文 Demo。原英文版保持不变，本目录用于实现最新 Figma 文件 `VKRWwBgRdMH31KnZVm6hlv` 中节点 `3:3948` 的设备控制流程。

当前版本为 `v0.6.7`，使用独立的 `localStorage` 键，不会覆盖中文版或原英文版的演示进度。

## 更新范围

本轮替换 9 个逻辑页面：

1. Pump Control
2. 组装和穿戴
3. 穿戴检测
4. 穿戴检测结果
5. 调节吸力
6. 最佳档位已找到
7. 泌乳中
8. 记录奶量
9. 记录成功

Seal Check 和 Pumping 另外包含左侧、右侧、双侧漏气及压力过高变体。

## 主要交互

- 居家设备连接：设备页空态与院端保持一致，之后使用最新 Figma 的 7 个整页高清状态，依次完成添加设备、配网准备、扫描、发现设备、手机连接、云端连接和连接完成。
- 首次使用：`Prepare & Fit → Seal Check → Adjust Suction → Pumping`。
- 日常使用：点击 `Start Pumping` 后直接进入 Pumping。
- Adjust Suction：15 秒无操作自动确认；每次调整档位后重新计时；可点击 `Confirm now` 立即确认。
- 吸乳中漏气：不停止输出，调整法兰后可关闭提醒。
- 压力过高：立即停止输出，点击重新检测后进入 Seal Check，通过后恢复吸乳。
- 结束吸乳：长按 `Hold to finish` 1.2 秒，记录奶量后自动返回 Pump Control。

## GitHub Pages

- 院端：`https://woshi2huo.github.io/momcozy-v4-feeding-care-demo/demo/feeding-care-flow-en-v2/hospital.html?v=0.6.7`
- 居家端：`https://woshi2huo.github.io/momcozy-v4-feeding-care-demo/demo/feeding-care-flow-en-v2/home.html?v=0.6.7`

## 本地运行

```bash
cd /Users/user/Documents/IoT项目/momcozy-v4-feeding-care-demo
python3 -m http.server 4173
```

- 院端：`http://localhost:4174/demo/feeding-care-flow-en-v2/hospital.html?v=0.6.7`
- 居家端：`http://localhost:4174/demo/feeding-care-flow-en-v2/home.html?v=0.6.7`

## 资源说明

- 最新流程截图：`assets/figma-vkrw/`，按页面逻辑尺寸的真实 `2×` Retina PNG 导出。
- 最新居家设备连接截图：`assets/figma-vkrw-connect/`，使用 Figma 节点 `405:37966` 至 `405:37940` 的真实 `2×` 资源。
- 完整 Figma 区域参考图：`assets/figma-vkrw/section-03-reference.png`
- 原英文 Demo 的共享页面资源继续位于：`assets/figma-755/`，当前实际使用的整页截图均已更新为真实 `2×` 资源。
