// Dark-styled map background — SVG, no tiles
// Renders roads, water, blocks, and supports pins/polylines layered on top.

function MapBg({
  width = 390, height = 844, seed = 1, density = 1,
  showRoute = false, routeAnimated = true,
  showPins = false, showDriverPulse = false,
  // pickup/dropoff coords in 0..1 of svg
  pickup, dropoff,
  drivers = [],   // [{x, y}]
  variant = 'city',  // city | highway
  style = {},
}) {
  // deterministic PRNG
  const rand = React.useMemo(() => {
    let s = seed * 9301 + 49297;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }, [seed]);

  const W = width, H = height;
  const c = Tok.color;

  // generate roads
  const roads = React.useMemo(() => {
    const rs = [];
    const cols = Math.floor(5 * density);
    const rows = Math.floor(9 * density);
    for (let i = 1; i < cols; i++) {
      const x = (i / cols) * W + (rand() - 0.5) * 20;
      rs.push({ type: 'v', x, w: i % 2 === 0 ? 2.5 : 1.5 });
    }
    for (let i = 1; i < rows; i++) {
      const y = (i / rows) * H + (rand() - 0.5) * 20;
      rs.push({ type: 'h', y, w: i % 3 === 0 ? 3 : 1.5 });
    }
    return rs;
  }, [W, H, density]);

  // generate park / water blob positions
  const parks = React.useMemo(() => {
    return [
      { x: W * 0.12, y: H * 0.18, w: W * 0.22, h: H * 0.08 },
      { x: W * 0.68, y: H * 0.55, w: W * 0.25, h: H * 0.14 },
    ];
  }, [W, H]);

  return (
    <svg
      width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', background: c.mapBase, ...style }}
    >
      {/* base */}
      <rect width={W} height={H} fill={c.mapLand} />

      {/* water (top diagonal) */}
      <path d={`M 0 ${H*0.78} L ${W*0.45} ${H*0.86} L ${W*0.55} ${H} L 0 ${H} Z`} fill={c.mapWater} opacity="0.8" />

      {/* parks */}
      {parks.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx="14" fill={c.mapPark} opacity="0.85" />
      ))}

      {/* building blocks */}
      <g opacity="0.45">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = rand() * W;
          const y = rand() * H;
          const w = 22 + rand() * 38;
          const h = 16 + rand() * 28;
          return <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={c.mapBldg} />;
        })}
      </g>

      {/* road casings (thicker, darker outline) */}
      <g stroke={c.mapBase} fill="none">
        {roads.map((r, i) => r.type === 'v'
          ? <line key={i} x1={r.x} y1="0" x2={r.x} y2={H} strokeWidth={r.w + 2} />
          : <line key={i} x1="0" y1={r.y} x2={W} y2={r.y} strokeWidth={r.w + 2} />)}
      </g>
      {/* roads */}
      <g stroke={c.mapRoad} fill="none" strokeLinecap="round">
        {roads.map((r, i) => r.type === 'v'
          ? <line key={i} x1={r.x} y1="0" x2={r.x} y2={H} strokeWidth={r.w} />
          : <line key={i} x1="0" y1={r.y} x2={W} y2={r.y} strokeWidth={r.w} />)}
      </g>
      {/* highlighted spine road */}
      <line x1="0" y1={H*0.5} x2={W} y2={H*0.5} stroke={c.mapRoadHi} strokeWidth="4" opacity="0.7" />

      {/* labels (subtle) */}
      <g fontFamily={Tok.font.body} fontSize="9" fill={c.text3} opacity="0.7" letterSpacing="0.5">
        <text x={W*0.22} y={H*0.28} transform={`rotate(-2 ${W*0.22} ${H*0.28})`}>HUDSON ST</text>
        <text x={W*0.55} y={H*0.62} transform={`rotate(2 ${W*0.55} ${H*0.62})`}>BROAD AVE</text>
        <text x={W*0.15} y={H*0.92} fill={c.text3} opacity="0.5">EAST RIVER</text>
      </g>

      {/* route polyline */}
      {showRoute && pickup && dropoff && (
        <RoutePath
          pickup={pickup} dropoff={dropoff}
          W={W} H={H} animated={routeAnimated}
        />
      )}

      {/* pickup / dropoff pins */}
      {showPins && pickup && (
        <Pin x={pickup.x * W} y={pickup.y * H} color={c.mint} label="A" />
      )}
      {showPins && dropoff && (
        <Pin x={dropoff.x * W} y={dropoff.y * H} color={c.orange} label="B" />
      )}

      {/* driver locations */}
      {drivers.map((d, i) => (
        <DriverPin key={i} x={d.x * W} y={d.y * H} pulse={showDriverPulse} bearing={d.bearing || 0} />
      ))}
    </svg>
  );
}

function RoutePath({ pickup, dropoff, W, H, animated }) {
  const x1 = pickup.x * W, y1 = pickup.y * H;
  const x2 = dropoff.x * W, y2 = dropoff.y * H;
  // L-shape route with rounded corner
  const midX = x2;
  const d = `M ${x1} ${y1} L ${x1} ${(y1+y2)/2} Q ${x1} ${y2} ${(x1+midX)/2} ${y2} L ${midX} ${y2}`;
  return (
    <g>
      <path d={d} stroke={Tok.color.mint} strokeWidth="5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
      <path d={d} stroke={Tok.color.mint} strokeWidth="3.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        style={animated ? {
          strokeDasharray: '600',
          strokeDashoffset: '600',
          animation: 'rt-draw 1.5s ease-out 0.2s forwards',
        } : null}/>
      <style>{`
        @keyframes rt-draw { to { stroke-dashoffset: 0; } }
        @keyframes rt-pulse { 0% { r: 12; opacity: .8 } 100% { r: 32; opacity: 0 } }
        @keyframes rt-flicker { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
      `}</style>
    </g>
  );
}

function Pin({ x, y, color, label }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="18" fill={color} opacity="0.18" />
      <path d="M0,-22 C-10,-22 -16,-14 -16,-6 C-16,4 -8,12 0,22 C8,12 16,4 16,-6 C16,-14 10,-22 0,-22 Z"
        fill={color} />
      <circle r="6" fill="#0a0e1a" />
      <text textAnchor="middle" y="-3" fontFamily={Tok.font.display} fontWeight="700" fontSize="11" fill={color}>{label}</text>
    </g>
  );
}

function DriverPin({ x, y, pulse, bearing = 0 }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {pulse && (
        <circle r="12" fill={Tok.color.mint} opacity="0.5"
          style={{ animation: 'rt-pulse 2s ease-out infinite', transformOrigin: 'center' }}/>
      )}
      <circle r="13" fill={Tok.color.bg} />
      <circle r="10" fill={Tok.color.mint} />
      <g transform={`rotate(${bearing})`}>
        <path d="M0,-6 L4,4 L0,2 L-4,4 Z" fill={Tok.color.bg} />
      </g>
    </g>
  );
}

Object.assign(window, { MapBg, Pin, DriverPin, RoutePath });
