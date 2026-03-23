import { useState, createContext, useContext, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
   GLOBAL STYLES  —  DM Sans (lighter, modern)
══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
:root {
  --blue:#2E5CFF; --blue-h:#2450e0; --blue-l:#eef2ff; --blue-m:#c7d4ff;
  --navy:#061C58; --white:#FFFFFF; --bg:#f7f8fb;
  --border:#e8eaef; --border2:#d1d5e0; --surface:#FFFFFF;
  --text:#0d1117; --text2:#5a6478; --text3:#9aa3b2;
  --green:#16a34a; --green-l:#f0fdf4; --green-b:#bbf7d0;
  --red:#dc2626;   --red-l:#fef2f2;   --red-b:#fecaca;
  --gold:#f59e0b;
  --r:10px; --r-sm:7px; --r-pill:100px;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'DM Sans',-apple-system,sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;}
button,input,textarea{font-family:inherit;cursor:pointer;}
input,textarea{cursor:text;}

/* ── HEADER ── */
.hd{background:var(--white);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;}
.hd-in{max-width:1300px;margin:0 auto;padding:0 20px;height:54px;display:flex;align-items:center;gap:6px;}
.logo-btn{background:none;border:none;padding:0;display:flex;align-items:center;margin-right:10px;flex-shrink:0;}
.hd-nav{display:flex;align-items:center;gap:1px;flex:1;}
.nav-btn{padding:5px 11px;border-radius:var(--r-sm);font-size:13.5px;font-weight:500;color:var(--text2);background:none;border:none;transition:all .15s;white-space:nowrap;}
.nav-btn:hover{background:var(--bg);color:var(--text);}
.nav-btn.active{color:var(--blue);background:var(--blue-l);font-weight:600;}
.hd-right{display:flex;align-items:center;gap:7px;margin-left:auto;flex-shrink:0;}
.btn-ghost{padding:6px 13px;border-radius:var(--r-sm);font-size:13px;font-weight:500;border:1.5px solid var(--border2);background:var(--white);color:var(--text);transition:all .15s;}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue);}
.btn-blue{padding:6px 15px;border-radius:var(--r-sm);font-size:13px;font-weight:600;border:none;background:var(--blue);color:#fff;transition:background .15s;}
.btn-blue:hover{background:var(--blue-h);}
.user-pill{display:flex;align-items:center;gap:7px;padding:3px 11px 3px 3px;border-radius:var(--r-pill);border:1.5px solid var(--border);background:var(--white);cursor:pointer;transition:border-color .15s;}
.user-pill:hover{border-color:var(--blue-m);}
.av-sm{width:28px;height:28px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;flex-shrink:0;overflow:hidden;}
.av-sm img{width:100%;height:100%;object-fit:cover;}
.coins-chip{display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--text);}
.cdot{width:7px;height:7px;border-radius:50%;background:var(--gold);flex-shrink:0;}

/* ── CAT BAR ── */
.cat-bar{background:var(--white);border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;position:sticky;top:54px;z-index:90;}
.cat-bar::-webkit-scrollbar{display:none;}
.cat-in{max-width:1300px;margin:0 auto;padding:0 20px;display:flex;gap:1px;height:42px;align-items:center;}
.cat-pill{padding:5px 13px;border-radius:var(--r-pill);font-size:13px;font-weight:500;color:var(--text2);border:none;background:none;white-space:nowrap;flex-shrink:0;display:flex;align-items:center;gap:5px;transition:all .15s;}
.cat-pill:hover{background:var(--bg);color:var(--text);}
.cat-pill.active{background:var(--navy);color:#fff;font-weight:600;}

/* ── PAGE ── */
.page{max-width:1300px;margin:0 auto;padding:22px 20px 60px;}
.page-title{font-size:20px;font-weight:700;}
.page-sub{font-size:13px;color:var(--text2);margin-top:2px;}
.page-title-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:10px;}

/* ── GRID ── */
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;}

/* ══════════════════════════════════════════════════════════
   MARKET CARD  —  exact Polymarket clone
══════════════════════════════════════════════════════════ */
.mcard{background:var(--white);border:1px solid var(--border);border-radius:var(--r);display:flex;flex-direction:column;cursor:pointer;transition:box-shadow .18s,transform .15s;overflow:hidden;}
.mcard:hover{box-shadow:0 3px 14px rgba(0,0,0,.08);transform:translateY(-1px);}

/* card top: icon + title */
.mcard-top{display:flex;align-items:flex-start;gap:10px;padding:14px 14px 10px;}
.mcard-ico{width:38px;height:38px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.mcard-ico img{width:100%;height:100%;object-fit:cover;}
.mcard-ico svg{width:20px;height:20px;}
.mcard-title{font-size:13px;font-weight:500;line-height:1.4;color:var(--text);flex:1;padding-top:2px;}

/* option rows */
.mcard-opts{display:flex;flex-direction:column;gap:0;padding:0 14px 8px;}
.opt-row{display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid var(--border);}
.opt-row:first-child{border-top:none;}
.opt-name{font-size:12.5px;font-weight:400;color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.opt-pct{font-size:12.5px;font-weight:600;color:var(--text);width:36px;text-align:right;flex-shrink:0;}
.opt-yes,.opt-no{padding:3px 9px;border-radius:5px;font-size:11.5px;font-weight:600;border:none;line-height:1.4;transition:opacity .15s;flex-shrink:0;}
.opt-yes{background:var(--green-l);color:var(--green);}
.opt-no{background:var(--red-l);color:var(--red);}
.opt-yes:hover,.opt-no:hover{opacity:.72;}

/* card footer */
.mcard-foot{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-top:1px solid var(--border);margin-top:auto;}
.mcard-vol{font-size:11.5px;font-weight:400;color:var(--text3);}
.mcard-save{background:none;border:none;color:var(--text3);display:flex;align-items:center;transition:color .15s;border-radius:4px;padding:1px;}
.mcard-save:hover,.mcard-save.sv{color:var(--blue);}

/* ── SECTION ── */
.sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;margin-top:6px;}
.sec-title{font-size:14px;font-weight:600;color:var(--text);}
.sec-link{font-size:12.5px;font-weight:500;color:var(--blue);border:1.5px solid var(--blue-m);padding:4px 11px;border-radius:6px;background:none;transition:background .15s;}
.sec-link:hover{background:var(--blue-l);}

/* ── MODAL ── */
.bd{position:fixed;inset:0;background:rgba(6,28,88,.38);backdrop-filter:blur(5px);z-index:200;display:flex;align-items:center;justify-content:center;padding:18px;animation:bFade .18s ease;}
@keyframes bFade{from{opacity:0}to{opacity:1}}
.modal{background:var(--white);border-radius:14px;width:100%;max-width:640px;max-height:92vh;overflow-y:auto;box-shadow:0 18px 54px rgba(6,28,88,.18);animation:mUp .25s cubic-bezier(.34,1.56,.64,1);}
@keyframes mUp{from{transform:translateY(18px) scale(.96)}to{transform:none}}
.modal-sm{max-width:400px;}
.mhd{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 13px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--white);z-index:2;}
.mtitle{font-size:14.5px;font-weight:600;line-height:1.35;flex:1;padding-right:10px;}
.mclose{width:26px;height:26px;flex-shrink:0;border-radius:6px;border:1.5px solid var(--border2);background:var(--white);color:var(--text2);display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .15s;}
.mclose:hover{border-color:var(--navy);color:var(--navy);}
.mbody{padding:16px 20px;display:flex;flex-direction:column;gap:13px;}

/* modal tags */
.tags{display:flex;gap:5px;flex-wrap:wrap;}
.tag{font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;}
.tag-b{background:var(--blue-l);color:var(--blue);}
.tag-g{background:var(--bg);color:var(--text2);}

/* modal probs */
.slabel{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);margin-bottom:5px;}
.prob-binary{display:grid;grid-template-columns:1fr 1fr;gap:7px;max-width:260px;}
.pbox{border-radius:8px;padding:11px 9px;text-align:center;}
.pbox.y{background:var(--green-l);border:1.5px solid var(--green-b);}
.pbox.n{background:var(--red-l);  border:1.5px solid var(--red-b);}
.pbox-l{font-size:11px;color:var(--text3);margin-bottom:2px;}
.pbox-v{font-size:24px;font-weight:700;}
.pbox.y .pbox-v{color:var(--green);}
.pbox.n .pbox-v{color:var(--red);}

/* bet box */
.bet-box{background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:14px;}
.bet-avail{font-size:12px;color:var(--text2);margin-bottom:9px;display:flex;align-items:center;gap:5px;}
.bet-avail strong{color:var(--text);font-weight:600;}
.bet-toggle{display:flex;gap:7px;margin-bottom:11px;}
.bbt{flex:1;padding:9px;border-radius:7px;font-size:13px;font-weight:600;border:1.5px solid transparent;background:var(--white);transition:all .18s;}
.bbt.sim{border-color:var(--green-b);color:var(--green);}
.bbt.sim.sel{background:var(--green);color:#fff;border-color:var(--green);}
.bbt.nao{border-color:var(--red-b);color:var(--red);}
.bbt.nao.sel{background:var(--red);color:#fff;border-color:var(--red);}
.bet-inp{width:100%;padding:9px 12px;border:1.5px solid var(--border2);border-radius:7px;font-size:16px;font-weight:600;color:var(--text);background:var(--white);outline:none;margin-bottom:7px;transition:border-color .15s;}
.bet-inp:focus{border-color:var(--blue);}
.bet-quick{display:flex;gap:5px;margin-bottom:11px;}
.bq{flex:1;padding:5px;border:1.5px solid var(--border2);border-radius:5px;background:var(--white);font-size:11.5px;font-weight:500;color:var(--text2);transition:all .15s;}
.bq:hover{border-color:var(--blue);color:var(--blue);}
.bet-ret-row{display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:11px;}
.bet-ret{font-weight:600;color:var(--text);}
.bet-sub{width:100%;padding:10px;border:none;border-radius:8px;font-size:13px;font-weight:700;transition:opacity .15s;}
.bet-sub.sim{background:var(--green);color:#fff;}
.bet-sub.nao{background:var(--red);color:#fff;}
.bet-sub.none{background:var(--border2);color:var(--text3);cursor:default;}
.bet-sub:not(.none):hover{opacity:.86;}
.bet-err{font-size:11.5px;color:var(--red);margin-top:-7px;}
.bet-login{font-size:12px;color:var(--text2);text-align:center;padding:9px;background:var(--bg);border-radius:7px;}

/* resolve */
.resolve-box{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px 13px;}
.resolve-text{font-size:12.5px;color:var(--text2);line-height:1.6;}

/* comments */
.cmts-wrap{display:flex;flex-direction:column;gap:11px;}
.cmts-title{font-size:13px;font-weight:600;}
.cmt-ta{width:100%;padding:9px 11px;border:1.5px solid var(--border2);border-radius:7px;font-size:12.5px;color:var(--text);background:var(--white);outline:none;resize:none;min-height:62px;transition:border-color .15s;line-height:1.5;}
.cmt-ta:focus{border-color:var(--blue);}
.cmt-sub{align-self:flex-end;padding:6px 14px;border:none;border-radius:6px;font-size:12.5px;font-weight:600;background:var(--blue);color:#fff;display:flex;align-items:center;gap:5px;transition:background .15s;}
.cmt-sub:hover{background:var(--blue-h);}
.cmt-sub:disabled{background:var(--border2);color:var(--text3);cursor:default;}
.cmt-list{display:flex;flex-direction:column;gap:9px;}
.cmt-item{display:flex;gap:8px;}
.cmt-av{width:26px;height:26px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:600;flex-shrink:0;overflow:hidden;}
.cmt-av img{width:100%;height:100%;object-fit:cover;}
.cmt-bub{background:var(--bg);border:1px solid var(--border);border-radius:0 7px 7px 7px;padding:7px 10px;flex:1;}
.cmt-meta{display:flex;align-items:center;gap:6px;margin-bottom:2px;}
.cmt-name{font-size:11.5px;font-weight:600;}
.cmt-time{font-size:11px;color:var(--text3);}
.cmt-text{font-size:12.5px;color:var(--text2);line-height:1.5;}
.cmt-empty{font-size:12.5px;color:var(--text3);text-align:center;padding:8px 0;}
.cmt-login{font-size:12px;color:var(--text2);padding:9px;background:var(--bg);border-radius:7px;text-align:center;}

/* forms */
.fg{display:flex;flex-direction:column;gap:4px;}
.fl{font-size:11.5px;font-weight:600;color:var(--text2);letter-spacing:.02em;}
.fi{width:100%;padding:9px 12px;border:1.5px solid var(--border2);border-radius:7px;font-size:13.5px;color:var(--text);background:var(--white);outline:none;transition:border-color .15s;}
.fi:focus{border-color:var(--blue);}
textarea.fi{resize:vertical;min-height:74px;}
.ferr{font-size:11.5px;color:var(--red);margin-top:1px;}
.fsub{width:100%;padding:10px;border:none;border-radius:8px;font-size:13.5px;font-weight:600;background:var(--blue);color:#fff;transition:background .15s;margin-top:3px;}
.fsub:hover{background:var(--blue-h);}
.fswitch{text-align:center;font-size:12.5px;color:var(--text2);margin-top:10px;}
.fswitch button{background:none;border:none;color:var(--blue);font-weight:600;font-size:12.5px;padding:0;text-decoration:underline;}
.frow2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

/* profile */
.pg{display:grid;grid-template-columns:240px 1fr;gap:16px;align-items:start;}
.pcard{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:22px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;}
.av-lg{width:72px;height:72px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;overflow:hidden;}
.av-lg img{width:100%;height:100%;object-fit:cover;}
.pname{font-size:15px;font-weight:600;}
.pemail{font-size:12.5px;color:var(--text3);}
.pcoins{display:flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;background:var(--bg);border:1px solid var(--border);border-radius:7px;padding:7px 13px;width:100%;justify-content:center;}
.upload-btn{font-size:11.5px;font-weight:600;color:var(--blue);background:var(--blue-l);border:none;padding:5px 12px;border-radius:5px;}
.fcard{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:20px;}
.fcard-title{font-size:14px;font-weight:600;margin-bottom:15px;padding-bottom:11px;border-bottom:1px solid var(--border);}
.fsave{padding:8px 18px;border:none;border-radius:7px;font-size:13px;font-weight:600;background:var(--blue);color:#fff;}
.fsave:hover{background:var(--blue-h);}

/* ranking */
.tbl-wrap{background:var(--white);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text3);padding:11px 18px;text-align:left;border-bottom:1px solid var(--border);background:#fafbfd;}
.tbl td{padding:13px 18px;font-size:13px;border-bottom:1px solid var(--border);}
.tbl tr:last-child td{border-bottom:none;}
.tbl tbody tr:hover td{background:var(--bg);}
.rank-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px;}
.ri-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:16px;}
.ri-title{font-weight:600;margin-bottom:3px;font-size:13px;}
.ri-text{font-size:12.5px;color:var(--text2);line-height:1.6;}

/* misc */
.ibanner{background:var(--blue-l);border:1px solid var(--blue-m);border-radius:8px;padding:11px 14px;font-size:12.5px;color:var(--navy);margin-bottom:14px;display:flex;align-items:center;gap:7px;}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:64px 22px;gap:12px;}
.empty-ico{width:48px;height:48px;background:var(--blue-l);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--blue);}
.empty-t{font-size:15px;font-weight:600;}
.empty-s{font-size:13px;color:var(--text2);max-width:280px;line-height:1.6;}
.toast{position:fixed;bottom:22px;right:22px;background:var(--navy);color:#fff;padding:11px 16px;border-radius:9px;font-size:12.5px;font-weight:600;z-index:9999;animation:mUp .28s ease;box-shadow:0 7px 22px rgba(6,28,88,.24);}
.filter-row{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;}
.fbtn{padding:5px 12px;border-radius:var(--r-pill);font-size:12.5px;font-weight:500;border:1.5px solid var(--border2);background:var(--white);color:var(--text2);transition:all .15s;}
.fbtn:hover{border-color:var(--blue);color:var(--blue);}
.fbtn.active{background:var(--navy);border-color:var(--navy);color:#fff;font-weight:600;}

/* bet badge — no footer, brand blue */
.bet-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px 3px 7px;border-radius:6px;font-size:10.5px;font-weight:700;line-height:1.5;background:var(--blue-l);color:var(--blue);border:1.5px solid var(--blue-m);}
.bet-badge circle{fill:var(--blue);}

::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}
`;

/* ─── LOGO ─── */
function Logo() {
  return (
    <svg height="24" viewBox="0 0 1408 429" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M822.848 225.6L811.448 290.4C809.048 305.2 811.848 314.2 819.848 317.4C827.848 320.6 844.248 321.6 869.048 320.4L851.648 420C791.648 429.2 749.048 423.6 723.848 403.2C698.648 382.8 690.448 347.2 699.248 296.4L711.848 225.6H669.848L688.448 120H730.448L739.448 69L855.848 36L841.448 120H904.448L885.848 225.6H822.848Z" fill="#061C58"/>
      <path d="M537.865 111.6C584.265 111.6 619.865 127 644.665 157.8C669.865 188.6 678.665 225.6 671.065 268.8C669.065 281.6 665.265 294.6 659.665 307.8H464.065C470.465 327.8 488.265 337.8 517.465 337.8C540.265 337.8 558.665 331.4 572.665 318.6L636.865 383.4C602.065 413.4 558.865 428.4 507.265 428.4C453.265 428.4 413.265 412.6 387.265 381C361.265 349.4 352.265 310.4 360.265 264C367.465 220 387.665 183.6 420.865 154.8C454.065 126 493.065 111.6 537.865 111.6ZM474.865 236.4H573.865C572.265 212.4 558.865 200.4 533.665 200.4C506.865 200.4 487.265 212.4 474.865 236.4Z" fill="#061C58"/>
      <path d="M240 111.6C279.2 111.6 310 127.8 332.4 160.2C354.8 192.2 362 230.8 354 276C346 321.6 327.8 358.4 299.4 386.4C271.4 414.4 238 428.4 199.2 428.4C160.8 428.4 133.4 414.4 117 386.4L111 420H0L73.8 0H184.8L159.6 143.4C180.8 122.2 207.6 111.6 240 111.6ZM244.2 270C247.4 252.8 245 239.2 237 229.2C229 218.8 217 213.6 201 213.6C184.6 213.6 170.6 218.8 159 229.2C147.4 239.2 140.2 252.8 137.4 270C134.2 287.2 136.6 301 144.6 311.4C152.6 321.4 164.6 326.4 180.6 326.4C197 326.4 211 321.4 222.6 311.4C234.2 301 241.4 287.2 244.2 270Z" fill="#061C58"/>
      <path d="M1373.17 120.5H1407.37L1237.57 420.5H1200.97L1136.77 120.5H1167.97L1223.17 388.1L1373.17 120.5Z" fill="#2E5CFF"/>
      <path d="M1026.4 149.9L991.597 344.9C987.597 369.3 991.597 384.3 1003.6 389.9C1016 395.5 1039 396.7 1072.6 393.5L1068.4 420.5C1028 426.9 998.597 424.1 980.197 412.1C961.797 400.1 955.597 377.7 961.597 344.9L995.797 149.9H929.797L935.197 120.5H1001.2L1014.4 45.5L1046.2 36.5L1031.2 120.5H1121.2L1115.8 149.9H1026.4Z" fill="#061C58"/>
    </svg>
  );
}

/* ─── SVG ICONS ─── */
const Ico = {
  Building: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V7l6-4v18M9 9h1m-1 3h1m-1 3h1m4-9h1m-1 3h1m-1 3h1"/></svg>,
  Chart:    () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M23 6L13.5 15.5 8.5 10.5 1 18"/><path d="M17 6h6v6"/></svg>,
  Activity: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Play:     () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>,
  Cpu:      () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>,
  Vote:     () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,
  Diamond:  () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 000 3.41l7.59 7.59a2.41 2.41 0 003.41 0l7.59-7.59a2.41 2.41 0 000-3.41L13.7 2.71a2.41 2.41 0 00-3.41 0z"/></svg>,
  Bookmark: ({ f }) => <svg width="14" height="14" fill={f?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>,
  Search:   () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Trend:    () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Send:     () => <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Info:     () => <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>,
};

/* ─── CAT CONFIG ─── */
const CATCFG = {
  politica:       { bg:"#dbeafe", fg:"#1d4ed8", I: Ico.Building },
  esportes:       { bg:"#dcfce7", fg:"#15803d", I: Ico.Activity },
  economia:       { bg:"#fef9c3", fg:"#a16207", I: Ico.Chart    },
  entretenimento: { bg:"#f3e8ff", fg:"#7e22ce", I: Ico.Play     },
  tecnologia:     { bg:"#e0e7ff", fg:"#4338ca", I: Ico.Cpu      },
  eleicoes:       { bg:"#ffe4e6", fg:"#be123c", I: Ico.Vote     },
  crypto:         { bg:"#fce7f3", fg:"#9d174d", I: Ico.Diamond  },
};

/* ══════════════════════════════════════════════════════════
   MARKET DATA  — all 2026, research-based
══════════════════════════════════════════════════════════ */
const MARKETS = [
  /* ── POLITICA ── */
  {
    id:"lula2026", cat:"politica", featured:true,
    title:"Quem vence as eleicoes presidenciais do Brasil em out/2026?",
    deadline:"Out 2026",
    type:"multi",
    opts:[{label:"Lula (PT)",pct:42},{label:"Flavio Bolsonaro (PL)",pct:34},{label:"Tarcisio de Freitas (Rep.)",pct:16},{label:"Outros",pct:8}],
    resolve:"Resolve com o candidato eleito presidente no 1o ou 2o turno em outubro de 2026.",
  },
  {
    id:"2oturnobr", cat:"politica",
    title:"Havera segundo turno nas eleicoes presidenciais de 2026?",
    deadline:"Out 2026", type:"binary", sim:82, nao:18,
    resolve:"Resolve Sim se nenhum candidato obtiver mais de 50% dos votos validos no 1o turno de 4 de outubro de 2026.",
  },
  {
    id:"tarcisio2turno", cat:"politica",
    title:"Tarcisio de Freitas vai ao 2o turno das eleicoes de 2026?",
    deadline:"Out 2026", type:"binary", sim:48, nao:52,
    resolve:"Resolve Sim se Tarcisio de Freitas for um dos dois finalistas do 2o turno presidencial de 2026.",
  },
  {
    id:"pt100cadeiras", cat:"politica",
    title:"PT conquista mais de 80 cadeiras na Camara dos Deputados em 2026?",
    deadline:"Out 2026", type:"binary", sim:61, nao:39,
    resolve:"Resolve Sim se o PT obtiver mais de 80 vagas na Camara dos Deputados nas eleicoes de 2026.",
  },
  {
    id:"amnistia", cat:"politica",
    title:"Congresso aprova projeto de anistia para presos do 8 de Janeiro antes de out/2026?",
    deadline:"Out 2026", type:"binary", sim:27, nao:73,
    resolve:"Resolve Sim se o Congresso Nacional aprovar e o Presidente sancionar lei de anistia para condenados do 8 de Janeiro antes das eleicoes de outubro de 2026.",
  },
  {
    id:"lulaaprova", cat:"politica",
    title:"Aprovacao do governo Lula supera 50% nas pesquisas em 2026?",
    deadline:"Dez 2026", type:"binary", sim:33, nao:67,
    resolve:"Resolve Sim se qualquer pesquisa Datafolha ou Quaest registrar aprovacao acima de 50% ao Governo Lula em 2026.",
  },
  /* ── ELEICOES ── */
  {
    id:"govsp2026", cat:"eleicoes",
    title:"Quem vence o governo de Sao Paulo nas eleicoes de 2026?",
    deadline:"Out 2026",
    type:"multi",
    opts:[{label:"Tarcisio de Freitas (Rep.)",pct:55},{label:"PT / aliados",pct:28},{label:"PSDB / MDB",pct:11},{label:"Outros",pct:6}],
    resolve:"Resolve com o governador eleito de SP em outubro de 2026.",
  },
  {
    id:"govmg2026", cat:"eleicoes",
    title:"Quem vence o governo de Minas Gerais em 2026?",
    deadline:"Out 2026",
    type:"multi",
    opts:[{label:"Romeu Zema (Novo)",pct:44},{label:"PT / aliados",pct:32},{label:"PSD / PSDB",pct:16},{label:"Outros",pct:8}],
    resolve:"Resolve com o governador eleito de MG em outubro de 2026.",
  },
  {
    id:"senado2026", cat:"eleicoes",
    title:"Oposicao conquista maioria no Senado nas eleicoes de 2026?",
    deadline:"Out 2026", type:"binary", sim:44, nao:56,
    resolve:"Resolve Sim se os partidos de oposicao ao governo Lula obtiverem mais de 41 dos 81 senadores apos o pleito de 2026.",
  },
  /* ── ECONOMIA ── */
  {
    id:"pib2026", cat:"economia",
    title:"PIB do Brasil cresce acima de 2,0% em 2026?",
    deadline:"Dez 2026", type:"binary", sim:54, nao:46,
    resolve:"Resolve Sim se o IBGE confirmar crescimento do PIB acima de 2,0% para o ano de 2026.",
  },
  {
    id:"ipca2026", cat:"economia",
    title:"Inflacao IPCA de 2026 fica abaixo de 5%?",
    deadline:"Jan 2027", type:"binary", sim:58, nao:42,
    resolve:"Resolve Sim se o IBGE divulgar IPCA acumulado de 2026 inferior a 5,0%.",
  },
  {
    id:"selic2026", cat:"economia",
    title:"Selic termina 2026 abaixo de 12% ao ano?",
    deadline:"Dez 2026", type:"binary", sim:41, nao:59,
    resolve:"Resolve Sim se a Selic fixada na ultima reuniao do COPOM de 2026 for inferior a 12,00% a.a.",
  },
  {
    id:"dolar2026", cat:"economia",
    title:"Dolar fecha acima de R$ 5,80 no ultimo dia util de 2026?",
    deadline:"Dez 2026", type:"binary", sim:49, nao:51,
    resolve:"Resolve Sim se a cotacao PTAX do BC no fechamento de 31/12/2026 for superior a R$ 5,80.",
  },
  {
    id:"ibov160k", cat:"economia",
    title:"Ibovespa ultrapassa 160.000 pontos em 2026?",
    deadline:"Dez 2026", type:"binary", sim:46, nao:54,
    resolve:"Resolve Sim se o Ibovespa atingir ou superar 160.000 pontos em qualquer pregao da B3 em 2026.",
  },
  {
    id:"eumercosul", cat:"economia",
    title:"Acordo UE-Mercosul e ratificado em 2026?",
    deadline:"Dez 2026", type:"binary", sim:52, nao:48,
    resolve:"Resolve Sim se o Acordo de Livre Comercio UE-Mercosul for ratificado por todos os membros e publicado oficialmente ate 31/12/2026.",
  },
  /* ── ESPORTES ── */
  {
    id:"copagrupos", cat:"esportes",
    title:"Brasil passa da fase de grupos na Copa do Mundo 2026?",
    deadline:"Jun 2026", type:"binary", sim:91, nao:9,
    resolve:"Resolve Sim se a Selecao Brasileira se classificar para as oitavas de final da Copa do Mundo FIFA 2026.",
  },
  {
    id:"copasemi", cat:"esportes",
    title:"Brasil chega as semifinais da Copa do Mundo 2026?",
    deadline:"Jul 2026", type:"binary", sim:52, nao:48,
    resolve:"Resolve Sim se o Brasil atingir as semifinais da Copa do Mundo FIFA 2026.",
  },
  {
    id:"copavence", cat:"esportes",
    title:"Brasil e campear da Copa do Mundo 2026?",
    deadline:"Jul 2026", type:"binary", sim:19, nao:81,
    resolve:"Resolve Sim se a Selecao Brasileira vencer a final da Copa do Mundo FIFA 2026.",
  },
  {
    id:"brasileirao26", cat:"esportes",
    title:"Quem vence o Brasileirao Serie A 2026?",
    deadline:"Dez 2026",
    type:"multi",
    opts:[{label:"Flamengo",pct:29},{label:"Palmeiras",pct:25},{label:"Atletico-MG",pct:18},{label:"Botafogo",pct:14},{label:"Outros",pct:14}],
    resolve:"Resolve com o campeao oficial do Brasileirao Serie A 2026 conforme a CBF.",
  },
  {
    id:"libertadores26", cat:"esportes",
    title:"Clube brasileiro vence a Copa Libertadores 2026?",
    deadline:"Nov 2026", type:"binary", sim:58, nao:42,
    resolve:"Resolve Sim se o campear da Libertadores 2026 for um clube brasileiro.",
  },
  /* ── TECNOLOGIA ── */
  {
    id:"iabrasil", cat:"tecnologia",
    title:"Brasil sanciona lei federal de regulamentacao de IA em 2026?",
    deadline:"Dez 2026", type:"binary", sim:71, nao:29,
    resolve:"Resolve Sim se o Presidente sancionar lei federal de IA aprovada pelo Congresso ate 31/12/2026.",
  },
  {
    id:"xbrasil", cat:"tecnologia",
    title:"X (Twitter) e banido permanentemente no Brasil em 2026?",
    deadline:"Dez 2026", type:"binary", sim:18, nao:82,
    resolve:"Resolve Sim se o STF ou ANATEL confirmarem bloqueio definitivo do X no Brasil em 2026.",
  },
  {
    id:"pix5bi", cat:"tecnologia",
    title:"PIX ultrapassa 6 bilhoes de transacoes em um mes de 2026?",
    deadline:"Dez 2026", type:"binary", sim:76, nao:24,
    resolve:"Resolve Sim se o Banco Central confirmar mais de 6 bilhoes de transacoes PIX em qualquer mes de 2026.",
  },
  {
    id:"drex", cat:"tecnologia",
    title:"DREX (real digital) e lancado para uso geral da populacao em 2026?",
    deadline:"Dez 2026", type:"binary", sim:63, nao:37,
    resolve:"Resolve Sim se o Banco Central anunciar o lancamento do DREX para uso geral (nao-piloto) em 2026.",
  },
  /* ── ENTRETENIMENTO ── */
  {
    id:"bbb26", cat:"entretenimento",
    title:"Quem vence o Big Brother Brasil 26?",
    deadline:"Abr 2026",
    type:"multi",
    opts:[{label:"Amanda",pct:28},{label:"Giovane",pct:22},{label:"Renata",pct:19},{label:"Joao Pedro",pct:15},{label:"Outros",pct:16}],
    resolve:"Resolve com o vencedor oficial anunciado ao vivo na final do BBB 26 na Globo.",
  },
  {
    id:"carnaval26", cat:"entretenimento",
    title:"Carnaval do Rio 2026 supera 7 milhoes de turistas?",
    deadline:"Mar 2026", type:"binary", sim:72, nao:28,
    resolve:"Resolve Sim se a Riotur confirmar mais de 7 milhoes de turistas no Carnaval do Rio de Janeiro 2026.",
  },
  {
    id:"anitta", cat:"entretenimento",
    title:"Anitta ganha Grammy Latino em 2026?",
    deadline:"Nov 2026", type:"binary", sim:38, nao:62,
    resolve:"Resolve Sim se Anitta ganhar alguma categoria no Grammy Latino de 2026.",
  },
  {
    id:"copa30cop", cat:"entretenimento",
    title:"Copa do Mundo 2026 ultrapassa 6 milhoes de espectadores nos estadios?",
    deadline:"Jul 2026", type:"binary", sim:81, nao:19,
    resolve:"Resolve Sim se a FIFA confirmar mais de 6 milhoes de torcedores nos estadios ao longo da Copa 2026.",
  },
  /* ── CRYPTO ── */
  {
    id:"btc700k", cat:"crypto",
    title:"Bitcoin supera R$ 700.000 em 2026?",
    deadline:"Dez 2026", type:"binary", sim:51, nao:49,
    resolve:"Resolve Sim se o Bitcoin atingir ou superar R$ 700.000 (BTC/BRL) em qualquer exchange de referencia em 2026.",
  },
  {
    id:"eth20k", cat:"crypto",
    title:"Ethereum supera R$ 20.000 em 2026?",
    deadline:"Dez 2026", type:"binary", sim:47, nao:53,
    resolve:"Resolve Sim se o Ethereum atingir ou superar R$ 20.000 em qualquer exchange de referencia em 2026.",
  },
  {
    id:"realdigital", cat:"crypto",
    title:"Volume de stablecoins no Brasil supera R$ 500 bi em 2026?",
    deadline:"Dez 2026", type:"binary", sim:44, nao:56,
    resolve:"Resolve Sim se o Banco Central confirmar volume total de stablecoins circulando no Brasil acima de R$ 500 bilhoes em 2026.",
  },
];

/* ─── AUTH CONTEXT ─── */
const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);

function AuthProvider({ children }) {
  const [user,  setUser]  = useState(() => { try { return JSON.parse(localStorage.getItem("bttv_user"))||null; } catch{ return null; } });
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("bttv_coins")||"0"));
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem("bttv_saved"))||[]; } catch{ return []; } });

  const pc = (c, uid) => { setCoins(c); localStorage.setItem("bttv_coins", String(c)); if(uid) localStorage.setItem(`bttv_coins_${uid}`, String(c)); };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("bttv_users")||"[]");
    if(users.find(u=>u.email===email)) return "E-mail ja cadastrado.";
    const u={id:Date.now(),name,email,password,bio:"",avatar:null,joinedAt:new Date().toISOString()};
    users.push(u); localStorage.setItem("bttv_users",JSON.stringify(users));
    setUser(u); pc(1000,u.id); setSaved([]);
    localStorage.setItem("bttv_user",JSON.stringify(u)); localStorage.setItem("bttv_saved","[]");
    return null;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("bttv_users")||"[]");
    const found = users.find(u=>u.email===email&&u.password===password);
    if(!found) return "E-mail ou senha incorretos.";
    const c=parseInt(localStorage.getItem(`bttv_coins_${found.id}`)||"1000");
    const s=JSON.parse(localStorage.getItem(`bttv_saved_${found.id}`)||"[]");
    setUser(found); setCoins(c); setSaved(s);
    localStorage.setItem("bttv_user",JSON.stringify(found));
    localStorage.setItem("bttv_coins",String(c));
    localStorage.setItem("bttv_saved",JSON.stringify(s));
    return null;
  };

  const logout = () => {
    if(user){ localStorage.setItem(`bttv_coins_${user.id}`,String(coins)); localStorage.setItem(`bttv_saved_${user.id}`,JSON.stringify(saved)); }
    localStorage.removeItem("bttv_user"); setUser(null); setCoins(0); setSaved([]);
  };

  const updateProfile = (data) => {
    const upd={...user,...data};
    const users=JSON.parse(localStorage.getItem("bttv_users")||"[]");
    const idx=users.findIndex(u=>u.id===user.id);
    if(idx!==-1){users[idx]=upd;localStorage.setItem("bttv_users",JSON.stringify(users));}
    setUser(upd); localStorage.setItem("bttv_user",JSON.stringify(upd));
  };

  const placeBet = (marketId, position, amount) => {
    if(!user) return "Faca login para apostar.";
    if(amount<=0) return "Digite um valor valido.";
    if(amount>coins) return "Moedas insuficientes.";
    pc(coins-amount, user.id);
    const bets=JSON.parse(localStorage.getItem(`bttv_bets_${user.id}`)||"[]");
    bets.unshift({marketId,position,amount,ts:Date.now()});
    localStorage.setItem(`bttv_bets_${user.id}`,JSON.stringify(bets));
    return null;
  };

  const toggleSave = (id) => {
    const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    setSaved(next); localStorage.setItem("bttv_saved",JSON.stringify(next));
    if(user) localStorage.setItem(`bttv_saved_${user.id}`,JSON.stringify(next));
    return !saved.includes(id);
  };

  const isSaved = id => saved.includes(id);

  const getUserBet = (marketId) => {
    if(!user) return null;
    const bets=JSON.parse(localStorage.getItem(`bttv_bets_${user.id}`)||"[]");
    return bets.find(b=>b.marketId===marketId)||null;
  };

  return (
    <AuthCtx.Provider value={{user,coins,register,login,logout,updateProfile,placeBet,toggleSave,isSaved,getUserBet}}>
      {children}
    </AuthCtx.Provider>
  );
}

/* ─── COMMENTS ─── */
const getCmts  = mid => { try{return JSON.parse(localStorage.getItem(`bttv_cmt_${mid}`)||"[]");}catch{return[];} };
const saveCmts = (mid,list) => localStorage.setItem(`bttv_cmt_${mid}`,JSON.stringify(list));
const timeAgo  = ts => { const s=Math.floor((Date.now()-ts)/1000); if(s<60)return "agora"; if(s<3600)return `${Math.floor(s/60)}min`; if(s<86400)return `${Math.floor(s/3600)}h`; return `${Math.floor(s/86400)}d`; };

/* ─── TOAST ─── */
function useToast() {
  const [msg,setMsg]=useState(null); const ref=useRef(null);
  const show=m=>{setMsg(m);clearTimeout(ref.current);ref.current=setTimeout(()=>setMsg(null),2800);};
  return{msg,show};
}

/* ─── HELPERS ─── */
const initials = name => { if(!name)return"?"; const p=name.trim().split(" "); return(p[0][0]+(p[1]?p[1][0]:"")).toUpperCase(); };

/* ─── COMMENTS SECTION ─── */
function Comments({marketId}){
  const {user}=useAuth();
  const [cmts,setCmts]=useState(()=>getCmts(marketId));
  const [text,setText]=useState("");
  const submit=()=>{
    if(!text.trim())return;
    const c={id:Date.now(),userId:user.id,userName:user.name,userAvatar:user.avatar||null,text:text.trim(),ts:Date.now()};
    const next=[c,...cmts]; setCmts(next); saveCmts(marketId,next); setText("");
  };
  return(
    <div className="cmts-wrap">
      <div className="cmts-title">Opiniao dos usuarios ({cmts.length})</div>
      {user?(
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          <textarea className="cmt-ta" placeholder="Deixe sua opiniao..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&e.ctrlKey&&submit()}/>
          <button className="cmt-sub" onClick={submit} disabled={!text.trim()}><Ico.Send/> Publicar</button>
        </div>
      ):(
        <div className="cmt-login">Faca login para comentar.</div>
      )}
      <div className="cmt-list">
        {cmts.length===0&&<div className="cmt-empty">Nenhum comentario. Seja o primeiro!</div>}
        {cmts.map(c=>(
          <div className="cmt-item" key={c.id}>
            <div className="cmt-av">{c.userAvatar?<img src={c.userAvatar} alt=""/>:initials(c.userName)}</div>
            <div className="cmt-bub">
              <div className="cmt-meta"><span className="cmt-name">{c.userName}</span><span className="cmt-time">{timeAgo(c.ts)}</span></div>
              <div className="cmt-text">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MARKET MODAL ─── */
function MarketModal({market,initMode,onClose,showToast}){
  const {user,coins,placeBet}=useAuth();
  const [mode,setMode]=useState(initMode||null);
  const [amount,setAmount]=useState("");
  const [betErr,setBetErr]=useState("");
  const amt=parseInt(amount)||0;
  const modePct=mode==="sim"?market.sim:mode==="nao"?market.nao:null;
  const potRet=modePct&&amt>0?Math.floor(amt/(modePct/100)):null;
  const cfg=CATCFG[market.cat]||CATCFG.politica;

  const doBet=()=>{
    setBetErr("");
    if(!mode){setBetErr("Selecione Sim ou Nao.");return;}
    const err=placeBet(market.id,mode,amt);
    if(err){setBetErr(err);return;}
    showToast(`Aposta confirmada! ${amt} moedas em ${mode==="sim"?"Sim":"Nao"}.`); onClose();
  };

  return(
    <div className="bd" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="mhd">
          <div className="mtitle">{market.title}</div>
          <button className="mclose" onClick={onClose}>✕</button>
        </div>
        <div className="mbody">
          {/* tags */}
          <div className="tags">
            <span className="tag tag-b">{market.cat.charAt(0).toUpperCase()+market.cat.slice(1)}</span>
            <span className="tag tag-g">Encerra {market.deadline}</span>
          </div>

          {/* probabilities */}
          <div>
            <div className="slabel">Probabilidades atuais</div>
            {market.type==="binary"?(
              <div className="prob-binary">
                {[{l:"Sim",p:market.sim,c:"y"},{l:"Nao",p:market.nao,c:"n"}].map(o=>(
                  <div key={o.l} className={`pbox ${o.c}`}>
                    <div className="pbox-l">{o.l}</div>
                    <div className="pbox-v">{o.p}%</div>
                  </div>
                ))}
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {market.opts.map((o,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:12.5,fontWeight:400,width:180,flexShrink:0}}>{o.label}</span>
                    <div style={{flex:1,height:4,background:"var(--border)",borderRadius:2,overflow:"hidden"}}>
                      <div style={{width:`${o.pct}%`,height:"100%",background:"var(--blue)",borderRadius:2}}/>
                    </div>
                    <span style={{fontSize:12.5,fontWeight:600,color:"var(--blue)",width:34,textAlign:"right",flexShrink:0}}>{o.pct}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* bet */}
          <div className="bet-box">
            <div className="slabel">Fazer uma aposta</div>
            {user&&<div className="bet-avail"><div className="cdot"/>Disponivel: <strong>{coins.toLocaleString("pt-BR")} moedas</strong></div>}
            <div className="bet-toggle">
              <button className={`bbt sim${mode==="sim"?" sel":""}`} onClick={()=>{setMode("sim");setBetErr("");}}>
                Sim {market.type==="binary"?`(${market.sim}%)`:""}
              </button>
              <button className={`bbt nao${mode==="nao"?" sel":""}`} onClick={()=>{setMode("nao");setBetErr("");}}>
                Nao {market.type==="binary"?`(${market.nao}%)`:""}
              </button>
            </div>
            <div className="slabel" style={{marginBottom:4}}>Quantidade de moedas</div>
            <input className="bet-inp" type="number" min="1" placeholder="0" value={amount} onChange={e=>{setAmount(e.target.value);setBetErr("");}}/>
            <div className="bet-quick">
              {[10,50,100,500].map(v=><button key={v} className="bq" onClick={()=>setAmount(String(v))}>{v}</button>)}
            </div>
            {potRet&&amt>0&&(
              <div className="bet-ret-row"><span>Retorno potencial</span><span className="bet-ret">~{potRet.toLocaleString("pt-BR")} moedas</span></div>
            )}
            {betErr&&<div className="bet-err">{betErr}</div>}
            {user?(
              <button className={`bet-sub${mode?" "+mode:" none"}`} onClick={doBet}>
                {mode?`Apostar ${amt||0} moedas em ${mode==="sim"?"Sim":"Nao"}`:"Selecione Sim ou Nao"}
              </button>
            ):(
              <div className="bet-login">Faca login para apostar neste mercado.</div>
            )}
          </div>

          {/* resolve */}
          <div className="resolve-box">
            <div className="slabel">Criterio de resolucao</div>
            <p className="resolve-text">{market.resolve}</p>
          </div>

          <Comments marketId={market.id}/>
        </div>
      </div>
    </div>
  );
}

/* ─── MARKET CARD (exact Polymarket clone) ─── */
function MarketCard({market,onOpen,showToast}){
  const {user,toggleSave,isSaved,getUserBet}=useAuth();
  const cfg=CATCFG[market.cat]||CATCFG.politica;
  const sv=isSaved(market.id);
  const bet=getUserBet(market.id);
  const opts=market.type==="binary"?[{label:"Sim",pct:market.sim},{label:"Nao",pct:market.nao}]:market.opts.slice(0,4);

  const handleSave=e=>{
    e.stopPropagation();
    if(!user){showToast("Faca login para salvar mercados.");return;}
    showToast(toggleSave(market.id)?"Mercado salvo.":"Removido dos salvos.");
  };

  return(
    <div className="mcard" onClick={()=>onOpen(market,null)}>
      <div className="mcard-top">
        <div className="mcard-ico" style={{background:cfg.bg,color:cfg.fg}}><cfg.I/></div>
        <div className="mcard-title">{market.title}</div>
      </div>
      <div className="mcard-opts">
        {opts.map((o,i)=>(
          <div className="opt-row" key={i}>
            <span className="opt-name">{o.label}</span>
            <span className="opt-pct">{o.pct}%</span>
            <button className="opt-yes" onClick={e=>{e.stopPropagation();onOpen(market,"sim");}}>Sim</button>
            <button className="opt-no"  onClick={e=>{e.stopPropagation();onOpen(market,"nao");}}>Nao</button>
          </div>
        ))}
      </div>
      <div className="mcard-foot">
        <span className="mcard-vol">Enc. {market.deadline}</span>
        {bet ? (
          <div className="bet-badge">
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3"/></svg>
            {bet.position==="sim"?"Sim":"Nao"} · {bet.amount.toLocaleString("pt-BR")} moedas
          </div>
        ) : <span style={{flex:1}}/>}
        <button className={`mcard-save${sv?" sv":""}`} onClick={handleSave}><Ico.Bookmark f={sv}/></button>
      </div>
    </div>
  );
}

/* ─── LOGIN ─── */
function LoginModal({onClose,onSwitch,showToast}){
  const {login}=useAuth();
  const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [err,setErr]=useState("");
  const go=()=>{setErr("");if(!email||!pass){setErr("Preencha todos os campos.");return;}const e=login(email.trim(),pass);if(e){setErr(e);return;}showToast("Bem-vindo de volta!");onClose();};
  return(
    <div className="bd" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-sm">
        <div className="mhd"><div className="mtitle">Entrar na conta</div><button className="mclose" onClick={onClose}>✕</button></div>
        <div className="mbody">
          <div className="fg"><label className="fl">E-mail</label><input className="fi" type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="fg"><label className="fl">Senha</label><input className="fi" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/></div>
          {err&&<div className="ferr">{err}</div>}
          <button className="fsub" onClick={go}>Entrar</button>
          <div className="fswitch">Nao tem conta? <button onClick={onSwitch}>Cadastrar-se</button></div>
        </div>
      </div>
    </div>
  );
}

/* ─── REGISTER ─── */
function RegisterModal({onClose,onSwitch,showToast}){
  const {register}=useAuth();
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [pass2,setPass2]=useState(""); const [err,setErr]=useState("");
  const go=()=>{
    setErr("");if(!name||!email||!pass||!pass2){setErr("Preencha todos os campos.");return;}
    if(pass!==pass2){setErr("As senhas nao coincidem.");return;}
    if(pass.length<6){setErr("Senha com minimo 6 caracteres.");return;}
    const e=register(name.trim(),email.trim(),pass);if(e){setErr(e);return;}
    showToast("Conta criada! Voce recebeu 1.000 moedas de boas-vindas."); onClose();
  };
  return(
    <div className="bd" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal modal-sm">
        <div className="mhd"><div className="mtitle">Criar conta</div><button className="mclose" onClick={onClose}>✕</button></div>
        <div className="mbody">
          <div className="fg"><label className="fl">Nome completo</label><input className="fi" type="text" placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)}/></div>
          <div className="fg"><label className="fl">E-mail</label><input className="fi" type="email" placeholder="seu@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="fg"><label className="fl">Senha</label><input className="fi" type="password" placeholder="Min. 6 caracteres" value={pass} onChange={e=>setPass(e.target.value)}/></div>
          <div className="fg"><label className="fl">Confirmar senha</label><input className="fi" type="password" placeholder="Repita a senha" value={pass2} onChange={e=>setPass2(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/></div>
          {err&&<div className="ferr">{err}</div>}
          <button className="fsub" onClick={go}>Criar conta</button>
          <div className="fswitch">Ja tem conta? <button onClick={onSwitch}>Fazer login</button></div>
        </div>
      </div>
    </div>
  );
}

/* ─── HEADER ─── */
function Header({page,setPage,onLogin,onRegister,showToast}){
  const {user,coins,logout}=useAuth();
  return(
    <header className="hd">
      <div className="hd-in">
        <button className="logo-btn" onClick={()=>setPage("markets")}><Logo/></button>
        <nav className="hd-nav">
          {[{id:"markets",l:"Mercados"},{id:"ranking",l:"Ranking"}].map(n=>(
            <button key={n.id} className={`nav-btn${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>{n.l}</button>
          ))}
        </nav>
        <div className="hd-right">
          <button style={{width:32,height:32,borderRadius:"var(--r-sm)",border:"1.5px solid var(--border2)",background:"var(--white)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)"}} onClick={()=>showToast("Busca em breve.")}>
            <Ico.Search/>
          </button>
          {user?(
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <div className="coins-chip"><div className="cdot"/>{coins.toLocaleString("pt-BR")} moedas</div>
              <button className="user-pill" onClick={()=>setPage("profile")}>
                <div className="av-sm">{user.avatar?<img src={user.avatar} alt=""/>:initials(user.name)}</div>
                <span style={{fontSize:12.5,fontWeight:500}}>{user.name.split(" ")[0]}</span>
              </button>
              <button className="btn-ghost" onClick={()=>{logout();showToast("Ate logo!");}}>Sair</button>
            </div>
          ):(
            <><button className="btn-ghost" onClick={onLogin}>Login</button><button className="btn-blue" onClick={onRegister}>Cadastrar-se</button></>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─── CAT BAR ─── */
const CATS=[
  {id:"todos",l:"Em Alta",icon:<Ico.Trend/>},
  {id:"politica",l:"Politica"},{id:"eleicoes",l:"Eleicoes"},
  {id:"esportes",l:"Esportes"},{id:"economia",l:"Economia"},
  {id:"tecnologia",l:"Tecnologia"},{id:"entretenimento",l:"Entretenimento"},{id:"crypto",l:"Crypto"},
];
function CatBar({active,setActive}){
  return(
    <div className="cat-bar"><div className="cat-in">
      {CATS.map(c=><button key={c.id} className={`cat-pill${active===c.id?" active":""}`} onClick={()=>setActive(c.id)}>{c.icon&&c.icon}{c.l}</button>)}
    </div></div>
  );
}

/* ─── PAGE: MARKETS ─── */
function MarketsPage({showToast}){
  const [cat,setCat]=useState("todos");
  const [open,setOpen]=useState(null);
  const featured=MARKETS.find(m=>m.featured);
  const filtered=MARKETS.filter(m=>!m.featured&&(cat==="todos"||m.cat===cat));

  // Featured also as card
  const featuredAsCard = (cat==="todos"||cat===featured?.cat) && featured;

  return(
    <>
      <CatBar active={cat} setActive={setCat}/>
      <div className="page">
        {/* featured card — same design as normal cards but full-width */}
        {featuredAsCard&&(
          <div style={{marginBottom:10}}>
            <div className="sec-hd"><div className="sec-title">Destaque</div></div>
            <div className="mcard" style={{maxWidth:"100%",position:"relative"}} onClick={()=>setOpen({market:featured,mode:null})}>
              <div className="mcard-top">
                <div className="mcard-ico" style={{background:CATCFG.politica.bg,color:CATCFG.politica.fg,width:42,height:42,borderRadius:10}}><Ico.Building/></div>
                <div className="mcard-title" style={{fontSize:14,fontWeight:600}}>{featured.title}</div>
              </div>
              <div className="mcard-opts">
                {featured.opts.map((o,i)=>(
                  <div className="opt-row" key={i}>
                    <span className="opt-name">{o.label}</span>
                    <span className="opt-pct">{o.pct}%</span>
                    <button className="opt-yes" onClick={e=>{e.stopPropagation();setOpen({market:featured,mode:"sim"});}}>Sim</button>
                    <button className="opt-no"  onClick={e=>{e.stopPropagation();setOpen({market:featured,mode:"nao"});}}>Nao</button>
                  </div>
                ))}
              </div>
              <div className="mcard-foot">
                <span className="mcard-vol">Enc. {featured.deadline}</span>
              </div>
            </div>
          </div>
        )}

        <div className="sec-hd">
          <div className="sec-title">Em Alta</div>
          <button className="sec-link">Ver todos</button>
        </div>

        {filtered.length===0?(
          <div className="empty">
            <div className="empty-ico"><Ico.Chart/></div>
            <div className="empty-t">Nenhum mercado nesta categoria</div>
            <div className="empty-s">Novos mercados sao adicionados frequentemente.</div>
          </div>
        ):(
          <div className="grid">
            {filtered.map(m=><MarketCard key={m.id} market={m} onOpen={(mkt,mode)=>setOpen({market:mkt,mode})} showToast={showToast}/>)}
          </div>
        )}
      </div>
      {open&&<MarketModal market={open.market} initMode={open.mode} onClose={()=>setOpen(null)} showToast={showToast}/>}
    </>
  );
}

/* ─── PAGE: RANKING ─── */
function RankingPage(){
  const [period,setPeriod]=useState("7d");
  return(
    <div className="page">
      <div className="page-title-row">
        <div><div className="page-title">Ranking</div><div className="page-sub">Os melhores traders da plataforma</div></div>
      </div>
      <div className="filter-row">
        {[["7d","7 dias"],["30d","30 dias"],["all","Todos os tempos"]].map(([id,l])=>(
          <button key={id} className={`fbtn${period===id?" active":""}`} onClick={()=>setPeriod(id)}>{l}</button>
        ))}
      </div>
      <div className="ibanner"><Ico.Info/> O ranking sera populado automaticamente conforme os usuarios operem.</div>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead><tr><th style={{width:44}}>#</th><th>Trader</th><th>Apostas</th><th>Taxa de acerto</th><th style={{textAlign:"right"}}>Moedas ganhas</th></tr></thead>
          <tbody>
            <tr><td colSpan={5}><div className="empty" style={{padding:"36px 0"}}>
              <div className="empty-t">Nenhum trader registrado ainda</div>
              <div className="empty-s">Faca a primeira aposta e apareca no ranking.</div>
            </div></td></tr>
          </tbody>
        </table>
      </div>
      <div className="rank-info-grid">
        {[
          {I:Ico.Chart,t:"Moedas ganhas",s:"Saldo liquido de todas as posicoes encerradas no periodo."},
          {I:Ico.Vote,t:"Taxa de acerto",s:"Percentual de apostas vencedoras sobre o total resolvido."},
          {I:Ico.Activity,t:"Atualizacao",s:"O ranking e atualizado em tempo real conforme mercados sao resolvidos."},
        ].map((c,i)=>(
          <div className="ri-card" key={i}>
            <div style={{color:"var(--blue)",marginBottom:7}}><c.I/></div>
            <div className="ri-title">{c.t}</div>
            <div className="ri-text">{c.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAGE: PROFILE ─── */
function ProfilePage({setPage,showToast}){
  const {user,coins,updateProfile,logout}=useAuth();
  const fRef=useRef(null);
  const [name,setName]=useState(user?.name||"");
  const [email,setEmail]=useState(user?.email||"");
  const [bio,setBio]=useState(user?.bio||"");
  const [avatar,setAvatar]=useState(user?.avatar||null);
  const [done,setDone]=useState(false);

  if(!user) return(
    <div className="page"><div className="empty">
      <div className="empty-ico"><Ico.Building/></div>
      <div className="empty-t">Voce nao esta logado</div>
      <div className="empty-s">Faca login para acessar seu perfil.</div>
      <button className="btn-blue" onClick={()=>showToast("Use o botao Login no topo.")}>Fazer login</button>
    </div></div>
  );

  const handlePhoto=e=>{
    const f=e.target.files[0];if(!f)return;
    if(f.size>2*1024*1024){showToast("Max 2MB.");return;}
    const r=new FileReader();r.onload=ev=>setAvatar(ev.target.result);r.readAsDataURL(f);
  };

  const save=()=>{
    if(!name.trim()){showToast("Nome nao pode ser vazio.");return;}
    updateProfile({name:name.trim(),email:email.trim(),bio:bio.trim(),avatar});
    setDone(true);showToast("Perfil atualizado!");setTimeout(()=>setDone(false),2000);
  };

  return(
    <div className="page">
      <div className="page-title-row">
        <div><div className="page-title">Meu Perfil</div><div className="page-sub">Gerencie suas informacoes</div></div>
        <button className="btn-ghost" onClick={()=>{logout();setPage("markets");showToast("Ate logo!");}}>Sair da conta</button>
      </div>
      <div className="pg">
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div className="pcard">
            <div className="av-lg">{avatar?<img src={avatar} alt=""/>:initials(user.name)}</div>
            <div className="pname">{user.name}</div>
            <div className="pemail">{user.email}</div>
            <input ref={fRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto}/>
            <button className="upload-btn" onClick={()=>fRef.current?.click()}>Alterar foto</button>
            {avatar&&<button style={{fontSize:11.5,background:"none",border:"none",color:"var(--red)",fontWeight:600}} onClick={()=>setAvatar(null)}>Remover foto</button>}
            <div className="pcoins"><div className="cdot"/><span>{coins.toLocaleString("pt-BR")} moedas</span></div>
            <div style={{fontSize:11,color:"var(--text3)",borderTop:"1px solid var(--border)",paddingTop:9,width:"100%",textAlign:"center"}}>
              Membro desde {new Date(user.joinedAt).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div className="fcard">
            <div className="fcard-title">Informacoes pessoais</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div className="frow2">
                <div className="fg"><label className="fl">Nome completo</label><input className="fi" type="text" value={name} onChange={e=>setName(e.target.value)}/></div>
                <div className="fg"><label className="fl">E-mail</label><input className="fi" type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
              </div>
              <div className="fg"><label className="fl">Bio</label><textarea className="fi" placeholder="Conte um pouco sobre voce..." value={bio} onChange={e=>setBio(e.target.value)}/></div>
              <div style={{display:"flex",justifyContent:"flex-end"}}><button className="fsave" onClick={save}>{done?"Salvo!":"Salvar alteracoes"}</button></div>
            </div>
          </div>
          <div className="fcard">
            <div className="fcard-title">Seguranca</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div className="fg"><label className="fl">Nova senha</label><input className="fi" type="password" placeholder="Deixe em branco para nao alterar"/></div>
              <div className="fg"><label className="fl">Confirmar nova senha</label><input className="fi" type="password" placeholder="Repita a nova senha"/></div>
              <div style={{display:"flex",justifyContent:"flex-end"}}><button className="fsave" onClick={()=>showToast("Em breve.")}>Alterar senha</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ROOT ─── */
export default function App(){
  const {msg,show:showToast}=useToast();
  const [page,setPage]=useState("markets");
  const [modal,setModal]=useState(null);

  useEffect(()=>{
    const s=document.createElement("style");s.textContent=CSS;document.head.appendChild(s);
    return()=>document.head.removeChild(s);
  },[]);

  useEffect(()=>{
    const esc=e=>{if(e.key==="Escape")setModal(null);};
    document.addEventListener("keydown",esc);return()=>document.removeEventListener("keydown",esc);
  },[]);

  return(
    <AuthProvider>
      <Header page={page} setPage={setPage} onLogin={()=>setModal("login")} onRegister={()=>setModal("register")} showToast={showToast}/>
      {page==="markets"&&<MarketsPage showToast={showToast}/>}
      {page==="ranking"&&<RankingPage/>}
      {page==="profile"&&<ProfilePage setPage={setPage} showToast={showToast}/>}
      {modal==="login"   &&<LoginModal    onClose={()=>setModal(null)} onSwitch={()=>setModal("register")} showToast={showToast}/>}
      {modal==="register"&&<RegisterModal onClose={()=>setModal(null)} onSwitch={()=>setModal("login")}    showToast={showToast}/>}
      {msg&&<div className="toast">{msg}</div>}
    </AuthProvider>
  );
}
