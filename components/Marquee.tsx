'use client'

/*
  SEAMLESS MARQUEE
  ─────────────────
  Two identical flex-none sets inside one animated flex container.
  Animation: translateX(0) → translateX(-50%)
  Hover pauses the track — no scale.
  All logos use the single brand blue for a unified palette.
*/

const BLUE = '#2563eb'

const logos = [
  { name: 'Stripe',       icon: 'fab fa-stripe-s'   },
  { name: 'Azure',        icon: 'fab fa-microsoft'   },
  { name: 'AWS',          icon: 'fab fa-aws'         },
  { name: 'Shopify',      icon: 'fab fa-shopify'     },
  { name: 'Salesforce',   icon: 'fab fa-salesforce'  },
  { name: 'Google Cloud', icon: 'fab fa-google'      },
  { name: 'Slack',        icon: 'fab fa-slack'       },
  { name: 'Salla',        icon: 'fas fa-store'       },
  { name: 'Zapier',       icon: 'fas fa-bolt'        },
  { name: 'HubSpot',      icon: 'fas fa-chart-line'  },
  { name: 'SAP',          icon: 'fas fa-database'    },
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
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${BLUE}12`,
              border: `1px solid ${BLUE}28`,
            }}
          >
            <i className={`${logo.icon} text-lg`} style={{ color: BLUE }} />
          </div>
          <span
            className="text-sm font-semibold whitespace-nowrap"
            style={{ fontFamily: 'Cairo', color: 'rgba(148,163,184,0.5)' }}
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
