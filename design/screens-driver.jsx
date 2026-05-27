// DRIVER SCREENS (6)

// ── 10. Driver Dashboard ───────────────────────────────────────────────────
function D_Dash() {
  const [online, setOnline] = React.useState(true);
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'hidden' }}>
      {/* mini map at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 320, overflow: 'hidden' }}>
        <MapBg width={390} height={320} seed={10}
          drivers={[{ x: 0.5, y: 0.5 }]}
          showDriverPulse
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,14,26,0.65) 0%, rgba(10,14,26,0) 40%, ' + Tok.color.bg + ' 100%)',
          pointerEvents: 'none',
        }}/>
      </div>

      {/* top bar */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Diego R." size={42} color={Tok.color.orange}/>
          <div>
            <div style={{ ...T.sm, color: Tok.color.text2 }}>Good afternoon</div>
            <div style={{ ...T.bodyB, fontSize: 15 }}>Diego R.</div>
          </div>
        </div>
        <IconBtn color="rgba(20,24,38,0.95)"><Icon.bell s={16}/></IconBtn>
      </div>

      {/* online toggle */}
      <div style={{ position: 'absolute', top: 154, left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={() => setOnline(!online)} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 22px 12px 16px', borderRadius: 999,
          background: online ? Tok.color.mint : Tok.color.elevated,
          color: online ? '#02110B' : Tok.color.text,
          border: 'none', cursor: 'pointer',
          boxShadow: online
            ? `0 0 0 4px ${Tok.color.mintGlow}, 0 12px 28px rgba(0,229,160,0.4)`
            : 'inset 0 0 0 1px ' + Tok.color.line2,
          fontFamily: Tok.font.body, fontWeight: 700, fontSize: 16,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: online ? '#02110B22' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.power c={online ? '#02110B' : Tok.color.text} s={16}/>
          </div>
          {online ? 'You\'re online' : 'Go online'}
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: online ? '#02110B' : Tok.color.text2,
            animation: online ? 'rt-blink 1.6s infinite' : 'none',
          }}/>
        </button>
      </div>

      {/* earnings card */}
      <div style={{ position: 'absolute', top: 240, left: 16, right: 16 }}>
        <Card elevated style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ ...T.xs, color: Tok.color.text2 }}>TODAY · 7 TRIPS</div>
              <div style={{ ...T.mono, fontSize: 36, fontWeight: 700, marginTop: 6, color: Tok.color.mint }}>$148.20</div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 999,
              background: Tok.color.mintGlow,
              ...T.sm, fontWeight: 600, color: Tok.color.mint,
            }}>
              <Icon.trend c={Tok.color.mint} s={12}/>
              +18%
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Stat label="This week" v="$642"/>
            <Stat label="Hours" v="6h 12m"/>
            <Stat label="Acceptance" v="94%"/>
          </div>
        </Card>
      </div>

      {/* active / next order */}
      <div style={{ position: 'absolute', bottom: 110, left: 16, right: 16 }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <StatusPill color="mint" label="Active order"/>
            <div style={{ flex: 1 }}/>
            <div style={{ ...T.mono, fontSize: 13, color: Tok.color.text2 }}>#R-4829</div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Maya Chen" size={42}/>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyB, fontSize: 15 }}>Maya Chen</div>
              <div style={{ ...T.sm, color: Tok.color.text2 }}>3.4 mi · 12 min · $12.20</div>
            </div>
            <CTA color="mint" full={false} size="sm" style={{ padding: '0 16px' }}>
              <span>Navigate</span> <Icon.arrow c="#02110B" s={14}/>
            </CTA>
          </div>
        </Card>
      </div>

      <TabBar accent={Tok.color.orange} tabs={[
        { icon: <Icon.home/>, label: 'Dashboard' },
        { icon: <Icon.car/>, label: 'Active' },
        { icon: <Icon.wallet/>, label: 'Earnings' },
        { icon: <Icon.user/>, label: 'Profile' },
      ]} active={0} />
    </div>
  );
}

function Stat({ label, v }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ ...T.xs, color: Tok.color.text2 }}>{label}</div>
      <div style={{ ...T.bodyB, fontSize: 16, marginTop: 2 }}>{v}</div>
    </div>
  );
}

// ── 11. Incoming Order ─────────────────────────────────────────────────────
function D_Incoming() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'hidden' }}>
      {/* dimmed map */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <MapBg width={390} height={844} seed={11}
          pickup={{ x: 0.3, y: 0.3 }}
          dropoff={{ x: 0.7, y: 0.5 }}
          showRoute showPins routeAnimated={false}
        />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(10,14,26,0.92) 60%, ' + Tok.color.bg + ' 100%)',
      }}/>

      {/* header */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusPill color="orange" label="NEW ORDER"/>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>SLIDE TO DECLINE</div>
      </div>

      {/* incoming card */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 24,
        background: Tok.color.surface, borderRadius: 26,
        padding: 22, paddingTop: 28,
        boxShadow: '0 -20px 60px rgba(255,107,53,0.18), inset 0 0 0 1px ' + Tok.color.line + ', inset 0 0 0 2px rgba(255,107,53,0.4)',
        animation: 'rt-slidein 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <style>{`@keyframes rt-slidein { from { transform: translateY(40px); opacity: 0 } }`}</style>

        {/* countdown ring + payout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <CountdownRing seconds={8} total={10}/>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.xs, color: Tok.color.text2 }}>PAYOUT</div>
            <div style={{ ...T.monoBig, fontSize: 32, color: Tok.color.mint }}>$14.80</div>
            <div style={{ ...T.sm, color: Tok.color.text2 }}>5.2 mi · 18 min · Car</div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 999,
            background: Tok.color.orangeGlow, color: Tok.color.orange,
            ...T.xs,
          }}>SURGE 1.4×</div>
        </div>

        {/* pickup / dropoff */}
        <div style={{ marginTop: 18, padding: '14px 14px', background: Tok.color.elevated, borderRadius: 14 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ paddingTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: Tok.color.mint }}/>
              <div style={{ width: 2, height: 32, background: Tok.color.line2 }}/>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: Tok.color.orange }}/>
            </div>
            <div style={{ flex: 1 }}>
              <div>
                <div style={{ ...T.xs, color: Tok.color.text2 }}>PICKUP · 4 MIN AWAY</div>
                <div style={{ ...T.body, fontSize: 14, marginTop: 2 }}>Office Tower · 482 Mission St</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ ...T.xs, color: Tok.color.text2 }}>DROPOFF</div>
                <div style={{ ...T.body, fontSize: 14, marginTop: 2 }}>Trader Joe's · 555 9th St</div>
              </div>
            </div>
          </div>
        </div>

        {/* accept / decline */}
        <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
          <CTA color="surf" secondary>Decline</CTA>
          <div style={{ position: 'relative', flex: 1 }}>
            <CTA color="mint">
              <span>Accept</span>
            </CTA>
            {/* countdown ring overlay on accept */}
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: 'absolute', right: 6, top: 0 }}>
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(2,17,11,0.18)" strokeWidth="3"/>
              <circle cx="28" cy="28" r="22" fill="none" stroke="#02110B" strokeWidth="3"
                strokeDasharray="138" strokeDashoffset="55" transform="rotate(-90 28 28)" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountdownRing({ seconds, total }) {
  const r = 26;
  const C = 2 * Math.PI * r;
  const off = C * (1 - seconds / total);
  return (
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke={Tok.color.elevated} strokeWidth="4"/>
        <circle cx="32" cy="32" r={r} fill="none" stroke={Tok.color.orange} strokeWidth="4"
          strokeDasharray={C} strokeDashoffset={off}
          strokeLinecap="round" transform="rotate(-90 32 32)"
          style={{ filter: 'drop-shadow(0 0 6px ' + Tok.color.orange + ')' }}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...T.monoBig, fontSize: 22, color: Tok.color.text,
      }}>{seconds}</div>
    </div>
  );
}

// ── 12. Navigation to Pickup ───────────────────────────────────────────────
function D_NavPickup() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.mapBase, overflow: 'hidden' }}>
      <MapBg seed={12}
        pickup={{ x: 0.6, y: 0.4 }}
        dropoff={{ x: 0.85, y: 0.55 }}
        showRoute showPins routeAnimated={false}
        drivers={[{ x: 0.2, y: 0.55, bearing: 60 }]}
      />

      {/* turn-by-turn instruction bar */}
      <div style={{ position: 'absolute', top: 50, left: 12, right: 12 }}>
        <div style={{
          background: 'linear-gradient(180deg, #1c2747 0%, #131a30 100%)',
          borderRadius: 20, padding: 16,
          boxShadow: '0 14px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <IconBtn color="rgba(255,255,255,0.06)" size={36}><Icon.back s={14}/></IconBtn>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: Tok.color.mintGlow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={Tok.color.mint} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
              <path d="M16 26V10M16 10l-6 6M16 10l6 6"/>
              <path d="M16 26h-6" opacity="0.4"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.mono, fontSize: 28, color: Tok.color.text, lineHeight: 1 }}>800<span style={{ fontSize: 18, color: Tok.color.text2 }}> ft</span></div>
            <div style={{ ...T.body, fontSize: 14, color: Tok.color.text2, marginTop: 2 }}>Continue on Howard St</div>
          </div>
        </div>

        {/* next turn */}
        <div style={{
          marginTop: 8, marginLeft: 18, marginRight: 18,
          background: 'rgba(20,24,38,0.92)',
          backdropFilter: 'blur(20px)',
          borderRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
          padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
        }}>
          <span style={{ ...T.xs, color: Tok.color.text2 }}>THEN</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={Tok.color.text2} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
            <path d="M5 12V4M5 4L2 7M5 4l3 3"/>
          </svg>
          <span style={{ ...T.sm, color: Tok.color.text2 }}>Right onto 5th St · 0.4 mi</span>
        </div>
      </div>

      {/* speed / ETA pill */}
      <div style={{ position: 'absolute', top: 220, left: 12 }}>
        <div style={{
          padding: '10px 14px', borderRadius: 16,
          background: 'rgba(20,24,38,0.95)',
          boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
        }}>
          <div style={{ ...T.mono, fontSize: 22, fontWeight: 700, color: Tok.color.text }}>32</div>
          <div style={{ ...T.xs, color: Tok.color.text2 }}>MPH</div>
        </div>
      </div>

      {/* bottom action bar */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 24,
        padding: 14, borderRadius: 22,
        background: 'rgba(20,24,38,0.96)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'inset 0 0 0 1px ' + Tok.color.line + ', 0 14px 40px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            ...T.monoBig, fontSize: 28, color: Tok.color.mint,
          }}>4:32</div>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.bodyB, fontSize: 14 }}>Arriving at pickup</div>
            <div style={{ ...T.sm, color: Tok.color.text2 }}>1.2 mi · Maya Chen</div>
          </div>
          <IconBtn size={40} color={Tok.color.mint}><Icon.phone c="#02110B" s={16}/></IconBtn>
        </div>
        <div style={{ marginTop: 12 }}>
          <CTA color="mint"><Icon.check c="#02110B"/><span>I've arrived at pickup</span></CTA>
        </div>
      </div>
    </div>
  );
}

// ── 13. Active Delivery ────────────────────────────────────────────────────
function D_Active() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.mapBase, overflow: 'hidden' }}>
      <MapBg seed={13}
        pickup={{ x: 0.2, y: 0.4 }}
        dropoff={{ x: 0.78, y: 0.62 }}
        showRoute showPins routeAnimated={false}
        drivers={[{ x: 0.42, y: 0.5, bearing: 30 }]}
      />

      {/* top status header */}
      <div style={{ position: 'absolute', top: 56, left: 12, right: 12 }}>
        <div style={{
          background: 'linear-gradient(180deg, rgba(255,107,53,0.16) 0%, rgba(255,107,53,0.04) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 18, padding: 14,
          boxShadow: 'inset 0 0 0 1px rgba(255,107,53,0.3)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: Tok.color.orange,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon.pin c="#1A0700" s={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ ...T.bodyB, fontSize: 14 }}>Heading to dropoff</div>
            <div style={{ ...T.sm, color: Tok.color.text2 }}>Trader Joe's · 555 9th St</div>
          </div>
          <div style={{ ...T.mono, fontSize: 18, color: Tok.color.orange }}>3:42</div>
        </div>
      </div>

      {/* mini turn */}
      <div style={{ position: 'absolute', top: 152, left: 24, right: 24 }}>
        <div style={{
          padding: '10px 14px', borderRadius: 14,
          background: 'rgba(20,24,38,0.95)',
          boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={Tok.color.mint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16V8a2 2 0 0 1 2-2h8M15 6l-3-3M15 6l-3 3"/>
          </svg>
          <div style={{ ...T.body, fontSize: 14, flex: 1 }}>Turn right onto 9th St</div>
          <div style={{ ...T.mono, fontSize: 13, color: Tok.color.text2 }}>0.3 mi</div>
        </div>
      </div>

      {/* bottom: collapsed order + complete CTA */}
      <Sheet top={580}>
        <div style={{ padding: '14px 18px 0' }}>
          {/* customer row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Maya Chen" size={42}/>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyB, fontSize: 14 }}>Maya Chen</div>
              <div style={{ ...T.sm, color: Tok.color.text2 }}>2 items · paid · $14.80</div>
            </div>
            <IconBtn size={38} color={Tok.color.mint}><Icon.phone c="#02110B" s={14}/></IconBtn>
            <IconBtn size={38}><Icon.chat s={14}/></IconBtn>
          </div>

          {/* complete CTA */}
          <div style={{ marginTop: 14 }}>
            <CTA color="orange"><Icon.check c="#1A0700"/><span>Complete delivery</span></CTA>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// ── 14. QR Scan Confirm ────────────────────────────────────────────────────
function D_Scan() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      {/* fake camera view (dark gradient + faint shapes) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 45%, #1a1f2e 0%, #050810 70%)',
      }}>
        <svg width="390" height="844" viewBox="0 0 390 844" style={{ opacity: 0.25 }}>
          <rect x="80" y="200" width="230" height="320" rx="8" fill="#fff" opacity="0.04"/>
          <path d="M 100 280 L 290 280 L 290 290 L 100 290 Z M 100 320 L 240 320 L 240 326 L 100 326 Z M 100 360 L 280 360 L 280 366 L 100 366 Z" fill="#fff" opacity="0.07"/>
          {/* fake qr in center */}
          <g transform="translate(115, 410)">
            <rect width="160" height="160" fill="#fff" opacity="0.5"/>
            <g transform="translate(8, 8)">
              <QRPlaceholder size={144}/>
            </g>
          </g>
        </svg>
      </div>

      {/* top */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconBtn color="rgba(255,255,255,0.08)"><Icon.close c="#fff" s={16}/></IconBtn>
        <div style={{ ...T.bodyB, color: '#fff' }}>Scan to confirm</div>
        <IconBtn color="rgba(255,255,255,0.08)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"><path d="M3 5V3h2M13 5V3h-2M3 11v2h2M13 11v2h-2"/><circle cx="8" cy="8" r="2"/></svg>
        </IconBtn>
      </div>

      {/* viewport frame with corner brackets */}
      <div style={{
        position: 'absolute', top: 240, left: 45, width: 300, height: 300,
      }}>
        {/* corners */}
        {[
          { t: 0, l: 0, r: ['top','left'] },
          { t: 0, r: 0, r2: ['top','right'] },
          { b: 0, l: 0, r3: ['bottom','left'] },
          { b: 0, r: 0, r4: ['bottom','right'] },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: p.t, bottom: p.b, left: p.l, right: p.r,
            width: 40, height: 40,
            borderTop: (p.t === 0) ? `3px solid ${Tok.color.mint}` : 'none',
            borderLeft: (p.l === 0) ? `3px solid ${Tok.color.mint}` : 'none',
            borderBottom: (p.b === 0) ? `3px solid ${Tok.color.mint}` : 'none',
            borderRight: (p.r === 0) ? `3px solid ${Tok.color.mint}` : 'none',
            borderRadius: 8,
          }}/>
        ))}

        {/* scan line */}
        <div style={{
          position: 'absolute', left: 12, right: 12, top: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${Tok.color.mint}, transparent)`,
          boxShadow: `0 0 12px ${Tok.color.mint}`,
          animation: 'rt-scan 2.4s ease-in-out infinite',
        }}/>
        <style>{`@keyframes rt-scan {
          0% { transform: translateY(8px); }
          50% { transform: translateY(280px); }
          100% { transform: translateY(8px); }
        }`}</style>
      </div>

      {/* bottom panel */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 40,
        padding: 18, borderRadius: 22,
        background: 'rgba(10,14,26,0.85)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      }}>
        <div style={{ ...T.bodyB, color: '#fff', textAlign: 'center' }}>Point at customer's QR</div>
        <div style={{ ...T.sm, color: Tok.color.text2, textAlign: 'center', marginTop: 4 }}>Or enter the 6-digit code</div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, justifyContent: 'center' }}>
          {['4', '8', '2', '_', '_', '_'].map((d, i) => (
            <div key={i} style={{
              width: 38, height: 50, borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              ...T.monoBig, fontSize: 22, color: d === '_' ? Tok.color.text3 : '#fff',
            }}>{d === '_' ? '' : d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 15. Earnings Summary ───────────────────────────────────────────────────
function D_Earnings() {
  const [tab, setTab] = React.useState(1);
  // hardcoded weekly bars
  const bars = [42, 88, 60, 110, 74, 148, 120];
  const max = Math.max(...bars);
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '70px 20px 8px' }}>
        <IconBtn><Icon.back s={16}/></IconBtn>
        <div style={{ flex: 1, textAlign: 'center', ...T.bodyB }}>Earnings</div>
        <IconBtn>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={Tok.color.text} strokeWidth="1.6" strokeLinecap="round"><path d="M4 10l4 4 4-4M8 14V2"/></svg>
        </IconBtn>
      </div>

      {/* period toggle */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{
          display: 'flex', padding: 4, borderRadius: 14,
          background: Tok.color.elevated, boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
        }}>
          {['Day', 'Week', 'Month'].map((l, i) => (
            <div key={l} onClick={() => setTab(i)} style={{
              flex: 1, height: 38, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: tab === i ? Tok.color.surface : 'transparent',
              color: tab === i ? Tok.color.text : Tok.color.text2,
              ...T.sm, fontWeight: 600, cursor: 'pointer',
              boxShadow: tab === i ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
            }}>{l}</div>
          ))}
        </div>
      </div>

      {/* big number */}
      <div style={{ padding: '24px 20px 8px', textAlign: 'center' }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>THIS WEEK · MAY 21–27</div>
        <div style={{ ...T.mono, fontSize: 48, fontWeight: 700, color: Tok.color.mint, marginTop: 6, letterSpacing: -1.5 }}>$642.30</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 6 }}>
          <Icon.trend c={Tok.color.mint} s={12}/>
          <span style={{ ...T.sm, color: Tok.color.mint, fontWeight: 600 }}>+22% vs last week</span>
        </div>
      </div>

      {/* chart */}
      <div style={{ padding: '20px' }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ ...T.bodyB, fontSize: 14 }}>Daily breakdown</div>
            <div style={{ ...T.xs, color: Tok.color.text2 }}>USD</div>
          </div>
          <EarningsChart bars={bars} max={max}/>
          <div style={{
            display: 'flex', justifyContent: 'space-around', marginTop: 12,
            ...T.xs, color: Tok.color.text2,
          }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ color: i === 5 ? Tok.color.mint : Tok.color.text2, fontWeight: i === 5 ? 700 : 600 }}>{d}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* completed rides list */}
      <div style={{ padding: '4px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ ...T.xs, color: Tok.color.text2 }}>RECENT TRIPS</div>
          <div style={{ ...T.sm, color: Tok.color.mint }}>See all</div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TripRow time="Today · 14:08" route="Mission → SoMa" amt="$14.80"/>
          <TripRow time="Today · 13:12" route="Marina → Mission" amt="$22.40"/>
          <TripRow time="Today · 11:35" route="Castro → Hayes Valley" amt="$8.90"/>
          <TripRow time="Today · 10:42" route="SoMa → Pacific Hts" amt="$19.20"/>
        </div>
      </div>

      {/* payout CTA */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 30 }}>
        <CTA color="mint"><Icon.wallet c="#02110B"/><span>Cash out $642.30</span><Icon.arrow c="#02110B"/></CTA>
      </div>
    </div>
  );
}

function EarningsChart({ bars, max }) {
  // build an area chart on top of bars
  const W = 280, H = 130;
  const step = W / (bars.length - 1);
  const points = bars.map((v, i) => [i * step, H - (v / max) * (H - 20) - 4]);
  const dLine = points.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ');
  const dArea = `${dLine} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ marginTop: 14 }}>
      <defs>
        <linearGradient id="ar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={Tok.color.mint} stopOpacity="0.45"/>
          <stop offset="1" stopColor={Tok.color.mint} stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* y axis grid lines */}
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1="0" y1={H * p} x2={W} y2={H * p} stroke={Tok.color.line} strokeDasharray="2 4"/>
      ))}
      <path d={dArea} fill="url(#ar)"/>
      <path d={dLine} stroke={Tok.color.mint} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 5 ? 5 : 3} fill={i === 5 ? Tok.color.mint : Tok.color.bg} stroke={Tok.color.mint} strokeWidth="2"/>
        </g>
      ))}
      {/* hovered point bubble */}
      <g transform={`translate(${points[5][0]}, ${points[5][1] - 14})`}>
        <rect x="-22" y="-22" width="44" height="18" rx="4" fill={Tok.color.mint}/>
        <text textAnchor="middle" y="-8" fontFamily={Tok.font.mono} fontWeight="700" fontSize="11" fill="#02110B">$148</text>
      </g>
    </svg>
  );
}

function TripRow({ time, route, amt }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', background: Tok.color.surface,
      borderRadius: 12,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: Tok.color.mintGlow, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon.car c={Tok.color.mint} s={16}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...T.bodyB, fontSize: 14 }}>{route}</div>
        <div style={{ ...T.sm, color: Tok.color.text2 }}>{time}</div>
      </div>
      <div style={{ ...T.mono, fontSize: 14, color: Tok.color.mint }}>{amt}</div>
    </div>
  );
}

Object.assign(window, {
  D_Dash, D_Incoming, D_NavPickup, D_Active, D_Scan, D_Earnings,
  Stat, CountdownRing, EarningsChart, TripRow,
});
