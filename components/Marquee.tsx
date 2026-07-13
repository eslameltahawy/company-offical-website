'use client'

/*
  SEAMLESS MARQUEE — real brand colors
  ─────────────────────────────────────
  Two identical sets inside one animated flex container.
  Animation: translateX(0) → translateX(-50%)
  Hover pauses the track — no scale.
*/

type Logo = {
  name: string
  color: string
  bg: string
} & (
  | { type: 'icon'; icon: string }
  | { type: 'img'; src: string }
)

const logos: Logo[] = [
  { type: 'icon', name: 'Stripe',       icon: 'fab fa-stripe-s',  color: '#635BFF', bg: 'rgba(99,91,255,0.1)'  },
  { type: 'icon', name: 'Microsoft',    icon: 'fab fa-microsoft',  color: '#0078D4', bg: 'rgba(0,120,212,0.1)'  },
  { type: 'icon', name: 'AWS',          icon: 'fab fa-aws',        color: '#FF9900', bg: 'rgba(255,153,0,0.1)'  },
  { type: 'icon', name: 'Shopify',      icon: 'fab fa-shopify',    color: '#96BF48', bg: 'rgba(150,191,72,0.1)' },
  { type: 'img',  name: 'Salla',        src: '/salla.png',         color: '#004F59', bg: 'rgba(0,79,89,0.08)'   },
  { type: 'icon', name: 'Google Cloud', icon: 'fab fa-google',     color: '#4285F4', bg: 'rgba(66,133,244,0.1)' },
  { type: 'icon', name: 'Slack',        icon: 'fab fa-slack',      color: '#4A154B', bg: 'rgba(74,21,75,0.1)'   },
  { type: 'icon', name: 'Salesforce',   icon: 'fab fa-salesforce', color: '#00A1E0', bg: 'rgba(0,161,224,0.1)'  },
  { type: 'icon', name: 'Zapier',       icon: 'fas fa-bolt',       color: '#FF4A00', bg: 'rgba(255,74,0,0.1)'   },
  { type: 'icon', name: 'HubSpot',      icon: 'fas fa-chart-line', color: '#FF7A59', bg: 'rgba(255,122,89,0.1)' },
  { type: 'icon', name: 'SAP',          icon: 'fas fa-database',   color: '#0FAAFF', bg: 'rgba(15,170,255,0.1)' },
]

function LogoChip({ logo, suffix }: { logo: Logo; suffix: string }) {
  return (
    <div
      className="flex flex-none items-center gap-3 cursor-default"
      style={{ padding: '0 2.5rem' }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
        style={{ background: logo.bg, border: `1px solid ${logo.color}28` }}
      >
        {logo.type === 'img' ? (
          <img
            src={logo.src}
            alt={logo.name}
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 6 }}
          />
        ) : (
          <i className={`${logo.icon} text-lg`} style={{ color: logo.color }} />
        )}
      </div>
      <span
        className="text-sm font-semibold whitespace-nowrap"
        style={{ fontFamily: 'Cairo', color: 'rgba(148,163,184,0.55)' }}
        key={logo.name + suffix}
      >
        {logo.name}
      </span>
    </div>
  )
}

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex flex-none items-center" aria-hidden={hidden}>
      {logos.map((logo) => (
        <LogoChip key={logo.name + (hidden ? '-b' : '-a')} logo={logo} suffix={hidden ? '-b' : '-a'} />
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

      <div
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          overflow: 'hidden',
          direction: 'ltr',
        }}
      >
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
