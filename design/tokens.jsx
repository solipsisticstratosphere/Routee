// Routee design tokens
// Dark-first, electric mint primary, vivid orange secondary

const Tok = {
  // ── color
  color: {
    bg:        '#0A0E1A',  // deep navy
    surface:   '#141826',  // cards
    elevated:  '#1E2436',  // raised
    line:      '#222a3d',  // hairline
    line2:     '#2a3349',
    mint:      '#00E5A0',
    mintDeep:  '#00B07B',
    mintGlow:  'rgba(0,229,160,0.16)',
    orange:    '#FF6B35',
    orangeDeep:'#D24E1F',
    orangeGlow:'rgba(255,107,53,0.16)',
    text:      '#FFFFFF',
    text2:     '#8B92A5',
    text3:     '#4A5168',
    amber:     '#FFB020',
    red:       '#FF4757',
    green:     '#00E5A0',
    // map palette
    mapBase:   '#0d1322',
    mapLand:   '#101626',
    mapRoad:   '#1d2438',
    mapRoadHi: '#2a334d',
    mapWater:  '#0a1428',
    mapPark:   '#142a22',
    mapBldg:   '#161c2e',
  },

  // ── type scale (px)
  fs: { d1: 28, d2: 24, h1: 20, h2: 17, body: 15, sm: 13, xs: 11 },

  // ── font stacks
  font: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body:    '"DM Sans", system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
  },

  // ── radii
  r:  { xs: 6, sm: 10, md: 14, lg: 20, xl: 28, full: 9999 },

  // ── spacing
  sp: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40 },

  // ── shadows
  shadow: {
    card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px rgba(0,0,0,0.3)',
    pop:  '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
    glow: '0 0 0 4px rgba(0,229,160,0.12), 0 8px 28px rgba(0,229,160,0.28)',
  },
};

// Text presets ---------------------------------------------------------------
const T = {
  display: { fontFamily: Tok.font.display, fontSize: 28, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.1 },
  h1:      { fontFamily: Tok.font.display, fontSize: 24, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.15 },
  h2:      { fontFamily: Tok.font.display, fontSize: 20, fontWeight: 600, letterSpacing: -0.3, lineHeight: 1.2 },
  h3:      { fontFamily: Tok.font.display, fontSize: 17, fontWeight: 600, letterSpacing: -0.2, lineHeight: 1.25 },
  body:    { fontFamily: Tok.font.body, fontSize: 15, fontWeight: 400, lineHeight: 1.4 },
  bodyB:   { fontFamily: Tok.font.body, fontSize: 15, fontWeight: 600, lineHeight: 1.4 },
  sm:      { fontFamily: Tok.font.body, fontSize: 13, fontWeight: 500, lineHeight: 1.3 },
  xs:      { fontFamily: Tok.font.body, fontSize: 11, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0.4, textTransform: 'uppercase' },
  mono:    { fontFamily: Tok.font.mono, fontSize: 14, fontWeight: 500, letterSpacing: -0.3 },
  monoBig: { fontFamily: Tok.font.mono, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 },
};

Object.assign(window, { Tok, T });
