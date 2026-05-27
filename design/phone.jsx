// Phone frame — dark, simple, sized 390x844 (logical) with bezel
// Custom-built to match Routee's aesthetic, not generic iOS chrome.

const PHONE_W = 390;
const PHONE_H = 844;
const FRAME_PAD = 6;   // bezel thickness

function StatusBar({ time = '9:41', dark = true, transparent = false, tint }) {
  const c = tint || (dark ? '#fff' : '#000');
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      height: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px 0',
      background: transparent ? 'transparent' : undefined,
      pointerEvents: 'none',
    }}>
      <div style={{ fontFamily: Tok.font.body, fontWeight: 700, fontSize: 15, color: c, letterSpacing: -0.2 }}>{time}</div>
      <div style={{ width: 110, height: 30 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: c }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill={c}>
          <rect x="0"   y="6" width="3" height="5" rx="1"/>
          <rect x="4.5" y="4" width="3" height="7" rx="1"/>
          <rect x="9"   y="2" width="3" height="9" rx="1"/>
          <rect x="13.5" y="0" width="3" height="11" rx="1"/>
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke={c} strokeWidth="1.4">
          <path d="M7 9.5c.4 0 .7-.3.7-.7s-.3-.7-.7-.7-.7.3-.7.7.3.7.7.7Z" fill={c} stroke="none"/>
          <path d="M3.6 6.1a4.8 4.8 0 0 1 6.8 0M1 3.6a8.4 8.4 0 0 1 12 0" strokeLinecap="round"/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity=".5" fill="none"/>
          <rect x="2"   y="2"   width="17" height="7"  rx="1.5" fill={c}/>
          <path d="M22 3.5v4c.7-.2 1.3-.9 1.3-2s-.6-1.8-1.3-2Z" fill={c} fillOpacity=".5"/>
        </svg>
      </div>
    </div>
  );
}

function DynamicIsland({ light = false }) {
  return (
    <div style={{
      position: 'absolute',
      top: 11, left: '50%', transform: 'translateX(-50%)',
      width: 122, height: 35, borderRadius: 22,
      background: '#000',
      zIndex: 51,
      boxShadow: light ? '0 0 0 1px rgba(255,255,255,0.06)' : 'none',
    }} />
  );
}

function HomeIndicator({ dark = true }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 34, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center', paddingBottom: 9,
      pointerEvents: 'none', zIndex: 60,
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 100,
        background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.4)',
      }} />
    </div>
  );
}

// Outer phone frame — fixed 390x844 inside a ~6px bezel
function Phone({ children, bg = Tok.color.bg, statusTint, time = '9:41', showStatusBar = true, showHome = true }) {
  return (
    <div style={{
      width: PHONE_W + FRAME_PAD * 2,
      height: PHONE_H + FRAME_PAD * 2,
      borderRadius: 54,
      padding: FRAME_PAD,
      background: 'linear-gradient(180deg, #1d2333 0%, #0c0f1a 100%)',
      boxShadow:
        '0 30px 80px rgba(0,0,0,0.55),' +
        '0 0 0 1px rgba(255,255,255,0.05),' +
        'inset 0 0 0 1px rgba(255,255,255,0.04)',
      position: 'relative',
    }}>
      <div style={{
        width: PHONE_W, height: PHONE_H,
        borderRadius: 48, overflow: 'hidden',
        background: bg, position: 'relative',
        fontFamily: Tok.font.body,
        color: Tok.color.text,
      }}>
        {showStatusBar && <StatusBar time={time} tint={statusTint} />}
        <DynamicIsland />
        {children}
        {showHome && <HomeIndicator dark />}
      </div>
    </div>
  );
}

Object.assign(window, { Phone, StatusBar, DynamicIsland, HomeIndicator, PHONE_W, PHONE_H, FRAME_PAD });
