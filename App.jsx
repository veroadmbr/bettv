import { useState, createContext, useContext, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
:root {
  --blue:#2E5CFF; --blue-h:#2450e0; --blue-l:#eef2ff; --blue-m:#c7d4ff;
  --navy:#061C58; --white:#FFFFFF; --bg:#f5f6fa;
  --border:#e8eaef; --border2:#d1d5e0;
  --text:#0d1117; --text2:#4a5568; --text3:#9aa3b2;
  --green:#16a34a; --green-bg:#f0fdf4; --green-bd:#bbf7d0;
  --red:#dc2626; --red-bg:#fef2f2; --red-bd:#fecaca;
  --gold:#f59e0b;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;}
button{cursor:pointer;font-family:inherit;}
input,textarea,select{font-family:inherit;}

/* HEADER */
.hd{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
.hd-in{max-width:1280px;margin:0 auto;padding:0 20px;height:56px;display:flex;align-items:center;gap:8px;}
.logo-btn{background:none;border:none;padding:0;display:flex;align-items:center;margin-right:8px;flex-shrink:0;}
.hd-nav{display:flex;align-items:center;gap:2px;flex:1;}
.nav-btn{display:flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;font-size:13.5px;font-weight:500;color:var(--text2);background:none;border:none;transition:background .15s,color .15s;white-space:nowrap;}
.nav-btn:hover{background:var(--bg);color:var(--text);}
.nav-btn.active{color:var(--blue);background:var(--blue-l);font-weight:600;}
.hd-right{display:flex;align-items:center;gap:8px;margin-left:auto;flex-shrink:0;}
.btn-ghost{padding:7px 14px;border-radius:8px;font-size:13.5px;font-weight:600;border:1.5px solid var(--border2);background:var(--white);color:var(--text);transition:border-color .15s,color .15s;}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue);}
.btn-blue{padding:7px 16px;border-radius:8px;font-size:13.5px;font-weight:600;border:none;background:var(--blue);color:#fff;transition:background .15s;}
.btn-blue:hover{background:var(--blue-h);}
.user-pill{display:flex;align-items:center;gap:8px;padding:4px 12px 4px 4px;border-radius:100px;border:1.5px solid var(--border);background:var(--white);cursor:pointer;transition:border-color .15s;}
.user-pill:hover{border-color:var(--blue-m);}
.avatar-sm{width:30px;height:30px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;overflow:hidden;}
.avatar-sm img{width:100%;height:100%;object-fit:cover;}
.coins-display{font-size:13px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:5px;}
.coin-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;}

/* CAT BAR */
.cat-bar{background:var(--white);border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;position:sticky;top:56px;z-index:90;}
.cat-bar::-webkit-scrollbar{display:none;}
.cat-in{max-width:1280px;margin:0 auto;padding:0 20px;display:flex;gap:2px;height:44px;align-items:center;}
.cat-pill{padding:5px 13px;border-radius:100px;font-size:13px;font-weight:500;color:var(--text2);white-space:nowrap;flex-shrink:0;border:none;background:none;transition:background .15s,color .15s;display:flex;align-items:center;gap:5px;}
.cat-pill:hover{background:var(--bg);color:var(--text);}
.cat-pill.active{background:var(--navy);color:#fff;font-weight:600;}

/* PAGE */
.page{max-width:1280px;margin:0 auto;padding:24px 20px 60px;}
.page-title-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
.page-title{font-size:22px;font-weight:800;color:var(--text);}
.page-sub{font-size:13.5px;color:var(--text2);margin-top:3px;}

/* FEATURED */
.featured{background:var(--white);border:1px solid var(--border);border-radius:12px;margin-bottom:20px;cursor:pointer;transition:box-shadow .18s;}
.featured:hover{box-shadow:0 4px 20px rgba(0,0,0,.08);}
.featured-body{padding:22px 24px 18px;}
.featured-head{display:flex;align-items:flex-start;gap:10px;margin-bottom:16px;}
.featured-title{font-size:18px;font-weight:700;line-height:1.3;color:var(--text);}
.featured-opts{display:flex;flex-direction:column;gap:8px;}
.opt-row{display:flex;align-items:center;gap:10px;}
.opt-name{font-size:13px;font-weight:500;color:var(--text);width:160px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.opt-bar{flex:1;height:5px;background:var(--border);border-radius:3px;overflow:hidden;}
.opt-fill{height:100%;border-radius:3px;background:var(--blue);}
.opt-pct{font-size:13px;font-weight:700;color:var(--blue);width:36px;text-align:right;flex-shrink:0;}
.featured-footer{display:flex;align-items:center;gap:10px;padding-top:12px;border-top:1px solid var(--border);margin-top:14px;font-size:12px;color:var(--text3);}
.footer-dot{color:var(--border2);}

/* SECTION */
.sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;margin-top:8px;}
.sec-title{font-size:15px;font-weight:700;color:var(--text);}
.sec-link{font-size:13px;font-weight:600;color:var(--blue);border:1.5px solid var(--blue-m);padding:5px 13px;border-radius:7px;background:none;transition:background .15s;}
.sec-link:hover{background:var(--blue-l);}

/* MARKET GRID */
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}

/* MARKET CARD */
.mcard{background:var(--white);border:1px solid var(--border);border-radius:14px;transition:box-shadow .18s,transform .15s;cursor:pointer;display:flex;flex-direction:column;overflow:hidden;}
.mcard:hover{box-shadow:0 4px 18px rgba(0,0,0,.09);transform:translateY(-2px);}
.mcard-body{padding:14px 14px 12px;display:flex;flex-direction:column;flex:1;gap:12px;}
.mcard-head{display:flex;align-items:flex-start;gap:10px;}
.mcard-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;}
.mcard-title{font-size:13.5px;font-weight:700;line-height:1.35;color:var(--text);padding-top:1px;}
.mcard-opts{display:flex;flex-direction:column;gap:8px;}
.mcard-opt-row{display:flex;align-items:center;gap:8px;}
.mopt-label{font-size:13px;font-weight:500;color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;}
.mopt-pct{font-size:13px;font-weight:700;color:var(--text);width:36px;text-align:right;flex-shrink:0;}
.mopt-btns{display:flex;gap:5px;flex-shrink:0;}
.mopt-btn{padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;border:none;line-height:1.4;transition:opacity .15s;}
.mopt-btn.yes{background:var(--green-bg);color:var(--green);}
.mopt-btn.no{background:var(--red-bg);color:var(--red);}
.mopt-btn:hover{opacity:.75;}
.mcard-footer{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;border-top:1px solid var(--border);}
.mcard-vol{font-size:12px;font-weight:500;color:var(--text2);}
.mcard-save{background:none;border:none;padding:2px;color:var(--text3);cursor:pointer;display:flex;align-items:center;transition:color .15s;border-radius:4px;}
.mcard-save:hover{color:var(--blue);}
.mcard-save.saved{color:var(--blue);}
.ends-soon{color:#d97706;}

/* BACKDROP & MODAL */
.backdrop{position:fixed;inset:0;background:rgba(6,28,88,.4);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;animation:bFade .2s ease;}
@keyframes bFade{from{opacity:0;}to{opacity:1;}}
.modal{background:var(--white);border-radius:16px;width:100%;max-width:700px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(6,28,88,.18);animation:mUp .28s cubic-bezier(.34,1.56,.64,1);}
@keyframes mUp{from{transform:translateY(20px) scale(.96);}to{transform:translateY(0) scale(1);}}
.modal-sm{max-width:420px;}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 16px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--white);z-index:2;}
.modal-title{font-size:16px;font-weight:700;}
.modal-close{width:30px;height:30px;flex-shrink:0;border-radius:7px;border:1.5px solid var(--border2);background:var(--white);color:var(--text2);display:flex;align-items:center;justify-content:center;font-size:16px;line-height:1;transition:all .15s;}
.modal-close:hover{border-color:var(--navy);color:var(--navy);}
.modal-body{padding:20px 22px;display:flex;flex-direction:column;gap:16px;}

/* FORMS */
.form-group{display:flex;flex-direction:column;gap:5px;}
.form-label{font-size:12px;font-weight:600;color:var(--text2);letter-spacing:.02em;}
.form-input{width:100%;padding:10px 13px;border:1.5px solid var(--border2);border-radius:8px;font-size:14px;color:var(--text);background:var(--white);outline:none;transition:border-color .15s;}
.form-input:focus{border-color:var(--blue);}
textarea.form-input{resize:vertical;min-height:80px;}
.form-error{font-size:12px;color:var(--red);margin-top:2px;}
.form-submit{width:100%;padding:11px;border:none;border-radius:9px;font-size:14px;font-weight:700;background:var(--blue);color:#fff;transition:background .15s;margin-top:4px;}
.form-submit:hover{background:var(--blue-h);}
.form-switch{text-align:center;font-size:13px;color:var(--text2);margin-top:12px;}
.form-switch button{background:none;border:none;color:var(--blue);font-weight:600;font-size:13px;padding:0;text-decoration:underline;}
.form-row-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* TAGS */
.tag{font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:5px;}
.tag-blue{background:var(--blue-l);color:var(--blue);}
.tag-navy{background:#e8edf7;color:var(--navy);}
.tag-gray{background:var(--bg);color:var(--text2);}
.tags{display:flex;gap:6px;flex-wrap:wrap;}

/* MARKET MODAL SPECIFICS */
.mstat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.mstat{background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:12px 14px;}
.mstat-label{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--text3);margin-bottom:4px;}
.mstat-val{font-size:17px;font-weight:800;color:var(--text);}
.chart-box{background:var(--bg);border:1px solid var(--border);border-radius:9px;height:140px;position:relative;overflow:hidden;}
.chart-label{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--text3);padding:12px 12px 6px;}
.trade-box{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px;}
.trade-toggle{display:flex;background:var(--border);border-radius:8px;padding:3px;margin-bottom:14px;}
.tt{flex:1;padding:7px;border:none;border-radius:6px;font-size:13px;font-weight:700;background:transparent;color:var(--text2);transition:all .15s;}
.tt.yes{background:var(--green);color:#fff;}
.tt.no{background:var(--red);color:#fff;}
.trade-input{width:100%;padding:10px 14px;border:1.5px solid var(--border2);border-radius:8px;font-size:18px;font-weight:700;color:var(--text);background:var(--white);outline:none;margin-bottom:8px;transition:border-color .15s;}
.trade-input:focus{border-color:var(--blue);}
.quick-row{display:flex;gap:6px;margin-bottom:14px;}
.qbtn{flex:1;padding:5px;border:1.5px solid var(--border2);border-radius:6px;background:var(--white);font-size:12px;font-weight:600;color:var(--text2);transition:all .15s;}
.qbtn:hover{border-color:var(--blue);color:var(--blue);}
.trade-info-row{display:flex;justify-content:space-between;font-size:12.5px;color:var(--text2);margin-bottom:12px;}
.trade-ret{font-weight:700;color:var(--text);}
.trade-sub{width:100%;padding:12px;border:none;border-radius:9px;font-size:14px;font-weight:700;transition:opacity .15s;}
.trade-sub.yes{background:var(--green);color:#fff;}
.trade-sub.no{background:var(--red);color:#fff;}
.trade-sub:hover{opacity:.88;}
.resolve-box{background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:14px;}
.resolve-label{font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text3);margin-bottom:6px;}
.resolve-text{font-size:13px;color:var(--text2);line-height:1.6;}

/* EMPTY STATE */
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:72px 24px;gap:14px;}
.empty-icon{width:56px;height:56px;background:var(--blue-l);border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--blue);}
.empty-title{font-size:17px;font-weight:700;}
.empty-sub{font-size:13.5px;color:var(--text2);max-width:300px;line-height:1.6;}
.empty-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}

/* FILTER ROW */
.filter-row{display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap;}
.fbtn{padding:6px 14px;border-radius:100px;font-size:13px;font-weight:500;border:1.5px solid var(--border2);background:var(--white);color:var(--text2);transition:all .15s;}
.fbtn:hover{border-color:var(--blue);color:var(--blue);}
.fbtn.active{background:var(--navy);border-color:var(--navy);color:#fff;font-weight:600;}

/* TABLE */
.tbl-wrap{background:var(--white);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);padding:12px 20px;text-align:left;border-bottom:1px solid var(--border);background:#fafbfd;}
.tbl td{padding:14px 20px;font-size:13.5px;border-bottom:1px solid var(--border);color:var(--text);}
.tbl tr:last-child td{border-bottom:none;}
.tbl tbody tr:hover td{background:var(--bg);}

/* INFO BANNER */
.info-banner{background:var(--blue-l);border:1px solid var(--blue-m);border-radius:9px;padding:12px 16px;font-size:13px;color:var(--navy);margin-bottom:16px;display:flex;align-items:center;gap:8px;}

/* PROFILE PAGE */
.profile-grid{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start;}
.profile-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;}
.avatar-lg{width:80px;height:80px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;overflow:hidden;flex-shrink:0;}
.avatar-lg img{width:100%;height:100%;object-fit:cover;}
.profile-name{font-size:16px;font-weight:700;}
.profile-email{font-size:13px;color:var(--text3);}
.profile-coins-box{display:flex;align-items:center;gap:6px;font-size:14px;font-weight:700;color:var(--text);background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:8px 14px;width:100%;justify-content:center;}
.upload-btn{font-size:12px;font-weight:600;color:var(--blue);background:var(--blue-l);border:none;padding:6px 14px;border-radius:6px;transition:background .15s;}
.upload-btn:hover{background:var(--blue-m);}
.form-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:24px;}
.form-card-title{font-size:15px;font-weight:700;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--border);}
.form-save{padding:9px 20px;border:none;border-radius:8px;font-size:13.5px;font-weight:700;background:var(--blue);color:#fff;transition:background .15s;}
.form-save:hover{background:var(--blue-h);}

/* PORTFOLIO SUMMARY */
.summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;}
.summary-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px 20px;}
.summary-label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);margin-bottom:6px;}
.summary-val{font-size:22px;font-weight:800;color:var(--text);}
.summary-sub{font-size:12px;color:var(--text3);margin-top:3px;}

/* RANKING INFO CARDS */
.rank-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px;}
.rank-info-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:18px;}
.rank-info-icon{font-size:20px;margin-bottom:8px;}
.rank-info-title{font-weight:700;margin-bottom:4px;font-size:13.5px;}
.rank-info-text{font-size:13px;color:var(--text2);line-height:1.6;}

/* TOAST */
.toast{position:fixed;bottom:24px;right:24px;background:var(--navy);color:#fff;padding:12px 18px;border-radius:10px;font-size:13px;font-weight:600;z-index:999;animation:mUp .3s ease;box-shadow:0 8px 24px rgba(6,28,88,.25);}

::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px;}
`;

/* ═══════════════════════════════════════════════════════════
   LOGO SVG
═══════════════════════════════════════════════════════════ */
function Logo() {
  return (
    <svg height="26" viewBox="0 0 1408 429" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M822.848 225.6L811.448 290.4C809.048 305.2 811.848 314.2 819.848 317.4C827.848 320.6 844.248 321.6 869.048 320.4L851.648 420C791.648 429.2 749.048 423.6 723.848 403.2C698.648 382.8 690.448 347.2 699.248 296.4L711.848 225.6H669.848L688.448 120H730.448L739.448 69L855.848 36L841.448 120H904.448L885.848 225.6H822.848Z" fill="#061C58"/>
      <path d="M537.865 111.6C584.265 111.6 619.865 127 644.665 157.8C669.865 188.6 678.665 225.6 671.065 268.8C669.065 281.6 665.265 294.6 659.665 307.8H464.065C470.465 327.8 488.265 337.8 517.465 337.8C540.265 337.8 558.665 331.4 572.665 318.6L636.865 383.4C602.065 413.4 558.865 428.4 507.265 428.4C453.265 428.4 413.265 412.6 387.265 381C361.265 349.4 352.265 310.4 360.265 264C367.465 220 387.665 183.6 420.865 154.8C454.065 126 493.065 111.6 537.865 111.6ZM474.865 236.4H573.865C572.265 212.4 558.865 200.4 533.665 200.4C506.865 200.4 487.265 212.4 474.865 236.4Z" fill="#061C58"/>
      <path d="M240 111.6C279.2 111.6 310 127.8 332.4 160.2C354.8 192.2 362 230.8 354 276C346 321.6 327.8 358.4 299.4 386.4C271.4 414.4 238 428.4 199.2 428.4C160.8 428.4 133.4 414.4 117 386.4L111 420H0L73.8 0H184.8L159.6 143.4C180.8 122.2 207.6 111.6 240 111.6ZM244.2 270C247.4 252.8 245 239.2 237 229.2C229 218.8 217 213.6 201 213.6C184.6 213.6 170.6 218.8 159 229.2C147.4 239.2 140.2 252.8 137.4 270C134.2 287.2 136.6 301 144.6 311.4C152.6 321.4 164.6 326.4 180.6 326.4C197 326.4 211 321.4 222.6 311.4C234.2 301 241.4 287.2 244.2 270Z" fill="#061C58"/>
      <path d="M1373.17 120.5H1407.37L1237.57 420.5H1200.97L1136.77 120.5H1167.97L1223.17 388.1L1373.17 120.5Z" fill="#2E5CFF"/>
      <path d="M1026.4 149.9L991.597 344.9C987.597 369.3 991.597 384.3 1003.6 389.9C1016 395.5 1039 396.7 1072.6 393.5L1068.4 420.5C1028 426.9 998.597 424.1 980.197 412.1C961.797 400.1 955.597 377.7 961.597 344.9L995.797 149.9H929.797L935.197 120.5H1001.2L1014.4 45.5L1046.2 36.5L1031.2 120.5H1121.2L1115.8 149.9H1026.4Z" fill="#061C58"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY ICONS (SVG — no emojis)
═══════════════════════════════════════════════════════════ */
const IcoBuilding = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M9 21V7l6-4v18M9 9h1m-1 3h1m-1 3h1m4-9h1m-1 3h1m-1 3h1"/>
  </svg>
);
const IcoChart = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 6L13.5 15.5 8.5 10.5 1 18"/><path d="M17 6h6v6"/>
  </svg>
);
const IcoActivity = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IcoPlay = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
  </svg>
);
const IcoCpu = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
  </svg>
);
const IcoVote = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
  </svg>
);
const IcoDiamond = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 000 3.41l7.59 7.59a2.41 2.41 0 003.41 0l7.59-7.59a2.41 2.41 0 000-3.41L13.7 2.71a2.41 2.41 0 00-3.41 0z"/>
  </svg>
);
const IcoBookmark = ({ filled }) => (
  <svg width="16" height="16" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
  </svg>
);
const IcoSearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IcoTrending = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IcoCoin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v12M9 8.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2.5-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   CATEGORY CONFIG
═══════════════════════════════════════════════════════════ */
const CAT = {
  politica:       { bg: "#dbeafe", fg: "#1d4ed8", Icon: IcoBuilding },
  esportes:       { bg: "#dcfce7", fg: "#15803d", Icon: IcoActivity },
  economia:       { bg: "#fef9c3", fg: "#a16207", Icon: IcoChart },
  entretenimento: { bg: "#f3e8ff", fg: "#7e22ce", Icon: IcoPlay },
  tecnologia:     { bg: "#e0e7ff", fg: "#4338ca", Icon: IcoCpu },
  eleicoes:       { bg: "#ffe4e6", fg: "#be123c", Icon: IcoVote },
  crypto:         { bg: "#fce7f3", fg: "#9d174d", Icon: IcoDiamond },
};

/* ═══════════════════════════════════════════════════════════
   AUTH CONTEXT
═══════════════════════════════════════════════════════════ */
const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bettv_user")) || null; } catch { return null; }
  });
  const [coins, setCoins] = useState(() =>
    parseInt(localStorage.getItem("bettv_coins") || "0")
  );
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bettv_saved")) || []; } catch { return []; }
  });

  const persist = (u, c, s) => {
    if (u) localStorage.setItem("bettv_user", JSON.stringify(u));
    else localStorage.removeItem("bettv_user");
    localStorage.setItem("bettv_coins", String(c));
    localStorage.setItem("bettv_saved", JSON.stringify(s));
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("bettv_users") || "[]");
    if (users.find(u => u.email === email)) return "E-mail já cadastrado.";
    const newUser = { id: Date.now(), name, email, password, bio: "", avatar: null, joinedAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("bettv_users", JSON.stringify(users));
    const startCoins = 1000;
    setUser(newUser); setCoins(startCoins); setSaved([]);
    persist(newUser, startCoins, []);
    return null;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("bettv_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return "E-mail ou senha incorretos.";
    const c = parseInt(localStorage.getItem(`bettv_coins_${found.id}`) || "1000");
    const s = JSON.parse(localStorage.getItem(`bettv_saved_${found.id}`) || "[]");
    setUser(found); setCoins(c); setSaved(s);
    persist(found, c, s);
    return null;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`bettv_coins_${user.id}`, String(coins));
      localStorage.setItem(`bettv_saved_${user.id}`, JSON.stringify(saved));
    }
    localStorage.removeItem("bettv_user");
    setUser(null); setCoins(0); setSaved([]);
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    const users = JSON.parse(localStorage.getItem("bettv_users") || "[]");
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx] = updated; localStorage.setItem("bettv_users", JSON.stringify(users)); }
    setUser(updated);
    persist(updated, coins, saved);
  };

  const toggleSave = (marketId) => {
    if (!user) return false;
    const next = saved.includes(marketId)
      ? saved.filter(id => id !== marketId)
      : [...saved, marketId];
    setSaved(next);
    if (user) localStorage.setItem(`bettv_saved_${user.id}`, JSON.stringify(next));
    localStorage.setItem("bettv_saved", JSON.stringify(next));
    return !saved.includes(marketId);
  };

  const isSaved = (id) => saved.includes(id);

  return (
    <AuthCtx.Provider value={{ user, coins, saved, register, login, logout, updateProfile, toggleSave, isSaved }}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARKET DATA
═══════════════════════════════════════════════════════════ */
const MARKETS = [
  {
    id: "eleicoes2026",
    cat: "politica",
    title: "Quem será presidente do Brasil nas eleições de 2026?",
    featured: true,
    deadline: "Out 2026",
    type: "multi",
    opts: [
      { label: "Lula (PT)", pct: 74 },
      { label: "Bolsonaro / PL", pct: 18 },
      { label: "Terceira via", pct: 8 },
    ],
    resolve: "Resolve com o candidato eleito no 2º turno das eleições presidenciais de outubro de 2026.",
  },
  {
    id: "impeachment",
    cat: "politica",
    title: "Lula completa o mandato até jan/2027 sem impeachment?",
    deadline: "Jan 2027",
    type: "binary", sim: 83, nao: 17,
    resolve: "Resolve Sim se Lula concluir o mandato sem sofrer impeachment ou renúncia forçada.",
  },
  {
    id: "brasileirao",
    cat: "esportes",
    title: "Quem vence o Campeonato Brasileiro Série A 2025?",
    deadline: "Dez 2025",
    type: "multi",
    opts: [
      { label: "Flamengo", pct: 34 },
      { label: "Palmeiras", pct: 28 },
      { label: "Atletico-MG", pct: 16 },
      { label: "Sao Paulo FC", pct: 12 },
      { label: "Outros", pct: 10 },
    ],
    resolve: "Resolve com o campeão oficial do Brasileirão Série A 2025 conforme CBF.",
  },
  {
    id: "dolar",
    cat: "economia",
    title: "Dólar fecha acima de R$ 6,00 no último dia útil de 2025?",
    deadline: "Dez 2025", endsSoon: true,
    type: "binary", sim: 31, nao: 69,
    resolve: "Resolve Sim se a cotação PTAX do Banco Central em 31/12/2025 superar R$ 6,00.",
  },
  {
    id: "copa",
    cat: "esportes",
    title: "Brasil vence a Copa do Mundo FIFA 2026?",
    deadline: "Jul 2026",
    type: "binary", sim: 22, nao: 78,
    resolve: "Resolve Sim se a Seleção Brasileira vencer a final da Copa do Mundo 2026.",
  },
  {
    id: "ibovespa",
    cat: "economia",
    title: "Ibovespa fecha acima de 140.000 pontos no último pregão de 2025?",
    deadline: "Dez 2025",
    type: "binary", sim: 52, nao: 48,
    resolve: "Resolve Sim se o índice Ibovespa fechar acima de 140.000 pontos no último pregão de 2025.",
  },
  {
    id: "bbb",
    cat: "entretenimento",
    title: "Quem ganha o Big Brother Brasil 26?",
    deadline: "Abr 2026", endsSoon: true,
    type: "multi",
    opts: [
      { label: "Amanda", pct: 29 },
      { label: "Rafael", pct: 24 },
      { label: "Yasmin", pct: 18 },
      { label: "Outros", pct: 29 },
    ],
    resolve: "Resolve com o vencedor oficial do BBB 26 anunciado na final do programa.",
  },
  {
    id: "ia",
    cat: "tecnologia",
    title: "O Brasil sanciona lei federal de regulamentação de IA antes de jul/2025?",
    deadline: "Jul 2025", endsSoon: true,
    type: "binary", sim: 41, nao: 59,
    resolve: "Resolve Sim se o Presidente sancionar lei de IA aprovada pelo Congresso antes de 1º de julho de 2025.",
  },
  {
    id: "selic",
    cat: "economia",
    title: "Taxa Selic termina 2025 abaixo de 12% ao ano?",
    deadline: "Dez 2025",
    type: "binary", sim: 23, nao: 77,
    resolve: "Resolve Sim se a Selic fixada na última reunião do COPOM de 2025 for inferior a 12,00% a.a.",
  },
  {
    id: "governadores",
    cat: "eleicoes",
    title: "Quem ganha o governo do estado de SP nas eleições de 2026?",
    deadline: "Out 2026",
    type: "multi",
    opts: [
      { label: "Tarcisio (Rep.)", pct: 58 },
      { label: "PT / aliados", pct: 24 },
      { label: "PSDB / MDB", pct: 11 },
      { label: "Outros", pct: 7 },
    ],
    resolve: "Resolve com o candidato eleito governador de SP no 1º ou 2º turno de out/2026.",
  },
];

/* ═══════════════════════════════════════════════════════════
   TOAST HOOK
═══════════════════════════════════════════════════════════ */
function useToast() {
  const [msg, setMsg] = useState(null);
  const timerRef = useRef(null);
  const show = (m) => {
    setMsg(m);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMsg(null), 2800);
  };
  return { msg, show };
}

/* ═══════════════════════════════════════════════════════════
   INITIALS HELPER
═══════════════════════════════════════════════════════════ */
function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

/* ═══════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════ */
const NAV = [
  { id: "markets",   label: "Mercados"  },
  { id: "portfolio", label: "Portfólio" },
  { id: "atividade", label: "Atividade" },
  { id: "ranking",   label: "Ranking"   },
];

function Header({ page, setPage, onLogin, onRegister, showToast }) {
  const { user, coins, logout } = useAuth();
  return (
    <header className="hd">
      <div className="hd-in">
        <button className="logo-btn" onClick={() => setPage("markets")}><Logo /></button>
        <nav className="hd-nav">
          {NAV.map(n => (
            <button key={n.id} className={`nav-btn${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hd-right">
          <button className="search-btn" onClick={() => showToast("Busca em breve.")} style={{width:34,height:34,borderRadius:8,border:"1.5px solid var(--border2)",background:"var(--white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)"}}>
            <IcoSearch />
          </button>
          {user ? (
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div className="coins-display">
                <div className="coin-dot" />
                {coins.toLocaleString("pt-BR")} créditos
              </div>
              <button className="user-pill" onClick={() => setPage("profile")}>
                <div className="avatar-sm">
                  {user.avatar
                    ? <img src={user.avatar} alt="avatar" />
                    : initials(user.name)}
                </div>
                <span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{user.name.split(" ")[0]}</span>
              </button>
              <button className="btn-ghost" onClick={() => { logout(); showToast("Até logo!"); }}>
                Sair
              </button>
            </div>
          ) : (
            <>
              <button className="btn-ghost" onClick={onLogin}>Login</button>
              <button className="btn-blue" onClick={onRegister}>Cadastrar-se</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY BAR
═══════════════════════════════════════════════════════════ */
const CATS_LIST = [
  { id: "todos",          label: "Em Alta",       icon: <IcoTrending /> },
  { id: "politica",       label: "Política" },
  { id: "esportes",       label: "Esportes" },
  { id: "economia",       label: "Economia" },
  { id: "entretenimento", label: "Entretenimento" },
  { id: "tecnologia",     label: "Tecnologia" },
  { id: "eleicoes",       label: "Eleições" },
  { id: "crypto",         label: "Crypto" },
];

function CatBar({ active, setActive }) {
  return (
    <div className="cat-bar">
      <div className="cat-in">
        {CATS_LIST.map(c => (
          <button
            key={c.id}
            className={`cat-pill${active === c.id ? " active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.icon && c.icon}
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARKET CARD
═══════════════════════════════════════════════════════════ */
function MarketCard({ market, onClick, showToast }) {
  const { user, toggleSave, isSaved } = useAuth();
  const cfg = CAT[market.cat] || CAT.politica;
  const saved = isSaved(market.id);

  const handleSave = (e) => {
    e.stopPropagation();
    if (!user) { showToast("Faça login para salvar mercados."); return; }
    const nowSaved = toggleSave(market.id);
    showToast(nowSaved ? "Mercado salvo na sua conta." : "Mercado removido dos salvos.");
  };

  const opts = market.type === "binary"
    ? [{ label: "Sim", pct: market.sim }]
    : market.opts.slice(0, 4);

  return (
    <div className="mcard" onClick={onClick}>
      <div className="mcard-body">
        <div className="mcard-head">
          <div className="mcard-icon" style={{ background: cfg.bg, color: cfg.fg }}>
            <cfg.Icon />
          </div>
          <div className="mcard-title">{market.title}</div>
        </div>
        <div className="mcard-opts">
          {opts.map((o, i) => (
            <div className="mcard-opt-row" key={i}>
              <span className="mopt-label">{o.label}</span>
              <span className="mopt-pct">{o.pct}%</span>
              <div className="mopt-btns">
                <button className="mopt-btn yes" onClick={e => { e.stopPropagation(); onClick(); }}>Sim</button>
                <button className="mopt-btn no"  onClick={e => { e.stopPropagation(); onClick(); }}>Não</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mcard-footer">
        <span className={`mcard-vol${market.endsSoon ? " ends-soon" : ""}`}>
          Enc. {market.deadline}
        </span>
        <button className={`mcard-save${saved ? " saved" : ""}`} onClick={handleSave} title="Salvar">
          <IcoBookmark filled={saved} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINI CHART (sparkline for modal)
═══════════════════════════════════════════════════════════ */
function MiniChart({ base }) {
  const pts = Array.from({ length: 30 }, (_, i) =>
    Math.max(3, Math.min(97, base + Math.sin(i / 3) * (Math.random() * 8) + (Math.random() - 0.5) * 6))
  );
  const W = 660, H = 90, pad = 8;
  const xs = pts.map((_, i) => pad + i * (W - pad * 2) / 29);
  const ys = pts.map(v => pad + (1 - v / 100) * (H - pad * 2));
  const path = xs.map((x, i) => `${i ? "L" : "M"}${x},${ys[i]}`).join(" ");
  const area = `${path} L${xs[29]},${H - pad} L${xs[0]},${H - pad} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E5CFF" stopOpacity=".12" />
          <stop offset="100%" stopColor="#2E5CFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#cg)" />
      <path d={path} stroke="#2E5CFF" strokeWidth="2" fill="none" />
      <circle cx={xs[29]} cy={ys[29]} r="4" fill="#2E5CFF" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MARKET MODAL
═══════════════════════════════════════════════════════════ */
function MarketModal({ market, onClose, showToast }) {
  const { user } = useAuth();
  const [mode, setMode] = useState("sim");
  const [amount, setAmount] = useState("50");
  const mult = mode === "sim" ? 1.206 : 1.449;
  const val = parseFloat(amount) || 0;
  const base = market.type === "binary" ? market.sim : market.opts[0].pct;

  const doTrade = () => {
    if (!user) { showToast("Faça login para apostar."); return; }
    showToast(`Posição confirmada! R$ ${val.toFixed(2)} em ${mode.toUpperCase()}.`);
    onClose();
  };

  return (
    <div className="backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <div className="modal-title">{market.title}</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="tags">
            <span className="tag tag-blue">{market.cat.charAt(0).toUpperCase() + market.cat.slice(1)}</span>
            <span className="tag tag-gray">Encerra {market.deadline}</span>
          </div>

          <div className="chart-box">
            <div className="chart-label">Histórico de probabilidade (30 dias)</div>
            <MiniChart base={base} />
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--text3)", marginBottom: 10 }}>
              Probabilidades atuais
            </div>
            {market.type === "binary" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 320 }}>
                {[{ l: "Sim", p: market.sim, cls: "yes" }, { l: "Não", p: market.nao, cls: "no" }].map(o => (
                  <div key={o.l} style={{ background: o.cls === "yes" ? "var(--green-bg)" : "var(--red-bg)", borderRadius: 8, padding: "12px 10px", textAlign: "center", border: `1.5px solid ${o.cls === "yes" ? "var(--green-bd)" : "var(--red-bd)"}` }}>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 3 }}>{o.l}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: o.cls === "yes" ? "var(--green)" : "var(--red)" }}>{o.p}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {market.opts.map((o, i) => (
                  <div key={i} className="mcard-opt-row">
                    <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{o.label}</span>
                    <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden", margin: "0 10px" }}>
                      <div style={{ width: `${o.pct}%`, height: "100%", background: "var(--blue)", borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", width: 36, textAlign: "right" }}>{o.pct}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {market.type === "binary" && (
            <div className="trade-box">
              <div className="trade-toggle">
                <button className={`tt${mode === "sim" ? " yes" : ""}`} onClick={() => setMode("sim")}>Comprar Sim</button>
                <button className={`tt${mode === "nao" ? " no" : ""}`} onClick={() => setMode("nao")}>Comprar Não</button>
              </div>
              <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 5 }}>Valor (R$)</div>
              <input className="trade-input" type="number" value={amount} min="1" onChange={e => setAmount(e.target.value)} />
              <div className="quick-row">
                {[10, 50, 100, 500].map(v => (
                  <button key={v} className="qbtn" onClick={() => setAmount(String(v))}>R${v}</button>
                ))}
              </div>
              <div className="trade-info-row">
                <span>Retorno potencial</span>
                <span className="trade-ret">{val > 0 ? `~R$ ${(val * mult).toFixed(2)}` : "—"}</span>
              </div>
              <button className={`trade-sub ${mode}`} onClick={doTrade}>
                Comprar {mode === "sim" ? "Sim" : "Não"} por R$ {val.toFixed(2)}
              </button>
              {!user && (
                <p style={{ fontSize: 11.5, color: "var(--text3)", textAlign: "center", marginTop: 8 }}>
                  Faça login para apostar
                </p>
              )}
            </div>
          )}

          <div className="resolve-box">
            <div className="resolve-label">Critério de resolução</div>
            <p className="resolve-text">{market.resolve}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN MODAL
═══════════════════════════════════════════════════════════ */
function LoginModal({ onClose, onSwitch, showToast }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");

  const submit = () => {
    setErr("");
    if (!email || !pass) { setErr("Preencha todos os campos."); return; }
    const e = login(email.trim(), pass);
    if (e) { setErr(e); return; }
    showToast("Bem-vindo de volta!");
    onClose();
  };

  return (
    <div className="backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-head">
          <div className="modal-title">Entrar na sua conta</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input className="form-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input className="form-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {err && <div className="form-error">{err}</div>}
          <button className="form-submit" onClick={submit}>Entrar</button>
          <div className="form-switch">
            Não tem conta?{" "}
            <button onClick={onSwitch}>Cadastrar-se</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTER MODAL
═══════════════════════════════════════════════════════════ */
function RegisterModal({ onClose, onSwitch, showToast }) {
  const { register } = useAuth();
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [pass2, setPass2] = useState("");
  const [err,   setErr]   = useState("");

  const submit = () => {
    setErr("");
    if (!name || !email || !pass || !pass2) { setErr("Preencha todos os campos."); return; }
    if (pass !== pass2) { setErr("As senhas não coincidem."); return; }
    if (pass.length < 6) { setErr("A senha deve ter ao menos 6 caracteres."); return; }
    const e = register(name.trim(), email.trim(), pass);
    if (e) { setErr(e); return; }
    showToast("Conta criada! Voce recebeu 1.000 creditos de boas-vindas.");
    onClose();
  };

  return (
    <div className="backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-head">
          <div className="modal-title">Criar conta</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Nome completo</label>
            <input className="form-input" type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input className="form-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input className="form-input" type="password" placeholder="Min. 6 caracteres" value={pass} onChange={e => setPass(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmar senha</label>
            <input className="form-input" type="password" placeholder="Repita a senha" value={pass2} onChange={e => setPass2(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {err && <div className="form-error">{err}</div>}
          <button className="form-submit" onClick={submit}>Criar conta</button>
          <div className="form-switch">
            Ja tem conta?{" "}
            <button onClick={onSwitch}>Fazer login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: MARKETS
═══════════════════════════════════════════════════════════ */
function MarketsPage({ showToast }) {
  const [activeCat, setActiveCat] = useState("todos");
  const [activeMkt, setActiveMkt] = useState(null);

  const featured = MARKETS.find(m => m.featured);
  const filtered = MARKETS.filter(m => !m.featured && (activeCat === "todos" || m.cat === activeCat));

  return (
    <>
      <CatBar active={activeCat} setActive={setActiveCat} />
      <div className="page">
        {(activeCat === "todos" || activeCat === "politica") && featured && (
          <div className="featured" onClick={() => setActiveMkt(featured)}>
            <div className="featured-body">
              <div className="featured-head">
                <div className="mcard-icon" style={{ background: CAT.politica.bg, color: CAT.politica.fg, width: 42, height: 42, borderRadius: 10, flexShrink: 0 }}>
                  <IcoBuilding />
                </div>
                <div className="featured-title">{featured.title}</div>
              </div>
              <div className="featured-opts">
                {featured.opts.map((o, i) => (
                  <div className="opt-row" key={i}>
                    <span className="opt-name">{o.label}</span>
                    <div className="opt-bar"><div className="opt-fill" style={{ width: `${o.pct}%` }} /></div>
                    <span className="opt-pct">{o.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="featured-footer">
                <span>Encerra {featured.deadline}</span>
                <span className="footer-dot">·</span>
                <span>Mercado de Previsao</span>
              </div>
            </div>
          </div>
        )}

        <div className="sec-hd">
          <div className="sec-title">Em Alta</div>
          <button className="sec-link">Ver todos</button>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon"><IcoChart /></div>
            <div className="empty-title">Nenhum mercado nesta categoria</div>
            <div className="empty-sub">Novos mercados sao adicionados frequentemente.</div>
          </div>
        ) : (
          <div className="grid">
            {filtered.map(m => (
              <MarketCard key={m.id} market={m} onClick={() => setActiveMkt(m)} showToast={showToast} />
            ))}
          </div>
        )}
      </div>

      {activeMkt && (
        <MarketModal market={activeMkt} onClose={() => setActiveMkt(null)} showToast={showToast} />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: PORTFOLIO
═══════════════════════════════════════════════════════════ */
function PortfolioPage({ setPage, showToast }) {
  const { user } = useAuth();
  const [tab, setTab] = useState("abertas");

  if (!user) {
    return (
      <div className="page">
        <div className="empty">
          <div className="empty-icon"><IcoActivity /></div>
          <div className="empty-title">Acesse o seu portfólio</div>
          <div className="empty-sub">Faca login para ver suas posicoes abertas e o historico de apostas.</div>
          <div className="empty-actions">
            <button className="btn-blue" onClick={() => showToast("Use o botao Login no topo.")}>Fazer login</button>
            <button className="btn-ghost" onClick={() => setPage("markets")}>Explorar mercados</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <div className="page-title">Portfólio</div>
          <div className="page-sub">Suas posicoes e historico de apostas</div>
        </div>
      </div>

      <div className="summary-grid">
        {[
          { label: "Saldo disponível", val: "—", sub: "Conecte carteira" },
          { label: "Em posições abertas", val: "—", sub: "0 mercados" },
          { label: "Lucro / Prejuízo", val: "—", sub: "Todo o período" },
          { label: "Apostas encerradas", val: "—", sub: "Resolvidas" },
        ].map(c => (
          <div className="summary-card" key={c.label}>
            <div className="summary-label">{c.label}</div>
            <div className="summary-val">{c.val}</div>
            <div className="summary-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="filter-row">
        {["abertas", "historico"].map(t => (
          <button key={t} className={`fbtn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t === "abertas" ? "Posições Abertas" : "Histórico"}
          </button>
        ))}
      </div>

      <div className="empty" style={{ paddingTop: 40 }}>
        <div className="empty-icon"><IcoActivity /></div>
        <div className="empty-title">Nenhuma posicao encontrada</div>
        <div className="empty-sub">Suas apostas aparecerao aqui assim que voce comecar a operar.</div>
        <button className="btn-blue" onClick={() => setPage("markets")}>Explorar mercados</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: ATIVIDADE
═══════════════════════════════════════════════════════════ */
function AtividadePage({ showToast }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState("todas");

  if (!user) {
    return (
      <div className="page">
        <div className="empty">
          <div className="empty-icon">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <div className="empty-title">Historico de operacoes</div>
          <div className="empty-sub">Faca login para ver todas as suas transacoes e apostas.</div>
          <button className="btn-blue" onClick={() => showToast("Use o botao Login no topo.")}>Fazer login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <div className="page-title">Atividade</div>
          <div className="page-sub">Historico de todas as suas operacoes</div>
        </div>
      </div>

      <div className="filter-row">
        {["todas", "compras", "vendas", "resolucoes"].map(f => (
          <button key={f} className={`fbtn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Mercado</th><th>Tipo</th><th>Posição</th><th>Data</th>
              <th style={{ textAlign: "right" }}>Valor</th>
              <th style={{ textAlign: "right" }}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="empty" style={{ padding: "40px 0" }}>
                  <div className="empty-title">Nenhuma atividade registrada</div>
                  <div className="empty-sub">Suas operacoes aparecerao aqui.</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: RANKING
═══════════════════════════════════════════════════════════ */
function RankingPage() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <div className="page-title">Ranking</div>
          <div className="page-sub">Os melhores traders da plataforma</div>
        </div>
      </div>

      <div className="filter-row">
        {[["7d", "7 dias"], ["30d", "30 dias"], ["all", "Todos os tempos"]].map(([id, lbl]) => (
          <button key={id} className={`fbtn${period === id ? " active" : ""}`} onClick={() => setPeriod(id)}>
            {lbl}
          </button>
        ))}
      </div>

      <div className="info-banner">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4m0 4h.01" />
        </svg>
        O ranking sera populado automaticamente conforme os usuarios comecem a operar na plataforma.
      </div>

      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 48 }}>#</th>
              <th>Trader</th><th>Operacoes</th><th>Taxa de acerto</th>
              <th style={{ textAlign: "right" }}>Lucro total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className="empty" style={{ padding: "40px 0" }}>
                  <div className="empty-title">Nenhum trader registrado ainda</div>
                  <div className="empty-sub">Seja o primeiro a operar e aparecer no ranking.</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="rank-info-grid">
        {[
          { icon: <IcoChart />, title: "Lucro absoluto", text: "Calculado com base no resultado liquido de todas as posicoes encerradas no periodo." },
          { icon: <IcoVote />, title: "Taxa de acerto", text: "Percentual de apostas vencedoras sobre o total de posicoes resolvidas." },
          { icon: <IcoActivity />, title: "Atualizacao", text: "O ranking e atualizado em tempo real conforme os mercados sao resolvidos." },
        ].map((c, i) => (
          <div className="rank-info-card" key={i}>
            <div style={{ color: "var(--blue)", marginBottom: 8 }}>{c.icon}</div>
            <div className="rank-info-title">{c.title}</div>
            <div className="rank-info-text">{c.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE: PROFILE
═══════════════════════════════════════════════════════════ */
function ProfilePage({ setPage, showToast }) {
  const { user, coins, updateProfile, logout } = useAuth();
  const fileRef = useRef(null);

  const [name,  setName]  = useState(user?.name  || "");
  const [email, setEmail] = useState(user?.email || "");
  const [bio,   setBio]   = useState(user?.bio   || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="page">
        <div className="empty">
          <div className="empty-icon"><IcoBuilding /></div>
          <div className="empty-title">Voce nao esta logado</div>
          <div className="empty-sub">Faca login ou crie uma conta para acessar seu perfil.</div>
          <button className="btn-blue" onClick={() => showToast("Use o botao Login no topo.")}>Fazer login</button>
        </div>
      </div>
    );
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast("Foto deve ter no maximo 2MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (!name.trim()) { showToast("O nome nao pode estar vazio."); return; }
    updateProfile({ name: name.trim(), email: email.trim(), bio: bio.trim(), avatar });
    setSaved(true);
    showToast("Perfil atualizado com sucesso!");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <div className="page-title">Meu Perfil</div>
          <div className="page-sub">Gerencie suas informacoes e preferencias</div>
        </div>
        <button className="btn-ghost" onClick={() => { logout(); setPage("markets"); showToast("Ate logo!"); }}>
          Sair da conta
        </button>
      </div>

      <div className="profile-grid">
        {/* SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="profile-card">
            <div className="avatar-lg">
              {avatar ? <img src={avatar} alt="avatar" /> : initials(user.name)}
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
            <button className="upload-btn" onClick={() => fileRef.current?.click()}>
              Alterar foto
            </button>
            {avatar && (
              <button style={{ fontSize: 12, background: "none", border: "none", color: "var(--red)", fontWeight: 600 }} onClick={() => setAvatar(null)}>
                Remover foto
              </button>
            )}
            <div className="profile-coins-box">
              <div className="coin-dot" />
              <span>{coins.toLocaleString("pt-BR")} créditos</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--text3)", borderTop: "1px solid var(--border)", paddingTop: 10, width: "100%", textAlign: "center" }}>
              Membro desde {new Date(user.joinedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="form-card">
            <div className="form-card-title">Informacoes pessoais</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Nome completo</label>
                  <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">E-mail</label>
                  <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea className="form-input" placeholder="Conte um pouco sobre voce..." value={bio} onChange={e => setBio(e.target.value)} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="form-save" onClick={saveProfile}>
                  {saved ? "Salvo!" : "Salvar alteracoes"}
                </button>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="form-card-title">Seguranca</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Nova senha</label>
                <input className="form-input" type="password" placeholder="Deixe em branco para nao alterar" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirmar nova senha</label>
                <input className="form-input" type="password" placeholder="Repita a nova senha" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="form-save" onClick={() => showToast("Funcionalidade em breve.")}>
                  Alterar senha
                </button>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div className="form-card-title">Mercados salvos</div>
            <div className="empty" style={{ padding: "24px 0" }}>
              <div className="empty-sub">
                Clique no icone de marcador nos cards de mercado para salvar aqui.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const { msg: toastMsg, show: showToast } = useToast();
  const [page, setPage] = useState("markets");
  const [modal, setModal] = useState(null); // "login" | "register"

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") setModal(null); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  const openLogin    = () => setModal("login");
  const openRegister = () => setModal("register");

  return (
    <AuthProvider>
      <Header
        page={page}
        setPage={setPage}
        onLogin={openLogin}
        onRegister={openRegister}
        showToast={showToast}
      />

      {page === "markets"   && <MarketsPage   showToast={showToast} />}
      {page === "portfolio" && <PortfolioPage setPage={setPage} showToast={showToast} />}
      {page === "atividade" && <AtividadePage showToast={showToast} />}
      {page === "ranking"   && <RankingPage />}
      {page === "profile"   && <ProfilePage setPage={setPage} showToast={showToast} />}

      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("register")}
          showToast={showToast}
        />
      )}
      {modal === "register" && (
        <RegisterModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("login")}
          showToast={showToast}
        />
      )}

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </AuthProvider>
  );
}
