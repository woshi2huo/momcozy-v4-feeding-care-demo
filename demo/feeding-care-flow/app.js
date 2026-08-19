const ENTRY = document.body.dataset.entry || "launcher";
const VERSION = "0.3.2";
const STORAGE_KEY = `momcozy-figma-755-demo-v3-${ENTRY}`;

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
  { id: "training-ready", image: "home-02-ready.png", width: 393, height: 852, label: "设备教学完成页" }
];

const homeScreens = [
  { id: "welcome", image: "home-00-welcome.png", width: 393, height: 852, label: "设备助手欢迎页" },
  { id: "guide", image: "home-01-guide.png", width: 393, height: 852, label: "设备助手教学页" },
  { id: "ready", image: "home-02-ready.png", width: 393, height: 852, label: "设备助手完成页" },
  { id: "control", image: "home-03-control.png", width: 375, height: 956, label: "吸乳控制初始状态" },
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
  trainingDone: false,
  codeDigit: "",
  pumpRunning: false,
  sessionLogged: false
};

let state = loadState();
let transitionTimer = null;

function loadState() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
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
      return hotspot("complete-hospital-training", "开始使用 V4", 6.0, 49.5, 88.0, 6.0);
    default: return "";
  }
}

function homeHotspots(screen) {
  switch (screen.id) {
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
      return [
        hotspot("start-pump", "开始吸乳", 6.3, 91.2, 87.4, 5.6),
        hotspot("home-device", "返回设备页", 3.5, 4.3, 9.0, 4.8)
      ].join("");
    case "pumping": return hotspot("finish-pump", "完成本次吸乳", 23.0, 11.2, 54.0, 15.5);
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

function screenMarkup(kind) {
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const step = Math.max(0, Math.min(screens.length - 1, state[`${kind}Step`]));
  const screen = screens[step];
  const hotspots = kind === "hospital" ? hospitalHotspots(screen) : homeHotspots(screen);
  const digit = screen.id === "code" && state.codeDigit
    ? `<span class="code-digit" aria-hidden="true">${state.codeDigit}</span><span class="next-enabled" aria-hidden="true">Next</span>`
    : "";
  return `<div class="screen-frame" style="--screen-width:${screen.width};--screen-height:${screen.height}">
    <img class="figma-screen" src="./assets/figma-755/${screen.image}" width="${screen.width}" height="${screen.height}" alt="${screen.label}" draggable="false" />
    <div class="hotspot-layer">${hotspots}${digit}</div>
  </div>`;
}

function prototypeToolbar(kind) {
  const step = state[`${kind}Step`];
  const screens = kind === "hospital" ? hospitalScreens : homeScreens;
  const status = kind === "hospital"
    ? (state.trainingDone ? "设备教学已完成" : state.deviceBound ? (step >= 7 ? "设备教学中" : "V4 已绑定") : "院端独立演示")
    : (state.sessionLogged ? "本次记录已保存" : "居家独立演示");
  const ready = kind === "home" || state.deviceBound;
  return `<div class="prototype-toolbar">
    <div class="prototype-meta"><strong>${kind === "hospital" ? "院端设备配置与教学" : "居家吸乳使用"}</strong><span>${step + 1}/${screens.length} · ${screens[step].label}</span></div>
    <div class="sync-state ${ready ? "ready" : ""}"><span></span>${status}</div>
    <div class="toolbar-actions">
      <button class="tool-button" data-action="step-back" data-kind="${kind}" title="上一步" ${step === 0 ? "disabled" : ""}>${icon("arrow-left", "上一步")}</button>
      <button class="tool-button" data-action="step-next" data-kind="${kind}" title="下一步" ${step >= screens.length - 1 ? "disabled" : ""}>${icon("arrow-right", "下一步")}</button>
      <button class="tool-button" data-action="reset" title="重置全部流程">${icon("rotate-ccw", "重置全部流程")}</button>
    </div>
  </div>`;
}

function prototypePage(kind) {
  return `<main class="prototype-page">${prototypeToolbar(kind)}<section class="device-stage" aria-label="${kind === "hospital" ? "院端交互原型" : "居家交互原型"}">${screenMarkup(kind)}</section></main>`;
}

function launcher() {
  return `<main class="launcher">
    <header class="launcher-header"><div><span>Figma 755:11403</span><h1>吸乳器双场景独立 Demo</h1></div><div class="launcher-actions"><span class="version">v${VERSION}</span></div></header>
    <section class="demo-grid">
      <article class="demo-column"><div class="demo-heading"><div><strong>院端 Demo</strong><span>绑定并完成 V4 设备教学</span></div><a href="./hospital.html" target="_blank">独立打开</a></div><iframe src="./hospital.html" title="院端 Demo"></iframe></article>
      <article class="demo-column"><div class="demo-heading"><div><strong>居家 Demo</strong><span>教学、吸乳、记录与数据</span></div><a href="./home.html" target="_blank">独立打开</a></div><iframe src="./home.html" title="居家 Demo"></iframe></article>
    </section>
  </main>`;
}

function render() {
  clearTimeout(transitionTimer);
  const app = document.getElementById("app");
  app.innerHTML = ENTRY === "launcher" ? launcher() : prototypePage(ENTRY);
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  if (ENTRY === "hospital" && hospitalScreens[state.hospitalStep].id === "binding") {
    transitionTimer = setTimeout(() => setState({ hospitalStep: 6, deviceBound: true }, "V4 绑定成功"), 1500);
  }
  if (ENTRY === "home" && homeScreens[state.homeStep].id === "logged") {
    transitionTimer = setTimeout(() => setState({ homeStep: 7 }), 1600);
  }
}

function handleAction(action, target) {
  switch (action) {
    case "hospital-next": setState({ hospitalStep: Math.min(hospitalScreens.length - 1, state.hospitalStep + 1) }); break;
    case "hospital-prev": setState({ hospitalStep: Math.max(0, state.hospitalStep - 1) }); break;
    case "enter-code": if (!state.codeDigit) setState({ codeDigit: "4" }, "验证码已填写"); break;
    case "submit-code": if (state.codeDigit) setState({ hospitalStep: 5 }); break;
    case "hospital-learn": setState({ hospitalStep: 7 }); break;
    case "hospital-training-ready": setState({ hospitalStep: hospitalScreens.length - 1 }); break;
    case "hospital-training-exit": setState({ hospitalStep: 6 }); break;
    case "complete-hospital": showToast("院端设备绑定演示已完成"); break;
    case "complete-hospital-training": setState({ trainingDone: true }, "院端设备教学已完成"); break;
    case "home-next": setState({ homeStep: Math.min(8, state.homeStep + 1) }); break;
    case "home-prev": setState({ homeStep: Math.max(0, state.homeStep - 1) }); break;
    case "home-ready": setState({ homeStep: 2 }); break;
    case "start-pump": setState({ homeStep: 4, pumpRunning: true }, "V4 已开始吸乳"); break;
    case "finish-pump": setState({ homeStep: 5, pumpRunning: false }); break;
    case "save-session": setState({ homeStep: 6, sessionLogged: true }, "吸乳记录已保存"); break;
    case "show-dashboard": setState({ homeStep: 7 }); break;
    case "home-device": setState({ homeStep: 8 }); break;
    case "home-control": setState({ homeStep: 3 }); break;
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

window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  state = loadState();
  render();
});

render();
