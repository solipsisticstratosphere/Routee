// SHARED SCREENS — Splash, Auth, Profile

// ── 1. Splash / Onboarding ─────────────────────────────────────────────────
function S_Splash() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'hidden' }}>
      {/* radial accents */}
      <div style={{
        position: 'absolute', top: -160, left: -120, width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(0,229,160,0.22), rgba(0,229,160,0) 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -200, right: -140, width: 460, height: 460, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,107,53,0.20), rgba(255,107,53,0) 70%)',
      }} />
      {/* faint route lines */}
      <svg width="390" height="844" viewBox="0 0 390 844" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
        <path d="M -20 200 Q 120 200 180 350 T 410 500" stroke={Tok.color.mint} strokeWidth="1.5" fill="none" strokeDasharray="3 6" />
        <path d="M 410 280 Q 250 280 200 420 T -20 620" stroke={Tok.color.orange} strokeWidth="1.5" fill="none" strokeDasharray="3 6" />
      </svg>

      {/* logo + tagline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 28px',
      }}>
        <Logo size={80} />
        <div style={{
          marginTop: 28, ...T.display, fontSize: 40, fontWeight: 700,
          letterSpacing: -1, textAlign: 'center',
        }}>Routee</div>
        <div style={{
          marginTop: 10, ...T.body, fontSize: 16, color: Tok.color.text2,
          textAlign: 'center', maxWidth: 280,
        }}>Delivery & rides on demand —<br/>everything moving, all at once.</div>
      </div>

      {/* CTAs */}
      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 60,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <CTA color="mint" onClick={() => {}}>
          <span>I'm a Customer</span>
          <Icon.arrow c="#02110B" />
        </CTA>
        <CTA color="orange" onClick={() => {}}>
          <span>I'm a Driver</span>
          <Icon.arrow c="#1A0700" />
        </CTA>
        <div style={{ textAlign: 'center', marginTop: 8, ...T.sm, color: Tok.color.text2 }}>
          Already have an account? <span style={{ color: Tok.color.mint, fontWeight: 600 }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

function Logo({ size = 56, accent = Tok.color.mint }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="16" fill={Tok.color.elevated}/>
      <rect width="56" height="56" rx="16" fill="url(#lgr)" opacity="0.4"/>
      {/* "R" stylized as a route */}
      <path d="M14 42 V14 H30 a8 8 0 0 1 0 16 H20" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M22 30 L36 42" stroke={accent} strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="14" cy="14" r="3" fill={accent}/>
      <circle cx="36" cy="42" r="3" fill={Tok.color.orange}/>
      <defs>
        <radialGradient id="lgr" cx="0.2" cy="0.2">
          <stop offset="0" stopColor={accent} stopOpacity="0.6"/>
          <stop offset="1" stopColor={accent} stopOpacity="0"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── 2. Auth / Mode Select — phone + OTP ────────────────────────────────────
function S_Auth() {
  const [otp] = React.useState(['4', '8', '2', '', '', '']);
  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 64, paddingLeft: 24, paddingRight: 24 }}>
      {/* back button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <IconBtn><Icon.back/></IconBtn>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>STEP 2 / 3</div>
      </div>

      <div style={{ marginTop: 28 }}>
        <div style={{ ...T.h1, fontSize: 26 }}>Enter the code</div>
        <div style={{ ...T.body, color: Tok.color.text2, marginTop: 8 }}>
          We sent a 6-digit code to <span style={{ color: Tok.color.text, fontWeight: 600 }}>+1 (415) 555-0184</span>
        </div>
      </div>

      {/* OTP boxes */}
      <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
        {otp.map((v, i) => (
          <div key={i} style={{
            flex: 1, height: 58, borderRadius: 14,
            background: Tok.color.elevated,
            boxShadow: 'inset 0 0 0 ' + (i === 3 ? '2px ' + Tok.color.mint : '1px ' + Tok.color.line),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            ...T.monoBig, color: v ? Tok.color.text : Tok.color.text3,
            position: 'relative',
          }}>
            {v || ''}
            {i === 3 && <div style={{
              position: 'absolute', width: 2, height: 24,
              background: Tok.color.mint, animation: 'rt-flicker 1s steps(2, end) infinite',
            }} />}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, ...T.sm, color: Tok.color.text2 }}>
        Didn't get it? <span style={{ color: Tok.color.mint, fontWeight: 600 }}>Resend in 0:32</span>
      </div>

      {/* role select */}
      <div style={{ marginTop: 32 }}>
        <div style={{ ...T.xs, color: Tok.color.text2, marginBottom: 10 }}>I'M USING ROUTEE AS A</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <RoleTile active accent={Tok.color.mint} icon={<Icon.user c={Tok.color.mint} s={22}/>} label="Customer" sub="Order rides & deliveries"/>
          <RoleTile accent={Tok.color.orange} icon={<Icon.car c={Tok.color.orange} s={22}/>} label="Driver" sub="Earn on your schedule"/>
        </div>
      </div>

      {/* keypad */}
      <Keypad/>
    </div>
  );
}

function RoleTile({ active, accent, icon, label, sub }) {
  return (
    <div style={{
      flex: 1, padding: 14, borderRadius: 16,
      background: active ? `${accent}14` : Tok.color.surface,
      boxShadow: 'inset 0 0 0 ' + (active ? `2px ${accent}` : `1px ${Tok.color.line}`),
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: active ? `${accent}22` : Tok.color.elevated,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ ...T.bodyB, marginTop: 10 }}>{label}</div>
      <div style={{ ...T.sm, color: Tok.color.text2, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function Keypad() {
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 40,
      padding: '0 30px',
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
      rowGap: 6, columnGap: 6,
    }}>
      {keys.map((k, i) => (
        <div key={i} style={{
          height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: k && k !== '⌫' ? 'rgba(255,255,255,0.04)' : 'transparent',
          fontFamily: Tok.font.display, fontWeight: 600, fontSize: 24, color: '#fff',
        }}>{k}</div>
      ))}
    </div>
  );
}

// ── 3. Profile ─────────────────────────────────────────────────────────────
function S_Profile() {
  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 60, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px' }}>
        <div style={{ ...T.h1 }}>Profile</div>
        <IconBtn><Icon.set s={16}/></IconBtn>
      </div>

      {/* hero card */}
      <div style={{ margin: '0 20px' }}>
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name="Maya Chen" size={62} />
            <div style={{ flex: 1 }}>
              <div style={{ ...T.h2 }}>Maya Chen</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <Icon.star c={Tok.color.amber} s={13}/>
                <span style={{ ...T.sm, color: Tok.color.text }}>4.92</span>
                <span style={{ ...T.sm, color: Tok.color.text2 }}>· 218 trips</span>
              </div>
            </div>
            <div style={{
              padding: '6px 10px', borderRadius: 999,
              background: 'rgba(0,229,160,0.14)', ...T.xs, color: Tok.color.mint,
            }}>GOLD</div>
          </div>
          {/* stats */}
          <div style={{ display: 'flex', marginTop: 18, gap: 12 }}>
            {[
              { l: 'CO₂ saved', v: '38kg' },
              { l: 'Member since', v: 'Mar ’23' },
              { l: 'Saved', v: '$214' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center', background: Tok.color.elevated, borderRadius: 12 }}>
                <div style={{ ...T.bodyB, fontSize: 16 }}>{s.v}</div>
                <div style={{ ...T.sm, color: Tok.color.text2, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* history */}
      <div style={{ padding: '24px 20px 8px' }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>RECENT TRIPS</div>
      </div>
      <div style={{ margin: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <HistoryRow when="Today · 14:22" from="Office, Mission" to="Trader Joe's" amount="$8.40" color={Tok.color.mint}/>
        <HistoryRow when="Yesterday · 19:08" from="Home" to="The Mill, Divisadero" amount="$11.20" color={Tok.color.orange}/>
        <HistoryRow when="Apr 28 · 09:15" from="Home" to="SFO Terminal 2" amount="$36.80" color={Tok.color.mint}/>
      </div>

      {/* settings */}
      <div style={{ padding: '20px 20px 8px' }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>SETTINGS</div>
      </div>
      <div style={{ margin: '0 20px' }}>
        <Card style={{ padding: 0 }}>
          <SetRow icon={<Icon.wallet c={Tok.color.text2}/>} label="Payment methods" detail="Visa · 4242"/>
          <SetRow icon={<Icon.bell c={Tok.color.text2}/>} label="Notifications"/>
          <SetRow icon={<Icon.loc c={Tok.color.text2}/>} label="Saved places" detail="3"/>
          <SetRow icon={<Icon.power c={Tok.color.red}/>} label="Log out" last danger/>
        </Card>
      </div>
    </div>
  );
}

function HistoryRow({ when, from, to, amount, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12, background: Tok.color.surface,
      borderRadius: 14,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: color + '22', color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon.pin c={color} s={18}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...T.sm, color: Tok.color.text2 }}>{when}</div>
        <div style={{ ...T.bodyB, fontSize: 14, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {from} <span style={{ color: Tok.color.text2, fontWeight: 400 }}>→</span> {to}
        </div>
      </div>
      <div style={{ ...T.mono, fontSize: 14, color: Tok.color.text }}>{amount}</div>
    </div>
  );
}

function SetRow({ icon, label, detail, last, danger }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px',
      borderBottom: last ? 'none' : '1px solid ' + Tok.color.line,
    }}>
      <div style={{ display: 'flex' }}>{icon}</div>
      <div style={{ flex: 1, ...T.body, fontSize: 15, color: danger ? Tok.color.red : Tok.color.text, fontWeight: 500 }}>{label}</div>
      {detail && <div style={{ ...T.sm, color: Tok.color.text2 }}>{detail}</div>}
      {!danger && <Icon.chev c={Tok.color.text3}/>}
    </div>
  );
}

Object.assign(window, { S_Splash, S_Auth, S_Profile, Logo });
