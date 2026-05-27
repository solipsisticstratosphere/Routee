// SYSTEM REFERENCE — tokens, type scale, components catalog
// Two tall artboards: tokens overview, component catalog

function S_Tokens() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'auto', padding: '60px 20px 60px' }}>
      <div style={{ paddingTop: 12 }}>
        <Logo size={48}/>
        <div style={{ ...T.display, fontSize: 30, marginTop: 14 }}>Routee</div>
        <div style={{ ...T.body, color: Tok.color.text2, marginTop: 4 }}>Design system · v1.0</div>
      </div>

      {/* color palette */}
      <SectionTitle>Color</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Swatch name="Background" hex="#0A0E1A" c={Tok.color.bg}/>
        <Swatch name="Surface" hex="#141826" c={Tok.color.surface}/>
        <Swatch name="Elevated" hex="#1E2436" c={Tok.color.elevated}/>
        <Swatch name="Line" hex="#222a3d" c={Tok.color.line}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
        <Swatch name="Primary · Mint" hex="#00E5A0" c={Tok.color.mint} dark/>
        <Swatch name="Secondary · Orange" hex="#FF6B35" c={Tok.color.orange} dark/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 8 }}>
        <Swatch sm name="Amber" hex="#FFB020" c={Tok.color.amber} dark/>
        <Swatch sm name="Red" hex="#FF4757" c={Tok.color.red}/>
        <Swatch sm name="Green" hex="#00E5A0" c={Tok.color.mint} dark/>
      </div>

      {/* type scale */}
      <SectionTitle>Type</SectionTitle>
      <Card style={{ padding: 16 }}>
        <div style={{ ...T.display, lineHeight: 1.1 }}>Routee · 28px</div>
        <div style={{ ...T.h1, marginTop: 10 }}>Heading 1 · 24px</div>
        <div style={{ ...T.h2, marginTop: 8 }}>Heading 2 · 20px</div>
        <div style={{ ...T.h3, marginTop: 8 }}>Heading 3 · 17px</div>
        <div style={{ ...T.body, marginTop: 10, color: Tok.color.text2 }}>Body / DM Sans · 15px</div>
        <div style={{ ...T.sm, marginTop: 6, color: Tok.color.text2 }}>Small · 13px</div>
        <div style={{ ...T.xs, marginTop: 8, color: Tok.color.text2 }}>EYEBROW · 11PX</div>
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid ' + Tok.color.line }}>
          <div style={{ ...T.monoBig, color: Tok.color.mint }}>$148.20</div>
          <div style={{ ...T.mono, color: Tok.color.text2, marginTop: 4 }}>JetBrains Mono · prices, codes, distances</div>
        </div>
      </Card>

      {/* radii + spacing */}
      <SectionTitle>Radius & spacing</SectionTitle>
      <Card style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          {[6, 10, 14, 20, 28].map(r => (
            <div key={r} style={{ textAlign: 'center' }}>
              <div style={{ width: 50, height: 50, background: Tok.color.elevated, borderRadius: r }}/>
              <div style={{ ...T.xs, color: Tok.color.text2, marginTop: 6 }}>R{r}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          {[4, 8, 12, 16, 20, 24, 32].map(s => (
            <div key={s} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ height: 8, background: Tok.color.mint, borderRadius: 4, width: s + 'px', margin: '0 auto' }}/>
              <div style={{ ...T.xs, color: Tok.color.text2, marginTop: 6 }}>{s}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ ...T.xs, color: Tok.color.text2, marginTop: 24, marginBottom: 10 }}>{children}</div>
  );
}

function Swatch({ name, hex, c, sm, dark }) {
  return (
    <div style={{
      background: c, borderRadius: 14, padding: 12,
      height: sm ? 60 : 86,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      color: dark ? '#02110B' : '#fff',
    }}>
      <div style={{ ...T.bodyB, fontSize: 13 }}>{name}</div>
      <div style={{ ...T.mono, fontSize: 11, opacity: 0.75 }}>{hex}</div>
    </div>
  );
}

function S_Components() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'auto', padding: '60px 20px 60px' }}>
      <div style={{ paddingTop: 12 }}>
        <div style={{ ...T.h1 }}>Components</div>
        <div style={{ ...T.body, color: Tok.color.text2, marginTop: 4 }}>Building blocks</div>
      </div>

      <SectionTitle>Buttons</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <CTA color="mint"><span>Primary · Mint</span></CTA>
        <CTA color="orange"><span>Secondary · Orange</span></CTA>
        <CTA color="surf" secondary>Secondary outline</CTA>
        <CTA color="surf" disabled>Disabled</CTA>
      </div>

      <SectionTitle>Status pills</SectionTitle>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <StatusPill color="mint" label="Online"/>
        <StatusPill color="orange" label="New order"/>
        <StatusPill color="amber" label="Pending"/>
        <StatusPill color="red" label="Cancelled" glow={false}/>
      </div>

      <SectionTitle>Map pins</SectionTitle>
      <Card style={{ padding: 0, overflow: 'hidden', height: 160 }}>
        <svg width="100%" height="160" viewBox="0 0 320 160">
          <rect width="320" height="160" fill={Tok.color.mapLand}/>
          <Pin x={70} y={80} color={Tok.color.mint} label="A"/>
          <Pin x={170} y={80} color={Tok.color.orange} label="B"/>
          <DriverPin x={250} y={80} pulse/>
        </svg>
      </Card>

      <SectionTitle>Vehicle selector</SectionTitle>
      <div style={{ display: 'flex', gap: 8 }}>
        <VehicleCard icon={<Icon.bike c={Tok.color.text}/>} name="Bike" eta="8 min" price="$6.40"/>
        <VehicleCard icon={<Icon.car c={Tok.color.mint}/>} name="Car" eta="5 min" price="$12.20" active/>
        <VehicleCard icon={<Icon.van c={Tok.color.text}/>} name="Van" eta="9 min" price="$22.80"/>
      </div>

      <SectionTitle>Tip selector</SectionTitle>
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 10, 15, 20].map((p, i) => (
          <div key={p} style={{
            flex: 1, height: 50, borderRadius: 14,
            background: i === 2 ? Tok.color.mint : Tok.color.elevated,
            color: i === 2 ? '#02110B' : Tok.color.text,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: i === 2 ? 'none' : 'inset 0 0 0 1px ' + Tok.color.line,
            ...T.bodyB, fontSize: 15,
          }}>{p}%</div>
        ))}
      </div>

      <SectionTitle>QR frame</SectionTitle>
      <Card style={{ padding: 16 }}>
        <div style={{ width: 130, height: 130, margin: '0 auto', position: 'relative' }}>
          {[
            { t: 0, l: 0, brd: 'tl' },
            { t: 0, r: 0, brd: 'tr' },
            { b: 0, l: 0, brd: 'bl' },
            { b: 0, r: 0, brd: 'br' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: p.t, bottom: p.b, left: p.l, right: p.r,
              width: 24, height: 24,
              borderTop: (p.t === 0) ? `3px solid ${Tok.color.mint}` : 'none',
              borderLeft: (p.l === 0) ? `3px solid ${Tok.color.mint}` : 'none',
              borderBottom: (p.b === 0) ? `3px solid ${Tok.color.mint}` : 'none',
              borderRight: (p.r === 0) ? `3px solid ${Tok.color.mint}` : 'none',
              borderRadius: 6,
            }}/>
          ))}
        </div>
      </Card>

      <SectionTitle>Avatars</SectionTitle>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Avatar name="Maya Chen" size={56}/>
        <Avatar name="Diego R." size={48} color={Tok.color.orange}/>
        <Avatar name="Sam K." size={40}/>
        <Avatar name="Lin H." size={32}/>
      </div>

      <SectionTitle>Inputs</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input dot={Tok.color.mint} value="Office · Mission St"/>
        <Input dot={Tok.color.orange} value="Trader Joe's · 555 9th"/>
        <Input icon={<Icon.search c={Tok.color.text2}/>} placeholder="Where to?"/>
      </div>
    </div>
  );
}

Object.assign(window, { S_Tokens, S_Components, Swatch, SectionTitle });
