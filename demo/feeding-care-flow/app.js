const ENTRY = document.body.dataset.entry || "hospital";
const VERSION = "0.3.21";
const STORAGE_KEY = `momcozy-figma-755-demo-v${VERSION}-${ENTRY}`;

const calibrationScreens = [
  { id: "check-wear", image: "home-03-control.png", width: 375, height: 956, label: "穿戴检测提示", wearPrompt: true },
  { id: "check-initiation", image: "home-03-control.png", width: 375, height: 956, label: "检查 1 · 泌乳启动", calibration: true },
  { id: "check-fit", image: "home-03-control.png", width: 375, height: 956, label: "检查 2 · 佩戴检测", calibration: true },
  { id: "check-fit-passed", image: "home-03-control.png", width: 375, height: 956, label: "检查 2 · 佩戴通过", calibration: true },
  { id: "check-comfort", image: "home-03-control.png", width: 375, height: 956, label: "检查 3 · 舒适负压", calibration: true },
  { id: "check-comfort-found", image: "home-03-control.png", width: 375, height: 956, label: "检查 3 · 舒适度确认", calibration: true }
];

const hospitalScreens = [
  { id: "empty", image: "hospital-00-empty.png", width: 393, height: 852, label: "设备页空态" },
  { id: "manual", image: "hospital-01-manual.png", width: 375, height: 812, label: "手动添加设备" },
  { id: "found", image: "hospital-02-found.png", width: 375, height: 812, label: "发现设备" },
  { id: "scan", image: "hospital-03-scan.png", width: 375, height: 812, label: "扫描设备" },
  { id: "code", image: "hospital-04-code.png", width: 415, height: 874, label: "输入验证码" },
  { id: "binding", image: "hospital-05-binding.png", width: 375, height: 812, label: "绑定中" },
  { id: "success", image: "hospital-06-success.png", width: 375, height: 812, label: "绑定成功" },
  { id: "training-welcome", image: "home-00-welcome.png", width: 393, height: 852, label: "设备教学欢迎页" },
  { id: "training-guide", image: "home-01-guide.png", width: 393, height: 852, label: "设备教学详情页" },
  { id: "training-guide-final", image: "home-01b-guide-final.png", width: 393, height: 852, label: "设备教学最后一页" },
  { id: "training-ready", image: "home-02-ready.png", width: 393, height: 852, label: "设备教学完成页" },
  { id: "pump-control", image: "home-03-control.png", width: 375, height: 956, label: "吸乳器控制页" },
  ...calibrationScreens,
  { id: "pump-running", image: "home-04-pumping.png", width: 375, height: 956, label: "吸乳中" },
  { id: "pump-finished", image: "home-05-finished.png", width: 402, height: 874, label: "记录奶量" },
  { id: "pump-logged", image: "home-06-logged.png", width: 393, height: 852, label: "记录成功" },
  { id: "pump-dashboard", image: "home-07-dashboard.png", width: 402, height: 874, label: "吸乳子场景卡" },
  { id: "device-home", image: "home-08-device.png", width: 393, height: 852, label: "设备子首页" }
];

const homeScreens = [
  { id: "connect-empty", image: "home-connect-00-empty.png", width: 393, height: 852, label: "设备页空态" },
  { id: "connect-found", image: "home-connect-00-empty.png", width: 393, height: 852, label: "发现 V4" },
  { id: "connect-connecting", image: "home-connect-00-empty.png", width: 393, height: 852, label: "正在连接 V4" },
  { id: "connect-done", image: "home-connect-00-empty.png", width: 393, height: 852, label: "V4 连接完成" },
  { id: "connect-device", image: "home-connect-04-added-v036.png", width: 393, height: 852, label: "设备已添加" },
  { id: "welcome", image: "home-00-welcome.png", width: 393, height: 852, label: "设备助手欢迎页" },
  { id: "guide", image: "home-01-guide.png", width: 393, height: 852, label: "设备助手教学页" },
  { id: "ready", image: "home-02-ready.png", width: 393, height: 852, label: "设备助手完成页" },
  { id: "control", image: "home-03-control.png", width: 375, height: 956, label: "吸乳控制初始状态" },
  { id: "mode-list", custom: true, width: 402, height: 874, label: "模式列表" },
  { id: "mode-rhythm", custom: true, width: 402, height: 874, label: "韵律选择弹窗" },
  { id: "mode-name", custom: true, width: 402, height: 874, label: "新模式命名" },
  { id: "mode-overview", custom: true, width: 402, height: 874, label: "分段模式总览" },
  { id: "mode-editor", custom: true, width: 402, height: 874, label: "分段参数编辑" },
  { id: "mode-overview-complete", custom: true, width: 402, height: 874, label: "完整模式预览" },
  { id: "mode-introduction", custom: true, width: 402, height: 874, label: "模式介绍弹窗" },
  ...calibrationScreens,
  { id: "pumping", image: "home-04-pumping.png", width: 375, height: 956, label: "吸乳中" },
  { id: "finished", image: "home-05-finished.png", width: 402, height: 874, label: "完成吸乳" },
  { id: "logged", image: "home-06-logged.png", width: 393, height: 852, label: "记录成功" },
  { id: "dashboard", image: "home-07-dashboard.png", width: 402, height: 874, label: "吸乳数据" },
  { id: "device", image: "home-08-device.png", width: 393, height: 852, label: "我的设备" }
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
  comfortLevel: 4,
  customModeName: "Milk Collection Mode-01",
  customModeSaved: false,
  selectedManualMode: "Stimulation",
  selectedManualRhythm: "Gentle",
  modeEditingSection: 1,
  modeTrialPlaying: false,
  modeLightOn: true,
  customModeSections: [
    { type: "Massage", level: 1, frequency: 1, light: "Clear", duration: 10 },
    { type: "Breast pumping", level: 1, frequency: 5, light: "Clear", duration: 15 }
  ],
  leftVolume: 0,
  rightVolume: 0,
  autoAdvanceSuppressed: ""
};

let state = loadState();
let transitionTimer = null;
let holdTimer = null;
let holdTarget = null;
let navigationOpen = false;
let directNavigation = false;
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
    case "empty": return hotspot("hospital-next", "添加设备", 30.5, 33.0, 38.8, 6.4);
    case "manual": return hotspot("hospital-next", "选择 V4 吸乳器", 4.2, 27.9, 28.6, 13.7);
    case "found": return hotspot("hospital-next", "扫描添加设备", 6.4, 86.9, 87.2, 6.1);
    case "scan": return hotspot("hospital-next", "使用其他连接方式", 7.5, 86.9, 85.0, 6.2);
    case "code":
      return [
        hotspot("enter-code", "输入验证码最后一位", 4.3, 65.0, 91.0, 25.5),
        hotspot("submit-code", "下一步", 8.4, 55.0, 83.2, 5.9, state.codeDigit ? "" : "disabled")
      ].join("");
    case "success":
      return [
        hotspot("hospital-learn", "学习使用设备", 6.4, 83.2, 87.2, 6.2),
        hotspot("complete-hospital", "完成绑定", 34.0, 90.3, 32.0, 4.0)
      ].join("");
    case "training-welcome":
      return [
        hotspot("hospital-training-ready", "跳过设备教学", 76.8, 7.2, 17.3, 5.5),
        hotspot("hospital-next", "开始设备教学", 6.0, 87.5, 88.0, 6.0)
      ].join("");
    case "training-guide":
      return [
        hotspot("hospital-training-exit", "关闭设备教学", 4.0, 7.2, 12.0, 5.8),
        hotspot("hospital-prev", "上一步", 4.2, 89.5, 30.2, 6.7),
        hotspot("hospital-next", "下一步", 37.6, 89.5, 58.4, 6.7)
      ].join("");
    case "training-guide-final":
      return [
        hotspot("hospital-training-exit", "关闭设备教学", 4.0, 7.2, 12.0, 5.8),
        hotspot("hospital-next", "完成设备设置", 4.1, 89.5, 91.8, 6.8)
      ].join("");
    case "training-ready":
      return hotspot("hospital-open-control", "开始使用 V4", 6.0, 49.5, 88.0, 6.0);
    case "pump-control": return "";
    case "pump-running":
      return [
        hotspot("pump-level-down", "降低吸乳档位", 8.5, 54.3, 20.0, 4.9),
        hotspot("pump-level-up", "提高吸乳档位", 71.5, 54.3, 20.0, 4.9)
      ].join("");
    case "pump-finished":
      return [
        hotspot("hospital-left-up", "增加左侧奶量", 18.5, 63.0, 12.0, 2.9),
        hotspot("hospital-left-down", "减少左侧奶量", 18.5, 65.9, 12.0, 2.9),
        hotspot("hospital-right-up", "增加右侧奶量", 69.5, 63.0, 12.0, 2.9),
        hotspot("hospital-right-down", "减少右侧奶量", 69.5, 65.9, 12.0, 2.9),
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
    case "connect-empty": return hotspot("home-connection-found", "添加 V4 设备", 30.5, 33.0, 38.8, 6.4);
    case "connect-device": return hotspot("home-connection-start-training", "开始设备教学", 36.0, 36.0, 28.0, 4.8);
    case "welcome":
      return [
        hotspot("home-ready", "跳过设备教学", 76.8, 7.2, 17.3, 5.5),
        hotspot("home-next", "开始设备教学", 6.0, 87.5, 88.0, 6.0)
      ].join("");
    case "guide":
      return [
        hotspot("home-prev", "关闭教学", 4.0, 7.2, 12.0, 5.8),
        hotspot("home-prev", "上一步", 4.2, 89.5, 30.2, 6.7),
        hotspot("home-next", "下一步", 37.6, 89.5, 58.4, 6.7)
      ].join("");
    case "ready": return hotspot("home-next", "开始使用 V4", 6.0, 49.5, 88.0, 6.0);
    case "control": return hotspot("home-mode-list", "切换或自定义吸乳模式", 72.0, 29.4, 22.5, 7.2);
    case "pumping":
      return [
        hotspot("pump-level-down", "降低吸乳档位", 8.5, 54.3, 20.0, 4.9),
        hotspot("pump-level-up", "提高吸乳档位", 71.5, 54.3, 20.0, 4.9)
      ].join("");
    case "finished": return hotspot("save-session", "保存吸乳记录", 5.0, 90.1, 90.0, 6.2);
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

function calibrationStepper(screenId) {
  const statesByScreen = {
    "check-initiation": ["current", "future", "future"],
    "check-fit": ["complete", "current", "future"],
    "check-fit-passed": ["complete", "complete", "future"],
    "check-comfort": ["complete", "complete", "current"],
    "check-comfort-found": ["complete", "complete", "complete"]
  };
  const states = statesByScreen[screenId];
  const labels = ["Initiation", "Fit check", "Comfort"];
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
        <div class="next-check-card"><span>Next · Step 3</span><strong>Find maximum comfortable suction</strong></div>
      </div>`;
    case "check-comfort":
      return `<div class="check-body comfort-body">
        <div class="comfort-control"><span>Current level</span><div><strong>${state.comfortLevel}</strong><small>of 12</small><button type="button" data-action="comfort-down" aria-label="降低负压">−</button><button type="button" class="primary" data-action="comfort-up" aria-label="提高负压">+</button></div></div>
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
      return `<button type="button" class="check-primary-action" data-action="calibration-next">Continue</button>`;
    case "check-comfort":
      return `<button type="button" class="check-primary-action" data-action="calibration-next">Confirm this level</button><button type="button" class="check-text-action" data-action="calibration-close">Exit setup</button>`;
    case "check-comfort-found":
      return `<button type="button" class="check-text-action" data-action="calibration-test-again">Test again</button><button type="button" class="check-primary-action" data-action="calibration-start-pump">Start pumping</button>`;
    default:
      return "";
  }
}

function calibrationMarkup(screen, motion = {}) {
  if (!screen.calibration && !screen.wearPrompt) return "";
  const motionClasses = [motion.entering ? "is-entering" : "", motion.stepChanging ? "is-step-changing" : ""].filter(Boolean).join(" ");
  if (screen.wearPrompt) {
    return `<div class="calibration-shade ${motion.entering ? "is-entering" : ""}" aria-hidden="true"></div>
      <section class="calibration-modal check-wear ${motionClasses}" role="dialog" aria-modal="true" aria-label="Wear both pumps">
        <button type="button" class="calibration-close" data-action="calibration-close" aria-label="关闭穿戴提示">${icon("x", "关闭穿戴提示")}</button>
        <span class="wear-kicker">Before pumping</span>
        <header class="wear-heading"><h1>Wear both pumps</h1><p>Follow the steps below, then keep still.</p></header>
        <ol class="wear-steps">
          <li><span>1</span><strong>Assemble the milk collector</strong></li>
          <li><span>2</span><strong>Center the nipple in the flange</strong></li>
          <li><span>3</span><strong>Secure both pumps inside your bra</strong></li>
        </ol>
        <p class="wear-note">Press Start and remain still during the check.</p>
        <footer class="check-footer"><button type="button" class="check-primary-action" data-action="calibration-start-check">Start initiation</button></footer>
      </section>`;
  }
  const headings = {
    "check-initiation": ["Initiation", "Running the milk-initiation rhythm"],
    "check-fit": ["Fit check", "Keep still while both sides are checked."],
    "check-fit-passed": ["Fit check passed", "Both pumps have a stable seal."],
    "check-comfort": ["Find your comfort level", "Adjust slowly and stop if it hurts."],
    "check-comfort-found": ["Comfort level found", "Maximum comfortable suction is set."]
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
  const action = interactive ? 'data-action="mode-use-preset"' : "";
  return `<button type="button" class="mode-program-card" ${action} data-mode-name="${name}">
    <div class="mode-program-heading"><span><strong>${name}</strong><small>45:00</small></span><b>Details ${icon("chevron-right", "查看详情")}</b></div>
    <p>Gentle and convenient, designed for safely expressing milk on the go.</p>
    ${modeProgramBar()}
    <div class="mode-program-legend"><span class="stimulate">Stimulate</span><span class="rest">Rest</span><span class="mixing">Mixing</span></div>
  </button>`;
}

function modeListContent(interactive = true) {
  const manualAction = interactive ? 'data-action="mode-open-rhythm"' : "";
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
      <label><span>Description</span><textarea data-mode-description-input maxlength="80" placeholder="Describe how you want to use this mode">Boost milk supply with a gentle segmented rhythm.</textarea></label>
      <button type="button" class="mode-primary" data-action="mode-save-name">Save</button>
    </div>
  </section>`;
}

function modeSectionRows(count) {
  return state.customModeSections.slice(0, count).map((section, index) => {
    return `<button type="button" class="mode-segment-row" data-action="mode-edit-section" data-section="${index + 1}">
      <b>${String(index + 1).padStart(2, "0")}</b><span><strong>${escapeHtml(section.type)}</strong><small>${section.duration} min · Level ${section.level} · Frequency ${section.frequency}</small></span>${icon("chevron-right", "编辑此分段")}
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
  const frequencies = [1, 2, 3, 4, 5].map(value => `<button type="button" class="${section.frequency === value ? "active" : ""}" data-action="mode-select-frequency" data-value="${value}" ${disabled}>${value}</button>`).join("");
  const lights = ["Glow", "Soft", "Clear"].map(value => `<button type="button" class="${section.light === value ? "active" : ""}" data-action="mode-select-light" data-value="${value}" ${disabled}>${value}</button>`).join("");
  return `<div class="mode-editor-content">
    <section class="mode-editor-card mode-type-card"><div class="mode-field-label"><strong>Mode</strong><span>${escapeHtml(section.type)}</span></div><div class="mode-choice-grid">${modeChoiceButtons(section)}</div></section>
    <section class="mode-editor-card"><div class="mode-field-label"><strong>Level</strong><span>${section.level} / 12</span></div><div class="mode-stepper"><button type="button" data-action="mode-level-down" ${disabled}>${icon("minus", "降低档位")}</button><b>${section.level}<small>/12</small></b><button type="button" data-action="mode-level-up" ${disabled}>${icon("plus", "提高档位")}</button></div></section>
    <section class="mode-editor-card"><div class="mode-field-label"><strong>Frequency</strong><span>${section.frequency}</span></div><div class="mode-segmented-control">${frequencies}</div></section>
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
    : screen.id === "mode-rhythm" ? modeRhythmScreen()
      : screen.id === "mode-name" ? modeNameScreen()
      : screen.id === "mode-overview" ? modeOverviewScreen(false)
        : screen.id === "mode-editor" ? modeEditorScreen()
          : screen.id === "mode-overview-complete" ? modeOverviewScreen(true)
            : modeIntroductionScreen();
  previousCheckScreenId = null;
  return `<div class="screen-frame mode-screen-frame" style="--content-width:${screen.width};--content-height:${screen.height}"><div class="screen-scroll"><div class="screen-canvas mode-screen-canvas">${content}</div></div></div>`;
}

function screenMarkup(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const step = Math.max(0, Math.min(screens.length - 1, state[`${kind}Step`]));
  const screen = screens[step];
  if (kind === "home" && screen.custom) return customModeScreenMarkup(screen);
  const pageHotspots = kind === "hospital" ? hospitalHotspots(screen) : homeHotspots(screen);
  const hotspots = `${screenBackHotspot(kind, screen)}${pageHotspots}`;
  const digit = screen.id === "code" && state.codeDigit
    ? `<span class="code-digit" aria-hidden="true">${state.codeDigit}</span><span class="next-enabled" aria-hidden="true">Next</span>`
    : "";
  const volumes = kind === "hospital" && screen.id === "pump-finished"
    ? `<span class="volume-value left" aria-live="polite">${state.leftVolume}<small>ml</small></span><span class="volume-value right" aria-live="polite">${state.rightVolume}<small>ml</small></span>`
    : "";
  const deviceOverlay = screen.image === "home-07-dashboard.png"
    ? `<span class="dashboard-device-frame" aria-hidden="true"><img src="./assets/figma-755/home-pump-control-device.png" width="182" height="138" alt="" draggable="false" /></span>`
    : "";
  const pumpControlDevice = screen.image === "home-03-control.png"
    ? `<span class="pump-control-device" aria-hidden="true"><img src="./assets/figma-755/home-pump-control-device.png" width="182" height="138" alt="" draggable="false" /></span>`
    : "";
  const pumpControlButtonMask = screen.image === "home-03-control.png"
    ? `<span class="pump-control-native-button-mask" aria-hidden="true"></span>`
    : "";
  const customControlMode = kind === "home" && screen.id === "control" && state.customModeSaved
    ? `<div class="custom-control-mode-card"><div><strong>${escapeHtml(state.customModeName || "Milk Collection Mode-01")}</strong><span>Switch ${icon("chevron-right", "切换模式")}</span></div><p>Alternating massage and pumping, tuned to your saved settings.</p><div><i style="--segment:38%"></i><i style="--segment:62%"></i></div></div>`
    : "";
  const pumpingLevel = ["pump-running", "pumping"].includes(screen.id)
    ? `<span class="pumping-level-summary" aria-hidden="true">${state.comfortLevel}</span>
      <span class="pumping-level-value" aria-live="polite"><strong>${state.comfortLevel}</strong><small>/ 12</small></span>`
    : "";
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
  const checkSheetVisible = Boolean(screen.calibration || screen.wearPrompt);
  const calibrationEntering = checkSheetVisible && previousCheckScreenId === null;
  const calibrationStepChanging = checkSheetVisible && previousCheckScreenId !== null && previousCheckScreenId !== screen.id;
  const calibration = calibrationMarkup(screen, { entering: calibrationEntering, stepChanging: calibrationStepChanging });
  previousCheckScreenId = checkSheetVisible ? screen.id : null;
  return `<div class="screen-frame ${checkSheetVisible ? "calibration-open" : ""}" style="--content-width:${screen.width};--content-height:${screen.height}">
    <div class="screen-scroll">
      <div class="screen-canvas">
        <img class="figma-screen" src="./assets/figma-755/${screen.image}?v=${VERSION}" width="${screen.width}" height="${screen.height}" alt="${screen.label}" draggable="false" />
        ${deviceOverlay}
        ${pumpControlDevice}
        ${pumpControlButtonMask}
        ${customControlMode}
        ${pumpingLevel}
        <div class="hotspot-layer">${hotspots}${digit}${volumes}</div>
      </div>
    </div>
    ${connection}
    ${calibration}
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
        { label: "使用教学", icon: "book-open", start: 5, end: 7 },
        { label: "模式设置", icon: "sliders-horizontal", start: homeScreens.findIndex(screen => screen.id === "control"), end: homeScreens.findIndex(screen => screen.id === "mode-introduction") },
        { label: "吸乳与记录", icon: "activity", start: homeScreens.findIndex(screen => screen.id === "check-wear"), end: homeScreens.length - 1 }
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
      sessionLogged: ["pump-logged", "pump-dashboard", "device-home"].includes(currentId)
    };
  }
  return {
    homeDeviceConnected: step >= 4,
    trainingDone: step >= 8,
    pumpRunning: currentId === "pumping",
    pumpPaused: false,
    sessionLogged: ["logged", "dashboard", "device"].includes(currentId)
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
      directNavigation = true;
      setState({ [key]: step, ...progressForStep(kind, step), autoAdvanceSuppressed: `${kind}:${currentId}` });
      break;
    }
    case "screen-back": goToPreviousScreen(target.dataset.kind); break;
    case "hospital-next": setState({ hospitalStep: Math.min(hospitalScreens.length - 1, state.hospitalStep + 1) }); break;
    case "hospital-prev": setState({ hospitalStep: Math.max(0, state.hospitalStep - 1) }); break;
    case "enter-code": if (!state.codeDigit) setState({ codeDigit: "4" }, "验证码已填写"); break;
    case "submit-code": if (state.codeDigit) setState({ hospitalStep: 5 }); break;
    case "hospital-learn": setState({ hospitalStep: 7 }); break;
    case "hospital-training-ready": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "training-ready") }); break;
    case "hospital-training-exit": setState({ hospitalStep: 6 }); break;
    case "complete-hospital": showToast("院端设备绑定演示已完成"); break;
    case "hospital-open-control": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-control"), trainingDone: true }, "院端设备教学已完成"); break;
    case "hospital-start-pump": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "check-wear"), pumpRunning: false, pumpPaused: false }); break;
    case "hospital-finish-pump": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-finished"), pumpRunning: false, pumpPaused: false }); break;
    case "hospital-left-up": setState({ leftVolume: Math.min(300, state.leftVolume + 10) }); break;
    case "hospital-left-down": setState({ leftVolume: Math.max(0, state.leftVolume - 10) }); break;
    case "hospital-right-up": setState({ rightVolume: Math.min(300, state.rightVolume + 10) }); break;
    case "hospital-right-down": setState({ rightVolume: Math.max(0, state.rightVolume - 10) }); break;
    case "hospital-save-session": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-logged"), sessionLogged: true }, `已记录 ${state.leftVolume + state.rightVolume} ml`); break;
    case "hospital-show-dashboard": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-dashboard") }); break;
    case "hospital-return-device": setState({ hospitalStep: hospitalScreens.findIndex(screen => screen.id === "device-home") }); break;
    case "home-connection-found": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-found") }); break;
    case "home-connection-connect": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-connecting") }); break;
    case "home-connection-cancel": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-empty") }); break;
    case "home-connection-complete": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-device"), homeDeviceConnected: true }, "V4 已连接"); break;
    case "home-connection-start-training": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "welcome"), homeDeviceConnected: true }); break;
    case "home-next": setState({ homeStep: Math.min(homeScreens.length - 1, state.homeStep + 1) }); break;
    case "home-prev": setState({ homeStep: Math.max(0, state.homeStep - 1) }); break;
    case "home-ready": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "ready") }); break;
    case "home-mode-list": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "mode-list") }); break;
    case "mode-open-rhythm": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "mode-rhythm"),
      selectedManualMode: target.dataset.modeName || "Stimulation",
      selectedManualRhythm: target.dataset.modeName === "Stimulation" ? "Gentle" : "Intense"
    }); break;
    case "mode-rhythm-close": goToPreviousScreen("home"); break;
    case "mode-select-rhythm": setState({ selectedManualRhythm: target.dataset.value || "Gentle" }); break;
    case "mode-apply-rhythm": setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "control"),
      customModeName: state.selectedManualMode,
      customModeSaved: true
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
      customModeSaved: true
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
      updateModeSection({ level: Math.min(12, section.level + 1) });
      break;
    }
    case "mode-select-frequency": updateModeSection({ frequency: Math.max(1, Math.min(5, Number(target.dataset.value) || 1)) }); break;
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
      modeTrialPlaying: false
    }, "自定义模式已保存并应用"); break;
    case "start-pump": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "check-wear"), pumpRunning: false, pumpPaused: false }); break;
    case "calibration-start-check": {
      const kind = ENTRY === "hospital" ? "hospital" : "home";
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      setState({ [`${kind}Step`]: screens.findIndex(screen => screen.id === "check-initiation") });
      break;
    }
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
    case "comfort-down": setState({ comfortLevel: Math.max(1, state.comfortLevel - 1) }); break;
    case "comfort-up": setState({ comfortLevel: Math.min(12, state.comfortLevel + 1) }); break;
    case "pump-level-down": setState({ comfortLevel: Math.max(1, state.comfortLevel - 1) }); break;
    case "pump-level-up": setState({ comfortLevel: Math.min(12, state.comfortLevel + 1) }); break;
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
    case "home-control": setState({ homeStep: homeScreens.findIndex(screen => screen.id === "control") }); break;
    case "step-back": {
      const key = `${target.dataset.kind}Step`;
      setState({ [key]: Math.max(0, state[key] - 1) });
      break;
    }
    case "step-next": {
      const kind = target.dataset.kind;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const key = `${kind}Step`;
      setState({ [key]: Math.min(screens.length - 1, state[key] + 1) });
      break;
    }
    case "reset":
      state = { ...defaults };
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
  if (!event.target.matches("[data-mode-name-input]")) return;
  state = { ...state, customModeName: event.target.value };
  saveState();
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
