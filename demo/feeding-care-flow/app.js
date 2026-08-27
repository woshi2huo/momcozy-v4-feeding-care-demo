const ENTRY = document.body.dataset.entry || "hospital";
const VERSION = "0.4.6";
const STORAGE_KEY = `momcozy-figma-755-demo-v${VERSION}-${ENTRY}`;

const CONTROL_IMAGE = "home-03-control-v043.png";
const PUMPING_IMAGE = "home-04-pumping-v043.png";

const calibrationScreens = [
  { id: "check-initiation", image: CONTROL_IMAGE, width: 375, height: 956, label: "检查 1 · 泌乳启动", calibration: true },
  { id: "check-fit", image: CONTROL_IMAGE, width: 375, height: 956, label: "检查 2 · 佩戴检测", calibration: true },
  { id: "check-fit-passed", image: CONTROL_IMAGE, width: 375, height: 956, label: "检查 2 · 佩戴通过", calibration: true },
  { id: "check-comfort", image: CONTROL_IMAGE, width: 375, height: 956, label: "最佳档位测试", calibration: true, bestLevelTest: true },
  { id: "check-comfort-found", image: CONTROL_IMAGE, width: 375, height: 956, label: "最佳档位确认", calibration: true, bestLevelTest: true }
];

// Kept as an explicit rollback reference; the PNG assets remain unchanged.
const rollbackScreens0322 = {
  dashboard: { image: "home-07-dashboard.png", width: 402, height: 874 },
  device: { image: "home-08-device.png", width: 393, height: 852 }
};

const hospitalScreens = [
  { id: "empty", image: "hospital-00-empty.png", width: 393, height: 852, label: "设备页空态" },
  { id: "manual", image: "hospital-01-manual.png", width: 375, height: 812, label: "手动添加设备" },
  { id: "found", image: "hospital-02-found-v043.png", width: 375, height: 812, label: "发现设备" },
  { id: "scan", image: "hospital-03-scan-v043.png", width: 375, height: 812, label: "扫描设备" },
  { id: "code", image: "hospital-04-code.png", width: 415, height: 874, label: "输入验证码" },
  { id: "binding", image: "hospital-05-binding.png", width: 375, height: 812, label: "绑定中" },
  { id: "success", image: "hospital-06-success.png", width: 375, height: 812, label: "绑定成功" },
  { id: "training-welcome", image: "home-00-welcome-v043.png", width: 393, height: 852, label: "设备教学欢迎页" },
  { id: "training-guide", image: "home-01-guide-v043.png", width: 393, height: 852, label: "设备教学详情页" },
  { id: "training-guide-final", image: "home-01b-guide-final-v043.png", width: 393, height: 852, label: "设备教学最后一页" },
  { id: "training-ready", image: "home-02-ready-v043.png", width: 393, height: 852, label: "设备教学完成页" },
  { id: "pump-control", image: CONTROL_IMAGE, width: 375, height: 956, label: "吸乳器控制页" },
  ...calibrationScreens,
  { id: "pump-running", image: PUMPING_IMAGE, width: 375, height: 956, label: "吸乳中" },
  { id: "pump-finished", image: "home-05-finished.png", width: 402, height: 874, label: "记录奶量" },
  { id: "pump-logged", image: "home-06-logged.png", width: 393, height: 852, label: "记录成功" },
  { id: "pump-dashboard", view: "insights-home", width: 402, height: 1400, label: "AI 吸乳子首页" },
  { id: "device-home", view: "device-ai", width: 393, height: 852, label: "AI 设备页" },
  { id: "hospital-insight-detail", view: "insight-detail", width: 402, height: 874, label: "AI 洞察详情" },
  { id: "hospital-cozy-chat", view: "cozy-chat", width: 402, height: 874, label: "CozyAI 对话" },
  { id: "hospital-community", view: "community", width: 402, height: 1040, label: "Pumping moms 群组" }
];

const homeScreens = [
  { id: "connect-empty", image: "home-connect-00-empty.png", width: 393, height: 852, label: "设备页空态" },
  { id: "connect-found", image: "home-connect-00-empty.png", width: 393, height: 852, label: "发现 V4" },
  { id: "connect-connecting", image: "home-connect-00-empty.png", width: 393, height: 852, label: "正在连接 V4" },
  { id: "connect-done", image: "home-connect-00-empty.png", width: 393, height: 852, label: "V4 连接完成" },
  { id: "connect-device", image: "home-connect-04-added-v036.png", width: 393, height: 852, label: "设备已添加" },
  { id: "welcome", image: "home-00-welcome-v043.png", width: 393, height: 852, label: "设备助手欢迎页" },
  { id: "guide", image: "home-01-guide-v043.png", width: 393, height: 852, label: "设备助手教学页" },
  { id: "guide-final", image: "home-01b-guide-final-v043.png", width: 393, height: 852, label: "设备助手教学最后一页" },
  { id: "ready", image: "home-02-ready-v043.png", width: 393, height: 852, label: "设备助手完成页" },
  { id: "control", image: CONTROL_IMAGE, width: 375, height: 956, label: "吸乳控制初始状态" },
  { id: "mode-list", custom: true, width: 402, height: 874, label: "模式列表" },
  { id: "mode-program-detail", custom: true, width: 375, height: 812, label: "韵律详情" },
  { id: "mode-name", custom: true, width: 402, height: 874, label: "新模式命名" },
  { id: "mode-overview", custom: true, width: 402, height: 874, label: "分段模式总览" },
  { id: "mode-editor", custom: true, width: 402, height: 874, label: "分段参数编辑" },
  { id: "mode-overview-complete", custom: true, width: 402, height: 874, label: "完整模式预览" },
  { id: "mode-introduction", custom: true, width: 402, height: 874, label: "模式介绍弹窗" },
  ...calibrationScreens,
  { id: "pumping", image: PUMPING_IMAGE, width: 375, height: 956, label: "吸乳中" },
  { id: "finished", image: "home-05-finished.png", width: 402, height: 874, label: "完成吸乳" },
  { id: "logged", image: "home-06-logged.png", width: 393, height: 852, label: "记录成功" },
  { id: "dashboard", view: "insights-home", width: 402, height: 1400, label: "AI 吸乳子首页" },
  { id: "device", view: "device-ai", width: 393, height: 852, label: "AI 设备页" },
  { id: "home-insight-detail", view: "insight-detail", width: 402, height: 874, label: "AI 洞察详情" },
  { id: "home-cozy-chat", view: "cozy-chat", width: 402, height: 874, label: "CozyAI 对话" },
  { id: "home-community", view: "community", width: 402, height: 1040, label: "Pumping moms 群组" }
];

const defaults = {
  hospitalStep: 0,
  homeStep: 0,
  deviceBound: false,
  homeDeviceConnected: false,
  trainingDone: false,
  codeDigit: "",
  pumpRunning: false,
  pumpPaused: false,
  sessionLogged: false,
  pumpLevel: 1,
  controlLight: "Clear",
  controlLightOn: true,
  controlSoundOn: true,
  controlAutoLockOn: true,
  flashlightOn: false,
  guideVideoPlaying: false,
  comfortLevel: 4,
  bestLevelSet: false,
  controlMode: "Stimulation",
  customModeName: "Milk Collection Mode-01",
  customModeDescription: "Boost milk supply with a gentle segmented rhythm.",
  customModeSaved: false,
  selectedManualMode: "Stimulation",
  selectedManualRhythm: "Gentle",
  activeProgramName: "Milk Boost Mode P1",
  modeEditingSection: 1,
  modeTrialPlaying: false,
  modeLightOn: true,
  customModeSections: [
    { type: "Massage", level: 1, light: "Clear", duration: 10 },
    { type: "Breast pumping", level: 1, light: "Clear", duration: 15 }
  ],
  leftVolume: 0,
  rightVolume: 0,
  sessionDuration: "20 min 30 sec",
  communityJoined: false,
  communityStatus: "",
  activeInsight: "trend",
  chatContext: "",
  cozyMessages: [],
  autoAdvanceSuppressed: ""
};

let state = loadState();
let transitionTimer = null;
let holdTimer = null;
let holdTarget = null;
let navigationOpen = false;
let directNavigation = false;
let controlOverlay = "";
let guideFullscreen = false;
let durationPickerOpen = false;
let previousCheckScreenId = null;
let suppressStepHistory = false;
const stepHistory = { hospital: [], home: [] };

function loadState() {
  try {
    const saved = { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    saved.hospitalStep = Math.max(0, Math.min(hospitalScreens.length - 1, Number(saved.hospitalStep) || 0));
    saved.homeStep = Math.max(0, Math.min(homeScreens.length - 1, Number(saved.homeStep) || 0));
    return saved;
  } catch {
    return { ...defaults };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(patch, message) {
  const stepKey = `${ENTRY}Step`;
  if (!suppressStepHistory && Object.hasOwn(patch, stepKey) && patch[stepKey] !== state[stepKey]) {
    stepHistory[ENTRY].push(state[stepKey]);
  }
  state = { ...state, ...patch };
  saveState();
  render();
  if (message) showToast(message);
}

function cancelHold() {
  clearTimeout(holdTimer);
  holdTimer = null;
  if (holdTarget) {
    holdTarget.classList.remove("holding");
    holdTarget.setAttribute("aria-pressed", "false");
  }
  holdTarget = null;
}

function startHold(target) {
  if (holdTimer) return;
  holdTarget = target;
  target.classList.add("holding");
  target.setAttribute("aria-pressed", "true");
  holdTimer = setTimeout(() => {
    const action = target.dataset.holdAction;
    holdTimer = null;
    holdTarget = null;
    handleAction(action, target);
  }, 1200);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function icon(name, label) {
  return `<i data-lucide="${name}" aria-hidden="true"></i><span class="sr-only">${label}</span>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[character]);
}

function hotspot(action, label, x, y, width, height, extra = "") {
  return `<button class="hotspot" data-action="${action}" aria-label="${label}" title="${label}" style="--x:${x};--y:${y};--w:${width};--h:${height}" ${extra}></button>`;
}

function appTabHotspots(kind) {
  return [
    hotspot("app-tab-home", "打开 Home", 7.0, 90.4, 16.0, 8.2, `data-kind="${kind}"`),
    hotspot("app-tab-device", "打开 Device", 30.3, 90.4, 17.0, 8.2, `data-kind="${kind}"`),
    hotspot("app-tab-community", "打开 Community", 53.2, 90.4, 17.0, 8.2, `data-kind="${kind}"`),
    hotspot("app-tab-profile", "打开 Me", 76.5, 90.4, 16.0, 8.2, `data-kind="${kind}"`)
  ].join("");
}

function contentCardHotspots() {
  return [
    hotspot("content-card-open", "查看 Digital Bottle Warmer T31", 0, 49.0, 24.0, 28.0, 'data-card="Digital Bottle Warmer T31"'),
    hotspot("content-card-open", "查看 Smart Baby Monitor BM08", 28.0, 49.0, 43.0, 28.0, 'data-card="Smart Baby Monitor BM08"'),
    hotspot("content-card-open", "查看 W1 Comfort Pump", 78.0, 49.0, 22.0, 28.0, 'data-card="W1 Comfort Pump"')
  ].join("");
}

function trainingGuideHotspots(kind, final = false) {
  const prefix = kind === "hospital" ? "hospital" : "home";
  return [
    hotspot(`${prefix}-training-exit`, "关闭设备教学", 3.8, 6.6, 12.5, 6.3),
    hotspot("guide-toggle-video", state.guideVideoPlaying ? "暂停教学视频" : "播放教学视频", 42.0, 37.0, 16.0, 9.0),
    hotspot("guide-open-fullscreen", "全屏查看教学视频", 86.0, 26.0, 11.0, 7.0),
    hotspot("guide-show-how", "展开 How to do it", 4.0, 65.0, 92.0, 7.0),
    hotspot("guide-show-warning", "展开 What to watch out for", 4.0, 72.0, 92.0, 7.0),
    final ? hotspot("ready-open-assistant", "打开 Cozy Assistant", 85.0, 7.4, 12.0, 6.0, `data-kind="${kind}"`) : "",
    final ? "" : hotspot(`${prefix}-prev`, "上一步", 4.2, 89.5, 30.2, 6.7),
    hotspot(`${prefix}-next`, final ? "完成设备设置" : "下一步", final ? 4.1 : 37.6, 89.5, final ? 91.8 : 58.4, 6.8)
  ].join("");
}

function readyHotspots(kind) {
  const startAction = kind === "hospital" ? "hospital-open-control" : "home-next";
  return [
    hotspot(startAction, "开始使用 V4", 6.0, 49.5, 88.0, 6.0),
    hotspot("ready-open-assistant", "打开 Cozy Assistant", 8.0, 72.7, 84.0, 7.0, `data-kind="${kind}"`),
    hotspot("ready-open-clean-guide", "打开 Clean & Assemble", 8.0, 80.3, 84.0, 7.0, `data-kind="${kind}"`),
    hotspot("ready-contact-support", "联系 Momcozy 支持", 8.0, 88.0, 84.0, 6.5)
  ].join("");
}

function codeKeypadHotspots() {
  const keys = [
    ["1", 4.3, 65.0], ["2", 35.3, 65.0], ["3", 66.3, 65.0],
    ["4", 4.3, 71.5], ["5", 35.3, 71.5], ["6", 66.3, 71.5],
    ["7", 4.3, 78.0], ["8", 35.3, 78.0], ["9", 66.3, 78.0],
    ["0", 35.3, 84.6]
  ];
  return `${keys.map(([value, x, y]) => hotspot("enter-code", `输入数字 ${value}`, x, y, 29.2, 5.9, `data-value="${value}"`)).join("")}${hotspot("delete-code", "删除验证码", 69.5, 84.6, 22.0, 5.9)}`;
}

function controlHotspots(kind, modeAction = kind === "home" ? "home-mode-list" : "control-open-mode") {
  return [
    hotspot("control-open-help", "打开吸乳帮助", 73.0, 4.3, 11.0, 5.7),
    hotspot("control-open-settings", "打开吸乳器设置", 85.0, 4.3, 11.0, 5.7),
    hotspot(modeAction, "切换或自定义吸乳模式", 72.0, 29.4, 22.5, 7.2),
    hotspot("control-level-down", "降低预设档位", 8.5, 54.3, 20.0, 4.9),
    hotspot("control-level-up", "提高预设档位", 71.5, 54.3, 20.0, 4.9)
  ].join("");
}

function screenBackHotspot(kind, screen) {
  const backScreens = kind === "hospital"
    ? new Set(["manual", "found", "scan", "code", "binding", "success", "pump-control", "pump-running", "pump-finished", "pump-dashboard"])
    : new Set(["control", "pumping", "finished", "dashboard"]);
  if (!backScreens.has(screen.id)) return "";
  const position = screen.id === "pump-finished" || screen.id === "finished"
    ? [2.5, 34.8, 13.5, 7.0]
    : screen.id === "code"
      ? [6.5, 7.5, 13.5, 6.5]
      : [2.0, 4.0, 13.5, 7.0];
  return hotspot("screen-back", "返回上一个页面", ...position, `data-kind="${kind}"`);
}

function hospitalHotspots(screen) {
  switch (screen.id) {
    case "empty": return `${hotspot("hospital-next", "添加设备", 30.5, 33.0, 38.8, 6.4)}${contentCardHotspots()}${appTabHotspots("hospital")}`;
    case "manual": return [
      hotspot("hospital-next", "选择 V4 吸乳器", 4.2, 27.9, 28.6, 13.7),
      hotspot("hospital-open-scan", "扫描设备二维码", 87.0, 4.6, 10.0, 7.0),
      hotspot("hospital-refresh-nearby", "刷新附近设备", 82.0, 13.2, 14.0, 8.0),
      hotspot("unsupported-device", "查看 M5", 35.5, 27.9, 28.6, 13.7, 'data-device="M5"'),
      hotspot("unsupported-device", "查看 M6", 67.0, 27.9, 28.6, 13.7, 'data-device="M6"'),
      hotspot("unsupported-device", "查看 M6", 4.2, 42.7, 28.6, 13.7, 'data-device="M6"'),
      hotspot("unsupported-device", "查看 M9 Pro", 35.5, 42.7, 28.6, 13.7, 'data-device="M9 Pro"'),
      hotspot("unsupported-device", "查看 MeggO", 4.2, 62.3, 28.6, 13.7, 'data-device="MeggO"')
    ].join("");
    case "found": return hotspot("hospital-next", "扫描添加设备", 6.4, 86.9, 87.2, 6.1);
    case "scan": return `${hotspot("toggle-flashlight", state.flashlightOn ? "关闭闪光灯" : "打开闪光灯", 41.5, 51.2, 17.0, 8.2)}${hotspot("hospital-next", "下一步", 7.5, 86.9, 85.0, 6.2)}`;
    case "code":
      return [
        codeKeypadHotspots(),
        hotspot("resend-code", "重新发送验证码", 7.0, 36.0, 45.0, 5.0),
        hotspot("submit-code", "下一步", 8.4, 55.0, 83.2, 5.9, state.codeDigit ? "" : "disabled")
      ].join("");
    case "success":
      return [
        hotspot("hospital-refresh-bound", "刷新绑定设备", 82.0, 12.5, 14.0, 7.0),
        hotspot("hospital-open-control", "打开已绑定的 V4", 4.0, 18.5, 92.0, 12.0),
        hotspot("hospital-learn", "学习使用设备", 6.4, 83.2, 87.2, 6.2),
        hotspot("complete-hospital", "完成绑定", 34.0, 90.3, 32.0, 4.0)
      ].join("");
    case "training-welcome":
      return [
        hotspot("hospital-training-ready", "跳过设备教学", 76.8, 7.2, 17.3, 5.5),
        hotspot("hospital-next", "开始设备教学", 6.0, 87.5, 88.0, 6.0)
      ].join("");
    case "training-guide": return trainingGuideHotspots("hospital");
    case "training-guide-final": return trainingGuideHotspots("hospital", true);
    case "training-ready": return readyHotspots("hospital");
    case "pump-control": return controlHotspots("hospital");
    case "pump-running":
      return controlHotspots("hospital", "control-open-mode");
    case "pump-finished":
      return [
        hotspot("hospital-left-up", "增加左侧奶量", 18.5, 63.0, 12.0, 2.9),
        hotspot("hospital-left-down", "减少左侧奶量", 18.5, 65.9, 12.0, 2.9),
        hotspot("hospital-right-up", "增加右侧奶量", 69.5, 63.0, 12.0, 2.9),
        hotspot("hospital-right-down", "减少右侧奶量", 69.5, 65.9, 12.0, 2.9),
        hotspot("edit-session-time", "修改吸乳日期和时间", 32.0, 43.5, 36.0, 5.5),
        hotspot("open-duration-picker", "选择吸乳时长", 5.0, 79.5, 90.0, 7.5),
        hotspot("hospital-save-session", "保存吸乳记录", 5.0, 90.1, 90.0, 6.2)
      ].join("");
    case "pump-logged":
      return hotspot("hospital-show-dashboard", "查看吸乳子场景卡", 0, 0, 100, 100);
    case "pump-dashboard": return "";
    default: return "";
  }
}

function homeHotspots(screen) {
  switch (screen.id) {
    case "connect-empty": return `${hotspot("home-connection-found", "添加 V4 设备", 30.5, 33.0, 38.8, 6.4)}${contentCardHotspots()}${appTabHotspots("home")}`;
    case "connect-device": return [
      hotspot("home-add-another-device", "添加其他设备", 83.0, 6.0, 14.0, 7.0),
      hotspot("home-connection-start-training", "打开 V4 快速设置", 4.0, 14.0, 92.0, 33.0),
      hotspot("home-connection-start-training", "开始设备教学", 36.0, 36.0, 28.0, 4.8),
      appTabHotspots("home")
    ].join("");
    case "welcome":
      return [
        hotspot("home-ready", "跳过设备教学", 76.8, 7.2, 17.3, 5.5),
        hotspot("home-next", "开始设备教学", 6.0, 87.5, 88.0, 6.0)
      ].join("");
    case "guide": return trainingGuideHotspots("home");
    case "guide-final": return trainingGuideHotspots("home", true);
    case "ready": return readyHotspots("home");
    case "control": return controlHotspots("home");
    case "pumping":
      return controlHotspots("home", "control-open-mode");
    case "finished": return [
      hotspot("hospital-left-up", "增加左侧奶量", 18.5, 63.0, 12.0, 2.9),
      hotspot("hospital-left-down", "减少左侧奶量", 18.5, 65.9, 12.0, 2.9),
      hotspot("hospital-right-up", "增加右侧奶量", 69.5, 63.0, 12.0, 2.9),
      hotspot("hospital-right-down", "减少右侧奶量", 69.5, 65.9, 12.0, 2.9),
      hotspot("edit-session-time", "修改吸乳日期和时间", 32.0, 43.5, 36.0, 5.5),
      hotspot("open-duration-picker", "选择吸乳时长", 5.0, 79.5, 90.0, 7.5),
      hotspot("save-session", "保存吸乳记录", 5.0, 90.1, 90.0, 6.2)
    ].join("");
    case "logged": return hotspot("show-dashboard", "查看吸乳数据", 0, 0, 100, 100);
    case "dashboard": return hotspot("home-control", "开始 Milk Boost", 72.0, 90.2, 22.0, 6.7);
    case "device": return hotspot("home-control", "打开吸乳器控制", 4.0, 14.3, 92.0, 32.8);
    default: return "";
  }
}

function connectionMarkup(screen) {
  const sheetStates = {
    "connect-found": { action: "home-connection-connect", label: "Connect", className: "" },
    "connect-connecting": { action: "", label: "Connecting", className: "connecting" },
    "connect-done": { action: "home-connection-complete", label: "Done", className: "done" }
  };
  const sheet = sheetStates[screen.id];
  if (sheet) {
    const action = sheet.action ? `data-action="${sheet.action}"` : "disabled";
    const loader = screen.id === "connect-connecting" ? icon("loader-circle", "连接中") : "";
    return `<div class="connection-shade" aria-hidden="true"></div>
      <section class="connect-sheet" aria-label="V4 设备连接">
        <button type="button" class="connect-close" data-action="home-connection-cancel" aria-label="关闭连接">${icon("x", "关闭连接")}</button>
        <strong>V4</strong>
        <span>New Device Connectable</span>
        <img src="./assets/figma-755/home-connect-v4.png" width="180" height="136" alt="V4 吸乳器" draggable="false" />
        <button type="button" class="connect-sheet-button ${sheet.className}" ${action}>${loader}<span>${sheet.label}</span></button>
      </section>`;
  }
  return "";
}

function guideExperienceMarkup(screen) {
  if (!["training-guide", "training-guide-final", "guide", "guide-final"].includes(screen.id)) return "";
  const playback = state.guideVideoPlaying
    ? `<span class="guide-playback-state playing">${icon("pause", "视频播放中")}<small>Playing</small></span>`
    : "";
  const fullscreen = guideFullscreen
    ? `<button type="button" class="guide-fullscreen-shade" data-action="guide-close-fullscreen" aria-label="关闭全屏视频"></button>
      <section class="guide-fullscreen-dialog" role="dialog" aria-modal="true" aria-label="How-to video">
        <header><strong>How-to video</strong><button type="button" data-action="guide-close-fullscreen" aria-label="关闭全屏视频">${icon("x", "关闭")}</button></header>
        <div class="guide-fullscreen-video"><span>${icon(state.guideVideoPlaying ? "pause" : "play", state.guideVideoPlaying ? "暂停" : "播放")}</span><strong>Disassemble to Clean</strong><small>15 sec · V4 setup guide</small></div>
        <button type="button" class="guide-fullscreen-control" data-action="guide-toggle-video">${state.guideVideoPlaying ? "Pause video" : "Play video"}</button>
      </section>`
    : "";
  return `${playback}${fullscreen}`;
}

function durationPickerMarkup(screen) {
  if (!durationPickerOpen || !["pump-finished", "finished"].includes(screen.id)) return "";
  const options = ["15 min", "20 min 30 sec", "25 min", "30 min"];
  return `<button type="button" class="duration-picker-shade" data-action="close-duration-picker" aria-label="关闭时长选择"></button>
    <section class="duration-picker" role="dialog" aria-modal="true" aria-label="Pumping duration">
      <header><h2>Pumping duration</h2><button type="button" data-action="close-duration-picker" aria-label="关闭">${icon("x", "关闭")}</button></header>
      <div>${options.map(value => `<button type="button" class="${state.sessionDuration === value ? "selected" : ""}" data-action="select-duration" data-value="${value}" aria-pressed="${state.sessionDuration === value}"><span>${value}</span>${state.sessionDuration === value ? icon("check", "已选择") : icon("chevron-right", "选择")}</button>`).join("")}</div>
    </section>`;
}

function calibrationStepper(screenId) {
  const statesByScreen = {
    "check-initiation": ["current", "future"],
    "check-fit": ["complete", "current"],
    "check-fit-passed": ["complete", "complete"]
  };
  const states = statesByScreen[screenId];
  if (!states) {
    const found = screenId === "check-comfort-found";
    return `<div class="best-level-kicker ${found ? "is-set" : ""}"><span>Optional · ${found ? "Best level set" : "Best level test"}</span></div>`;
  }
  const labels = ["Initiation", "Fit check"];
  const track = states.map((status, index) => {
    const step = `<span class="check-step ${status}" aria-current="${status === "current" ? "step" : "false"}">${index + 1}</span>`;
    if (index === states.length - 1) return step;
    return `${step}<span class="check-connector ${status === "complete" ? "complete" : ""}"></span>`;
  }).join("");
  const text = labels.map((label, index) => `<span class="check-step-label ${states[index]}">${label}</span>`).join("");
  return `<div class="check-stepper" aria-label="设备检查进度"><div class="check-step-track">${track}</div><div class="check-step-labels">${text}</div></div>`;
}

function calibrationBody(screen) {
  switch (screen.id) {
    case "check-initiation":
      return `<div class="check-body initiation-body">
        <div class="check-reading"><strong>00:03</strong><span>Level 3</span></div>
        <div class="check-progress"><span style="--progress:22%"></span></div>
        <p class="check-progress-copy">Preparing for fit detection...</p>
      </div>`;
    case "check-fit":
      return `<div class="check-body fit-body">
        <div class="fit-cards">
          <div class="fit-card checking"><strong>L</strong><span>Checking...</span></div>
          <div class="fit-card checking"><strong>R</strong><span>Checking...</span></div>
        </div>
        <div class="check-progress"><span style="--progress:64%"></span></div>
        <p class="check-progress-copy">Checking seal stability...</p>
      </div>`;
    case "check-fit-passed":
      return `<div class="check-body passed-body">
        <div class="fit-cards">
          <div class="fit-card passed"><strong>L</strong><span>Good fit</span></div>
          <div class="fit-card passed"><strong>R</strong><span>Good fit</span></div>
        </div>
      </div>`;
    case "check-comfort":
      return `<div class="check-body comfort-body">
        <div class="comfort-control"><span>Current level</span><div><strong>${state.comfortLevel}</strong><small>of 15</small><button type="button" data-action="comfort-down" aria-label="降低负压">−</button><button type="button" class="primary" data-action="comfort-up" aria-label="提高负压">+</button></div></div>
        <div class="comfort-tip positive"><strong>Still comfortable?</strong><span>Press + until mildly uncomfortable</span></div>
        <div class="comfort-tip caution"><strong>Mildly uncomfortable?</strong><span>Press − once to return to comfort</span></div>
      </div>`;
    case "check-comfort-found":
      return `<div class="check-body found-body">
        <div class="comfort-result"><strong>${state.comfortLevel}</strong><span>Set level</span></div>
        <div class="comfort-sides"><span><b>L</b> Level ${state.comfortLevel}</span><span><b>R</b> Level ${state.comfortLevel}</span></div>
      </div>`;
    default:
      return "";
  }
}

function calibrationFooter(screen) {
  switch (screen.id) {
    case "check-fit-passed":
      return `<button type="button" class="check-primary-action" data-action="calibration-start-pump">Start pumping</button>`;
    case "check-comfort":
      return `<button type="button" class="check-primary-action" data-action="calibration-next">Confirm this level</button><button type="button" class="check-text-action" data-action="calibration-close">Exit setup</button>`;
    case "check-comfort-found":
      return `<button type="button" class="check-text-action" data-action="calibration-test-again">Test again</button><button type="button" class="check-primary-action" data-action="calibration-use-level">Return to control</button>`;
    default:
      return "";
  }
}

function calibrationMarkup(screen, motion = {}) {
  if (!screen.calibration) return "";
  const motionClasses = [motion.entering ? "is-entering" : "", motion.stepChanging ? "is-step-changing" : ""].filter(Boolean).join(" ");
  const headings = {
    "check-initiation": ["Initiation", "Running the milk-initiation rhythm"],
    "check-fit": ["Fit check", "Keep still while both sides are checked."],
    "check-fit-passed": ["Fit check passed", "Both pumps have a stable seal."],
    "check-comfort": ["Find your best level", "Adjust slowly and stop if it hurts."],
    "check-comfort-found": ["Best level found", "Your preferred lactation suction is ready."]
  };
  const [title, subtitle] = headings[screen.id];
  return `<div class="calibration-shade ${motion.entering ? "is-entering" : ""}" aria-hidden="true"></div>
    <section class="calibration-modal ${screen.id} ${motionClasses}" role="dialog" aria-modal="true" aria-label="${title}">
      <button type="button" class="calibration-close" data-action="calibration-close" aria-label="关闭检查">${icon("x", "关闭检查")}</button>
      ${calibrationStepper(screen.id)}
      <header class="check-heading"><h1>${title}</h1><p>${subtitle}</p></header>
      ${calibrationBody(screen)}
      <footer class="check-footer">${calibrationFooter(screen)}</footer>
    </section>`;
}

function modeStatusBar() {
  return `<div class="mode-statusbar" aria-hidden="true"><strong>9:41</strong><span>${icon("signal", "蜂窝网络")}${icon("wifi", "无线网络")}${icon("battery-full", "电量")}</span></div>`;
}

function modeHeader(title, options = {}) {
  const backAction = options.backAction || "screen-back";
  const backKind = backAction === "screen-back" ? 'data-kind="home"' : "";
  const help = options.help
    ? `<button type="button" class="mode-header-action" data-action="mode-open-introduction" aria-label="查看模式介绍">${icon("circle-help", "查看模式介绍")}</button>`
    : "";
  const close = options.close
    ? `<button type="button" class="mode-header-action" data-action="mode-close-introduction" aria-label="关闭模式介绍">${icon("x", "关闭模式介绍")}</button>`
    : help;
  return `${modeStatusBar()}<header class="mode-header"><button type="button" class="mode-back" data-action="${backAction}" ${backKind} aria-label="返回上一个页面">${icon("chevron-left", "返回")}</button><h1>${title}</h1>${close}</header>`;
}

function modeProgramBar() {
  const segments = ["stimulate", "stimulate", "rest", "mixing", "stimulate", "stimulate", "mixing", "stimulate", "stimulate", "rest", "mixing", "stimulate"];
  return `<div class="mode-program-bar" aria-label="Stimulation, rest and mixing rhythm">${segments.map(type => `<i class="${type}"></i>`).join("")}</div>`;
}

function modeProgramCard(name, interactive) {
  const applyAction = interactive ? 'data-action="mode-use-preset"' : "";
  const detailAction = interactive ? 'data-action="mode-open-program-detail"' : "";
  return `<article class="mode-program-card" data-mode-name="${name}">
    <div class="mode-program-heading"><span><strong>${name}</strong><small>45:00</small></span><button type="button" class="mode-program-details" ${detailAction} data-mode-name="${name}">Details ${icon("chevron-right", "查看详情")}</button></div>
    <button type="button" class="mode-program-apply" ${applyAction} data-mode-name="${name}" aria-label="应用 ${name}">
      <p>Gentle and convenient, designed for safely expressing milk on the go.</p>
      ${modeProgramBar()}
      <span class="mode-program-legend"><span class="stimulate">Stimulate</span><span class="rest">Rest</span><span class="mixing">Mixing</span></span>
    </button>
  </article>`;
}

function modeListContent(interactive = true) {
  const manualAction = interactive ? 'data-action="mode-apply-manual"' : "";
  const createAction = interactive ? 'data-action="mode-start-create"' : "";
  const manualModes = [
    ["Stimulation", "Gentle and comfortable", "heart", "activity"],
    ["Expression", "Fast-paced and intense", "droplet", ""],
    ["Mixed", "Fast-paced and intense", "droplet", ""]
  ];
  return `<div class="mode-list-content">
    <p class="mode-list-kicker">Manual</p>
    <div class="mode-list-stack">
      ${manualModes.map(([name, description, leadingIcon, trailingIcon]) => `<button type="button" class="mode-list-card ${state.selectedManualMode === name ? "selected" : ""}" ${manualAction} data-mode-name="${name}"><span class="mode-card-icon ${name === "Stimulation" ? "heart" : "drop"}">${icon(leadingIcon, `${name} 图标`)}</span><span class="mode-card-copy"><strong>${name}</strong><small>${description}</small></span>${trailingIcon ? `<span class="mode-card-wave">${icon(trailingIcon, "当前韵律")}</span>` : ""}</button>`).join("")}
    </div>
    <div class="mode-list-section-title"><p>Programs</p><button type="button" ${createAction}>${icon("plus", "新建模式")}<span>Create</span></button></div>
    <div class="mode-list-stack mode-program-list">
      ${modeProgramCard("Milk Boost Mode P1", interactive)}
      ${modeProgramCard("Milk Boost Mode P2", interactive)}
    </div>
  </div>`;
}

function modeListScreen() {
  return `<section class="mode-screen mode-list-screen">${modeStatusBar()}<div class="mode-list-sheet"><header class="mode-list-header"><button type="button" data-action="screen-back" data-kind="home" aria-label="关闭模式列表">${icon("x", "关闭模式列表")}</button><h1>List</h1></header>${modeListContent()}</div></section>`;
}

function modeProgramDetailScreen() {
  const programName = state.activeProgramName === "Milk Boost Mode P2" ? "Milk Boost Mode P2" : "Milk Boost Mode P1";
  const sections = [
    ["01", "Massage", "15min  I  Medium  I  Level 5", "massage"],
    ["02", "Lactation", "15min  I  Medium  I  Level 13", "lactation"],
    ["03", "Mixing1", "15min  I  Medium  I  Level 5", "mixing"],
    ["04", "Mixing2", "15min  I  Medium  I  Level 13", "mixing-soft"],
    ["05", "Massage", "15min  I  Medium  I  Level 5", "massage"],
    ["06", "Lactation", "15min  I  Medium  I  Level 13", "lactation"]
  ];
  return `<section class="mode-screen mode-program-detail-screen">
    ${modeHeader(programName)}
    <div class="mode-program-detail-content">
      <section class="mode-program-detail-summary"><strong>${programName}</strong><p>Gentle and convenient, designed for safely expressing milk on the go.</p></section>
      <h2>Sequential execution</h2>
      <div class="mode-program-timeline">
        ${sections.map(([number, title, meta, type]) => `<article class="mode-program-step ${type}"><i aria-hidden="true"></i><span class="mode-program-step-title"><b>${number}</b><strong>${title}</strong></span><small>${meta}</small></article>`).join("")}
      </div>
    </div>
  </section>`;
}

function modeRhythmOptions() {
  const options = [
    ["Gentle", "Soft, even pulses for a comfortable start", [3, 6, 10, 7, 4, 8, 12, 7, 3]],
    ["Balanced", "Natural alternating pulses for daily pumping", [5, 9, 6, 11, 7, 4, 10, 6, 8]],
    ["Intense", "Fast, concentrated pulses for efficient expression", [8, 12, 7, 13, 9, 12, 6, 11, 8]]
  ];
  return options.map(([name, description, bars]) => `<button type="button" class="mode-rhythm-option ${state.selectedManualRhythm === name ? "selected" : ""}" data-action="mode-select-rhythm" data-value="${name}"><span class="mode-rhythm-radio"></span><span class="mode-rhythm-copy"><strong>${name}</strong><small>${description}</small></span><span class="mode-rhythm-wave" aria-hidden="true">${bars.map(height => `<i style="--bar-height:${height}px"></i>`).join("")}</span></button>`).join("");
}

function modeRhythmScreen() {
  return `<section class="mode-screen mode-rhythm-screen">
    <div class="mode-list-background">${modeListScreen()}</div>
    <div class="mode-rhythm-shade" aria-hidden="true"></div>
    <section class="mode-rhythm-sheet" role="dialog" aria-modal="true" aria-label="Rhythm">
      <header><button type="button" data-action="mode-rhythm-close" aria-label="关闭韵律弹窗">${icon("x", "关闭韵律弹窗")}</button><h1>Rhythm</h1><span></span></header>
      <div class="mode-rhythm-summary"><span>${icon(state.selectedManualMode === "Stimulation" ? "heart" : "droplet", `${state.selectedManualMode} 图标`)}</span><div><small>Manual mode</small><strong>${escapeHtml(state.selectedManualMode)}</strong></div></div>
      <p class="mode-rhythm-label">Select a rhythm</p>
      <div class="mode-rhythm-options">${modeRhythmOptions()}</div>
      <button type="button" class="mode-rhythm-apply" data-action="mode-apply-rhythm">Use this rhythm</button>
    </section>
  </section>`;
}

function modeNameScreen() {
  return `<section class="mode-screen mode-name-screen">
    <div class="mode-list-background">${modeListScreen()}</div>
    <div class="mode-name-shade" aria-hidden="true"></div>
    <div class="mode-name-sheet" role="dialog" aria-modal="true" aria-label="New Mode">
      <div class="mode-name-title"><button type="button" data-action="screen-back" data-kind="home">Cancel</button><strong>New Mode</strong><span></span></div>
      <label><span>Mode name</span><input type="text" data-mode-name-input maxlength="28" value="${escapeHtml(state.customModeName)}" placeholder="Please enter the mode name" /></label>
      <label><span>Description</span><textarea data-mode-description-input maxlength="80" placeholder="Describe how you want to use this mode">${escapeHtml(state.customModeDescription)}</textarea></label>
      <button type="button" class="mode-primary" data-action="mode-save-name">Save</button>
    </div>
  </section>`;
}

function modeSectionRows(count) {
  return state.customModeSections.slice(0, count).map((section, index) => {
    return `<button type="button" class="mode-segment-row" data-action="mode-edit-section" data-section="${index + 1}">
      <b>${String(index + 1).padStart(2, "0")}</b><span><strong>${escapeHtml(section.type)}</strong><small>${section.duration} min · Level ${section.level} · ${escapeHtml(section.light)}</small></span>${icon("chevron-right", "编辑此分段")}
    </button>`;
  }).join("");
}

function modeOverviewScreen(complete = false) {
  const sectionCount = complete ? 2 : 1;
  return `<section class="mode-screen mode-overview-screen">
    ${modeHeader("Edit", { help: true })}
    <div class="mode-overview-content">
      <div class="mode-overview-heading"><span><strong>${escapeHtml(state.customModeName || "Personal-01")}</strong><small>Customized segmented suction mode</small></span><button type="button" data-action="mode-start-create">${icon("pencil", "修改名称")}</button></div>
      <div class="mode-overview-title"><span>Segmented suction</span><small>${sectionCount} section${sectionCount > 1 ? "s" : ""} · ${state.customModeSections.slice(0, sectionCount).reduce((sum, section) => sum + section.duration, 0)} min</small></div>
      <div class="mode-segment-list">${modeSectionRows(sectionCount)}</div>
      ${complete ? "" : `<button type="button" class="mode-add-section" data-action="mode-add-section">${icon("plus-circle", "添加分段")}<span>Add Section</span></button>`}
    </div>
    <div class="mode-bottom-action"><button type="button" class="mode-primary" data-action="mode-save-to-control">Save</button></div>
  </section>`;
}

function modeChoiceButtons(section) {
  const choices = ["Massage", "Breast pumping", "Mixed 1", "Mixed 2", "Rest"];
  return choices.map(choice => `<button type="button" class="${section.type === choice ? "active" : ""}" data-action="mode-select-type" data-value="${choice}"><span></span>${choice}</button>`).join("");
}

function modeEditorBody(interactive = true) {
  const index = Math.max(0, Math.min(1, state.modeEditingSection - 1));
  const section = state.customModeSections[index];
  const disabled = interactive ? "" : "disabled";
  const lights = ["Glow", "Soft", "Clear"].map(value => `<button type="button" class="${section.light === value ? "active" : ""}" data-action="mode-select-light" data-value="${value}" ${disabled}>${value}</button>`).join("");
  return `<div class="mode-editor-content">
    <section class="mode-editor-card mode-type-card"><div class="mode-field-label"><strong>Mode</strong><span>${escapeHtml(section.type)}</span></div><div class="mode-choice-grid">${modeChoiceButtons(section)}</div></section>
    <section class="mode-editor-card"><div class="mode-field-label"><strong>Level</strong><span>${section.level} / 15</span></div><div class="mode-stepper"><button type="button" data-action="mode-level-down" ${disabled}>${icon("minus", "降低档位")}</button><b>${section.level}<small>/15</small></b><button type="button" data-action="mode-level-up" ${disabled}>${icon("plus", "提高档位")}</button></div></section>
    <section class="mode-editor-card"><div class="mode-field-label"><strong>Light</strong><span>${escapeHtml(section.light)}</span><button type="button" class="mode-toggle ${state.modeLightOn ? "on" : ""}" data-action="mode-toggle-light" aria-pressed="${state.modeLightOn}" ${disabled}><i></i></button></div><div class="mode-segmented-control light-control">${lights}</div></section>
    <button type="button" class="mode-trial ${state.modeTrialPlaying ? "playing" : ""}" data-action="mode-toggle-trial" aria-pressed="${state.modeTrialPlaying}" ${disabled}>${icon(state.modeTrialPlaying ? "pause" : "play", state.modeTrialPlaying ? "停止试听" : "试听")}<span>${state.modeTrialPlaying ? "Playing" : "Try it"}</span></button>
  </div>`;
}

function modeEditorScreen() {
  return `<section class="mode-screen mode-editor-screen">${modeHeader("Edit", { help: true })}${modeEditorBody()}<div class="mode-bottom-action"><button type="button" class="mode-primary" data-action="mode-editor-next">Next</button></div></section>`;
}

function modeIntroductionScreen() {
  const descriptions = [
    ["Massage", "Gentle short cycles help initiate milk release before expression."],
    ["Breast pumping", "Longer, deeper cycles support efficient milk expression."],
    ["Mixed 1", "Short stimulation and expression cycles alternate gently."],
    ["Mixed 2", "A stronger alternating rhythm for an efficient session."],
    ["Rest", "A quiet interval lets the breast relax between active sections."]
  ];
  return `<section class="mode-screen mode-introduction-screen"><div class="mode-editor-background">${modeHeader("Edit")}${modeEditorBody(false)}</div><div class="mode-intro-shade"></div><div class="mode-intro-dialog" role="dialog" aria-modal="true" aria-label="Mode introduction"><header><strong>Mode introduction</strong><button type="button" data-action="mode-close-introduction" aria-label="关闭模式介绍">${icon("x", "关闭")}</button></header><div>${descriptions.map(([title, copy], index) => `<article><i>${String(index + 1).padStart(2, "0")}</i><span><strong>${title}</strong><p>${copy}</p></span></article>`).join("")}</div></div></section>`;
}

function customModeScreenMarkup(screen) {
  const content = screen.id === "mode-list" ? modeListScreen()
    : screen.id === "mode-program-detail" ? modeProgramDetailScreen()
      : screen.id === "mode-rhythm" ? modeRhythmScreen()
      : screen.id === "mode-name" ? modeNameScreen()
      : screen.id === "mode-overview" ? modeOverviewScreen(false)
        : screen.id === "mode-editor" ? modeEditorScreen()
          : screen.id === "mode-overview-complete" ? modeOverviewScreen(true)
            : modeIntroductionScreen();
  previousCheckScreenId = null;
  return `<div class="screen-frame mode-screen-frame" style="--content-width:${screen.width};--content-height:${screen.height}"><div class="screen-scroll"><div class="screen-canvas mode-screen-canvas">${content}</div></div></div>`;
}

function appStatusBar() {
  return `<div class="ai-statusbar"><strong>9:41</strong><span>${icon("signal", "蜂窝网络")}${icon("wifi", "无线网络")}${icon("battery-full", "电池")}</span></div>`;
}

function experienceHeader(kind, title, action = "screen-back") {
  return `<header class="ai-page-header">
    <button type="button" data-action="${action}" data-kind="${kind}" aria-label="返回上一个页面">${icon("chevron-left", "返回")}</button>
    <h1>${title}</h1><span></span>
  </header>`;
}

const pumpingInsights = {
  trend: {
    navTitle: "Pumping Trend insight",
    kicker: "Pumping Trend",
    title: "Your output stayed steadier across today's sessions.",
    summary: "Your total volume increased while session length stayed close to your recent routine. The change appears to come from more even output across sessions.",
    metrics: [["12%", "Above 7-day average"], ["4", "Sessions today"], ["3h 12m", "Average spacing"]],
    evidence: [
      "Output increased without a meaningful rise in total pumping time.",
      "Session volumes stayed within a tighter range than earlier this week.",
      "Morning and afternoon spacing was close to your recent comfortable pattern."
    ],
    recommendation: "Keep tomorrow's first session near the same time, then aim for similar spacing without extending a session just to chase volume.",
    context: "Pumping Trend: today's volume is 12% above the 7-day average with steadier session spacing.",
    questions: ["What may have improved my consistency?", "Should I keep the same session timing?", "How can I protect comfort as volume rises?"]
  },
  lactation: {
    navTitle: "Lactation insight",
    kicker: "Lactation",
    title: "Level 5 gave the best comfort-to-output balance.",
    summary: "Your strongest sessions did not require the highest suction. Level 5 paired stable output with fewer comfort adjustments.",
    metrics: [["Level 5", "Best balance"], ["3 of 4", "Comfortable sessions"], ["Milk Boost", "Most used mode"]],
    evidence: [
      "Output remained stable at Level 5 across the longest comfortable sessions.",
      "Higher levels did not produce a clear improvement in recorded volume.",
      "Fewer setting changes were made when Milk Boost began at Level 5."
    ],
    recommendation: "Start your next session at a lower comfortable level, then move toward Level 5 only if your body feels ready. Comfort should remain the limit.",
    context: "Lactation: Level 5 provided the best recorded comfort-to-output balance in Milk Boost mode.",
    questions: ["Why might Level 5 work better for me?", "Should I start every session at Level 5?", "What signs mean I should lower suction?"]
  }
};

function deviceAiScreen(kind) {
  const dashboardAction = kind === "hospital" ? "hospital-open-insights" : "home-open-insights";
  const controlAction = kind === "hospital" ? "hospital-open-control" : "home-control";
  const communityAction = kind === "hospital" ? "hospital-open-community" : "home-open-community";
  return `<div class="screen-frame experience-frame" style="--content-width:393;--content-height:852">
    <div class="screen-scroll"><div class="screen-canvas device-ai-canvas">
      <img class="figma-screen device-ai-base" src="./assets/figma-755/${rollbackScreens0322.device.image}?v=${VERSION}" width="393" height="852" alt="我的设备" draggable="false" />
      <button type="button" class="device-pump-link" data-action="${controlAction}" aria-label="打开 Breast Pump 控制页"></button>
      <section class="device-ai-summary" aria-label="AI 吸乳数据洞察">
        <button type="button" class="cozy-ai-entry" data-action="open-cozy-chat" data-kind="${kind}" aria-label="打开 CozyAI 对话">
          <img src="./assets/figma-755/cozy-ai-rabbit-v045.jpg" alt="" /><span>CozyAI</span>
        </button>
        <div><strong>AI pumping insights</strong><p>Your output is most consistent between 9–11 AM this week.</p></div>
        <button type="button" class="device-insight-more" data-action="${dashboardAction}">View more ${icon("chevron-right", "查看更多")}</button>
      </section>
      <button type="button" class="device-community-entry" data-action="${communityAction}">
        <span class="device-community-mark" aria-hidden="true">M</span>
        <span class="community-entry-copy"><strong>Pumping moms</strong><em><span class="member-dots">A M S</span>128 moms active today</em></span>
        <span class="community-entry-arrow">${icon("chevron-right", "进入群组")}</span>
      </button>
      <div class="device-ai-hotspots">${hotspot("app-add-device", "添加设备", 83.0, 6.0, 14.0, 7.0, `data-kind="${kind}"`)}${appTabHotspots(kind)}</div>
    </div></div>
  </div>`;
}

function insightCallout(kind, insight, copy) {
  const action = kind === "hospital" ? "hospital-open-insight-detail" : "home-open-insight-detail";
  return `<aside class="chart-insight"><div><strong>Key insight</strong><p>${copy}</p></div><button type="button" data-action="${action}" data-insight="${insight}">More ${icon("chevron-right", "查看详情")}</button></aside>`;
}

function insightsHomeScreen(kind) {
  const controlAction = kind === "hospital" ? "hospital-open-control" : "home-control";
  const communityAction = kind === "hospital" ? "hospital-open-community" : "home-open-community";
  return `<div class="screen-frame experience-frame insights-frame" style="--content-width:402;--content-height:1400">
    <div class="screen-scroll"><div class="screen-canvas insights-home-canvas">
      ${appStatusBar()}
      ${experienceHeader(kind, "Pumping")}
      <div class="insights-scroll-content">
        <section class="daily-summary-card" aria-label="Daily pumping summary">
          <div class="daily-summary-copy"><small>Daily summary</small><h2>Your pumping rhythm felt steadier today.</h2><p>Your sessions formed a more consistent, comfortable pattern that may be worth repeating tomorrow.</p></div>
          <button type="button" class="daily-cozy-entry" data-action="open-cozy-chat" data-kind="${kind}">
            <img src="./assets/figma-755/cozy-ai-rabbit-v045.jpg" alt="CozyAI rabbit" /><span><strong>Chat with CozyAI</strong><small>Ask about today's pumping data</small></span>${icon("chevron-right", "进入对话")}
          </button>
        </section>
        <article class="data-chart-card pumping-trend-card">
          <img class="insight-chart-image" src="./assets/figma-755/pumping-trend-v045.png" alt="Pumping Trend chart" />
          ${insightCallout(kind, "trend", "Today is 12% above your 7-day average.")}
        </article>
        <article class="data-chart-card lactation-card">
          <img class="insight-chart-image" src="./assets/figma-755/lactation-v045.png" alt="Lactation level and mode data" />
          ${insightCallout(kind, "lactation", "Level 5 gave the best comfort-to-output balance.")}
        </article>
        <button type="button" class="expert-guidance-entry" data-action="expert-guidance"><span><small>Expert guidance · 3 min read</small><strong>Build a steadier morning pumping routine</strong><em>Based on today's pumping pattern</em></span>${icon("chevron-right", "查看专家内容")}</button>
        <section class="insights-community-entry" aria-label="Pumping moms community preview"><button type="button" data-action="${communityAction}"><span class="community-monogram">M</span><span><strong>Pumping moms</strong><small><span class="member-dots">A M S</span>128 moms active today</small></span></button><button type="button" class="community-join-compact ${state.communityJoined ? "joined" : ""}" data-action="community-join" aria-pressed="${state.communityJoined}">${state.communityJoined ? "Joined" : "Join"}</button></section>
      </div>
    </div></div>
    <button type="button" class="insights-device-dock" data-action="${controlAction}"><img src="./assets/figma-755/home-pump-control-device.png" alt="V4 吸乳器" /><span><small>Connected · Mobile flow</small><strong>Milk Boost</strong><em>01:00 / 22:00</em></span><b>${icon("play", "打开控制页")}</b></button>
  </div>`;
}

function insightDetailScreen(kind) {
  const insightKey = pumpingInsights[state.activeInsight] ? state.activeInsight : "trend";
  const insight = pumpingInsights[insightKey];
  return `<div class="screen-frame experience-frame" style="--content-width:402;--content-height:874"><div class="screen-canvas insight-detail-canvas">
    ${appStatusBar()}${experienceHeader(kind, insight.navTitle)}
    <main class="insight-detail-body">
      <section class="insight-detail-hero"><small>${insight.kicker}</small><h2>${insight.title}</h2><p>${insight.summary}</p><div class="insight-detail-metrics">${insight.metrics.map(([value, label]) => `<span><strong>${value}</strong><small>${label}</small></span>`).join("")}</div></section>
      <section class="insight-detail-section"><h3>What the data shows</h3><ul>${insight.evidence.map(copy => `<li>${copy}</li>`).join("")}</ul></section>
      <section class="insight-detail-section insight-next-step"><h3>Suggested next step</h3><p>${insight.recommendation}</p></section>
      <button type="button" class="insight-detail-ask" data-action="open-cozy-chat" data-kind="${kind}" data-context="${insightKey}"><img src="./assets/figma-755/cozy-ai-rabbit-v045.jpg" alt="CozyAI rabbit" /><span><strong>Ask CozyAI about this insight</strong><small>The current analysis will be included</small></span>${icon("chevron-right", "进入对话")}</button>
    </main>
  </div></div>`;
}

function cozyChatScreen(kind) {
  const context = pumpingInsights[state.chatContext] || null;
  const messages = Array.isArray(state.cozyMessages) ? state.cozyMessages : [];
  const suggestions = context ? context.questions : ["How do I know the flange fits?", "What if the suction feels weak?", "I am having connection issues."];
  return `<div class="screen-frame experience-frame" style="--content-width:402;--content-height:874"><div class="screen-canvas cozy-chat-canvas ${context ? "has-context" : ""} ${messages.length ? "has-messages" : ""}">
    ${appStatusBar()}<header class="cozy-chat-nav"><button type="button" data-action="screen-back" data-kind="${kind}" aria-label="返回上一个页面">${icon("chevron-left", "返回")}</button><h1>CozyAI Device <small>Beta</small></h1><span></span></header>
    <main class="cozy-chat-body"><div class="cozy-chat-hero"><img src="./assets/figma-755/cozy-ai-rabbit-v045.jpg" alt="CozyAI rabbit" /><h2>${context ? "What would you like to understand?" : "How can I help with your Momcozy V4?"}</h2></div>
      ${context ? `<aside class="cozy-chat-context"><small>Insight context</small><strong>${context.context}</strong><button type="button" data-action="cozy-chat-clear-context" aria-label="移除洞察上下文">×</button></aside>` : ""}
      <div class="cozy-chat-thread" aria-live="polite">${messages.map(message => `<div class="cozy-chat-bubble ${message.role === "user" ? "is-user" : "is-ai"}">${escapeHtml(message.text)}</div>`).join("")}</div>
      <div class="cozy-chat-suggestions">${suggestions.map(question => `<button type="button" data-action="cozy-chat-suggest" data-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`).join("")}</div>
    </main>
    <form class="cozy-chat-composer" data-cozy-chat-form><div><button type="button" data-action="cozy-chat-context-info" aria-label="添加上下文">${icon("plus", "添加上下文")}</button><input name="cozy-message" type="text" autocomplete="off" placeholder="${context ? "Ask about this insight" : "Ask about your Momcozy V4"}" aria-label="发送给 CozyAI 的消息" /><button type="submit" aria-label="发送消息">${icon("arrow-up", "发送")}</button></div><small>AI-generated, not professional advice</small></form>
  </div></div>`;
}

function communityScreen(kind) {
  const bubbles = [["pumping","19","large"],["tired","14","medium"],["hands full","4","small"],["need company","18","hero"],["can't sleep","11","medium"],["baby sleeping","6","medium"],["music on","8","large"],["cluster feeding","7","small"]];
  return `<div class="screen-frame experience-frame" style="--content-width:402;--content-height:1040"><div class="screen-scroll"><div class="screen-canvas community-canvas">
    ${appStatusBar()}${experienceHeader(kind, "")}
    <section class="community-heading"><div><h1>Pumping moms</h1><p><span class="member-dots">A M S</span>128 moms active today</p></div><button type="button" class="${state.communityJoined ? "joined" : ""}" data-action="community-join" aria-pressed="${state.communityJoined}">${state.communityJoined ? "Joined" : "Join"}</button><p>A soft place for pump timers, bottle warmers, and tiny wins while the house is asleep.</p></section>
    <section class="community-status"><header><h2>Moms’ current status</h2><button type="button" data-action="community-share">${state.communityStatus ? `Shared: ${escapeHtml(state.communityStatus)}` : "Share yours"}</button></header><div class="status-bubbles">${bubbles.map(([label,count,size]) => `<button type="button" class="status-bubble ${size} ${state.communityStatus === label ? "selected" : ""}" data-action="community-select-status" data-status="${label}" aria-pressed="${state.communityStatus === label}"><strong>${label}</strong><small>${count}</small></button>`).join("")}</div><button type="button" class="community-share-bar" data-action="community-share">${state.communityStatus ? `Your status: ${escapeHtml(state.communityStatus)}` : "Want to say more about it?"}<span>Share</span></button></section>
    <article class="community-post"><header><span class="post-avatar">J</span><div><strong>John Alexander Smith <small>· 15 m</small></strong><em>● Pumping</em></div></header><p>Second letdown is taking its sweet time. I put one tiny lamp on and I am pretending this corner is a little night café.</p><div class="post-visual"><span>Late-night pumping room</span><button type="button" data-action="${state.communityJoined ? "community-create-post" : "community-join"}">${state.communityJoined ? "Create a post" : "Join & Post"}</button></div></article>
  </div></div></div>`;
}

function experienceScreenMarkup(kind, screen) {
  if (screen.view === "device-ai") return deviceAiScreen(kind);
  if (screen.view === "insights-home") return insightsHomeScreen(kind);
  if (screen.view === "insight-detail") return insightDetailScreen(kind);
  if (screen.view === "cozy-chat") return cozyChatScreen(kind);
  if (screen.view === "community") return communityScreen(kind);
  return "";
}

function controlOverlayMarkup(kind, screen) {
  if (!controlOverlay || !["pump-control", "control", "pump-running", "pumping"].includes(screen.id)) return "";

  const titles = {
    help: "Pumping help",
    settings: "Pump settings",
    mode: "Switch mode"
  };
  let body = "";
  let footerLabel = "Done";

  if (controlOverlay === "help") {
    const items = [
      ["scan-heart", "Wear both pumps securely", "Keep the collection cups centered and upright before starting."],
      ["shield-check", "Automatic checks come first", "Initiation and fit check run automatically after Start Pumping."],
      ["hand", "Finish with a long press", "Hold the finish control for 1.2 seconds to prevent accidental stops."]
    ];
    body = `<div class="control-help-list">${items.map(([itemIcon, title, copy]) => `<article><span>${icon(itemIcon, title)}</span><div><strong>${title}</strong><p>${copy}</p></div></article>`).join("")}</div>`;
    footerLabel = "Got it";
  } else if (controlOverlay === "settings") {
    body = `<div class="control-settings-list">
      <div class="control-device-status"><span>${icon("bluetooth", "蓝牙")}</span><div><small>Connected pump</small><strong>Momcozy V4</strong></div><em>Connected</em></div>
      <button type="button" class="control-setting-row" data-action="control-toggle-sound" aria-pressed="${state.controlSoundOn}"><span>${icon("volume-2", "声音反馈")}<span><strong>Sound feedback</strong><small>Play a tone for control changes</small></span></span><i class="control-setting-toggle ${state.controlSoundOn ? "on" : ""}"><b></b></i></button>
      <button type="button" class="control-setting-row" data-action="control-toggle-auto-lock" aria-pressed="${state.controlAutoLockOn}"><span>${icon("lock-keyhole", "自动锁定")}<span><strong>Auto-lock controls</strong><small>Lock controls after pumping starts</small></span></span><i class="control-setting-toggle ${state.controlAutoLockOn ? "on" : ""}"><b></b></i></button>
    </div>`;
  } else {
    const modes = [
      ["Stimulation", "Stimulate", "heart", "Gentle rhythm for milk release"],
      ["Lactation", "Lactation", "droplet", "Steady expression rhythm"],
      ["Mixed", "Mixed", "blend", "Alternates stimulation and expression"],
      ["Milk initiation", "Milk initiation", "waves", "Supports the first letdown"]
    ];
    body = `<p class="control-mode-note">Choose a standard pumping mode for this session.</p><div class="control-mode-sheet-list">${modes.map(([value, label, modeIcon, copy]) => `<button type="button" class="${state.controlMode === value ? "selected" : ""}" data-action="control-sheet-select-mode" data-value="${value}" aria-pressed="${state.controlMode === value}"><span>${icon(modeIcon, label)}</span><span><strong>${label}</strong><small>${copy}</small></span>${icon(state.controlMode === value ? "check" : "chevron-right", state.controlMode === value ? "已选择" : "选择")}</button>`).join("")}</div>`;
    footerLabel = kind === "hospital" ? "Close" : "Manage modes";
  }

  const footerAction = controlOverlay === "mode" && kind === "home" ? "home-mode-list" : "control-close-overlay";
  return `<button type="button" class="control-overlay-shade" data-action="control-close-overlay" aria-label="关闭${titles[controlOverlay]}"></button>
    <section class="control-overlay-sheet ${controlOverlay}" role="dialog" aria-modal="true" aria-label="${titles[controlOverlay]}">
      <header><h2>${titles[controlOverlay]}</h2><button type="button" data-action="control-close-overlay" aria-label="关闭">${icon("x", "关闭")}</button></header>
      <div class="control-overlay-body">${body}</div>
      <footer><button type="button" class="control-overlay-action" data-action="${footerAction}">${footerLabel}</button></footer>
    </section>`;
}

function controlSettingsMarkup(kind, screen) {
  if (!["pump-control", "control", "pump-running", "pumping"].includes(screen.id)) return "";
  const pumping = ["pump-running", "pumping"].includes(screen.id);
  const showManualModes = kind === "hospital" || !state.customModeSaved;
  const modes = [
    ["Stimulation", "Stimulate", "heart"],
    ["Lactation", "Lactation", "droplet"],
    ["Mixed", "Mixed", "blend"],
    ["Milk initiation", "Milk initiation", "waves"]
  ];
  const selector = showManualModes
    ? `<div class="control-mode-selector" aria-label="吸乳模式">${modes.map(([name, label, modeIcon]) => `<button type="button" class="${state.controlMode === name ? "active" : ""}" data-action="control-select-mode" data-value="${name}" aria-pressed="${state.controlMode === name}"><span>${icon(modeIcon, label)}</span><small>${label}</small></button>`).join("")}</div>`
    : "";
  const bestLevelEntry = !pumping && showManualModes && state.controlMode === "Lactation"
    ? `<button type="button" class="control-best-level" data-action="open-best-level" aria-label="测试最佳泌乳档位"><span>${state.bestLevelSet ? "Retest best level" : "Best level test"}</span></button>`
    : "";
  const lightOptions = ["Glow", "Soft", "Clear"].map(value => `<button type="button" class="${state.controlLight === value ? "active" : ""}" data-action="control-select-light" data-value="${value}" aria-pressed="${state.controlLight === value}" ${state.controlLightOn ? "" : "disabled"}>${value}</button>`).join("");
  return `${selector}
    <span class="control-level-summary" aria-hidden="true">${state.pumpLevel}</span><span class="control-level-value" aria-live="polite"><strong>${state.pumpLevel}</strong><small>/ 15</small></span>${bestLevelEntry}
    <span class="control-secondary-settings-mask" aria-hidden="true"></span><span class="control-light-card-bg" aria-hidden="true"></span><strong class="control-light-label">Light</strong>
    <span class="control-light-summary" aria-live="polite">${state.controlLightOn ? escapeHtml(state.controlLight) : "Off"}</span>
    <button type="button" class="control-light-toggle ${state.controlLightOn ? "on" : ""}" data-action="control-toggle-light" aria-label="${state.controlLightOn ? "关闭灯光" : "打开灯光"}" aria-pressed="${state.controlLightOn}"><i></i></button>
    <div class="control-light-selector ${state.controlLightOn ? "" : "disabled"}" aria-label="Light">${lightOptions}</div>`;
}

function screenMarkup(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const step = Math.max(0, Math.min(screens.length - 1, state[`${kind}Step`]));
  const screen = screens[step];
  if (screen.view) return experienceScreenMarkup(kind, screen);
  if (kind === "home" && screen.custom) return customModeScreenMarkup(screen);
  const pageHotspots = kind === "hospital" ? hospitalHotspots(screen) : homeHotspots(screen);
  const hotspots = `${screenBackHotspot(kind, screen)}${pageHotspots}`;
  const digit = screen.id === "code" && state.codeDigit
    ? `<span class="code-digit" aria-hidden="true">${state.codeDigit}</span><span class="next-enabled" aria-hidden="true">Next</span>`
    : "";
  const sessionFinished = ["pump-finished", "finished"].includes(screen.id);
  const volumes = sessionFinished
    ? `<span class="volume-value left" aria-live="polite">${state.leftVolume}<small>ml</small></span><span class="volume-value right" aria-live="polite">${state.rightVolume}<small>ml</small></span>`
    : "";
  const durationValue = sessionFinished
    ? `<span class="session-duration-value" aria-live="polite">${escapeHtml(state.sessionDuration)}</span>`
    : "";
  const deviceOverlay = screen.image === "home-07-dashboard.png"
    ? `<span class="dashboard-device-frame" aria-hidden="true"><img src="./assets/figma-755/home-pump-control-device.png" width="182" height="138" alt="" draggable="false" /></span>`
    : "";
  const pumpControlButtonMask = screen.image === CONTROL_IMAGE
    ? `<span class="pump-control-native-button-mask" aria-hidden="true"></span>`
    : "";
  const customControlMode = kind === "home" && ["control", "pumping"].includes(screen.id) && state.customModeSaved
    ? `<div class="custom-control-mode-card"><div><strong>${escapeHtml(state.customModeName || "Milk Collection Mode-01")}</strong><span>Switch ${icon("chevron-right", "切换模式")}</span></div><p>${escapeHtml(state.customModeDescription)}</p><div><i style="--segment:38%"></i><i style="--segment:62%"></i></div></div>`
    : "";
  const controlSettings = controlSettingsMarkup(kind, screen);
  const finishAction = screen.id === "pump-running" ? "hospital-finish-pump" : screen.id === "pumping" ? "finish-pump" : "";
  const holdControl = finishAction
    ? `<div class="pumping-actions">
        <button type="button" class="hold-to-finish" data-hold-action="${finishAction}" aria-label="长按结束本次吸乳" aria-pressed="false"><span>Hold to Finish</span></button>
        <button type="button" class="pump-pause ${state.pumpPaused ? "paused" : ""}" data-action="toggle-pump-pause" aria-label="${state.pumpPaused ? "继续吸乳" : "暂停吸乳"}" aria-pressed="${state.pumpPaused}">${state.pumpPaused ? icon("play", "继续吸乳") : '<img src="./assets/figma-755/pump-pause.svg" width="20" height="20" alt="" draggable="false" />'}</button>
      </div>`
    : "";
  const startControl = ["pump-control", "control"].includes(screen.id)
    ? `<button type="button" class="start-pumping-floating" data-action="${kind === "hospital" ? "hospital-start-pump" : "start-pump"}">Start Pumping</button>`
    : "";
  const connection = kind === "home" ? connectionMarkup(screen) : "";
  const checkSheetVisible = Boolean(screen.calibration);
  const calibrationEntering = checkSheetVisible && previousCheckScreenId === null;
  const calibrationStepChanging = checkSheetVisible && previousCheckScreenId !== null && previousCheckScreenId !== screen.id;
  const calibration = calibrationMarkup(screen, { entering: calibrationEntering, stepChanging: calibrationStepChanging });
  const controlDialog = controlOverlayMarkup(kind, screen);
  const guideExperience = guideExperienceMarkup(screen);
  const durationPicker = durationPickerMarkup(screen);
  const flashlightState = screen.id === "scan" && state.flashlightOn
    ? `<span class="scanner-flashlight-state">${icon("flashlight", "闪光灯已开启")}<small>On</small></span>`
    : "";
  previousCheckScreenId = checkSheetVisible ? screen.id : null;
  return `<div class="screen-frame ${checkSheetVisible ? "calibration-open" : ""} ${controlDialog ? "control-overlay-open" : ""} ${guideFullscreen || durationPickerOpen ? "secondary-overlay-open" : ""}" style="--content-width:${screen.width};--content-height:${screen.height}">
    <div class="screen-scroll">
      <div class="screen-canvas">
        <img class="figma-screen" src="./assets/figma-755/${screen.image}?v=${VERSION}" width="${screen.width}" height="${screen.height}" alt="${screen.label}" draggable="false" />
        ${deviceOverlay}
        ${pumpControlButtonMask}
        ${customControlMode}
        ${controlSettings}
        ${flashlightState}
        <div class="hotspot-layer">${hotspots}${digit}${volumes}${durationValue}</div>
      </div>
    </div>
    ${connection}
    ${calibration}
    ${controlDialog}
    ${guideExperience}
    ${durationPicker}
    ${startControl}
    ${holdControl}
  </div>`;
}

function prototypeToolbar(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const step = Math.max(0, Math.min(screens.length - 1, state[`${kind}Step`]));
  const screenId = screens[step].id;
  const status = kind === "hospital"
    ? (state.sessionLogged ? "吸乳记录已完成" : state.pumpRunning ? (state.pumpPaused ? "吸乳已暂停" : "正在吸乳") : step >= 11 ? "设备已就绪" : state.trainingDone ? "设备教学已完成" : state.deviceBound ? (step >= 7 ? "设备教学中" : "V4 已绑定") : "院端独立演示")
    : (state.sessionLogged ? "本次记录已保存" : state.pumpRunning ? (state.pumpPaused ? "吸乳已暂停" : "正在吸乳") : screenId === "connect-connecting" ? "正在连接 V4" : screenId === "connect-done" ? "V4 连接完成" : state.homeDeviceConnected ? "V4 已连接" : "等待连接 V4");
  const ready = kind === "home" ? state.homeDeviceConnected : state.deviceBound;
  return `<div class="prototype-toolbar">
    <button class="tool-button navigation-trigger" data-action="navigation-open" title="打开 Demo 目录" aria-label="打开 Demo 目录" aria-expanded="${navigationOpen}">${icon("panel-left", "打开 Demo 目录")}</button>
    <div class="prototype-meta"><strong>${kind === "hospital" ? "院端设备配置与教学" : "居家吸乳使用"}</strong><span>${step + 1}/${screens.length} · ${screens[step].label}</span></div>
    <div class="sync-state ${ready ? "ready" : ""}"><span></span>${status}</div>
    <div class="toolbar-actions">
      <button class="tool-button" data-action="step-back" data-kind="${kind}" title="上一步" ${step === 0 ? "disabled" : ""}>${icon("arrow-left", "上一步")}</button>
      <button class="tool-button" data-action="step-next" data-kind="${kind}" title="下一步" ${step >= screens.length - 1 ? "disabled" : ""}>${icon("arrow-right", "下一步")}</button>
      <button class="tool-button" data-action="reset" title="重置全部流程">${icon("rotate-ccw", "重置全部流程")}</button>
    </div>
  </div>`;
}

function prototypeNavigation(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const activeStep = state[`${kind}Step`];
  const groups = kind === "hospital"
    ? [
        { label: "设备连接", icon: "link-2", start: 0, end: 6 },
        { label: "设备教学", icon: "book-open", start: 7, end: 10 },
        { label: "吸乳与记录", icon: "activity", start: 11, end: hospitalScreens.length - 1 }
      ]
    : [
        { label: "连接设备", icon: "link-2", start: 0, end: 4 },
        { label: "使用教学", icon: "book-open", start: 5, end: homeScreens.findIndex(screen => screen.id === "ready") },
        { label: "模式设置", icon: "sliders-horizontal", start: homeScreens.findIndex(screen => screen.id === "control"), end: homeScreens.findIndex(screen => screen.id === "mode-introduction") },
        { label: "吸乳与记录", icon: "activity", start: homeScreens.findIndex(screen => screen.id === "check-initiation"), end: homeScreens.length - 1 }
      ];
  const items = groups.map(group => {
    const children = screens.slice(group.start, group.end + 1).map((screen, offset) => {
      const index = group.start + offset;
      const active = index === activeStep;
      return `<button type="button" class="navigation-item ${active ? "active" : ""}" data-action="navigation-step" data-kind="${kind}" data-step="${index}" ${active ? 'aria-current="page"' : ""}>
        <span class="navigation-index">${String(index + 1).padStart(2, "0")}</span>
        <span>${screen.label}</span>
      </button>`;
    }).join("");
    return `<section class="navigation-group" aria-label="${group.label}">
      <h2>${icon(group.icon, group.label)}<span>${group.label}</span></h2>
      <div class="navigation-items">${children}</div>
    </section>`;
  }).join("");
  return `<aside class="prototype-navigation" aria-label="Demo 目录">
    <div class="navigation-header">
      <div><span>Momcozy V4</span><strong>Demo 目录</strong></div>
      <button type="button" class="navigation-close" data-action="navigation-close" aria-label="关闭 Demo 目录" title="关闭 Demo 目录">${icon("panel-left-close", "关闭 Demo 目录")}</button>
    </div>
    <nav class="demo-switcher" aria-label="切换 Demo">
      <a class="${kind === "hospital" ? "active" : ""}" href="./hospital.html" ${kind === "hospital" ? 'aria-current="page"' : ""}>${icon("building-2", "院端 Demo")}<span>院端</span></a>
      <a class="${kind === "home" ? "active" : ""}" href="./home.html" ${kind === "home" ? 'aria-current="page"' : ""}>${icon("house", "居家 Demo")}<span>居家</span></a>
    </nav>
    <div class="navigation-scroll">${items}</div>
    <div class="navigation-footer"><span>v${VERSION}</span><button type="button" data-action="reset">${icon("rotate-ccw", "重置当前流程")}<span>重置当前流程</span></button></div>
  </aside>`;
}

function prototypePage(kind) {
  return `<main class="prototype-page ${navigationOpen ? "navigation-open" : ""}">
    ${prototypeNavigation(kind)}
    <button type="button" class="navigation-backdrop" data-action="navigation-close" aria-label="关闭 Demo 目录"></button>
    <div class="prototype-workspace">${prototypeToolbar(kind)}<section class="device-stage" aria-label="${kind === "hospital" ? "院端交互原型" : "居家交互原型"}">${screenMarkup(kind)}</section></div>
  </main>`;
}

function render() {
  clearTimeout(transitionTimer);
  cancelHold();
  const app = document.getElementById("app");
  app.innerHTML = prototypePage(ENTRY);
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  requestAnimationFrame(() => {
    const navigation = app.querySelector(".navigation-scroll");
    const activeItem = app.querySelector(".navigation-item.active");
    if (!navigation || !activeItem) return;
    const navigationRect = navigation.getBoundingClientRect();
    const activeRect = activeItem.getBoundingClientRect();
    if (activeRect.top < navigationRect.top) navigation.scrollTop -= navigationRect.top - activeRect.top;
    if (activeRect.bottom > navigationRect.bottom) navigation.scrollTop += activeRect.bottom - navigationRect.bottom;
  });
  requestAnimationFrame(() => {
    const chatBody = app.querySelector(".cozy-chat-body");
    if (chatBody && Array.isArray(state.cozyMessages) && state.cozyMessages.length) chatBody.scrollTop = chatBody.scrollHeight;
  });
  if (!directNavigation && state.autoAdvanceSuppressed !== "hospital:binding" && ENTRY === "hospital" && hospitalScreens[state.hospitalStep].id === "binding") {
    transitionTimer = setTimeout(() => setState({ hospitalStep: 6, deviceBound: true }, "V4 绑定成功"), 1500);
  }
  if (!directNavigation && ["hospital", "home"].includes(ENTRY)) {
    const screens = ENTRY === "hospital" ? hospitalScreens : homeScreens;
    const key = `${ENTRY}Step`;
    const currentId = screens[state[key]].id;
    if (currentId === "check-initiation" && state.autoAdvanceSuppressed !== `${ENTRY}:check-initiation`) {
      transitionTimer = setTimeout(() => setState({ [key]: screens.findIndex(screen => screen.id === "check-fit") }), 1600);
    }
    if (currentId === "check-fit" && state.autoAdvanceSuppressed !== `${ENTRY}:check-fit`) {
      transitionTimer = setTimeout(() => setState({ [key]: screens.findIndex(screen => screen.id === "check-fit-passed") }), 1800);
    }
  }
  if (!directNavigation && state.autoAdvanceSuppressed !== "hospital:pump-logged" && ENTRY === "hospital" && hospitalScreens[state.hospitalStep].id === "pump-logged") {
    transitionTimer = setTimeout(() => setState({
      hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-dashboard")
    }), 1600);
  }
  if (!directNavigation && state.autoAdvanceSuppressed !== "home:connect-connecting" && ENTRY === "home" && homeScreens[state.homeStep].id === "connect-connecting") {
    transitionTimer = setTimeout(() => setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-done") }), 1400);
  }
  if (!directNavigation && state.autoAdvanceSuppressed !== "home:logged" && ENTRY === "home" && homeScreens[state.homeStep].id === "logged") {
    transitionTimer = setTimeout(() => setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "dashboard")
    }), 1600);
  }
}

function progressForStep(kind, step) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const currentId = screens[step].id;
  if (kind === "hospital") {
    return {
      deviceBound: step >= 6,
      trainingDone: step >= 11,
      pumpRunning: currentId === "pump-running",
      pumpPaused: false,
      sessionLogged: ["pump-logged", "pump-dashboard", "device-home", "hospital-insight-detail", "hospital-cozy-chat", "hospital-community"].includes(currentId)
    };
  }
  return {
    homeDeviceConnected: step >= 4,
    trainingDone: step >= 8,
    pumpRunning: currentId === "pumping",
    pumpPaused: false,
    sessionLogged: ["logged", "dashboard", "device", "home-insight-detail", "home-cozy-chat", "home-community"].includes(currentId)
  };
}

function goToPreviousScreen(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const key = `${kind}Step`;
  const fallback = Math.max(0, state[key] - 1);
  const previousStep = stepHistory[kind].pop() ?? fallback;
  directNavigation = true;
  suppressStepHistory = true;
  setState({
    [key]: previousStep,
    ...progressForStep(kind, previousStep),
    autoAdvanceSuppressed: `${kind}:${screens[previousStep].id}`
  });
  suppressStepHistory = false;
}

function updateModeSection(patch) {
  const index = Math.max(0, Math.min(1, state.modeEditingSection - 1));
  const sections = state.customModeSections.map((section, sectionIndex) => sectionIndex === index ? { ...section, ...patch } : section);
  setState({ customModeSections: sections });
}

function cozyReplyFor(question, contextKey) {
  if (contextKey === "trend") return "Your improvement looks linked to steadier spacing and more even output across sessions, not longer pumping. Repeat the timing gently and treat comfort as the limit rather than trying to force the same result.";
  if (contextKey === "lactation") return "Level 5 appears to be your current balance point, but it is not a target you must reach every time. Begin lower, increase gradually, and step down if you notice pinching, rubbing, blanching, or lingering soreness.";
  if (/flange/i.test(question)) return "A good fit keeps the nipple centered with comfortable movement and minimal areola pulling. Stop and resize if you feel rubbing, pinching, or blanching.";
  if (/suction|weak/i.test(question)) return "Check that the valve, diaphragm, and tunnel are fully sealed, then confirm the pump is centered. Increase suction only while it remains comfortable.";
  if (/connection/i.test(question)) return "Keep your phone close to the V4, confirm Bluetooth is on, and reconnect from the device page. If it still fails, power-cycle both pumps once.";
  return "I can help with fit, comfort, suction, connection, and your recent pumping patterns. Tell me what you are noticing.";
}

function sendCozyQuestion(rawQuestion) {
  const question = String(rawQuestion || "").trim();
  if (!question) return;
  const messages = Array.isArray(state.cozyMessages) ? state.cozyMessages : [];
  setState({ cozyMessages: [...messages, { role: "user", text: question }, { role: "assistant", text: cozyReplyFor(question, state.chatContext) }].slice(-12) });
}

function handleAction(action, target) {
  if (!["navigation-open", "navigation-close", "navigation-step", "screen-back"].includes(action)) {
    directNavigation = false;
    state = { ...state, autoAdvanceSuppressed: "" };
  }
  switch (action) {
    case "navigation-open": navigationOpen = true; render(); break;
    case "navigation-close": navigationOpen = false; render(); break;
    case "navigation-step": {
      const kind = target.dataset.kind;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const key = `${kind}Step`;
      const step = Math.max(0, Math.min(screens.length - 1, Number(target.dataset.step) || 0));
      const currentId = screens[step].id;
      navigationOpen = false;
      controlOverlay = "";
      guideFullscreen = false;
      durationPickerOpen = false;
      directNavigation = true;
      setState({ [key]: step, ...progressForStep(kind, step), autoAdvanceSuppressed: `${kind}:${currentId}` });
      break;
    }
    case "screen-back": controlOverlay = ""; guideFullscreen = false; durationPickerOpen = false; goToPreviousScreen(target.dataset.kind); break;
    case "content-card-open": showToast(`${target.dataset.card || "内容卡片"} 详情已打开`); break;
    case "unsupported-device": showToast(`${target.dataset.device || "该设备"} 不在本次 V4 演示范围内`); break;
    case "app-tab-home": showToast("Home 首页入口已打开"); break;
    case "app-tab-device": {
      const kind = target.dataset.kind || ENTRY;
      if (kind === "hospital") {
        const id = state.sessionLogged ? "device-home" : "empty";
        setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === id) });
      } else {
        const id = state.sessionLogged ? "device" : state.homeDeviceConnected ? "connect-device" : "connect-empty";
        setState({ homeStep: homeScreens.findIndex(screen => screen.id === id) });
      }
      break;
    }
    case "app-tab-community": {
      const kind = target.dataset.kind || ENTRY;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const id = kind === "hospital" ? "hospital-community" : "home-community";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === id) });
      break;
    }
    case "app-tab-profile": showToast("Me 个人中心入口已打开"); break;
    case "app-add-device": {
      const kind = target.dataset.kind || ENTRY;
      if (kind === "hospital") setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "manual") });
      else setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-empty"), homeDeviceConnected: false });
      break;
    }
    case "home-add-another-device": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-empty"), homeDeviceConnected: false }); break;
    case "hospital-open-scan": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "scan") }); break;
    case "hospital-refresh-nearby": showToast("附近设备列表已刷新"); break;
    case "hospital-refresh-bound": showToast("已绑定设备状态已刷新"); break;
    case "toggle-flashlight": setState({ flashlightOn: !state.flashlightOn }, state.flashlightOn ? "闪光灯已关闭" : "闪光灯已开启"); break;
    case "delete-code": setState({ codeDigit: "" }); break;
    case "resend-code": showToast("验证码已重新发送"); break;
    case "guide-toggle-video": setState({ guideVideoPlaying: !state.guideVideoPlaying }, state.guideVideoPlaying ? "教学视频已暂停" : "教学视频正在播放"); break;
    case "guide-open-fullscreen": guideFullscreen = true; render(); break;
    case "guide-close-fullscreen": guideFullscreen = false; render(); break;
    case "guide-show-how": showToast("先取下集奶杯，再依次拆下法兰和阀门"); break;
    case "guide-show-warning": showToast("清洁前请关机，并确保电子部件保持干燥"); break;
    case "ready-open-assistant": {
      const kind = target.dataset.kind || ENTRY;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const id = kind === "hospital" ? "hospital-cozy-chat" : "home-cozy-chat";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === id), chatContext: "", cozyMessages: [] });
      break;
    }
    case "ready-open-clean-guide": {
      const kind = target.dataset.kind || ENTRY;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const id = kind === "hospital" ? "training-guide" : "guide";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === id) });
      break;
    }
    case "ready-contact-support": showToast("Momcozy support · support@momcozy.com"); break;
    case "edit-session-time": showToast("吸乳日期与时间选择器已打开"); break;
    case "open-duration-picker": durationPickerOpen = true; render(); break;
    case "close-duration-picker": durationPickerOpen = false; render(); break;
    case "select-duration": durationPickerOpen = false; setState({ sessionDuration: target.dataset.value || "20 min 30 sec" }, "吸乳时长已更新"); break;
    case "control-open-help": controlOverlay = "help"; render(); break;
    case "control-open-settings": controlOverlay = "settings"; render(); break;
    case "control-open-mode": controlOverlay = "mode"; render(); break;
    case "control-close-overlay": controlOverlay = ""; render(); break;
    case "control-sheet-select-mode": {
      controlOverlay = "";
      setState({ controlMode: target.dataset.value || "Stimulation", customModeSaved: false }, `${target.dataset.value || "Stimulation"} 模式已选择`);
      break;
    }
    case "control-select-light": setState({ controlLight: target.dataset.value || "Clear" }); break;
    case "control-toggle-light": setState({ controlLightOn: !state.controlLightOn }, state.controlLightOn ? "灯光已关闭" : "灯光已打开"); break;
    case "control-toggle-sound": setState({ controlSoundOn: !state.controlSoundOn }); break;
    case "control-toggle-auto-lock": setState({ controlAutoLockOn: !state.controlAutoLockOn }); break;
    case "hospital-next": setState({ hospitalStep: Math.min(hospitalScreens.length - 1, state.hospitalStep + 1) }); break;
    case "hospital-prev": setState({ hospitalStep: Math.max(0, state.hospitalStep - 1) }); break;
    case "enter-code": setState({ codeDigit: target.dataset.value || "4" }, "验证码已填写"); break;
    case "submit-code": if (state.codeDigit) setState({ hospitalStep: 5 }); break;
    case "hospital-learn": setState({ hospitalStep: 7 }); break;
    case "hospital-training-ready": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "training-ready") }); break;
    case "hospital-training-exit": goToPreviousScreen("hospital"); break;
    case "complete-hospital": showToast("院端设备绑定演示已完成"); break;
    case "hospital-open-control": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-control"), trainingDone: true }, "院端设备教学已完成"); break;
    case "hospital-start-pump": controlOverlay = ""; setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "check-initiation"), pumpRunning: false, pumpPaused: false }, "设备检查已自动开始"); break;
    case "hospital-finish-pump": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-finished"), pumpRunning: false, pumpPaused: false }); break;
    case "hospital-left-up": setState({ leftVolume: Math.min(300, state.leftVolume + 10) }); break;
    case "hospital-left-down": setState({ leftVolume: Math.max(0, state.leftVolume - 10) }); break;
    case "hospital-right-up": setState({ rightVolume: Math.min(300, state.rightVolume + 10) }); break;
    case "hospital-right-down": setState({ rightVolume: Math.max(0, state.rightVolume - 10) }); break;
    case "hospital-save-session": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-logged"), sessionLogged: true }, `已记录 ${state.leftVolume + state.rightVolume} ml`); break;
    case "hospital-show-dashboard": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-dashboard") }); break;
    case "hospital-return-device": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "device-home") }); break;
    case "hospital-open-insights": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-dashboard") }); break;
    case "hospital-open-insight-detail": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "hospital-insight-detail"), activeInsight: pumpingInsights[target.dataset.insight] ? target.dataset.insight : "trend" }); break;
    case "hospital-open-community": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "hospital-community") }); break;
    case "home-connection-found": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-found") }); break;
    case "home-connection-connect": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-connecting") }); break;
    case "home-connection-cancel": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-empty") }); break;
    case "home-connection-complete": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-device"), homeDeviceConnected: true }, "V4 已连接"); break;
    case "home-connection-start-training": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "welcome"), homeDeviceConnected: true }); break;
    case "home-next": setState({ homeStep: Math.min(homeScreens.length - 1, state.homeStep + 1) }); break;
    case "home-prev": setState({ homeStep: Math.max(0, state.homeStep - 1) }); break;
    case "home-training-exit": goToPreviousScreen("home"); break;
    case "home-ready": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "ready") }); break;
    case "home-mode-list": controlOverlay = ""; setState({ homeStep: homeScreens.findIndex(screen => screen.id === "mode-list") }); break;
    case "mode-apply-manual": {
      const modeName = target.dataset.modeName || "Stimulation";
      setState({
        homeStep: homeScreens.findIndex(screen => screen.id === "control"),
        selectedManualMode: modeName,
        customModeName: modeName,
        customModeSaved: false,
        controlMode: modeName
      }, `${modeName} 模式已应用`);
      break;
    }
    case "mode-open-program-detail":
      setState({
        homeStep: homeScreens.findIndex(screen => screen.id === "mode-program-detail"),
        activeProgramName: target.dataset.modeName === "Milk Boost Mode P2" ? "Milk Boost Mode P2" : "Milk Boost Mode P1"
      });
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
      break;
    case "mode-rhythm-close": goToPreviousScreen("home"); break;
    case "mode-select-rhythm": setState({ selectedManualRhythm: target.dataset.value || "Gentle" }); break;
    case "mode-apply-rhythm": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "control"),
      customModeName: state.selectedManualMode,
      customModeSaved: false,
      controlMode: state.selectedManualMode
    }, `${state.selectedManualMode} · ${state.selectedManualRhythm} 已应用`); break;
    case "mode-start-create": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "mode-name"), customModeSaved: false }); break;
    case "mode-save-name": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "mode-overview"),
      customModeName: state.customModeName.trim() || "Milk Collection Mode-01",
      modeEditingSection: 1
    }, "新模式已创建"); break;
    case "mode-use-preset": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "control"),
      customModeName: target.dataset.modeName || "Stimulation",
      customModeSaved: true,
      controlMode: "Custom"
    }, "模式已应用"); break;
    case "mode-edit-section": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "mode-editor"),
      modeEditingSection: Number(target.dataset.section) === 2 ? 2 : 1,
      modeTrialPlaying: false
    }); break;
    case "mode-add-section": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "mode-editor"),
      modeEditingSection: 2,
      modeTrialPlaying: false
    }); break;
    case "mode-select-type": updateModeSection({ type: target.dataset.value || "Massage" }); break;
    case "mode-level-down": {
      const section = state.customModeSections[state.modeEditingSection - 1];
      updateModeSection({ level: Math.max(1, section.level - 1) });
      break;
    }
    case "mode-level-up": {
      const section = state.customModeSections[state.modeEditingSection - 1];
      updateModeSection({ level: Math.min(15, section.level + 1) });
      break;
    }
    case "mode-select-light": updateModeSection({ light: target.dataset.value || "Clear" }); break;
    case "mode-toggle-light": setState({ modeLightOn: !state.modeLightOn }); break;
    case "mode-toggle-trial": setState({ modeTrialPlaying: !state.modeTrialPlaying }, state.modeTrialPlaying ? "试听已停止" : "正在试听当前参数"); break;
    case "mode-editor-next": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === (state.modeEditingSection === 2 ? "mode-overview-complete" : "mode-overview")),
      modeTrialPlaying: false
    }); break;
    case "mode-open-introduction": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "mode-introduction") }); break;
    case "mode-close-introduction": goToPreviousScreen("home"); break;
    case "mode-save-to-control": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "control"),
      customModeSaved: true,
      controlMode: "Custom",
      modeTrialPlaying: false
    }, "自定义模式已保存并应用"); break;
    case "control-select-mode": setState({
      controlMode: target.dataset.value || "Stimulation",
      customModeSaved: false
    }, `${target.dataset.value || "Stimulation"} 模式已选择`); break;
    case "control-level-down": setState({ pumpLevel: Math.max(1, state.pumpLevel - 1) }); break;
    case "control-level-up": setState({ pumpLevel: Math.min(15, state.pumpLevel + 1) }); break;
    case "open-best-level": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      if (state.controlMode !== "Lactation") break;
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === "check-comfort") });
      break;
    }
    case "start-pump": controlOverlay = ""; setState({ homeStep: homeScreens.findIndex(screen => screen.id === "check-initiation"), pumpRunning: false, pumpPaused: false }, "设备检查已自动开始"); break;
    case "calibration-next": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const key = `${kind}Step`;
      setState({ [key]: Math.min(screens.length - 1, state[key] + 1) });
      break;
    }
    case "calibration-close": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const controlId = kind === "hospital" ? "pump-control" : "control";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === controlId) });
      break;
    }
    case "calibration-test-again": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === "check-comfort") });
      break;
    }
    case "calibration-use-level": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const controlId = kind === "hospital" ? "pump-control" : "control";
      setState({
        [`${kind}Step`]: screens.findIndex(screen => screen.id === controlId),
        pumpLevel: state.comfortLevel,
        bestLevelSet: true,
        controlMode: "Lactation"
      }, `最佳档位已设为 ${state.comfortLevel}`);
      break;
    }
    case "comfort-down": setState({ comfortLevel: Math.max(1, state.comfortLevel - 1) }); break;
    case "comfort-up": setState({ comfortLevel: Math.min(15, state.comfortLevel + 1) }); break;
    case "pump-level-down": setState({ pumpLevel: Math.max(1, state.pumpLevel - 1) }); break;
    case "pump-level-up": setState({ pumpLevel: Math.min(15, state.pumpLevel + 1) }); break;
    case "calibration-start-pump": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const pumpingId = kind === "hospital" ? "pump-running" : "pumping";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === pumpingId), pumpRunning: true, pumpPaused: false }, "V4 已开始吸乳");
      break;
    }
    case "finish-pump": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "finished"), pumpRunning: false, pumpPaused: false }); break;
    case "toggle-pump-pause": setState({ pumpPaused: !state.pumpPaused }, state.pumpPaused ? "继续吸乳" : "吸乳已暂停"); break;
    case "save-session": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "logged"), sessionLogged: true }, "吸乳记录已保存"); break;
    case "show-dashboard": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "dashboard") }); break;
    case "home-device": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "device") }); break;
    case "home-open-insights": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "dashboard") }); break;
    case "home-open-insight-detail": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "home-insight-detail"), activeInsight: pumpingInsights[target.dataset.insight] ? target.dataset.insight : "trend" }); break;
    case "home-open-community": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "home-community") }); break;
    case "home-control": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "control") }); break;
    case "open-cozy-chat": {
      const kind = target.dataset.kind || ENTRY;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const id = kind === "hospital" ? "hospital-cozy-chat" : "home-cozy-chat";
      const context = pumpingInsights[target.dataset.context] ? target.dataset.context : "";
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === id), chatContext: context, cozyMessages: context === state.chatContext ? state.cozyMessages : [] });
      break;
    }
    case "cozy-chat-suggest": sendCozyQuestion(target.dataset.question); break;
    case "cozy-chat-clear-context": setState({ chatContext: "", cozyMessages: [] }); break;
    case "cozy-chat-context-info": showToast(state.chatContext ? "当前洞察已作为对话上下文" : "可从洞察详情页带入对应上下文"); break;
    case "expert-guidance": showToast("专家指导内容已打开"); break;
    case "community-join": setState({ communityJoined: !state.communityJoined }, state.communityJoined ? "已退出 Pumping moms" : "已加入 Pumping moms"); break;
    case "community-select-status": setState({ communityStatus: target.dataset.status || "pumping" }, `状态已分享：${target.dataset.status || "pumping"}`); break;
    case "community-share": {
      const status = state.communityStatus || "pumping";
      setState({ communityStatus: status }, `状态已分享：${status}`);
      break;
    }
    case "community-create-post": showToast("群组发帖编辑器已打开"); break;
    case "step-back": {
      const key = `${target.dataset.kind}Step`;
      controlOverlay = "";
      guideFullscreen = false;
      durationPickerOpen = false;
      setState({ [key]: Math.max(0, state[key] - 1) });
      break;
    }
    case "step-next": {
      const kind = target.dataset.kind;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const key = `${kind}Step`;
      controlOverlay = "";
      guideFullscreen = false;
      durationPickerOpen = false;
      setState({ [key]: Math.min(screens.length - 1, state[key] + 1) });
      break;
    }
    case "reset":
      state = { ...defaults };
      controlOverlay = "";
      guideFullscreen = false;
      durationPickerOpen = false;
      stepHistory.hospital = [];
      stepHistory.home = [];
      saveState();
      render();
      showToast("流程已重置");
      break;
  }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || target.disabled) return;
  handleAction(target.dataset.action, target);
});

document.addEventListener("input", (event) => {
  if (!event.target.matches("[data-mode-name-input], [data-mode-description-input]")) return;
  const patch = event.target.matches("[data-mode-name-input]")
    ? { customModeName: event.target.value }
    : { customModeDescription: event.target.value };
  state = { ...state, ...patch };
  saveState();
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-cozy-chat-form]");
  if (!form) return;
  event.preventDefault();
  const input = form.elements.namedItem("cozy-message");
  sendCozyQuestion(input?.value);
});

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest("[data-hold-action]");
  if (!target) return;
  target.setPointerCapture?.(event.pointerId);
  startHold(target);
});

document.addEventListener("pointerup", cancelHold);
document.addEventListener("pointercancel", cancelHold);
document.addEventListener("lostpointercapture", cancelHold);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (guideFullscreen || durationPickerOpen)) {
    guideFullscreen = false;
    durationPickerOpen = false;
    render();
    return;
  }
  if (event.key === "Escape" && controlOverlay) {
    controlOverlay = "";
    render();
    return;
  }
  const target = event.target.closest("[data-hold-action]");
  if (!target || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  if (!event.repeat) startHold(target);
});

document.addEventListener("keyup", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  cancelHold();
});

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  state = loadState();
  render();
});

render();
