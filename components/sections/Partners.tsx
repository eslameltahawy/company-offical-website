'use client'

const partners = [
  { name: 'AWS', icon: 'fab fa-aws', color: '#FF9900' },
  { name: 'Shopify', icon: 'fab fa-shopify', color: '#96bf48' },
  { name: 'Stripe', icon: 'fab fa-stripe-s', color: '#635bff' },
  { name: 'Google Cloud', icon: 'fab fa-google', color: '#4285F4' },
  { name: 'Microsoft Azure', icon: 'fab fa-microsoft', color: '#00a4ef' },
  { name: 'Salesforce', icon: 'fab fa-salesforce', color: '#00a1e0' },
  { name: 'Slack', icon: 'fab fa-slack', color: '#4A154B' },
  { name: 'HubSpot', icon: 'fas fa-chart-line', color: '#ff7a59' },
  { name: 'Zapier', icon: 'fas fa-bolt', color: '#ff4a00' },
  { name: 'SAP', icon: 'fas fa-database', color: '#0070f2' },
]

// Duplicate for seamless infinite loop
const allPartners = [...partners, ...partners]

export default function Partners() {
  return (
    <section className="py-10 border-y border-[rgba(148,163,184,0.07)] overflow-hidden" style={{ background: 'rgba(10,16,32,0.5)' }}>
      <p
        className="text-center text-[10px] uppercase tracking-[3px] text-[#3d5270] mb-6 font-semibold"
        style={{ fontFamily: 'Inter' }}
      >
        Seamless Integration with Leading Platforms
      </p>

      {/* Marquee wrapper with fade edges */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {allPartners.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="flex items-center gap-2.5 px-8 border-r border-[rgba(148,163,184,0.06)] text-[#3d5270] hover:text-[inherit] transition-colors duration-300 group cursor-default whitespace-nowrap"
              style={{
                ['--hover-color' as string]: p.color,
              }}
            >
              <i
                className={`${p.icon} text-base transition-colors duration-300 group-hover:text-[var(--hover-color)]`}
              />
              <span
                className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#e2e8f8]"
                style={{ fontFamily: 'Inter' }}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
