// CUSTOMER SCREENS (6)

// ── 4. Home + Map ──────────────────────────────────────────────────────────
function S_Home() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.mapBase, overflow: 'hidden' }}>
      <MapBg
        seed={3}
        drivers={[
          { x: 0.18, y: 0.22 }, { x: 0.62, y: 0.28 },
          { x: 0.35, y: 0.4 }, { x: 0.78, y: 0.46 },
          { x: 0.22, y: 0.5 },
        ]}
        showDriverPulse
      />

      {/* dim gradient for status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 110,
        background: 'linear-gradient(180deg, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0) 100%)',
        pointerEvents: 'none',
      }} />

      {/* top: avatar + search */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name="Maya Chen" size={42}/>
        <div style={{
          flex: 1, height: 48, padding: '0 14px',
          background: 'rgba(20,24,38,0.92)', borderRadius: 16,
          boxShadow: 'inset 0 0 0 1px ' + Tok.color.line + ', 0 6px 20px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Icon.search c={Tok.color.text2}/>
          <div style={{ ...T.body, color: Tok.color.text2 }}>Where to?</div>
        </div>
        <IconBtn color="rgba(20,24,38,0.92)"><Icon.bell s={16}/></IconBtn>
      </div>

      {/* my-location button */}
      <div style={{ position: 'absolute', right: 18, bottom: 360 }}>
        <IconBtn size={44} color="rgba(20,24,38,0.95)">
          <Icon.loc c={Tok.color.mint} s={18}/>
        </IconBtn>
      </div>

      {/* bottom sheet (mid snap) */}
      <Sheet top={500}>
        <div style={{ padding: '14px 20px 0' }}>
          {/* quick actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <QuickAction icon={<Icon.home c={Tok.color.mint} s={18}/>} label="Home" sub="2 min" />
            <QuickAction icon={<Icon.wallet c={Tok.color.orange} s={18}/>} label="Work" sub="14 min" />
            <QuickAction icon={<Icon.plus c={Tok.color.text2} s={18}/>} label="Add" />
          </div>

          {/* destinations list */}
          <div style={{ ...T.xs, color: Tok.color.text2, marginTop: 22 }}>RECENT</div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <RecentDest title="Trader Joe's" sub="555 9th St · 1.2 mi" />
            <RecentDest title="The Mill" sub="736 Divisadero · 2.4 mi" />
            <RecentDest title="SFO — Terminal 2" sub="780 N McDonnell · 13.2 mi" last/>
          </div>

          {/* promo */}
          <div style={{
            marginTop: 14, padding: '12px 14px', borderRadius: 14,
            background: `linear-gradient(120deg, ${Tok.color.mint}1A, ${Tok.color.orange}1A)`,
            boxShadow: 'inset 0 0 0 1px rgba(0,229,160,0.25)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12, background: Tok.color.mint,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon.zap c="#02110B" s={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyB, fontSize: 14 }}>20% off your next ride</div>
              <div style={{ ...T.sm, color: Tok.color.text2 }}>Code <span style={{ fontFamily: Tok.font.mono, color: Tok.color.mint }}>SUMMER20</span> · ends Fri</div>
            </div>
          </div>
        </div>
      </Sheet>

      <TabBar tabs={[
        { icon: <Icon.home/>, label: 'Map' },
        { icon: <Icon.list/>, label: 'Orders' },
        { icon: <Icon.user/>, label: 'Profile' },
      ]} active={0} />
    </div>
  );
}

function QuickAction({ icon, label, sub }) {
  return (
    <div style={{
      flex: 1, padding: 12,
      background: Tok.color.elevated, borderRadius: 14,
      boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
    }}>
      <div style={{ display: 'flex' }}>{icon}</div>
      <div style={{ ...T.bodyB, fontSize: 14, marginTop: 8 }}>{label}</div>
      {sub && <div style={{ ...T.sm, color: Tok.color.text2, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function RecentDest({ title, sub, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid ' + Tok.color.line,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: Tok.color.elevated,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon.clock c={Tok.color.text2} s={16}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...T.bodyB, fontSize: 14 }}>{title}</div>
        <div style={{ ...T.sm, color: Tok.color.text2 }}>{sub}</div>
      </div>
      <Icon.chev c={Tok.color.text3}/>
    </div>
  );
}

// ── 5. Route Planning ──────────────────────────────────────────────────────
function S_Plan() {
  const [veh, setVeh] = React.useState(1);
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.mapBase, overflow: 'hidden' }}>
      <MapBg
        seed={5}
        pickup={{ x: 0.2, y: 0.22 }}
        dropoff={{ x: 0.78, y: 0.5 }}
        showRoute showPins
        drivers={[{ x: 0.4, y: 0.32 }, { x: 0.7, y: 0.34 }]}
      />

      {/* top inputs floating card */}
      <div style={{ position: 'absolute', top: 56, left: 16, right: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <IconBtn color="rgba(20,24,38,0.95)"><Icon.back s={16}/></IconBtn>
          <div style={{
            flex: 1, background: 'rgba(20,24,38,0.95)',
            backdropFilter: 'blur(20px)', borderRadius: 18, padding: 8,
            boxShadow: 'inset 0 0 0 1px ' + Tok.color.line + ', 0 10px 30px rgba(0,0,0,0.4)',
          }}>
            <Input dot={Tok.color.mint} value="Office · Mission St" />
            <div style={{ height: 6 }}/>
            <Input dot={Tok.color.orange} value="Trader Joe's · 555 9th" suffix={<Icon.swap c={Tok.color.text2}/>}/>
          </div>
        </div>
      </div>

      {/* bottom sheet */}
      <Sheet top={460}>
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ ...T.xs, color: Tok.color.text2 }}>CHOOSE A VEHICLE</div>
              <div style={{ ...T.h2, marginTop: 4 }}>3.4 mi · 12 min</div>
            </div>
            <div style={{ ...T.sm, color: Tok.color.text2 }}>Arrives 2:48 PM</div>
          </div>

          {/* vehicle cards */}
          <div style={{ display: 'flex', gap: 10, marginTop: 14, overflow: 'visible' }}>
            <VehicleCard icon={<Icon.bike c={veh===0 ? Tok.color.mint : Tok.color.text}/>} name="Bike" eta="8 min" price="$6.40" active={veh===0} onClick={() => setVeh(0)}/>
            <VehicleCard icon={<Icon.car c={veh===1 ? Tok.color.mint : Tok.color.text}/>}  name="Car"  eta="5 min" price="$12.20" active={veh===1} onClick={() => setVeh(1)} badge="Fastest"/>
            <VehicleCard icon={<Icon.van c={veh===2 ? Tok.color.mint : Tok.color.text}/>}  name="Van"  eta="9 min" price="$22.80" active={veh===2} onClick={() => setVeh(2)}/>
          </div>

          {/* price breakdown */}
          <div style={{
            marginTop: 16, padding: 14, borderRadius: 14,
            background: Tok.color.elevated,
            boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Icon.card c={Tok.color.text2}/>
            <div style={{ flex: 1, ...T.body, fontSize: 14 }}>Visa · 4242</div>
            <div style={{ ...T.sm, color: Tok.color.mint }}>Change</div>
          </div>

          <div style={{ marginTop: 14 }}>
            <CTA color="mint">
              <span>Confirm · $12.20</span>
              <Icon.arrow c="#02110B"/>
            </CTA>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

function VehicleCard({ icon, name, eta, price, active, onClick, badge }) {
  return (
    <div onClick={onClick} style={{
      flex: 1, padding: 12, borderRadius: 16, position: 'relative',
      background: active ? `${Tok.color.mint}14` : Tok.color.elevated,
      boxShadow: 'inset 0 0 0 ' + (active ? `2px ${Tok.color.mint}` : `1px ${Tok.color.line}`),
      cursor: 'pointer',
    }}>
      {badge && (
        <div style={{
          position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
          padding: '3px 8px', borderRadius: 999,
          background: Tok.color.mint, color: '#02110B',
          fontFamily: Tok.font.body, fontWeight: 700, fontSize: 9, letterSpacing: 0.4, textTransform: 'uppercase',
        }}>{badge}</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>{icon}</div>
      <div style={{ ...T.bodyB, fontSize: 13, textAlign: 'center', marginTop: 6 }}>{name}</div>
      <div style={{ ...T.sm, color: Tok.color.text2, textAlign: 'center' }}>{eta}</div>
      <div style={{ ...T.mono, fontSize: 14, textAlign: 'center', marginTop: 6, color: active ? Tok.color.mint : Tok.color.text }}>{price}</div>
    </div>
  );
}

// ── 6. Order Confirmation ──────────────────────────────────────────────────
function S_Confirm() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'auto' }}>
      {/* map preview */}
      <div style={{ position: 'relative', height: 320 }}>
        <MapBg width={390} height={320}
          pickup={{ x: 0.2, y: 0.3 }}
          dropoff={{ x: 0.78, y: 0.7 }}
          showRoute showPins routeAnimated={false}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,14,26,0.45) 0%, rgba(10,14,26,0) 30%, rgba(10,14,26,0.4) 80%, ' + Tok.color.bg + ' 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          <IconBtn color="rgba(20,24,38,0.95)"><Icon.back s={16}/></IconBtn>
          <div style={{ ...T.xs, padding: '7px 12px', background: 'rgba(20,24,38,0.95)', borderRadius: 999, color: Tok.color.text2 }}>REVIEW & CONFIRM</div>
        </div>
      </div>

      {/* card content */}
      <div style={{ padding: '20px 20px 120px', marginTop: -28, position: 'relative' }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: Tok.color.mintGlow, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.car c={Tok.color.mint}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.bodyB }}>Car · Standard</div>
              <div style={{ ...T.sm, color: Tok.color.text2 }}>5 min away · 3.4 mi trip</div>
            </div>
            <div style={{ ...T.mono, fontSize: 18, color: Tok.color.text }}>$12.20</div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid ' + Tok.color.line }}>
            <RouteRow color={Tok.color.mint} label="PICKUP" text="Office · 482 Mission St" time="Now"/>
            <div style={{ marginLeft: 5, borderLeft: '2px dashed ' + Tok.color.line2, height: 18 }} />
            <RouteRow color={Tok.color.orange} label="DROPOFF" text="Trader Joe's · 555 9th St" time="2:48 PM"/>
          </div>
        </Card>

        <Card style={{ padding: 16, marginTop: 12 }}>
          <div style={{ ...T.xs, color: Tok.color.text2 }}>FARE BREAKDOWN</div>
          <FareRow label="Base fare" v="$3.50"/>
          <FareRow label="Distance · 3.4 mi" v="$6.80"/>
          <FareRow label="Time · 12 min" v="$1.40"/>
          <FareRow label="Service fee" v="$0.50"/>
          <FareRow label="Total" v="$12.20" total/>
        </Card>

        <Card style={{ padding: 14, marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon.card c={Tok.color.text2}/>
          <div style={{ flex: 1, ...T.body, fontSize: 14 }}>Visa · 4242</div>
          <div style={{ ...T.sm, color: Tok.color.mint, fontWeight: 600 }}>Change</div>
        </Card>
      </div>

      {/* sticky confirm */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 40,
      }}>
        <CTA color="mint"><span>Confirm order · $12.20</span><Icon.check c="#02110B"/></CTA>
      </div>
    </div>
  );
}

function RouteRow({ color, label, text, time }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 0 4px ${color}22` }} />
      <div style={{ flex: 1 }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>{label}</div>
        <div style={{ ...T.body, fontSize: 14, marginTop: 1 }}>{text}</div>
      </div>
      <div style={{ ...T.mono, fontSize: 12, color: Tok.color.text2 }}>{time}</div>
    </div>
  );
}

function FareRow({ label, v, total }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginTop: total ? 10 : 8,
      paddingTop: total ? 10 : 0,
      borderTop: total ? '1px solid ' + Tok.color.line : 'none',
    }}>
      <div style={{ ...T.body, fontSize: 14, color: total ? Tok.color.text : Tok.color.text2, fontWeight: total ? 600 : 400 }}>{label}</div>
      <div style={{ ...T.mono, fontSize: total ? 16 : 13, fontWeight: total ? 700 : 500, color: Tok.color.text }}>{v}</div>
    </div>
  );
}

// ── 7. Payment ─────────────────────────────────────────────────────────────
function S_Pay() {
  const [card, setCard] = React.useState(0);
  const [tip, setTip] = React.useState(15);
  const subtotal = 12.20;
  const tipAmt = (subtotal * tip / 100);
  const total = subtotal + tipAmt;

  return (
    <div style={{ position: 'absolute', inset: 0, paddingTop: 60, overflow: 'auto', paddingBottom: 110 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
        <IconBtn><Icon.back s={16}/></IconBtn>
        <div style={{ flex: 1, textAlign: 'center', ...T.bodyB }}>Payment</div>
        <div style={{ width: 44 }}/>
      </div>

      {/* large card visual */}
      <div style={{ padding: '4px 20px' }}>
        <div style={{
          height: 200, borderRadius: 22, padding: 20, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, #1a2238 0%, #0d1322 100%)`,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px rgba(0,0,0,0.3)',
        }}>
          {/* glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(0,229,160,0.4), transparent)',
          }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ ...T.xs, color: Tok.color.text2 }}>ROUTEE CARD</div>
            <div style={{
              width: 36, height: 24, borderRadius: 4,
              background: 'linear-gradient(135deg, #ffd16b, #b07a1a)',
            }}/>
          </div>
          <div style={{ position: 'absolute', bottom: 56, left: 20, right: 20, ...T.mono, fontSize: 22, letterSpacing: 2, color: '#fff' }}>•••• •••• •••• 4242</div>
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ ...T.xs, color: Tok.color.text3 }}>CARDHOLDER</div>
              <div style={{ ...T.bodyB, fontSize: 14, marginTop: 2 }}>MAYA CHEN</div>
            </div>
            <div style={{ ...T.display, fontSize: 18, color: Tok.color.mint, letterSpacing: -0.2 }}>VISA</div>
          </div>
        </div>
      </div>

      {/* saved cards row */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>SAVED METHODS</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <SavedCard active={card===0} brand="Visa" last="4242" onClick={() => setCard(0)}/>
          <SavedCard active={card===1} brand="Apple Pay" last="—" onClick={() => setCard(1)}/>
          <SavedCard add onClick={() => {}}/>
        </div>
      </div>

      {/* tip selector */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ ...T.xs, color: Tok.color.text2 }}>ADD A TIP</div>
          <div style={{ ...T.sm, color: Tok.color.text2 }}>100% to driver</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {[0, 10, 15, 20].map(p => (
            <div key={p} onClick={() => setTip(p)} style={{
              flex: 1, height: 52, borderRadius: 14,
              background: tip === p ? Tok.color.mint : Tok.color.elevated,
              color: tip === p ? '#02110B' : Tok.color.text,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: tip === p ? 'none' : 'inset 0 0 0 1px ' + Tok.color.line,
              cursor: 'pointer',
            }}>
              <div style={{ ...T.bodyB, fontSize: 16 }}>{p}%</div>
              <div style={{ ...T.sm, fontSize: 10, opacity: 0.7 }}>{p === 0 ? '—' : `$${(subtotal * p / 100).toFixed(2)}`}</div>
            </div>
          ))}
        </div>
      </div>

      {/* breakdown */}
      <div style={{ padding: '18px 20px 0' }}>
        <Card>
          <FareRow label="Trip" v={`$${subtotal.toFixed(2)}`}/>
          <FareRow label={`Tip · ${tip}%`} v={`$${tipAmt.toFixed(2)}`}/>
          <FareRow label="Total" v={`$${total.toFixed(2)}`} total/>
        </Card>
      </div>

      {/* sticky pay */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 40 }}>
        <CTA color="mint"><span>Pay $\u00A0{total.toFixed(2)}</span><Icon.arrow c="#02110B"/></CTA>
      </div>
    </div>
  );
}

function SavedCard({ active, brand, last, add, onClick }) {
  if (add) return (
    <div onClick={onClick} style={{
      flex: 1, height: 64, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: Tok.color.elevated, boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
      color: Tok.color.text2, gap: 6, cursor: 'pointer',
    }}>
      <Icon.plus c={Tok.color.text2} s={16}/>
      <div style={{ ...T.sm }}>Add</div>
    </div>
  );
  return (
    <div onClick={onClick} style={{
      flex: 1, padding: 10, borderRadius: 14,
      background: active ? `${Tok.color.mint}14` : Tok.color.elevated,
      boxShadow: 'inset 0 0 0 ' + (active ? `2px ${Tok.color.mint}` : `1px ${Tok.color.line}`),
      cursor: 'pointer',
    }}>
      <Icon.card c={active ? Tok.color.mint : Tok.color.text2}/>
      <div style={{ ...T.bodyB, fontSize: 13, marginTop: 6 }}>{brand}</div>
      <div style={{ ...T.sm, fontSize: 11, color: Tok.color.text2, marginTop: 1 }}>{last !== '—' ? `· ${last}` : ''}</div>
    </div>
  );
}

// ── 8. Live Tracking ───────────────────────────────────────────────────────
function S_Track() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.mapBase, overflow: 'hidden' }}>
      <MapBg seed={8}
        pickup={{ x: 0.22, y: 0.32 }}
        dropoff={{ x: 0.78, y: 0.58 }}
        showRoute showPins
        drivers={[{ x: 0.45, y: 0.42, bearing: 35 }]}
      />

      {/* top status pill */}
      <div style={{ position: 'absolute', top: 60, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconBtn color="rgba(20,24,38,0.95)"><Icon.back s={16}/></IconBtn>
        <StatusPill color="mint" label="On the way" />
        <IconBtn color="rgba(20,24,38,0.95)"><Icon.set s={16}/></IconBtn>
      </div>

      {/* ETA badge */}
      <div style={{ position: 'absolute', top: 124, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{
          padding: '10px 18px',
          background: 'rgba(20,24,38,0.95)', borderRadius: 999,
          backdropFilter: 'blur(20px)',
          boxShadow: 'inset 0 0 0 1px ' + Tok.color.line + ', 0 10px 28px rgba(0,0,0,0.4)',
          ...T.mono, fontSize: 18, color: Tok.color.mint,
        }}>Arriving in 4:32</div>
      </div>

      {/* bottom: status timeline + driver card */}
      <Sheet top={460}>
        <div style={{ padding: '14px 20px' }}>
          {/* progress timeline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Step done label="Confirmed"/>
            <StepLine done/>
            <Step active label="On the way"/>
            <StepLine/>
            <Step label="Arriving"/>
            <StepLine/>
            <Step label="Delivered"/>
          </div>

          {/* driver card */}
          <div style={{
            marginTop: 18, padding: 14, borderRadius: 16,
            background: Tok.color.elevated,
            boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ position: 'relative' }}>
              <Avatar name="Diego R." size={54} color={Tok.color.orange}/>
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                width: 22, height: 22, borderRadius: '50%',
                background: Tok.color.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 0 2px ' + Tok.color.elevated,
              }}>
                <Icon.car c={Tok.color.mint} s={12}/>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...T.bodyB }}>Diego R.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <Icon.star c={Tok.color.amber} s={12}/>
                <span style={{ ...T.sm }}>4.96</span>
                <span style={{ ...T.sm, color: Tok.color.text2 }}>· Tesla Model 3</span>
              </div>
              <div style={{
                marginTop: 6, padding: '3px 8px',
                background: '#fff', color: '#000',
                borderRadius: 4, display: 'inline-flex',
                fontFamily: Tok.font.mono, fontWeight: 700, fontSize: 12, letterSpacing: 2,
              }}>8 ABC 4129</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <IconBtn color={Tok.color.mint} fg="#02110B" size={40}><Icon.phone c="#02110B" s={16}/></IconBtn>
              <IconBtn size={40}><Icon.chat s={16}/></IconBtn>
            </div>
          </div>

          {/* drop trip dest summary */}
          <div style={{
            marginTop: 12, padding: '12px 14px', borderRadius: 14,
            background: Tok.color.surface, boxShadow: 'inset 0 0 0 1px ' + Tok.color.line,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: Tok.color.orange, boxShadow: `0 0 0 3px ${Tok.color.orange}22` }}/>
            <div style={{ flex: 1 }}>
              <div style={{ ...T.xs, color: Tok.color.text2 }}>DROPOFF</div>
              <div style={{ ...T.body, fontSize: 14 }}>Trader Joe's · 555 9th St</div>
            </div>
            <Icon.chev c={Tok.color.text3}/>
          </div>
        </div>
      </Sheet>
    </div>
  );
}

function Step({ done, active, label }) {
  const c = done ? Tok.color.mint : active ? Tok.color.mint : Tok.color.line2;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 0 }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: done ? Tok.color.mint : active ? Tok.color.mintGlow : Tok.color.elevated,
        boxShadow: active ? `0 0 0 3px ${Tok.color.mintGlow}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: active ? `2px solid ${Tok.color.mint}` : 'none',
      }}>
        {done && <Icon.check c="#02110B" s={12}/>}
        {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: Tok.color.mint }}/>}
      </div>
      <div style={{ ...T.sm, fontSize: 10, color: (done || active) ? Tok.color.text : Tok.color.text2, fontWeight: active ? 700 : 500 }}>{label}</div>
    </div>
  );
}

function StepLine({ done }) {
  return <div style={{ flex: 1, height: 2, marginBottom: 18, background: done ? Tok.color.mint : Tok.color.line2 }}/>;
}

// ── 9. Delivery + QR ───────────────────────────────────────────────────────
function S_Delivery() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: Tok.color.bg, overflow: 'auto', paddingBottom: 60 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '70px 20px 12px' }}>
        <IconBtn><Icon.back s={16}/></IconBtn>
        <div style={{ flex: 1, textAlign: 'center', ...T.bodyB }}>Your delivery</div>
        <IconBtn><Icon.chat s={16}/></IconBtn>
      </div>

      {/* QR display */}
      <div style={{ padding: '8px 20px 0' }}>
        <Card style={{ padding: 22, textAlign: 'center' }}>
          <div style={{ ...T.xs, color: Tok.color.mint }}>SHOW AT PICKUP</div>
          <div style={{ ...T.h1, marginTop: 6, fontSize: 22 }}>Pickup code</div>

          <div style={{
            margin: '18px auto 0',
            width: 200, height: 200,
            background: '#fff', borderRadius: 18, padding: 12,
            position: 'relative',
          }}>
            <QRPlaceholder size={176}/>
          </div>

          <div style={{ ...T.monoBig, marginTop: 16, letterSpacing: 6, color: Tok.color.mint }}>4 8 2 9 1 7</div>
          <div style={{ ...T.sm, color: Tok.color.text2, marginTop: 6 }}>Or have your driver scan this code</div>
        </Card>
      </div>

      {/* timeline */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ ...T.xs, color: Tok.color.text2 }}>STATUS</div>
        <Card style={{ marginTop: 10, padding: '8px 16px' }}>
          <Tl done time="2:34 PM" label="Order confirmed" desc="Driver assigned"/>
          <Tl done time="2:38 PM" label="Picked up" desc="2 items from Trader Joe's"/>
          <Tl active time="ETA 2:48" label="On the way" desc="Driver is 1.2 mi away"/>
          <Tl time="—" label="Delivered" desc="Awaiting pickup confirmation" last/>
        </Card>
      </div>

      <div style={{ padding: '14px 20px 0' }}>
        <CTA color="surf"><Icon.phone/> <span>Contact driver</span></CTA>
      </div>
    </div>
  );
}

function QRPlaceholder({ size = 160 }) {
  // generate a fake QR pattern
  const cells = 21;
  const cell = size / cells;
  const rand = (i, j) => ((i * 31 + j * 17 + 7) % 100) < 48;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: cells }).map((_, i) =>
        Array.from({ length: cells }).map((_, j) => {
          // corners — finder patterns
          const inFinder = (i < 7 && j < 7) || (i < 7 && j > cells - 8) || (i > cells - 8 && j < 7);
          if (inFinder) return null;
          return rand(i, j) ? <rect key={i+'-'+j} x={i*cell} y={j*cell} width={cell} height={cell} fill="#000"/> : null;
        })
      )}
      {/* 3 finder patterns */}
      {[[0,0], [cells-7, 0], [0, cells-7]].map(([x,y], k) => (
        <g key={k} transform={`translate(${x*cell}, ${y*cell})`}>
          <rect width={cell*7} height={cell*7} fill="#000"/>
          <rect x={cell} y={cell} width={cell*5} height={cell*5} fill="#fff"/>
          <rect x={cell*2} y={cell*2} width={cell*3} height={cell*3} fill="#000"/>
        </g>
      ))}
      {/* center logo dot */}
      <rect x={size/2-cell*2} y={size/2-cell*2} width={cell*4} height={cell*4} fill="#fff"/>
      <rect x={size/2-cell*1.5} y={size/2-cell*1.5} width={cell*3} height={cell*3} fill={Tok.color.mint} rx={cell*0.5}/>
    </svg>
  );
}

function Tl({ done, active, time, label, desc, last }) {
  const c = done ? Tok.color.mint : active ? Tok.color.mint : Tok.color.line2;
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', position: 'relative' }}>
      <div style={{ width: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 14, height: 14, borderRadius: '50%',
          background: done ? Tok.color.mint : active ? Tok.color.mintGlow : Tok.color.elevated,
          boxShadow: active ? `0 0 0 4px ${Tok.color.mintGlow}` : 'inset 0 0 0 1px ' + (done ? Tok.color.mint : Tok.color.line2),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {done && <Icon.check c="#02110B" s={9}/>}
          {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: Tok.color.mint, animation: 'rt-blink 1.2s infinite' }}/>}
        </div>
        {!last && <div style={{ flex: 1, width: 2, background: done ? Tok.color.mint : Tok.color.line2, marginTop: 4 }}/>}
      </div>
      <div style={{ flex: 1, paddingBottom: last ? 0 : 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ ...T.bodyB, fontSize: 14, color: (done || active) ? Tok.color.text : Tok.color.text2 }}>{label}</div>
          <div style={{ ...T.mono, fontSize: 11, color: Tok.color.text2 }}>{time}</div>
        </div>
        <div style={{ ...T.sm, color: Tok.color.text2, marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  S_Home, S_Plan, S_Confirm, S_Pay, S_Track, S_Delivery,
  QuickAction, VehicleCard, RecentDest, RouteRow, FareRow, SavedCard, Step, StepLine, Tl, QRPlaceholder,
});
