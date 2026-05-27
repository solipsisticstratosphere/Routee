// Routee shared components
// Icons, buttons, bottom sheet, status pill, vehicle selector, QR frame,
// online toggle, earnings chart, tip selector, etc.

// ── Icons (single-source line set) ──────────────────────────────────────────
const Icon = {
  arrow: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 9h12M11 5l4 4-4 4"/></svg>,
  chev:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 14 14" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 3l4 4-4 4"/></svg>,
  back:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 9H3M7 5L3 9l4 4"/></svg>,
  close: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="2" strokeLinecap="round" {...p}><path d="M4 4l10 10M14 4L4 14"/></svg>,
  search:(p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><circle cx="8" cy="8" r="5"/><path d="M12 12l3 3"/></svg>,
  pin:   (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinejoin="round" {...p}><path d="M9 16s5-4.5 5-9a5 5 0 0 0-10 0c0 4.5 5 9 5 9Z"/><circle cx="9" cy="7" r="2"/></svg>,
  clock: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><circle cx="9" cy="9" r="7"/><path d="M9 5v4l3 2"/></svg>,
  star:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 14 14" fill={p.c||'currentColor'} {...p}><path d="M7 1l1.8 3.7 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L1 5.3l4-.6L7 1z"/></svg>,
  phone: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M15 12.5v2a1.5 1.5 0 0 1-1.6 1.5A12 12 0 0 1 2 4.6 1.5 1.5 0 0 1 3.5 3h2a1.5 1.5 0 0 1 1.5 1.3l.3 2a1.5 1.5 0 0 1-.4 1.4L5.6 9.1a11 11 0 0 0 4.3 4.3l1.4-1.3a1.5 1.5 0 0 1 1.4-.4l2 .3a1.5 1.5 0 0 1 1.3 1.5Z"/></svg>,
  chat:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M16 9.5a6.5 6.5 0 0 1-9.4 5.8l-3.6 1 1-3.4A6.5 6.5 0 1 1 16 9.5Z"/></svg>,
  card:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" {...p}><rect x="2" y="4" width="14" height="10" rx="2"/><path d="M2 7.5h14"/></svg>,
  check: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 9.5l3.5 3.5L14 5.5"/></svg>,
  user:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" {...p}><circle cx="9" cy="6" r="3"/><path d="M3 16c0-3 2.7-5 6-5s6 2 6 5"/></svg>,
  home:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinejoin="round" {...p}><path d="M3 8l6-5 6 5v7a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1V8Z"/></svg>,
  list:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M5 5h10M5 9h10M5 13h10"/></svg>,
  wallet:(p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" {...p}><rect x="2" y="4" width="14" height="11" rx="2"/><path d="M12 9.5h3"/></svg>,
  zap:   (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill={p.c||'currentColor'} {...p}><path d="M10 1L3 10h4l-1 7 8-10h-5z"/></svg>,
  qr:    (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" {...p}><rect x="2" y="2" width="5" height="5"/><rect x="11" y="2" width="5" height="5"/><rect x="2" y="11" width="5" height="5"/><path d="M11 11h2v2M16 16v-3M11 16h2"/></svg>,
  scan:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M2 6V4a2 2 0 0 1 2-2h2M16 6V4a2 2 0 0 0-2-2h-2M2 12v2a2 2 0 0 0 2 2h2M16 12v2a2 2 0 0 1-2 2h-2"/></svg>,
  car:   (p) => <svg width={p.s||22} height={p.s||22} viewBox="0 0 22 22" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M3 13l1.5-4a2 2 0 0 1 2-1.5h9a2 2 0 0 1 2 1.5L19 13v3a1 1 0 0 1-1 1h-2v-2H6v2H4a1 1 0 0 1-1-1v-3Z"/><circle cx="6.5" cy="14" r="1.2"/><circle cx="15.5" cy="14" r="1.2"/></svg>,
  bike:  (p) => <svg width={p.s||22} height={p.s||22} viewBox="0 0 22 22" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.5" strokeLinejoin="round" {...p}><circle cx="5" cy="15" r="3.5"/><circle cx="17" cy="15" r="3.5"/><path d="M5 15l4-7h5l3 7M9 8l1-2h2"/></svg>,
  van:   (p) => <svg width={p.s||22} height={p.s||22} viewBox="0 0 22 22" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.5" strokeLinejoin="round" {...p}><path d="M2 16V7h11l5 4v5h-1.5M2 16h1.5M9 16h6.5"/><circle cx="5" cy="16.5" r="1.8"/><circle cx="16" cy="16.5" r="1.8"/></svg>,
  power: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M9 2v7M5.5 4.5a5 5 0 1 0 7 0"/></svg>,
  bell:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" strokeLinejoin="round" {...p}><path d="M5 13V8a4 4 0 0 1 8 0v5M3 13h12M8 16h2"/></svg>,
  plus:  (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="2" strokeLinecap="round" {...p}><path d="M9 4v10M4 9h10"/></svg>,
  set:   (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" strokeLinejoin="round" {...p}><circle cx="9" cy="9" r="2.5"/><path d="M9 1.5v2M9 14.5v2M14 9h2M2 9h2M13 5l1.5-1.5M3.5 14.5L5 13M13 13l1.5 1.5M3.5 3.5L5 5"/></svg>,
  loc:   (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" {...p}><circle cx="9" cy="9" r="2"/><circle cx="9" cy="9" r="6"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2"/></svg>,
  trend: (p) => <svg width={p.s||18} height={p.s||18} viewBox="0 0 18 18" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" {...p}><path d="M2 13l4-4 3 3 6-7M11 5h4v4"/></svg>,
  swap:  (p) => <svg width={p.s||14} height={p.s||14} viewBox="0 0 14 14" fill="none" stroke={p.c||'currentColor'} strokeWidth="1.6" strokeLinecap="round" {...p}><path d="M4 3v8m0 0l-2-2m2 2l2-2M10 11V3m0 0L8 5m2-2l2 2"/></svg>,
};

// ── Primary CTA button ──────────────────────────────────────────────────────
function CTA({ children, color = 'mint', onClick, disabled, secondary, full = true, size = 'lg', style = {} }) {
  const palette = {
    mint:   { bg: Tok.color.mint, fg: '#02110B' },
    orange: { bg: Tok.color.orange, fg: '#1A0700' },
    white:  { bg: '#fff', fg: '#000' },
    surf:   { bg: Tok.color.elevated, fg: '#fff' },
    danger: { bg: Tok.color.red, fg: '#fff' },
  };
  const p = palette[color] || palette.mint;
  const h = size === 'sm' ? 40 : size === 'md' ? 48 : 56;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 8,
      height: h, width: full ? '100%' : undefined, padding: '0 20px',
      borderRadius: 16, border: 'none',
      background: secondary ? 'transparent' : p.bg,
      color: secondary ? Tok.color.text : p.fg,
      boxShadow: secondary ? `inset 0 0 0 1.5px ${Tok.color.line2}` : 'none',
      fontFamily: Tok.font.body, fontSize: 16, fontWeight: 700,
      letterSpacing: -0.2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'transform .15s, opacity .15s',
      ...style,
    }}
    onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
    onMouseUp={e => (e.currentTarget.style.transform = '')}
    onMouseLeave={e => (e.currentTarget.style.transform = '')}
    >{children}</button>
  );
}

// ── Status pill ─────────────────────────────────────────────────────────────
function StatusPill({ color = 'mint', label, glow = true, style = {} }) {
  const c = Tok.color[color] || color;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 10px',
      background: glow ? `${c}22` : Tok.color.elevated,
      border: `1px solid ${c}55`,
      borderRadius: 999,
      fontFamily: Tok.font.body, fontWeight: 600, fontSize: 12,
      color: c, letterSpacing: 0.2,
      ...style,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: 999, background: c,
        boxShadow: glow ? `0 0 0 4px ${c}33` : 'none',
        animation: glow ? 'rt-blink 1.6s ease-in-out infinite' : 'none',
      }} />
      {label}
      <style>{`@keyframes rt-blink { 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}

// ── Bottom sheet shell ──────────────────────────────────────────────────────
function Sheet({ children, top = 480, style = {} }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      top: top, background: Tok.color.surface,
      borderRadius: '24px 24px 0 0',
      boxShadow: '0 -10px 30px rgba(0,0,0,0.4), 0 -1px 0 rgba(255,255,255,0.04) inset',
      zIndex: 10, overflow: 'hidden',
      ...style,
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <div style={{ width: 38, height: 4, borderRadius: 4, background: Tok.color.line2 }} />
      </div>
      {children}
    </div>
  );
}

// ── Avatar (initials, deterministic) ────────────────────────────────────────
function Avatar({ name, size = 40, color, src }) {
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['#00E5A0', '#FF6B35', '#FFB020', '#7c5cff', '#22b8cf'];
  const hash = (name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const bg = color || palette[hash % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: src ? 'none' : `linear-gradient(135deg, ${bg}, ${bg}cc)`,
      backgroundImage: src ? `url(${src})` : undefined,
      backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: Tok.font.display, fontWeight: 700, fontSize: size * 0.36,
      color: '#0a0e1a', flexShrink: 0,
      boxShadow: '0 0 0 2px rgba(255,255,255,0.06)',
    }}>
      {!src && initials}
    </div>
  );
}

// ── Input ───────────────────────────────────────────────────────────────────
function Input({ icon, value, placeholder, suffix, dot, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      height: 52, padding: '0 16px',
      background: Tok.color.elevated, borderRadius: 14,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      ...style,
    }}>
      {dot && <div style={{ width: 9, height: 9, borderRadius: '50%', background: dot, flexShrink: 0 }} />}
      {icon && <div style={{ color: Tok.color.text2, display: 'flex' }}>{icon}</div>}
      <div style={{
        flex: 1, fontFamily: Tok.font.body, fontSize: 15, fontWeight: 500,
        color: value ? Tok.color.text : Tok.color.text2,
        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>{value || placeholder}</div>
      {suffix && <div style={{ color: Tok.color.text2 }}>{suffix}</div>}
    </div>
  );
}

// ── Card ────────────────────────────────────────────────────────────────────
function Card({ children, style = {}, elevated, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: elevated ? Tok.color.elevated : Tok.color.surface,
      borderRadius: 18,
      padding: 16,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      ...style,
    }}>{children}</div>
  );
}

// ── Tab bar (bottom nav) ────────────────────────────────────────────────────
function TabBar({ tabs, active, accent = Tok.color.mint }) {
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 24,
      height: 64, background: 'rgba(20,24,38,0.92)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderRadius: 22, padding: 6,
      display: 'flex', alignItems: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)',
      zIndex: 40,
    }}>
      {tabs.map((t, i) => {
        const on = i === active;
        return (
          <div key={i} style={{
            flex: 1, height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 3, borderRadius: 16,
            background: on ? `${accent}1A` : 'transparent',
            color: on ? accent : Tok.color.text2,
            transition: 'background .2s, color .2s',
          }}>
            <div style={{ display: 'flex' }}>{t.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}>{t.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Numeric keypad / dial pill button ───────────────────────────────────────
function IconBtn({ children, onClick, color = Tok.color.elevated, fg = Tok.color.text, size = 44, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: fg, border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      cursor: 'pointer',
      ...style,
    }}>{children}</button>
  );
}

Object.assign(window, {
  Icon, CTA, StatusPill, Sheet, Avatar, Input, Card, TabBar, IconBtn,
});
