const ENTRY = document.body.dataset.entry || "hospital";
const VERSION = "0.3.18";
const STORAGE_KEY = ENTRY === "home"
  ? `momcozy-figma-755-demo-v${VERSION}-home`
  : `momcozy-figma-755-demo-v3-${ENTRY}`;

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
  leftVolume: 0,
  rightVolume: 0
};

let state = loadState();
let transitionTimer = null;
let holdTimer = null;
let holdTarget = null;
let navigationOpen = false;
let directNavigation = false;
let previousCheckScreenId = null;

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

function hotspot(action, label, x, y, width, height, extra = "") {
  return `<button class="hotspot" data-action="${action}" aria-label="${label}" title="${label}" style="--x:${x};--y:${y};--w:${width};--h:${height}" ${extra}></button>`;
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
    case "pump-dashboard":
      return hotspot("hospital-return-device", "返回设备子首页", 3.8, 7.1, 11.0, 5.2);
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
    case "control":
      return hotspot("home-device", "返回设备页", 3.5, 4.3, 9.0, 4.8);
    case "pumping":
      return [
        hotspot("pump-level-down", "降低吸乳档位", 8.5, 54.3, 20.0, 4.9),
        hotspot("pump-level-up", "提高吸乳档位", 71.5, 54.3, 20.0, 4.9)
      ].join("");
    case "finished": return hotspot("save-session", "保存吸乳记录", 5.0, 90.1, 90.0, 6.2);
    case "logged": return hotspot("show-dashboard", "查看吸乳数据", 0, 0, 100, 100);
    case "dashboard":
      return [
        hotspot("home-device", "返回设备页", 3.8, 4.3, 11.0, 5.2),
        hotspot("home-control", "开始 Milk Boost", 72.0, 90.2, 22.0, 6.7)
      ].join("");
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

function screenMarkup(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const step = Math.max(0, Math.min(screens.length - 1, state[`${kind}Step`]));
  const screen = screens[step];
  const hotspots = kind === "hospital" ? hospitalHotspots(screen) : homeHotspots(screen);
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
        { label: "吸乳与记录", icon: "activity", start: 8, end: homeScreens.length - 1 }
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
    app.querySelector(".navigation-item.active")?.scrollIntoView({ block: "nearest" });
  });
  if (!directNavigation && ENTRY === "hospital" && hospitalScreens[state.hospitalStep].id === "binding") {
    transitionTimer = setTimeout(() => setState({ hospitalStep: 6, deviceBound: true }, "V4 绑定成功"), 1500);
  }
  if (!directNavigation && ["hospital", "home"].includes(ENTRY)) {
    const screens = ENTRY === "hospital" ? hospitalScreens : homeScreens;
    const key = `${ENTRY}Step`;
    const currentId = screens[state[key]].id;
    if (currentId === "check-initiation") {
      transitionTimer = setTimeout(() => setState({ [key]: screens.findIndex(screen => screen.id === "check-fit") }), 1600);
    }
    if (currentId === "check-fit") {
      transitionTimer = setTimeout(() => setState({ [key]: screens.findIndex(screen => screen.id === "check-fit-passed") }), 1800);
    }
  }
  if (!directNavigation && ENTRY === "hospital" && hospitalScreens[state.hospitalStep].id === "pump-logged") {
    transitionTimer = setTimeout(() => setState({
      hospitalStep: hospitalScreens.findIndex(screen => screen.id === "pump-dashboard")
    }), 1600);
  }
  if (!directNavigation && ENTRY === "home" && homeScreens[state.homeStep].id === "connect-connecting") {
    transitionTimer = setTimeout(() => setState({ homeStep: homeScreens.findIndex(screen => screen.id === "connect-done") }), 1400);
  }
  if (!directNavigation && ENTRY === "home" && homeScreens[state.homeStep].id === "logged") {
    transitionTimer = setTimeout(() => setState({
      homeStep: homeScreens.findIndex(screen => screen.id === "dashboard")
    }), 1600);
  }
}

function handleAction(action, target) {
  if (!["navigation-open", "navigation-close", "navigation-step"].includes(action)) directNavigation = false;
  switch (action) {
    case "navigation-open": navigationOpen = true; render(); break;
    case "navigation-close": navigationOpen = false; render(); break;
    case "navigation-step": {
      const kind = target.dataset.kind;
      const screens = kind === "hospital" ? hospitalScreens : homeScreens;
      const key = `${kind}Step`;
      const step = Math.max(0, Math.min(screens.length - 1, Number(target.dataset.step) || 0));
      const currentId = screens[step].id;
      const progress = kind === "hospital"
        ? {
            deviceBound: step >= 6,
            trainingDone: step >= 11,
            pumpRunning: currentId === "pump-running",
            pumpPaused: false,
            sessionLogged: ["pump-logged", "pump-dashboard", "device-home"].includes(currentId)
          }
        : {
            homeDeviceConnected: step >= 4,
            trainingDone: step >= 8,
            pumpRunning: currentId === "pumping",
            pumpPaused: false,
            sessionLogged: ["logged", "dashboard", "device"].includes(currentId)
          };
      navigationOpen = false;
      directNavigation = true;
      setState({ [key]: step, ...progress });
      break;
    }
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
