const I={

cam:'<svg viewBox="0 0 24 24"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',

clip:'<svg viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h4"/></svg>',

chat:'<svg viewBox="0 0 24 24"><path d="M4 12a8 7 0 1 1 3.5 5.7L4 19l1.2-3.4A7 7 0 0 1 4 12z"/></svg>',

chev:'<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',

back:'<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',

bell:'<svg viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4"/></svg>',

head:'<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/><path d="M19 20c0 1-2 2-5 2"/></svg>',

life:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/></svg>',

tick:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',

vid:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10.5l5-3v9l-5-3z"/></svg>'};

const ZOOM="https://zoom.us/j/0000000000"; // replace with the real Zoom meeting link created by your system

let stream;

async function openCall(){

 $("#call").classList.remove("hide");$("#cst").textContent="Connecting…";

 try{stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true});$("#me").srcObject=stream;$("#me").classList.remove("hide")}

 catch(e){$("#me").classList.add("hide");$("#cst").textContent="Connecting… (camera not available, you can still talk)"}

 setTimeout(()=>{if(!$("#call").classList.contains("hide"))$("#cst").textContent="Connected"},2500);

}

function endCall(){stream&&stream.getTracks().forEach(t=>t.stop());stream=null;$("#call").classList.add("hide")}

const FIXES={

 wifi:[["Restart your router","Unplug the router's power cable and wait 30 seconds.","Plug it back in and wait 2 minutes for the lights to turn steady.","Try opening a website again."],["Reconnect to Wi-Fi","Click the Wi-Fi icon near the clock.","Turn Wi-Fi off, then on again.","Choose your network and enter the password."]],

 printer:[["Check the basics","Make sure the printer is on and has paper.","Look for a blinking red or orange light, or paper stuck inside.","Turn the printer off and on again."],["Clear the print queue","Open the printer list on your computer.","Cancel any stuck documents.","Print one page to test."]],

 email:[["Close and reopen your email","Close the email program completely.","Open it again and wait a minute.","Check that your internet is working."],["Try email in a web browser","Open your email website in a browser.","Sign in with your usual password.","If it works there, the app just needs a refresh."]],

 slow:[["Restart your computer","Save your work first.","Choose Restart (not Shut down) from the Start or Apple menu.","Wait for it to start fully before opening anything."],["Close what you aren't using","Close extra browser tabs and programs.","Check that nothing is downloading.","Try the task again."]],

 login:[["Check the keyboard","Make sure Caps Lock is off.","Type the password slowly and check each letter.","Try again."],["Reset your password","Click “Forgot password” on the sign-in page.","Follow the link sent to your email.","Choose a new password you can remember."]],

 audio:[["Check the volume","Make sure your device isn't muted.","Click the speaker icon near the clock and turn it up.","Try playing a video to test."],["Check the right speaker","Click the speaker icon and look for 'Output device'.","Make sure the correct speakers or headphones are selected.","Unplug and plug in your headphones again."]],

 camera:[["Check for a physical switch","Look for a small sliding cover over your laptop camera.","Check the side of your laptop for a physical camera switch.","Make sure nothing is blocking the lens."],["Check app permissions","Look for a camera icon in the browser address bar with a red slash.","Click it and select 'Allow'.","Refresh the page and try again."]],

 bluetooth:[["Restart Bluetooth","Turn Bluetooth off and wait 10 seconds.","Turn it back on.","Check if your device appears in the list."],["Re-pair the device","Remove or 'Forget' the device from the Bluetooth list.","Put your device in pairing mode (usually by holding its button).","Select it from the list to pair again."]],

 power:[["Check the charger","Make sure the charger is plugged firmly into the wall and device.","Try a different wall outlet.","Look for any damage on the cable."],["Perform a hard reset","Disconnect all cables and devices.","Hold the power button down for 30 full seconds.","Plug in only the power cable and try turning it on."]],

 virus:[["Run a scan","Open your antivirus program (like Windows Security).","Choose 'Quick scan' or 'Full scan'.","Follow the instructions if it finds anything."],["Close unexpected pop-ups","Do not click links inside suspicious pop-ups.","Close the browser tab completely.","If it won't close, restart your computer."]],

 other:[["Restart what's acting up","Save your work.","Close the program, or turn the device off and on.","Try again."]]};

const GUESS=[
 ["wifi|wi-fi|internet|network|online","wifi"],
 ["print|paper|toner","printer"],
 ["mail|outlook|gmail|inbox","email"],
 ["slow|freez|stuck|lag|hang","slow"],
 ["password|login|log in|sign in|locked","login"],
 ["audio|sound|speaker|hear|volume|mute","audio"],
 ["video|camera|webcam|see me","camera"],
 ["bluetooth|pair|connect device|wireless mouse","bluetooth"],
 ["battery|power|charge|won't turn on|dead","power"],
 ["virus|malware|hacked|popup|pop-up|scam","virus"]
];

const S={view:"home",mode:"photo",text:"",err:"",photos:[],fixIdx:0,ticket:null,chat:[],notes:[],unread:0};

const $=s=>document.querySelector(s);

const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const cat=()=>(GUESS.find(([r])=>new RegExp(r,"i").test(S.text+" "+S.err))||[0,"other"])[1];

const has=()=>!!(S.text.trim()||S.err.trim()||S.photos.length);

$("#logo").innerHTML=I.life;$("#bell").innerHTML=I.bell;



function bell(){

 $("#bell").querySelector("i")?.remove();

 if(S.unread)$("#bell").insertAdjacentHTML("beforeend","<i></i>");

 $("#notes").innerHTML=S.notes.length?S.notes.map(n=>`<p>${esc(n)}</p>`).join(""):'<p class="e">No updates yet. We\'ll tell you here when something changes.</p>';

}

$("#bell").onclick=()=>{const n=$("#notes");n.classList.toggle("hide");S.unread=0;bell()};

function note(t){S.notes.unshift(t);S.unread++;bell()}

function go(v,m){S.view=v;if(m)S.mode=m;render();window.scrollTo({top:0,behavior:"smooth"})}

function stp(n){return `<div class="stp">${["Describe","Quick fix","Get help"].map((t,i)=>`<div class="${n===i+1?"on":n>i+1?"dn":""}">${n>i+1?"✓ ":""}${t}</div>`).join("")}</div>`}

function addPhoto(f){if(!f||!f.type.startsWith("image/"))return;const r=new FileReader();r.onload=()=>{S.photos.push(r.result);if(S.view==="compose"){drawPhotos();check()}};r.readAsDataURL(f)}

function drawPhotos(){const el=$("#photos");if(!el)return;

 el.innerHTML=S.photos.map((p,i)=>`<div class="thumb"><img src="${p}" alt="Photo ${i+1}"><button aria-label="Remove photo ${i+1}" data-rm="${i}">×</button></div>`).join("");

 el.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{S.photos.splice(+b.dataset.rm,1);drawPhotos();check()})}

function check(){const b=$("#next");if(b)b.disabled=!has()}

const helpCard=(t)=>`<div class="help"><h3>${I.head}Need a real person?</h3><p>${t}</p><button class="btn pri" id="human" style="width:auto">Talk to a technician</button></div>`;



function render(){

 const a=$("#app");

 if(S.view==="home"){
  a.style.maxWidth = "1080px";
  a.innerHTML=`<div class="home-layout">
   <div class="home-main">
     <p class="eyebrow">👋 Hello! Your personal tech assistant</p>
     <h1>What can we help you fix today?</h1>
     <p class="sub">Don't worry about technical terms. Just show us what's happening.</p>

     <div class="ai-search-container">
       <div class="ai-search-box">
         <div class="ai-icon-box">
           <svg viewBox="0 0 24 24"><path d="M4 12a8 7 0 1 1 3.5 5.7L4 19l1.2-3.4A7 7 0 0 1 4 12z"/></svg>
           <div class="ai-text" style="font-weight:bold;font-size:12px;margin-top:-3px;">AI</div>
         </div>
         <input type="text" placeholder="Describe your problem to our AI (Voice/Text)" id="home-ai-input">
         <button class="ai-send-btn" id="home-ai-send">
           <svg viewBox="0 0 24 24" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
         </button>
       </div>
     </div>

     <div class="list layout-options">
      <button class="opt" data-m="photo">
        <span class="ic" style="background:#EBF3FF;color:#3B82F6">${I.cam}</span>
        <span class="tx"><b>Upload a photo or screenshot</b><small>Diagnose errors in your photo.</small></span>
        <span class="ch">${I.chev}</span>
      </button>
      <button class="opt" data-m="error">
        <span class="ic" style="background:#E4F6EA;color:#15803D">${I.clip}</span>
        <span class="tx"><b>Paste your error message</b><small>Translate complex errors into simple steps.</small></span>
        <span class="ch">${I.chev}</span>
      </button>
      <button class="opt" data-m="words">
        <span class="ic" style="background:#FFF0D9;color:#B45309">${I.chat}</span>
        <span class="tx"><b>Explain it in your own words</b><small>AI suggests immediate DIY fixes.</small></span>
        <span class="ch">${I.chev}</span>
      </button>
     </div>

     <div class="help" style="background:linear-gradient(135deg,#D6E4FF,#EEF4FF);border:1px solid #BFD3FA;border-radius:20px;padding:20px 22px;position:relative;overflow:hidden">
       <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 6px; position:relative; z-index:1;">
         <h3 style="margin:0;font-size:18px;font-weight:600;display:flex;gap:10px;align-items:center;color:var(--blue-t);">${I.head}Need a real person?</h3>
         <span style="font-size:11px; background:rgba(255,255,255,0.7); padding:4px 8px; border-radius:99px; font-weight:600; color:var(--mute); display:flex; align-items:center; gap:4px;"><svg style="width:14px; height:14px;" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> Verified & Secure Service</span>
       </div>
       <p style="margin:0 0 14px;font-size:16px;color:var(--blue-t);position:relative;z-index:1;">Our support team can help if the steps don't solve your problem.</p>
       <button class="btn pri" id="human" style="width:auto;position:relative;z-index:1;">Talk to a technician</button>
       <div style="position:absolute;right:-34px;top:-34px;width:130px;height:130px;border-radius:50%;background:rgba(59,130,246,.13);"></div>
     </div>
   </div>
   
   <aside class="home-sidebar">
     <div class="predicted-card">
       <div class="hex-icon">
         <svg viewBox="0 0 100 100" fill="none" stroke="#62748B" stroke-width="2">
           <polygon points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5" fill="#F8FAFC"></polygon>
           <circle cx="50" cy="50" r="15" fill="#E2E9F2"></circle>
           <text x="50" y="55" font-size="16" font-family="sans-serif" font-weight="bold" fill="#0F1F33" text-anchor="middle">AI</text>
           <line x1="50" y1="5" x2="50" y2="35"></line>
           <line x1="95" y1="27.5" x2="63" y2="42.5"></line>
           <line x1="95" y1="72.5" x2="63" y2="57.5"></line>
           <line x1="50" y1="95" x2="50" y2="65"></line>
           <line x1="5" y1="72.5" x2="37" y2="57.5"></line>
           <line x1="5" y1="27.5" x2="37" y2="42.5"></line>
           <circle cx="50" cy="5" r="4" fill="#62748B"></circle>
           <circle cx="95" cy="27.5" r="4" fill="#62748B"></circle>
           <circle cx="95" cy="72.5" r="4" fill="#62748B"></circle>
           <circle cx="50" cy="95" r="4" fill="#62748B"></circle>
           <circle cx="5" cy="72.5" r="4" fill="#62748B"></circle>
           <circle cx="5" cy="27.5" r="4" fill="#62748B"></circle>
         </svg>
       </div>
       <h4 style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #0F1F33; letter-spacing: 0.5px;">PREDICTED ISSUES</h4>
       <p style="margin: 0 0 16px; font-size: 13px; color: #62748B; line-height: 1.4;">Based on similar user issues and system logs.</p>
       <button class="predicted-btn">Check your router power</button>
       <button class="predicted-btn" style="margin-top: 8px;">Check your error logs</button>
     </div>
   </aside>
  </div>`;

  a.querySelectorAll(".opt").forEach(b=>b.onclick=()=>go("compose",b.dataset.m));

  $("#human").onclick=()=>has()?makeTicket():go("compose","words");
  
  $("#home-ai-send").onclick = () => {
    const val = $("#home-ai-input").value.trim();
    if(val) {
      aiChatHistory.push({ role: "user", content: val });
      go("aichat", null, true);
    }
  };
  
  $("#home-ai-input").onkeydown = (e) => {
    if(e.key === "Enter") {
      $("#home-ai-send").click();
    }
  };

  a.querySelectorAll(".predicted-btn").forEach(btn => {
    btn.onclick = () => {
      aiChatHistory.push({ role: "user", content: btn.textContent.trim() });
      go("aichat", null, true);
    };
  });

 }

 else if(S.view==="aichat"){
  a.style.maxWidth = "1080px";
  
  a.innerHTML = `
    <div class="aichat-layout">
      <div class="aichat-header">
        <button class="back" id="back" style="margin:0">${I.back} Back to Home</button>
        <h2 style="margin:0; font-size:18px; color:var(--blue-t); display:flex; align-items:center; gap:8px;">
          <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:var(--pri);"><path d="M4 12a8 7 0 1 1 3.5 5.7L4 19l1.2-3.4A7 7 0 0 1 4 12z"/></svg>
          HelpNest AI Assistant
        </h2>
      </div>
      <div class="aichat-body" id="full-ai-body">
        <div class="ai-msg tech">Hello! How can I help you today?</div>
      </div>
      <div class="aichat-input-wrapper">
        <div class="ai-search-box" style="margin:0; box-shadow:0 -4px 20px rgba(0,0,0,0.05); border-radius:12px; border:1px solid #E2E8F0;">
          <input type="text" placeholder="Reply to AI..." id="full-ai-input">
          <button class="ai-send-btn" id="full-ai-send">
            <svg viewBox="0 0 24 24" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  $("#back").onclick = () => go("home");
  
  const body = $("#full-ai-body");
  const inp = $("#full-ai-input");
  const btn = $("#full-ai-send");

  // Re-render history
  body.innerHTML = '<div class="ai-msg tech">Hello! How can I help you today?</div>';
  aiChatHistory.forEach(m => {
    body.insertAdjacentHTML('beforeend', `<div class="ai-msg ${m.role === 'user' ? 'me' : 'tech'}">${esc(m.content)}</div>`);
  });
  body.scrollTop = body.scrollHeight;

  const performAiCall = () => {
    btn.disabled = true;
    const aiMsgId = 'ai-msg-' + Date.now();
    body.insertAdjacentHTML('beforeend', `<div class="ai-msg tech" id="${aiMsgId}">...</div>`);
    body.scrollTop = body.scrollHeight;
    const msgEl = document.getElementById(aiMsgId);

    callOllama(aiChatHistory, 
      (chunk) => {
        msgEl.textContent = chunk;
        body.scrollTop = body.scrollHeight;
      },
      (full) => {
        aiChatHistory.push({ role: "assistant", content: full });
        btn.disabled = false;
        inp.focus();
      },
      (err) => {
        msgEl.textContent = "Sorry, I am having trouble connecting to the server. (" + err.message + ")";
        btn.disabled = false;
        inp.focus();
      }
    );
  };

  // If the last message is from the user, it means we navigated here and need to send it.
  if (aiChatHistory.length > 0 && aiChatHistory[aiChatHistory.length - 1].role === "user") {
    performAiCall();
  }

  btn.onclick = () => {
    const val = inp.value.trim();
    if(val) {
      aiChatHistory.push({ role: "user", content: val });
      body.insertAdjacentHTML('beforeend', `<div class="ai-msg me">${esc(val)}</div>`);
      inp.value = "";
      body.scrollTop = body.scrollHeight;
      performAiCall();
    }
  };

  inp.onkeydown = (e) => {
    if(e.key === "Enter") btn.click();
  };

 }

 else if(S.view==="compose"){
  a.style.maxWidth = "720px";

  const M=S.mode,T={photo:"Show us the problem",error:"Paste the error message",words:"Tell us what's happening"};

  const body=M==="photo"?`<div class="row"><button class="btn out" id="cam">${I.cam} Take a photo</button><button class="btn out" id="up">${I.clip.replace(/<svg/,"<svg")} Choose from gallery</button></div>

   <div class="photos" id="photos"></div><label class="lbl" for="n1" style="margin-top:18px">Add a short note (optional)</label><input type="text" id="n1" placeholder="e.g. This appeared when I opened my email" value="${esc(S.text)}">`

   :M==="error"?`<label class="lbl" for="t2">Error message</label><textarea id="t2" placeholder="Paste the message here">${esc(S.err)}</textarea><p class="hint">You can also paste a screenshot straight into this box.</p><div class="photos" id="photos"></div>`

   :`<label class="lbl" for="t3">Describe the problem</label><textarea id="t3" placeholder="For example: My printer says offline and nothing comes out.">${esc(S.text)}</textarea><p class="hint">Plain words are perfect. You can paste a screenshot here too.</p><div class="photos" id="photos"></div>`;

  a.innerHTML=`<button class="back" id="back">${I.back} Back</button>${stp(1)}<h1>${T[M]}</h1><p class="sub">Add as much or as little as you like.</p>

  <div class="seg" role="group" aria-label="How to describe it">${[["photo","Photo"],["error","Error message"],["words","Own words"]].map(([k,l])=>`<button data-k="${k}" aria-pressed="${k===M}">${l}</button>`).join("")}</div>

  <div class="card">${body}<input type="file" id="fcam" accept="image/*" capture="environment" class="hide"><input type="file" id="fup" accept="image/*" multiple class="hide"></div>

  <button class="btn pri" id="next" disabled>See quick fixes</button>`;

  $("#back").onclick=()=>go("home");

  a.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>go("compose",b.dataset.k));

  const bind=(id,key)=>{const e=$(id);if(!e)return;e.oninput=()=>{S[key]=e.value;check()};e.addEventListener("paste",ev=>{[...(ev.clipboardData?.items||[])].forEach(i=>{if(i.type.startsWith("image/")){ev.preventDefault();addPhoto(i.getAsFile())}})})};

  bind("#n1","text");bind("#t2","err");bind("#t3","text");

  if(M==="photo"){$("#cam").onclick=()=>$("#fcam").click();$("#up").onclick=()=>$("#fup").click();$("#fcam").onchange=e=>[...e.target.files].forEach(addPhoto);$("#fup").onchange=e=>[...e.target.files].forEach(addPhoto)}

  $("#next").onclick=()=>{S.fixIdx=0;go("fix")};drawPhotos();check();

 }

 else if(S.view==="fix"){
  a.style.maxWidth = "720px";

  const L=FIXES[cat()],f=L[S.fixIdx],last=S.fixIdx===L.length-1;

  a.innerHTML=`<button class="back" id="back">${I.back} Edit my description</button>${stp(2)}<h1>Let's try a quick fix</h1><p class="sub">Most problems like this are solved in a minute or two.</p>

  <div class="card fix"><span class="tag">Idea ${S.fixIdx+1} of ${L.length}</span><h2>${f[0]}</h2><ol>${f.slice(1).map(s=>`<li>${s}</li>`).join("")}</ol>

  <div class="row"><button class="btn ok" id="yes">${I.tick} That fixed it</button><button class="btn out" id="no">${last?"Still not working":"Didn't work, next idea"}</button></div></div>

  ${helpCard("Stuck or in a hurry? A technician can take over.")}`;

  $("#back").onclick=()=>go("compose");$("#yes").onclick=()=>go("done");

  $("#no").onclick=()=>last?makeTicket():(S.fixIdx++,render());$("#human").onclick=makeTicket;

 }

 else if(S.view==="done"){
  a.style.maxWidth = "720px";

  a.innerHTML=`<div class="card big"><div class="ok">${I.tick}</div><h1>Glad that worked!</h1><p class="sub">If it comes back, we're here. Asking again is always fine.</p><button class="btn pri" id="again">Report another problem</button></div>`;

  $("#again").onclick=()=>{Object.assign(S,{text:"",err:"",photos:[],ticket:null,chat:[]});go("home")};

 }

 else ticketView();

}

function makeTicket(){

 S.ticket={id:"HN-"+Math.floor(1000+Math.random()*9000),pos:2,eta:5,stage:0,tech:"Priya"};

 S.chat=[{who:"tech",text:"Hi, I've received your request and details. I'll be with you shortly. Is there a good number or time to reach you?"}];

 note(`Request ${S.ticket.id} received.`);go("ticket");

 clearTimeout(S.t1);clearTimeout(S.t2);clearTimeout(S.t3);

 S.ticket.avail=Math.random()<.5;

 S.t3=setTimeout(()=>{S.ticket.link=true;note("Your video call is ready. Tap Join.");if(S.view==="ticket")ticketView(1)},S.ticket.avail?9000:40000);

 S.t1=setTimeout(()=>{S.ticket.stage=1;S.ticket.pos=1;S.ticket.eta=3;note("Priya is reading your request.");if(S.view==="ticket")ticketView(1)},5000);

 S.t2=setTimeout(()=>{S.ticket.stage=2;S.ticket.pos=0;S.ticket.eta=1;S.chat.push({who:"tech",text:"I'm looking at it now. What do you see on your screen right now?"});note("Priya is ready to help you now.");if(S.view==="ticket")ticketView(1)},12000);

}

function ticketView(keep){
 const a=$("#app");
 if(a) a.style.maxWidth = "720px";

 const T=S.ticket,st=["Request received","Priya is reading your details","Priya is ready to help you"],prev=$("#chatin")?.value||"";

 $("#app").innerHTML=`${stp(3)}<span class="live">Technicians online</span><h1>You're in good hands</h1><p class="sub">A technician is on the way. You can close this page and we'll keep your place.</p>

 <div class="card"><div class="ticket"><div><small>Request number</small><b>${T.id}</b></div><div><small>${T.pos?"People ahead":"Your turn"}</small><b>${T.pos||"Now"}</b></div><div><small>Expected wait</small><b>~${T.eta} min</b></div></div>

 <ul class="tl">${st.map((s,i)=>`<li class="${i<T.stage?"done":i===T.stage?"now":""}">${s}</li>`).join("")}</ul></div>

 ${T.link?`<div class="card vid ready"><div class="vh">${I.vid}<div><b>Your video call is ready</b><small>${T.tech} is waiting for you.</small></div></div><div class="row"><a class="btn pri" href="${ZOOM}" target="_blank" rel="noopener">Join with Zoom</a><button class="btn out" id="joinweb">Join here in the browser</button></div></div>`:`<div class="card vid"><div class="vh">${I.vid}<div><b>Video help</b><small>${T.avail?"A technician is free right now. Your video link will appear here in a few seconds.":"All technicians are on other calls. Expected in about 10 minutes. We'll show your video link here and notify you."}</small></div></div></div>`}

 <div class="card"><span class="lbl">Chat with ${T.tech}</span><div class="chat" id="chat" aria-live="polite">${S.chat.map(m=>`<div class="msg ${m.who}">${m.who==="tech"?`<small>${T.tech}, HelpNest</small>`:""}${esc(m.text)}</div>`).join("")}</div>

 <div class="send"><input type="text" id="chatin" placeholder="Type a message" aria-label="Message"><button class="btn pri" id="sendb" style="width:auto">Send</button></div>

 <p class="hint" style="margin-top:16px">Prefer a call? Leave your number.</p>

 <div class="send" style="margin-top:6px"><input type="tel" id="tel" placeholder="Phone number" aria-label="Phone number"><button class="btn out" id="callb">Call me</button></div><div class="toast" id="toast"></div></div>

 <div class="card"><p class="sum">What you told us<q>${esc([S.text,S.err].filter(x=>x.trim()).join("\\n")||"(Photos only)")}</q></p>

 ${S.photos.length?`<div class="photos">${S.photos.map((p,i)=>`<div class="thumb"><img src="${p}" alt="Your photo ${i+1}"></div>`).join("")}</div>`:""}</div>

 <button class="btn out" id="done" style="width:100%">It's working now. Close my request</button>`;

 const ci=$("#chatin");ci.value=prev;if(keep&&prev)ci.focus();const c=$("#chat");c.scrollTop=c.scrollHeight;

 const send=()=>{const v=ci.value.trim();if(!v)return;S.chat.push({who:"me",text:v});setTimeout(()=>{S.chat.push({who:"tech",text:"Thanks, got it. I'm on it."});if(S.view==="ticket")ticketView(1)},1800);ci.value="";ticketView(1)};

 $("#sendb").onclick=send;ci.onkeydown=e=>{if(e.key==="Enter")send()};

 $("#callb").onclick=()=>{const n=$("#tel").value.trim();$("#toast").textContent=n?`We'll call ${n} as soon as a technician is free.`:"Please type your phone number first."};

 $("#done").onclick=()=>go("done");$("#joinweb")&&($("#joinweb").onclick=openCall);

}

$("#end").onclick=endCall;

$("#mic").onclick=e=>{const t=stream?.getAudioTracks()[0];if(t){t.enabled=!t.enabled;e.target.textContent=t.enabled?"Mute":"Unmute"}};

$("#cmr").onclick=e=>{const t=stream?.getVideoTracks()[0];if(t){t.enabled=!t.enabled;e.target.textContent=t.enabled?"Camera off":"Camera on"}};

// Floating AI Widget Logic
const aiFab = $("#ai-fab");
const aiWidget = $("#ai-chat-widget");
const aiClose = $("#ai-close");
const aiInput = $("#ai-input");
const aiSend = $("#ai-send");
const aiBody = $("#ai-chat-body");

let aiChatHistory = [];

aiFab.onclick = () => {
  aiWidget.classList.remove("hide");
  aiFab.classList.add("hide");
  
  // Sync history from the global array
  aiBody.innerHTML = '<div class="ai-msg tech">Hello! I am your AI assistant. How can I help you today?</div>';
  aiChatHistory.forEach(m => {
    aiBody.insertAdjacentHTML('beforeend', `<div class="ai-msg ${m.role === 'user' ? 'me' : 'tech'}">${esc(m.content)}</div>`);
  });
  aiBody.scrollTop = aiBody.scrollHeight;
  
  aiInput.focus();
};

aiClose.onclick = () => {
  aiWidget.classList.add("hide");
  aiFab.classList.remove("hide");
};

async function callOllama(messages, onChunk, onDone, onError) {
  try {
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        model: "gemma4", 
        messages: messages 
      })
    });
    
    if (!res.ok) {
      throw new Error("Ollama API Error: " + res.status);
    }
    
    let fullResponse = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, {stream: true});
      const lines = chunk.split('\n').filter(l => l.trim());
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.message && data.message.content) {
            fullResponse += data.message.content;
            onChunk(fullResponse);
          }
        } catch(e) {}
      }
    }
    onDone(fullResponse);
  } catch (err) {
    onError(err);
  }
}

async function handleAiSend() {
  const text = aiInput.value.trim();
  if (!text) return;
  
  aiChatHistory.push({ role: "user", content: text });
  aiBody.insertAdjacentHTML('beforeend', `<div class="ai-msg me">${esc(text)}</div>`);
  aiInput.value = "";
  aiBody.scrollTop = aiBody.scrollHeight;
  aiSend.disabled = true;

  const aiMsgId = 'ai-msg-' + Date.now();
  aiBody.insertAdjacentHTML('beforeend', `<div class="ai-msg tech" id="${aiMsgId}">...</div>`);
  aiBody.scrollTop = aiBody.scrollHeight;
  const msgEl = document.getElementById(aiMsgId);
  
  callOllama(aiChatHistory, 
    (chunk) => {
      msgEl.textContent = chunk;
      aiBody.scrollTop = aiBody.scrollHeight;
    },
    (full) => {
      aiChatHistory.push({ role: "assistant", content: full });
      aiSend.disabled = false;
      aiInput.focus();
    },
    (err) => {
      console.error(err);
      msgEl.textContent = "Sorry, I am having trouble connecting to the server. (" + err.message + ")";
      aiSend.disabled = false;
      aiInput.focus();
    }
  );
}

aiSend.onclick = handleAiSend;
aiInput.onkeydown = (e) => {
  if (e.key === "Enter") handleAiSend();
};

bell();render();
