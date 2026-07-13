'use client'

/*
  SEAMLESS MARQUEE
  ─────────────────
  Two identical flex-none sets inside one animated flex container.
  Animation: translateX(0) → translateX(-50%)
  Hover pauses the track (animation-play-state: paused via CSS).
  No scale on hover — only pause.
*/

const logos = [
  { name: 'Stripe',       icon: 'fab fa-stripe-s',  color: '#635bff' },
  { name: 'Azure',        icon: 'fab fa-microsoft', color: '#00a4ef' },
  { name: 'AWS',          icon: 'fab fa-aws',        color: '#FF9900' },
  { name: 'Shopify',      icon: 'fab fa-shopify',    color: '#96bf48' },
  { name: 'Salesforce',   icon: 'fab fa-salesforce', color: '#00a1e0' },
  { name: 'Google Cloud', icon: 'fab fa-google',     color: '#4285F4' },
  { name: 'Slack',        icon: 'fab fa-slack',      color: '#611f69' },
  { name: 'Zapier',       icon: 'fas fa-bolt',       color: '#ff4a00' },
  { name: 'HubSpot',      icon: 'fas fa-chart-line', color: '#ff7a59' },
  { name: 'SAP',          icon: 'fas fa-database',   color: '#0070f2' },
]

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex flex-none items-center" aria-hidden={hidden}>
      {logos.map((logo) => (
        <div
          key={logo.name + (hidden ? '-b' : '-a')}
          className="flex flex-none items-center gap-3 cursor-default"
          style={{ padding: '0 3rem' }}
        >
          {/* Icon container — original brand color, no scale on hover */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${logo.color}14`,
              border: `1px solid ${logo.color}28`,
            }}
          >
            <i
              className={`${logo.icon} text-xl`}
              style={{ color: logo.color }}
            />
          </div>
          {/* Name */}
          <span
            className="text-sm font-semibold whitespace-nowrap"
            style={{
              fontFamily: 'Cairo',
              color: `${logo.color}cc`,
            }}
          >
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <section
      className="w-full py-12 border-y border-[rgba(148,163,184,0.07)]"
      style={{ background: 'rgba(10,16,32,0.5)', overflow: 'hidden' }}
    >
      <p
        className="text-center text-[10px] uppercase tracking-[3px] text-[#3d5270] mb-8 font-semibold"
        style={{ fontFamily: 'Cairo' }}
      >
        تكامل سلس مع المنصات العالمية
      </p>

      {/* Fade edges */}
      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          overflow: 'hidden',
          direction: 'ltr',
        }}
      >
        {/* Animated track — hover pauses via CSS, no scale */}
        <div
          className="flex animate-marquee-continuous"
          style={{ width: 'max-content' }}
        >
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  )
}
