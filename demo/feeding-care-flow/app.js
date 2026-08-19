const VERSION = "0.2.0";
const STORAGE_KEY = "momcozy-carelink-demo-v1";
const ENTRY_SIDE = document.body.dataset.entry || "";

const defaults = {
  side: "hospital",
  hospitalView: "overview",
  homeView: "today",
  patient: "林晓然",
  bed: "12A",
  plan: { formula: "深度水解配方", volume: 90, temperature: 40, interval: 3, published: false },
  deviceBound: false,
  handoffDone: false,
  mixMode: "formula",
  mixStep: 0,
  records: [
    { time: "06:30", volume: 80, status: "已完成", source: "智能调奶器" },
    { time: "03:25", volume: 75, status: "已完成", source: "手动记录" }
  ],
  alerts: [
    { id: 1, level: "orange", title: "夜间摄入量偏低", detail: "林晓然过去 8 小时摄入量低于方案目标 18%", time: "08:12", open: true },
    { id: 2, level: "red", title: "连续两次未完成喂养", detail: "陈予安家庭端上报拒奶，建议电话随访", time: "07:46", open: true }
  ]
};

let state = loadState();
if (ENTRY_SIDE) state.side = ENTRY_SIDE;
let modal = null;

function loadState() {
  try { return { ...structuredClone(defaults), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return structuredClone(defaults); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function icon(name, size = 18) { return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" aria-hidden="true"></i>`; }
function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}
function setState(patch, message) { state = { ...state, ...patch }; saveState(); render(); if (message) toast(message); }
function fmtTime() { return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", hour12: false }); }
function navButton(view, label, iconName, badge = "") {
  return `<button class="nav-button ${state.hospitalView === view ? "active" : ""}" data-action="hospital-view" data-view="${view}">${icon(iconName)}<span>${label}</span>${badge ? `<b class="badge">${badge}</b>` : ""}</button>`;
}

function switcher() {
  return `<div class="top-switcher" aria-label="切换原型端">
    <span class="sync-dot" title="双端数据已同步"></span>
    <button class="${state.side === "hospital" ? "active" : ""}" data-action="switch-side" data-side="hospital">院端工作台</button>
    <button class="${state.side === "home" ? "active" : ""}" data-action="switch-side" data-side="home">居家端</button>
  </div>`;
}

function hospitalShell() {
  const openAlerts = state.alerts.filter(a => a.open).length;
  return `${switcher()}<main class="hospital">
    <aside class="side-nav">
      <div class="brand"><img src="../../assets/momcozy-app-icon-cropped.png" alt="Momcozy"/><div><strong>CareLink</strong><span>智慧喂养照护平台</span></div></div>
      <div class="nav-label">临床工作台</div>
      ${navButton("overview", "总览", "layout-dashboard")}
      ${navButton("patients", "患者管理", "users")}
      ${navButton("protocol", "喂养方案", "clipboard-list")}
      ${navButton("handoff", "出院交接", "house-plus")}
      ${navButton("alerts", "远程预警", "triangle-alert", openAlerts)}
      <div class="nav-label">设备与数据</div>
      ${navButton("devices", "设备管理", "cpu")}
      <div class="nav-spacer"></div>
      ${navButton("settings", "系统设置", "settings")}
      <div class="version-card">原型版本 v${VERSION}<br>本地状态已开启</div>
    </aside>
    <section class="workspace">${hospitalView()}</section>
  </main>`;
}

function header(title, subtitle, actions = "") {
  return `<header class="page-header"><div><span class="eyebrow">Momcozy Hospital Care</span><h1>${title}</h1><p>${subtitle}</p></div><div class="header-actions">${actions}</div></header>`;
}
function hospitalView() {
  switch (state.hospitalView) {
    case "protocol": return protocolView();
    case "handoff": return handoffView();
    case "alerts": return alertsView();
    case "patients": return patientsView();
    case "devices": return devicesView();
    case "settings": return settingsView();
    default: return overviewView();
  }
}

function overviewView() {
  const openAlerts = state.alerts.filter(a => a.open).length;
  return `${header("喂养照护总览", "产科住院与居家延续照护 · 2026年8月19日", `<button class="btn" data-action="reset">${icon("rotate-ccw")}重置演示</button><button class="btn primary" data-action="hospital-view" data-view="protocol">${icon("plus")}新建方案</button>`)}
    <div class="metrics">
      ${metric("在管母婴", "28", "users", "较昨日 +3")}${metric("今日待交接", state.handoffDone ? "3" : "4", "house-plus", state.handoffDone ? "已完成 1 例" : "1 例临近出院")}${metric("居家方案执行率", state.records.length > 2 ? "94%" : "91%", "chart-no-axes-combined", "近 7 日 +4.2%")}${metric("待处理预警", openAlerts, "triangle-alert", openAlerts ? "需要临床确认" : "全部已闭环")}
    </div>
    <div class="grid-2">
      <section class="panel"><div class="panel-head"><h2>重点关注患者</h2><span>按风险等级排序</span></div>${patientRows()}</section>
      <section class="panel"><div class="panel-head"><h2>实时预警</h2><button class="icon-btn" title="查看全部" data-action="hospital-view" data-view="alerts">${icon("arrow-up-right")}</button></div><div class="alert-list">${alertItems(3)}</div></section>
    </div>`;
}
function metric(label, value, iconName, delta) { return `<article class="metric"><div class="metric-top"><span>${label}</span>${icon(iconName)}</div><strong>${value}</strong><div class="delta">${delta}</div></article>`; }
function patientRows() {
  const rows = [
    ["林晓然", "12A · 产后第3天", state.plan.published ? "居家方案已发布" : "待配置出院方案", state.plan.volume + " ml / 次", "今日出院", state.plan.published ? "green" : "orange"],
    ["陈予安", "08C · 居家第6天", "夜间拒奶", "65 ml / 次", "需随访", "red"],
    ["周雨桐", "15B · 产后第1天", "亲喂评估中", "按需喂养", "院内观察", "green"],
    ["许安禾", "03A · 居家第12天", "方案执行良好", "90 ml / 次", "稳定", "green"]
  ];
  return rows.map((r, i) => `<div class="patient-row"><div class="patient"><div class="avatar">${r[0].slice(-1)}</div><div><strong>${r[0]}</strong><span>${r[1]}</span></div></div><div><div class="cell-label">当前状态</div><span class="status ${r[5]}">${r[2]}</span></div><div><div class="cell-label">目标奶量</div><div class="cell-value">${r[3]}</div></div><div><div class="cell-label">照护阶段</div><div class="cell-value">${r[4]}</div></div><button class="icon-btn" title="查看患者" data-action="hospital-view" data-view="${i === 0 ? "protocol" : "patients"}">${icon("chevron-right")}</button></div>`).join("");
}
function alertItems(limit = 99) {
  const items = state.alerts.filter(a => a.open).slice(0, limit);
  if (!items.length) return `<div class="empty">${icon("circle-check", 28)}<p>当前没有待处理预警</p></div>`;
  return items.map(a => `<article class="alert-item"><div class="alert-icon">${icon(a.level === "red" ? "octagon-alert" : "triangle-alert")}</div><div><strong>${a.title}</strong><p>${a.detail}</p><time>${a.time} · ${a.level === "red" ? "高优先级" : "需关注"}</time></div></article>`).join("");
}
function flowStrip(active) {
  const steps = [["01","院内评估"],["02","制定方案"],["03","设备绑定"],["04","出院交接"],["05","居家随访"]];
  return `<div class="flow-strip">${steps.map((s,i)=>`<div class="flow-step ${i < active ? "done" : i === active ? "current" : ""}"><b>${s[0]}</b><strong>${s[1]}</strong></div>`).join("")}</div>`;
}
function protocolView() {
  return `${header("制定出院喂养方案", `${state.patient} · 床位 ${state.bed} · 预计今日出院`, `<button class="btn" data-action="hospital-view" data-view="overview">取消</button><button class="btn primary" data-action="publish-plan">${icon("send")}发布到居家端</button>`)}
    ${flowStrip(state.plan.published ? 2 : 1)}
    <div class="grid-2"><section class="panel"><div class="panel-head"><h2>营养与喂养参数</h2><span>保存后同步至家庭设备</span></div>
      <div class="form-grid">
        <div class="field full"><label>配方类型</label><select id="formula"><option ${state.plan.formula === "深度水解配方" ? "selected" : ""}>深度水解配方</option><option ${state.plan.formula === "普通婴儿配方" ? "selected" : ""}>普通婴儿配方</option><option ${state.plan.formula === "母乳强化剂" ? "selected" : ""}>母乳强化剂</option></select></div>
        <div class="field"><label>单次目标奶量（ml）</label><input id="volume" type="number" min="30" max="180" step="5" value="${state.plan.volume}" /></div>
        <div class="field"><label>目标水温（℃）</label><input id="temperature" type="number" min="35" max="50" value="${state.plan.temperature}" /></div>
        <div class="field"><label>建议间隔（小时）</label><input id="interval" type="number" min="2" max="5" step="0.5" value="${state.plan.interval}" /></div>
        <div class="field"><label>每日建议次数</label><input type="text" value="8 次" disabled /></div>
        <div class="field full"><label>临床备注</label><input type="text" value="先少量试喂，观察腹胀与皮疹；连续两次完成度低于 70% 时自动预警。" /></div>
      </div><div class="protocol-summary"><strong>方案摘要</strong><p>每 ${state.plan.interval} 小时使用 ${state.plan.formula} 冲调 ${state.plan.volume} ml，目标水温 ${state.plan.temperature}℃。家庭端将接收定时提醒并自动记录设备冲调数据。</p></div>
    </section><section class="panel"><div class="panel-head"><h2>患者评估</h2><span>最新 09:10</span></div><div class="alert-list">
      ${assessment("出生体重", "3.26 kg", "稳定", "green")}${assessment("当前体重", "3.12 kg", "下降 4.3%", "orange")}${assessment("黄疸指数", "9.8 mg/dL", "低风险", "green")}${assessment("喂养耐受", "良好", "无呕吐/腹胀", "green")}
    </div></section></div>`;
}
function assessment(title, value, note, level) { return `<div class="alert-item"><div class="alert-icon">${icon("activity")}</div><div><strong>${title} · ${value}</strong><p>${note}</p><span class="status ${level}">${level === "green" ? "正常" : "关注"}</span></div></div>`; }
function handoffView() {
  const active = state.handoffDone ? 4 : state.deviceBound ? 3 : state.plan.published ? 2 : 1;
  return `${header("出院交接", `${state.patient} · 家庭照护准备度核对`, `<button class="btn primary" data-action="complete-handoff" ${!state.plan.published || !state.deviceBound ? "disabled" : ""}>${icon("check")}完成交接</button>`)}${flowStrip(active)}
    <div class="grid-2"><section class="panel"><div class="panel-head"><h2>交接清单</h2><span>${state.handoffDone ? "已完成" : "进行中"}</span></div><div class="alert-list">
      ${checkItem("喂养方案已发布", state.plan.published, "同步奶量、水温、间隔与注意事项")}
      ${checkItem("家庭设备已绑定", state.deviceBound, "智能调奶器 CareMix S1")}
      ${checkItem("家属操作培训", true, "已完成冲调与清洁演示")}
      ${checkItem("首次随访已预约", true, "8月22日 10:30 · 视频随访")}
    </div></section><section class="panel"><div class="panel-head"><h2>家庭设备</h2><span>${state.deviceBound ? "在线" : "待绑定"}</span></div><div class="form-grid"><div class="field full"><label>设备型号</label><input value="CareMix S1 智能调奶器" disabled /></div><div class="field full"><label>设备序列号</label><input value="MC-S1-0826-0318" disabled /></div><button class="btn primary" data-action="bind-device">${icon("link")} ${state.deviceBound ? "重新校验连接" : "绑定家庭设备"}</button></div></section></div>`;
}
function checkItem(title, done, detail) { return `<div class="alert-item"><div class="alert-icon" style="color:${done ? "var(--green)" : "var(--muted)"};background:${done ? "var(--green-soft)" : "var(--soft)"}">${icon(done ? "circle-check" : "circle")}</div><div><strong>${title}</strong><p>${detail}</p></div></div>`; }
function alertsView() {
  return `${header("远程预警中心", "跨院内与居家场景的风险闭环", `<button class="btn" data-action="resolve-all">${icon("check-check")}全部标记已处理</button>`)}<div class="grid-2"><section class="panel"><div class="panel-head"><h2>待处理预警</h2><span>${state.alerts.filter(a=>a.open).length} 条</span></div><div class="alert-list">${alertItems()}</div></section><section class="panel"><div class="panel-head"><h2>处置建议</h2><span>临床辅助</span></div><div class="protocol-summary" style="border:0"><strong>建议优先联系高风险家庭</strong><p>确认拒奶是否伴随嗜睡、发热或尿量减少；必要时建议就近就诊。所有操作将在演示数据中形成闭环记录。</p></div></section></div>`;
}
function patientsView() { return `${header("患者管理", "在院与居家母婴统一档案", `<button class="btn primary">${icon("user-plus")}新建档案</button>`)}<section class="panel"><div class="panel-head"><h2>全部患者</h2><span>28 人</span></div>${patientRows()}</section>`; }
function devicesView() { return `${header("设备管理", "院内设备与家庭设备统一监测", `<button class="btn primary" data-action="bind-device">${icon("plus")}添加设备</button>`)}<div class="metrics">${metric("在线设备","36","wifi","在线率 97.3%")}${metric("家庭设备","18","house","今日新增 2 台")}${metric("待清洁","3","sparkles","院内设备")}${metric("异常设备","1","triangle-alert","水温校准提醒")}</div><section class="panel"><div class="panel-head"><h2>林晓然家庭设备</h2><span>${state.deviceBound ? "已绑定" : "待绑定"}</span></div><div class="protocol-summary" style="border:0"><strong>CareMix S1 · MC-S1-0826-0318</strong><p>连接状态：${state.deviceBound ? "在线，最后同步于 " + fmtTime() : "尚未绑定到患者档案"}</p></div></section>`; }
function settingsView() { return `${header("系统设置", "原型演示与数据管理")}<section class="panel"><div class="panel-head"><h2>演示数据</h2><span>v${VERSION}</span></div><div class="form-grid"><button class="btn danger" data-action="reset">${icon("rotate-ccw")}恢复初始演示状态</button></div></section>`; }

function homeShell() {
  return `${switcher()}<main class="home-stage"><section class="phone" aria-label="居家端移动原型">
    <div class="mobile-status"><span>9:41</span><span>${icon("signal",14)} ${icon("wifi",14)} ${icon("battery-full",16)}</span></div>
    <header class="mobile-head"><div class="line"><div><h1>${homeTitle()}</h1><p>${state.plan.published ? "照护方案已与医院同步" : "等待医院发布出院方案"}</p></div><button class="mobile-avatar" title="家庭档案">然</button></div></header>
    <div class="mobile-content">${homeView()}</div>${mobileNav()}
  </section></main>${modal ? modalView() : ""}`;
}
function homeTitle() { return {today:"早上好，晓然妈妈", prepare:"智能调奶", records:"喂养记录", messages:"照护消息"}[state.homeView]; }
function mobileNav() {
  const items = [["today","今日","house"],["prepare","调奶","milk"],["records","记录","chart-no-axes-column-increasing"],["messages","消息","message-circle"]];
  return `<nav class="mobile-nav">${items.map(i=>`<button class="${state.homeView===i[0]?"active":""}" data-action="home-view" data-view="${i[0]}">${icon(i[2],19)}<span>${i[1]}</span></button>`).join("")}</nav>`;
}
function homeView() {
  if (state.homeView === "prepare") return prepareView();
  if (state.homeView === "records") return recordsView();
  if (state.homeView === "messages") return messagesView();
  return todayView();
}
function todayView() {
  const next = state.plan.published ? `下一次喂养 · ${state.plan.volume} ml` : "等待院端方案";
  return `<section class="hero-card"><span class="kicker">今日照护计划</span><h2>${next}</h2><p>${state.plan.published ? `${state.plan.formula}，建议 ${state.plan.temperature}℃ 冲调，距建议时间还有 24 分钟。` : "请联系责任护士完成出院交接。"}</p><button class="btn primary" data-action="home-view" data-view="prepare" ${!state.plan.published ? "disabled" : ""}>开始准备 ${icon("arrow-right")}</button><div class="mini-progress"><span class="done"></span><span class="done"></span><span class="done"></span><span></span><span></span><span></span><span></span><span></span></div></section>
    <div class="section-title"><h2>接下来</h2><button data-action="home-view" data-view="records">查看记录</button></div><div class="task-list">
      ${task("milk", "计划喂养", `${state.plan.volume} ml · ${state.plan.formula}`, "10:00")}${task("droplets", "设备清洁", "冲调完成后清洁混合仓", "10:20")}${task("video", "视频随访", "刘护士 · 出院后首次随访", "8月22日")}
    </div><div class="section-title"><h2>快捷操作</h2></div><div class="quick-grid"><button class="quick-card" data-action="report-alert">${icon("triangle-alert")}<strong>上报异常</strong><span>拒奶、呕吐或皮疹</span></button><button class="quick-card" data-action="home-view" data-view="records">${icon("notebook-pen")}<strong>手动记录</strong><span>补录本次喂养</span></button></div>`;
}
function task(iconName,title,detail,time){return `<article class="task"><div class="task-icon">${icon(iconName)}</div><div><strong>${title}</strong><p>${detail}</p></div><time>${time}</time></article>`;}
function prepareView() {
  return `<section class="prepare-card"><h2>喂养方式</h2><div class="segmented"><button class="${state.mixMode==="formula"?"active":""}" data-action="mix-mode" data-mode="formula">配方奶</button><button class="${state.mixMode==="water"?"active":""}" data-action="mix-mode" data-mode="water">仅出水</button></div>
    <div class="control-row"><label>目标奶量</label><div class="stepper"><button data-action="adjust-volume" data-delta="-5">−</button><strong>${state.plan.volume} ml</strong><button data-action="adjust-volume" data-delta="5">+</button></div></div>
    <div class="control-row"><label>目标水温</label><div class="stepper"><button data-action="adjust-temp" data-delta="-1">−</button><strong>${state.plan.temperature} ℃</strong><button data-action="adjust-temp" data-delta="1">+</button></div></div>
  </section><div class="device-readings"><div class="reading"><span>水箱</span><strong>76%</strong></div><div class="reading"><span>奶粉仓</span><strong>充足</strong></div><div class="reading"><span>连接</span><strong style="color:var(--green)">在线</strong></div></div>
  <section class="prepare-card"><h2>来自医院的方案</h2><div class="alert-item"><div class="alert-icon">${icon("hospital")}</div><div><strong>${state.plan.formula}</strong><p>每 ${state.plan.interval} 小时 ${state.plan.volume} ml · ${state.plan.temperature}℃</p></div></div></section>
  <button class="bottom-action" data-action="start-mix" ${!state.plan.published ? "disabled" : ""}>${icon("play")}开始冲调</button>`;
}
function recordsView() {
  return `<div class="section-title" style="margin-top:2px"><h2>今日摄入 ${state.records.reduce((s,r)=>s+r.volume,0)} ml</h2><button data-action="manual-record">补录</button></div>${state.records.map(r=>`<article class="record"><div class="task-icon">${icon("milk")}</div><div><strong>${r.time} · ${r.status}</strong><p>${r.source}</p></div><b>${r.volume} ml</b></article>`).join("")}`;
}
function messagesView() {
  const open = state.alerts.filter(a=>a.open);
  return `<div class="task-list">${task("hospital","刘护士","方案已同步，有问题可随时留言","09:18")}${task("calendar-check","随访提醒","8月22日 10:30 视频随访","昨天")}${open.map(a=>task("triangle-alert",a.title,a.detail,a.time)).join("")}</div>`;
}
function modalView() {
  if (modal.type !== "mix") return "";
  const steps = ["设备自检与杯体识别", `加热净水至 ${state.plan.temperature}℃`, `按方案投放 ${state.plan.formula}`, "完成冲调并记录数据"];
  return `<div class="modal-backdrop"><section class="modal"><div class="modal-head"><h2>智能冲调</h2><button class="icon-btn" data-action="close-modal" title="关闭">${icon("x")}</button></div><div class="modal-body"><div class="mix-visual"><div class="mix-ring"></div><div class="bottle"></div></div><div class="step-list">${steps.map((s,i)=>`<div class="mix-step ${i<state.mixStep?"done":i===state.mixStep?"active":""}"><span class="step-num">${i<state.mixStep?icon("check",14):i+1}</span>${s}</div>`).join("")}</div></div><div class="modal-actions"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="next-mix">${state.mixStep === 3 ? "完成喂养" : "确认并继续"}</button></div></section></div>`;
}

function render() {
  document.getElementById("app").innerHTML = state.side === "hospital" ? hospitalShell() : homeShell();
  if (window.lucide) lucide.createIcons({ attrs: { class: "svg-icon" } });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]"); if (!target) return;
  const action = target.dataset.action;
  if (action === "switch-side") {
    const side = target.dataset.side;
    if (ENTRY_SIDE) window.location.href = side === "hospital" ? "./hospital.html" : "./home.html";
    else setState({ side });
  }
  if (action === "hospital-view") setState({ hospitalView: target.dataset.view });
  if (action === "home-view") setState({ homeView: target.dataset.view });
  if (action === "mix-mode") setState({ mixMode: target.dataset.mode });
  if (action === "publish-plan") {
    const formula = document.getElementById("formula")?.value || state.plan.formula;
    const volume = Number(document.getElementById("volume")?.value || state.plan.volume);
    const temperature = Number(document.getElementById("temperature")?.value || state.plan.temperature);
    const interval = Number(document.getElementById("interval")?.value || state.plan.interval);
    state.plan = { formula, volume, temperature, interval, published: true }; saveState(); render(); toast("方案已发布，居家端已同步");
  }
  if (action === "bind-device") { state.deviceBound = true; saveState(); render(); toast("CareMix S1 已绑定并在线"); }
  if (action === "complete-handoff") { state.handoffDone = true; saveState(); render(); toast("出院交接完成，进入居家随访"); }
  if (action === "adjust-volume") { state.plan.volume = Math.max(30, Math.min(180, state.plan.volume + Number(target.dataset.delta))); saveState(); render(); }
  if (action === "adjust-temp") { state.plan.temperature = Math.max(35, Math.min(50, state.plan.temperature + Number(target.dataset.delta))); saveState(); render(); }
  if (action === "start-mix") { state.mixStep = 0; modal = { type: "mix" }; render(); }
  if (action === "close-modal") { modal = null; render(); }
  if (action === "next-mix") {
    if (state.mixStep < 3) { state.mixStep += 1; saveState(); render(); }
    else { state.records.unshift({time:fmtTime(),volume:state.plan.volume,status:"已完成",source:"CareMix S1 自动同步"}); state.mixStep=0; modal=null; saveState(); render(); toast("喂养完成，记录已同步至院端"); }
  }
  if (action === "manual-record") { state.records.unshift({time:fmtTime(),volume:60,status:"已完成",source:"家庭手动补录"}); saveState(); render(); toast("已补录 60 ml"); }
  if (action === "report-alert") { state.alerts.unshift({id:Date.now(),level:"orange",title:"家庭端上报：喂养后轻微吐奶",detail:`${state.patient}家属于 ${fmtTime()} 上报，请责任护士评估。`,time:fmtTime(),open:true}); saveState(); render(); toast("异常已上报，院端已收到"); }
  if (action === "resolve-all") { state.alerts = state.alerts.map(a=>({...a,open:false})); saveState(); render(); toast("所有预警已闭环"); }
  if (action === "reset") { localStorage.removeItem(STORAGE_KEY); state=structuredClone(defaults); modal=null; render(); toast("演示状态已重置"); }
});

render();
