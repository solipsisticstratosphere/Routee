// App entry — compose all 15 screens + 2 system frames in a DesignCanvas

const PW = PHONE_W + FRAME_PAD * 2;     // 402
const PH = PHONE_H + FRAME_PAD * 2;     // 856

function Board({ children, white, time = '9:41' }) {
  // Wrap any screen in a Phone frame, centered on a neutral white background
  // (so the artboard's edge is clean even though the screen content is dark).
  return (
    <div style={{
      width: PW, height: PH, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Phone time={time}>{children}</Phone>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="shared" title="Shared · Routee" subtitle="Onboarding, auth, profile — common to both roles. 15 production screens, dark-first.">

        <DCArtboard id="splash2" label="01 · Splash & onboarding" width={PW} height={PH}>
          <Board><S_Splash/></Board>
        </DCArtboard>

        <DCArtboard id="auth" label="02 · Auth · OTP & role" width={PW} height={PH}>
          <Board><S_Auth/></Board>
        </DCArtboard>

        <DCArtboard id="profile" label="03 · Profile" width={PW} height={PH}>
          <Board><S_Profile/></Board>
        </DCArtboard>

      </DCSection>

      <DCSection id="customer" title="Customer flow" subtitle="Order → pay → track → confirm delivery">

        <DCArtboard id="c-home" label="04 · Home + Map" width={PW} height={PH}>
          <Board><S_Home/></Board>
        </DCArtboard>

        <DCArtboard id="c-plan" label="05 · Route planning" width={PW} height={PH}>
          <Board><S_Plan/></Board>
        </DCArtboard>

        <DCArtboard id="c-confirm" label="06 · Order confirmation" width={PW} height={PH}>
          <Board><S_Confirm/></Board>
        </DCArtboard>

        <DCArtboard id="c-pay" label="07 · Payment" width={PW} height={PH}>
          <Board><S_Pay/></Board>
        </DCArtboard>

        <DCArtboard id="c-track" label="08 · Live tracking" width={PW} height={PH}>
          <Board><S_Track/></Board>
        </DCArtboard>

        <DCArtboard id="c-qr" label="09 · Delivery + QR" width={PW} height={PH}>
          <Board><S_Delivery/></Board>
        </DCArtboard>

      </DCSection>

      <DCSection id="driver" title="Driver flow" subtitle="Go online → accept → navigate → scan → cash out">

        <DCArtboard id="d-dash" label="10 · Dashboard" width={PW} height={PH}>
          <Board><D_Dash/></Board>
        </DCArtboard>

        <DCArtboard id="d-incoming" label="11 · Incoming order" width={PW} height={PH}>
          <Board><D_Incoming/></Board>
        </DCArtboard>

        <DCArtboard id="d-nav" label="12 · Navigation to pickup" width={PW} height={PH}>
          <Board><D_NavPickup/></Board>
        </DCArtboard>

        <DCArtboard id="d-active" label="13 · Active delivery" width={PW} height={PH}>
          <Board><D_Active/></Board>
        </DCArtboard>

        <DCArtboard id="d-scan" label="14 · QR scan confirm" width={PW} height={PH}>
          <Board><D_Scan/></Board>
        </DCArtboard>

        <DCArtboard id="d-earn" label="15 · Earnings summary" width={PW} height={PH}>
          <Board><D_Earnings/></Board>
        </DCArtboard>

      </DCSection>

      <DCSection id="system" title="Design system" subtitle="Tokens & component library">

        <DCArtboard id="tokens" label="Color · type · spacing" width={PW} height={PH}>
          <Board><S_Tokens/></Board>
        </DCArtboard>

        <DCArtboard id="components" label="Components" width={PW} height={PH}>
          <Board><S_Components/></Board>
        </DCArtboard>

      </DCSection>

    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
