/* ==========================================================================
   مكتبة الرسوم التوضيحية — لوحة SVG مخصّصة لكل درس
   كل رسم مركّب من: عنصر رئيسي يعبّر عن موضوع الدرس + عنصران فرعيان
   الألوان تُشتق تلقائياً من لون الوحدة عبر currentColor + المتغير --h
   ========================================================================== */
window.ART = (function () {
  'use strict';

  /* ---------- مكتبة العناصر (نطاق الرسم ±26 حول المركز) ---------- */
  var S = {
    cert: '<circle cx="0" cy="2" r="15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-10 -8 -5 -18M10 -8 5 -18" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-6 2l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.2"/>',
    badge: '<rect x="-18" y="-14" width="36" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 7 0 -7 8 7M-4 1h8" fill="none" stroke="currentColor" stroke-width="1.9"/><path d="M12 2v6M9 5h6" stroke="currentColor" stroke-width="1.6"/>',
    book: '<path d="M-17 -11h13a3 3 0 0 1 3 3v19h-16z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-1 -11h13a3 3 0 0 1 3 3v19H-1z" fill="none" stroke="currentColor" stroke-width="2"/>',
    clock: '<circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -8v8l6 3" fill="none" stroke="currentColor" stroke-width="2"/>',

    case: '<rect x="-18" y="-24" width="36" height="48" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="-7" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="0" cy="-7" r="3" fill="currentColor" opacity=".4"/><rect x="-11" y="8" width="22" height="5" rx="2" fill="currentColor" opacity=".5"/>',
    formfactor: '<rect x="-24" y="-22" width="17" height="44" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-3" y="-16" width="13" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="-10" width="10" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>',
    psu: '<rect x="-20" y="-16" width="40" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="-7" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M-7 -5v10M-12 0h10" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="-8" width="7" height="16" rx="1" fill="currentColor" opacity=".45"/>',
    cable: '<path d="M-16 -10c8 0 8 12 16 12" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-22" y="-14" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/><rect x="14" y="6" width="8" height="8" rx="1.5" fill="currentColor" opacity=".6"/>',
    fan: '<circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3.5" fill="currentColor" opacity=".6"/><path d="M0 -3.5V-13M3.5 0H13M0 3.5V13M-3.5 0H-13" stroke="currentColor" stroke-width="1.9"/>',

    safety: '<path d="M0 -19 18 14H-18z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -8v9" stroke="currentColor" stroke-width="2.4"/><circle cx="0" cy="8" r="1.7" fill="currentColor"/>',
    goggles: '<rect x="-18" y="-6" width="36" height="14" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-18 -2h-6M18 -2h6" stroke="currentColor" stroke-width="2"/><circle cx="-8" cy="1" r="4" fill="currentColor" opacity=".35"/><circle cx="8" cy="1" r="4" fill="currentColor" opacity=".35"/>',

    board: '<rect x="-22" y="-16" width="44" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-16" y="-10" width="12" height="12" rx="1" fill="currentColor" opacity=".45"/><rect x="1" y="-10" width="15" height="4" rx="1" fill="currentColor" opacity=".3"/><rect x="1" y="-3" width="15" height="4" rx="1" fill="currentColor" opacity=".3"/><rect x="1" y="4" width="15" height="4" rx="1" fill="currentColor" opacity=".3"/>',
    board2: '<rect x="-22" y="-16" width="44" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-18" y="-10" width="36" height="5" rx="1" fill="currentColor" opacity=".45"/><rect x="-18" y="-2" width="36" height="5" rx="1" fill="currentColor" opacity=".45"/><rect x="-18" y="6" width="24" height="5" rx="1" fill="currentColor" opacity=".45"/>',
    chip: '<rect x="-12" y="-12" width="24" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-5" y="-5" width="10" height="10" rx="1" fill="currentColor" opacity=".45"/><path d="M-6 -12v-6M6 -12v-6M-6 12v6M6 12v6M-12 -6h-6M-12 6h-6M12 -6h6M12 6h6" stroke="currentColor" stroke-width="1.8"/>',
    slot: '<rect x="-20" y="-5" width="40" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-14 0h28" stroke="currentColor" stroke-width="1.6" opacity=".5"/>',
    bios: '<rect x="-20" y="-16" width="40" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-15" y="-10" width="11" height="11" rx="1" fill="currentColor" opacity=".5"/><path d="M0 -8h15M0 -2h15M0 4h10" stroke="currentColor" stroke-width="1.8" opacity=".6"/>',
    screen: '<rect x="-20" y="-14" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-7 14h14M0 14v4" stroke="currentColor" stroke-width="2"/>',

    cpu: '<rect x="-14" y="-14" width="28" height="28" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-6" y="-6" width="12" height="12" rx="1" fill="currentColor" opacity=".4"/><path d="M-9 -14v-7M0 -14v-7M9 -14v-7M-9 14v7M0 14v7M9 14v7M-14 -9h-7M-14 0h-7M-14 9h-7M14 -9h7M14 0h7M14 9h7" stroke="currentColor" stroke-width="1.7"/>',
    ram: '<rect x="-22" y="-9" width="44" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-16" y="-4" width="8" height="8" rx="1" fill="currentColor" opacity=".4"/><rect x="-5" y="-4" width="8" height="8" rx="1" fill="currentColor" opacity=".4"/><rect x="6" y="-4" width="8" height="8" rx="1" fill="currentColor" opacity=".4"/><path d="M-12 9v4M12 9v4" stroke="currentColor" stroke-width="1.6"/>',

    hdd: '<rect x="-20" y="-14" width="40" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="-2" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="8" cy="-2" r="2" fill="currentColor" opacity=".5"/><rect x="-15" y="4" width="14" height="4" rx="1" fill="currentColor" opacity=".4"/>',
    ssd: '<rect x="-20" y="-11" width="40" height="22" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-14" y="-6" width="20" height="12" rx="1" fill="currentColor" opacity=".35"/><path d="M10 -3h4M10 1h4M10 5h4" stroke="currentColor" stroke-width="1.6"/>',
    storage: '<rect x="-20" y="-17" width="40" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-20" y="4" width="40" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="-11" cy="-10" r="3" fill="currentColor" opacity=".5"/><circle cx="-11" cy="11" r="3" fill="currentColor" opacity=".5"/>',
    disk: '<ellipse cx="0" cy="-8" rx="20" ry="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-20 -8v10c0 3.9 9 7 20 7s20-3.1 20-7v-10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-20 2c0 3.9 9 7 20 7s20-3.1 20-7" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55"/><path d="M-7 -13v18M7 -13v18" stroke="currentColor" stroke-width="1.4" opacity=".4"/>',
    raid: '<rect x="-21" y="-18" width="12" height="34" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-5" y="-18" width="12" height="34" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="11" y="-18" width="12" height="34" rx="2" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><path d="M-18 -8h6M-18 0h6M-18 8h6M-2 -8h6M-2 0h6M-2 8h6" stroke="currentColor" stroke-width="1.5"/>',
    fs: '<path d="M-18 -14h7l3 4h8v6h-18z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-18 -4h18v18h-18z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-12 3h12M-12 9h8" stroke="currentColor" stroke-width="1.6" opacity=".6"/>',
    folder: '<path d="M-19 -10h8l3 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-19a2 2 0 0 1-2-2v-18a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2"/>',
    optimize: '<path d="M15 -7a15 15 0 1 1-6-12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 -19v8h8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-5 -2l6 6 10-12" fill="none" stroke="currentColor" stroke-width="2.2"/>',

    install: '<rect x="-20" y="-17" width="38" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-12 9h10" stroke="currentColor" stroke-width="2"/><rect x="2" y="6" width="11" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 6V2h5v4" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    usb: '<rect x="-6" y="-13" width="12" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-3 -13v10h6v-10" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="0" cy="5" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M0 -13v-6" stroke="currentColor" stroke-width="2"/>',
    setup: '<rect x="-20" y="-15" width="40" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-20 -7h40" stroke="currentColor" stroke-width="2"/><circle cx="-13" cy="-11" r="1.6" fill="currentColor"/><circle cx="-7" cy="-11" r="1.6" fill="currentColor"/><rect x="-14" y="0" width="12" height="6" rx="2" fill="currentColor" opacity=".45"/><rect x="2" y="0" width="14" height="6" rx="2" fill="currentColor" opacity=".25"/>',
    win10: '<rect x="-16" y="-16" width="14" height="14" rx="1.5" fill="currentColor" opacity=".9"/><rect x="2" y="-16" width="14" height="14" rx="1.5" fill="currentColor" opacity=".6"/><rect x="-16" y="2" width="14" height="14" rx="1.5" fill="currentColor" opacity=".6"/><rect x="2" y="2" width="14" height="14" rx="1.5" fill="currentColor" opacity=".9"/>',
    window: '<rect x="-20" y="-14" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-20 -5h40" stroke="currentColor" stroke-width="2"/>',
    cmd: '<rect x="-20" y="-14" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-14 -4l5 4-5 4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-6 4h14" stroke="currentColor" stroke-width="2"/>',
    prompt: '<path d="M-16 -4l6 5-6 5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M-6 6h18" stroke="currentColor" stroke-width="2.2"/>',
    perf: '<path d="M-18 14h36" stroke="currentColor" stroke-width="2"/><rect x="-15" y="4" width="8" height="10" rx="1" fill="currentColor" opacity=".4"/><rect x="-4" y="-4" width="8" height="18" rx="1" fill="currentColor" opacity=".6"/><rect x="7" y="-14" width="8" height="28" rx="1" fill="currentColor" opacity=".85"/>',
    tasks: '<path d="M-17 -12h6M-17 0h6M-17 12h6" stroke="currentColor" stroke-width="1.8" opacity=".35"/><path d="M-5 -12l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-5 0l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-5 10h14" stroke="currentColor" stroke-width="2" opacity=".6"/>',

    protect: '<path d="M0 -19 16 -13v10c0 8-7 14-16 18-9-4-16-10-16-18v-10z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -6v8l5 3" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    shield: '<path d="M0 -19 16 -13v10c0 8-7 14-16 18-9-4-16-10-16-18v-10z" fill="none" stroke="currentColor" stroke-width="2"/>',
    restore: '<path d="M-14 4a14 14 0 1 0 5-12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-9 -8v8h8" fill="none" stroke="currentColor" stroke-width="2"/>',
    method: '<rect x="-23" y="-17" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-5" y="-17" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="-17" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" opacity=".45"/><circle cx="0" cy="6" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-3 3a3 3 0 1 1 3 3v2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    warn: '<circle cx="0" cy="0" r="16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -7v8" stroke="currentColor" stroke-width="2.4"/><circle cx="0" cy="7" r="1.7" fill="currentColor"/>',
    check: '<path d="M-13 0l7 8 16-18" fill="none" stroke="currentColor" stroke-width="2.6"/>',
    app: '<rect x="-18" y="-16" width="36" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-18 -8h36" stroke="currentColor" stroke-width="2"/><path d="M-8 -2l16 16M8 -2l-16 16" stroke="currentColor" stroke-width="2.2"/>',
    boot: '<rect x="-20" y="-17" width="40" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 9h16" stroke="currentColor" stroke-width="2"/><path d="M0 -9v10" stroke="currentColor" stroke-width="2"/><path d="M0 -9l-4 4M0 -9l4 4" fill="none" stroke="currentColor" stroke-width="2"/>',
    repair: '<path d="M-15 -15a10 10 0 0 0 14 14l10-10-6-6-10 10a10 10 0 0 1-8-8z" fill="none" stroke="currentColor" stroke-width="2"/>',
    bsod: '<rect x="-20" y="-14" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="-7" cy="-4" r="2.2" fill="currentColor"/><circle cx="7" cy="-4" r="2.2" fill="currentColor"/><path d="M-8 7a8 8 0 0 0 16 0" fill="none" stroke="currentColor" stroke-width="2"/>',

    io: '<rect x="-23" y="2" width="30" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-17 9h18" stroke="currentColor" stroke-width="1.6" opacity=".55"/><rect x="9" y="-15" width="13" height="19" rx="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 -15v7" stroke="currentColor" stroke-width="1.6"/>',
    keyboard: '<rect x="-20" y="-8" width="40" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-14 0h28M-14 5h20" stroke="currentColor" stroke-width="1.5" opacity=".55"/>',
    mouse: '<rect x="-9" y="-15" width="18" height="30" rx="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -15v9" stroke="currentColor" stroke-width="1.8"/>',
    video: '<rect x="-22" y="-16" width="34" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-5 10h10" stroke="currentColor" stroke-width="2"/><path d="M12 -5h9v11h-9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.5 -5v11" stroke="currentColor" stroke-width="1.4" opacity=".5"/>',
    monitor: '<rect x="-20" y="-16" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 12h16M0 12v5" stroke="currentColor" stroke-width="2"/>',
    gpu: '<rect x="-22" y="-12" width="44" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="-10" cy="0" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="0" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="-19" y="12" width="38" height="4" rx="1" fill="currentColor" opacity=".35"/>',

    netintro: '<circle cx="-9" cy="-2" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="3" cy="-6" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="13" cy="0" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-17 6h34" stroke="currentColor" stroke-width="2"/><rect x="-14" y="10" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="-2" y="10" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><rect x="10" y="10" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    cloud: '<circle cx="-9" cy="-1" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="3" cy="-6" r="11" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="1" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-17 7h34" stroke="currentColor" stroke-width="2"/>',
    ip: '<rect x="-23" y="-6" width="11" height="12" rx="2" fill="currentColor" opacity=".8"/><rect x="-8" y="-6" width="11" height="12" rx="2" fill="currentColor" opacity=".6"/><rect x="7" y="-6" width="11" height="12" rx="2" fill="currentColor" opacity=".4"/><circle cx="-5.5" cy="0" r="1.6" fill="currentColor"/><circle cx="9.5" cy="0" r="1.6" fill="currentColor"/>',
    subnet: '<rect x="-20" y="-17" width="40" height="34" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -17v34M-20 0h40" stroke="currentColor" stroke-width="1.8" opacity=".5"/><rect x="-18" y="-15" width="15" height="13" rx="1" fill="currentColor" opacity=".35"/>',
    proto: '<rect x="-18" y="-17" width="36" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-18" y="-5" width="36" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="2" opacity=".7"/><rect x="-18" y="7" width="36" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="2" opacity=".45"/>',
    ipconfig: '<rect x="-20" y="-17" width="40" height="34" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-14 -9h10M-14 -1h10M-14 7h10" stroke="currentColor" stroke-width="1.7" opacity=".45"/><rect x="5" y="-11" width="11" height="7" rx="1" fill="currentColor" opacity=".55"/><rect x="5" y="-1" width="11" height="7" rx="1" fill="currentColor" opacity=".4"/><rect x="5" y="9" width="11" height="7" rx="1" fill="currentColor" opacity=".3"/>',
    dns: '<rect x="-21" y="-12" width="16" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-17 -6h8M-17 0h8M-17 6h8" stroke="currentColor" stroke-width="1.5" opacity=".5"/><path d="M-1 0h17" stroke="currentColor" stroke-width="2"/><path d="M16 0l-6-4M16 0l-6 4" fill="none" stroke="currentColor" stroke-width="2"/>',
    server: '<rect x="-16" y="-18" width="32" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-16" y="-3" width="32" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-16" y="12" width="32" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><circle cx="-9" cy="-12" r="1.6" fill="currentColor"/><circle cx="-9" cy="3" r="1.6" fill="currentColor"/>',
    router: '<rect x="-19" y="-4" width="38" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-12 -4v-14M12 -4v-14" stroke="currentColor" stroke-width="2"/><path d="M-12 -18l4-4M12 -18l-4-4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="-6" cy="6" r="1.8" fill="currentColor" opacity=".7"/><circle cx="2" cy="6" r="1.8" fill="currentColor" opacity=".7"/>',
    antenna: '<path d="M0 15V-8" stroke="currentColor" stroke-width="2"/><path d="M-8 -8h16" stroke="currentColor" stroke-width="2"/><path d="M-5 -14a10 10 0 0 1 10 0M-9 -4a16 16 0 0 1 18 0" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".6"/>',
    switch: '<rect x="-22" y="-10" width="44" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-18" y="-5" width="7" height="10" rx="1" fill="currentColor" opacity=".5"/><rect x="-8" y="-5" width="7" height="10" rx="1" fill="currentColor" opacity=".5"/><rect x="2" y="-5" width="7" height="10" rx="1" fill="currentColor" opacity=".5"/><rect x="12" y="-5" width="7" height="10" rx="1" fill="currentColor" opacity=".5"/>',
    port: '<rect x="-16" y="-7" width="32" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-10 0h20" stroke="currentColor" stroke-width="1.7" opacity=".5"/>',
    ap: '<rect x="-14" y="1" width="28" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="8" r="2.5" fill="currentColor" opacity=".6"/><path d="M-10 -3a14 14 0 0 1 20 0M-6 -10a9 9 0 0 1 12 0" fill="none" stroke="currentColor" stroke-width="2"/>',
    wifi: '<path d="M-15 -3a21 21 0 0 1 30 0M-10 4a14 14 0 0 1 20 0M-5 11a7 7 0 0 1 10 0" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="15" r="2.2" fill="currentColor"/>',
    rj45: '<rect x="-12" y="-17" width="24" height="22" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 -11v9M-3 -11v9M3 -11v9M8 -11v9" stroke="currentColor" stroke-width="1.5" opacity=".55"/><path d="M-7 5h14v10h-14z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 15v6" stroke="currentColor" stroke-width="2"/>',
    sharefolder: '<path d="M-21 -8h8l3 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-19a2 2 0 0 1-2-2v-18a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="8" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 0v16M1 8h16" stroke="currentColor" stroke-width="1.5" opacity=".55"/>',
    shareprinter: '<rect x="-22" y="-11" width="26" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-16 -11v-4h14v4" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="-16" y="7" width="14" height="9" rx="1" fill="currentColor" opacity=".4"/><circle cx="11" cy="2" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 -7v18M2 2h18" stroke="currentColor" stroke-width="1.5" opacity=".5"/>',
    sharedrive: '<rect x="-23" y="-7" width="24" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="-15" cy="0" r="3" fill="currentColor" opacity=".5"/><circle cx="10" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10 -9v18M1 0h18" stroke="currentColor" stroke-width="1.5" opacity=".5"/>',
    vpn: '<rect x="-22" y="-10" width="44" height="20" rx="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 -10v20M8 -10v20" stroke="currentColor" stroke-width="1.6" opacity=".45"/><rect x="-15" y="-4" width="10" height="8" rx="2" fill="currentColor" opacity=".55"/><path d="M9 0h9" stroke="currentColor" stroke-width="2"/><path d="M18 0l-5-4M18 0l-5 4" fill="none" stroke="currentColor" stroke-width="2"/>',

    printer: '<rect x="-18" y="-12" width="36" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-12 -12v-5h20v5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="-12" y="8" width="24" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-6" y="-6" width="12" height="8" rx="1" fill="currentColor" opacity=".4"/>',
    toner: '<rect x="-17" y="-10" width="34" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-10" y="-4" width="20" height="8" rx="2" fill="currentColor" opacity=".45"/><path d="M-17 -4h-6M17 -4h6" stroke="currentColor" stroke-width="1.8"/>',
    paper: '<path d="M-13 -18h18l8 8v20a2 2 0 0 1-2 2h-24a2 2 0 0 1-2-2v-26a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 -18v8h8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M-7 -2h16M-7 4h16M-7 10h10" stroke="currentColor" stroke-width="1.5" opacity=".55"/>',
    tool: '<path d="M-14 14l15-15" stroke="currentColor" stroke-width="2.4"/><rect x="1" y="-19" width="8" height="7" rx="1" fill="currentColor" opacity=".6"/><path d="M-19 9l5 5-5 5-5-5z" fill="currentColor" opacity=".5"/>',
    gear: '<circle cx="0" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="0" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M0 -14v-4M0 14v4M-14 0h-4M14 0h4M-10 -10l-3-3M10 10l3 3M10 -10l3-3M-10 10l-3 3" stroke="currentColor" stroke-width="2"/>',
    drop: '<path d="M0 -16c6 8 10 12 10 17a10 10 0 0 1-20 0c0-5 4-9 10-17z" fill="none" stroke="currentColor" stroke-width="2"/>',

    lock: '<rect x="-13" y="-2" width="26" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 -2v-6a8 8 0 0 1 16 0v6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="8" r="2.6" fill="currentColor" opacity=".6"/>',
    key: '<circle cx="-9" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-1 0h19M14 0v6M18 0v5" stroke="currentColor" stroke-width="2"/>',
    encrypt: '<rect x="-18" y="-12" width="36" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M0 -12v24M-18 0h36" stroke="currentColor" stroke-width="1.5" opacity=".4"/><circle cx="0" cy="0" r="5" fill="currentColor" opacity=".55"/>',
    firewall: '<rect x="-20" y="-9" width="40" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-20 -1h8M-4 -1h8M12 -1h8M-20 7h8M-4 7h8M12 7h8" stroke="currentColor" stroke-width="1.6"/><path d="M-8 -17c4 4 4 8 0 12M8 -17c-4 4-4 8 0 12" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".55"/>',
    user: '<circle cx="0" cy="-8" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-13 14c0-7 6-11 13-11s13 4 13 11" fill="none" stroke="currentColor" stroke-width="2"/>',
    malware: '<circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-10 -10l-6-6M10 -10l6-6M-10 10l-6 6M10 10l6 6M0 -14v-6M0 14v6M-14 0h-6M14 0h6" stroke="currentColor" stroke-width="1.8"/><circle cx="-3" cy="-2" r="1.6" fill="currentColor"/><circle cx="4" cy="-2" r="1.6" fill="currentColor"/><path d="M-4 5a5 5 0 0 0 8 0" fill="none" stroke="currentColor" stroke-width="1.6"/>',

    linux: '<rect x="-20" y="-14" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-14 -5l5 4-5 4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-6 3h16" stroke="currentColor" stroke-width="2"/>',
    linuxdesk: '<rect x="-20" y="-17" width="40" height="28" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-8 11h16M0 11v4" stroke="currentColor" stroke-width="2"/><path d="M-12 -7l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M-5 -1h11" stroke="currentColor" stroke-width="1.8"/>',
    calc: '<rect x="-14" y="-18" width="28" height="36" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><rect x="-10" y="-14" width="20" height="8" rx="1" fill="currentColor" opacity=".35"/><circle cx="-7" cy="1" r="2" fill="currentColor" opacity=".7"/><circle cx="0" cy="1" r="2" fill="currentColor" opacity=".7"/><circle cx="7" cy="1" r="2" fill="currentColor" opacity=".7"/><circle cx="-7" cy="9" r="2" fill="currentColor" opacity=".7"/><circle cx="0" cy="9" r="2" fill="currentColor" opacity=".7"/><circle cx="7" cy="9" r="2" fill="currentColor" opacity=".7"/>'
  };

  /* ---------- خريطة الدروس: [رئيسي، فرعي 1، فرعي 2] ---------- */
  var MAP = {
    /* وحدة 1 — المقدمة والشهادة */
    zIpF33NCgrA: ['cert', 'badge', 'book'],
    '3ewpchhw3nA': ['badge', 'cert', 'clock'],
    /* وحدة 2 — العتاد ومزود الطاقة */
    HCdzduik1ZE: ['case', 'cpu', 'ram'],
    GQFeSgssCAo: ['formfactor', 'case', 'board'],
    A9rExIbfyzs: ['psu', 'cable', 'fan'],
    /* وحدة 3 — السلامة واللوحة الأم والبيوس */
    '3ff7XXnZET0': ['safety', 'goggles', 'warn'],
    '5I2HMPNanTo': ['board', 'chip', 'slot'],
    '7psnHQXElyk': ['board2', 'board', 'port'],
    uUmFTIJ4sBk: ['bios', 'chip', 'screen'],
    /* وحدة 4 — المعالج والذاكرة والتخزين */
    HiMjKMOjAzA: ['cpu', 'fan', 'chip'],
    'hKDtYu-FUbY': ['ram', 'board', 'chip'],
    z4yqa1vBRAc: ['storage', 'hdd', 'ssd'],
    zkMLzPCXLRo: ['disk', 'storage', 'fs'],
    WYKNyiqGLlc: ['raid', 'disk', 'storage'],
    '2gUwqcZk3JE': ['fs', 'folder', 'disk'],
    QKHaVQNrJqA: ['optimize', 'disk', 'perf'],
    /* وحدة 5 — تثبيت وإدارة ويندوز */
    U_PSPVcCYi0: ['install', 'usb', 'screen'],
    dfZNx5xD644: ['setup', 'install', 'win10'],
    '-hzDwesStq0': ['win10', 'window', 'folder'],
    hcGn3zKwm98: ['cmd', 'prompt', 'keyboard'],
    PFLg12OBlwc: ['perf', 'win10', 'optimize'],
    m_JIvFFghJg: ['tasks', 'perf', 'win10'],
    lP0byYKhbi0: ['protect', 'shield', 'restore'],
    /* وحدة 6 — استكشاف الأخطاء */
    Fx4aSN3sjKI: ['method', 'warn', 'check'],
    '53VvXupXASw': ['app', 'method', 'warn'],
    KNIzw0HftVg: ['boot', 'win10', 'warn'],
    QoVopdv0qds: ['repair', 'boot', 'cmd'],
    bFgnUfr8Izg: ['bsod', 'warn', 'repair'],
    /* وحدة 7 — الإدخال والإخراج والفيديو */
    Qna640T0fNE: ['io', 'keyboard', 'mouse'],
    'Gornp-tO0uA': ['video', 'monitor', 'cable'],
    qIXqS421Meg: ['gpu', 'video', 'fan'],
    /* وحدة 8 — الشبكات */
    PsjE96NTb7k: ['netintro', 'cloud', 'router'],
    P4kf3adHxa0: ['ip', 'subnet', 'netintro'],
    oVv12se6BmM: ['subnet', 'ip', 'calc'],
    'pAZcxzC2K-E': ['proto', 'ip', 'netintro'],
    CU6RW6D6jKQ: ['ipconfig', 'ip', 'cmd'],
    Kg7rF5jnbV8: ['dns', 'server', 'ip'],
    'Y_w1-dqax_c': ['router', 'antenna', 'netintro'],
    '7IVz45CH3zk': ['switch', 'port', 'cable'],
    Wey5FAfnzhw: ['ap', 'wifi', 'antenna'],
    SGxVl_sA3G8: ['rj45', 'cable', 'port'],
    qxDnPx8ZZ98: ['sharefolder', 'folder', 'netintro'],
    EePTbL7aTJA: ['shareprinter', 'printer', 'netintro'],
    y21QBUx53I0: ['sharedrive', 'storage', 'netintro'],
    M89n0wOOIPM: ['vpn', 'lock', 'cloud'],
    qMYz5Y8ibRI: ['cloud', 'server', 'vpn'],
    /* وحدة 9 — الطابعات */
    K6QLJAqRFi0: ['printer', 'tool', 'paper'],
    LUmT3LVEzvI: ['toner', 'printer', 'drop'],
    'gBst-BB830w': ['paper', 'printer', 'gear'],
    /* وحدة 10 — الأمن */
    'D36k-l6zO0g': ['lock', 'shield', 'key'],
    jMnWP77Vu4I: ['firewall', 'lock', 'shield'],
    '0q2mFeS1oos': ['key', 'lock', 'encrypt'],
    jfNlOOqAON4: ['user', 'lock', 'key'],
    '1jDekrHOMWg': ['malware', 'shield', 'warn'],
    /* وحدة 11 — لينكس */
    'bFGU-D67zH4': ['linux', 'prompt', 'cmd'],
    EBLBBpbwbzo: ['linuxdesk', 'linux', 'folder']
  };

  /* ---------- بناء اللوحة ---------- */
  function scene(id, fallbackIcon) {
    var t = MAP[id];
    if (!t) { return '<span class="ct-ico"><svg viewBox="0 0 24 24" width="30" height="30"><use href="#i-' + (fallbackIcon || 'book') + '"/></svg></span>'; }
    var main = S[t[0]] || S.book, a = S[t[1]] || S.chip, b = S[t[2]] || S.chip;
    return '<svg class="art" viewBox="0 0 220 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
             '<circle cx="198" cy="8" r="36" fill="currentColor" opacity=".10"/>' +
             '<circle cx="20" cy="94" r="30" fill="currentColor" opacity=".08"/>' +
             '<g transform="translate(110,45)">' + main + '</g>' +
             '<g transform="translate(38,70) scale(.42)" opacity=".5">' + a + '</g>' +
             '<g transform="translate(182,70) scale(.42)" opacity=".5">' + b + '</g>' +
           '</svg>';
  }

  return { svg: scene };
})();
