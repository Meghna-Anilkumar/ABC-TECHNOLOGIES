import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { serviceService } from '../services/serviceService';
import type { IService } from '../types';

// Inject fonts
const fontStyle = document.createElement('style');
fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap');
  @font-face {
    font-family: 'Eloran';
    src: url('/fonts/Eloran.woff2') format('woff2'),
         url('/fonts/Eloran.woff') format('woff'),
         url('/fonts/Eloran.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
if (!document.head.querySelector('[data-abc-fonts]')) {
  fontStyle.setAttribute('data-abc-fonts', '1');
  document.head.appendChild(fontStyle);
}



// ─── Green check bullet ───────────────────────────────────────────────────────
const GreenBullet = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <polygon points="9,1 16,5 16,13 9,17 2,13 2,5" fill="#2d6b2d" stroke="#4CAF50" strokeWidth="1"/>
    <polyline points="6,9 8,11 12,7" stroke="#4CAF50" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const sectors = [
  { num: '01', title: 'Power & Energy', desc: 'Advanced Solutions For Power Generation, Distribution, And Energy Optimization' },
  { num: '02', title: 'Real Estate & Infrastructure', desc: 'Smart Building Systems And Intelligent Infrastructure Management' },
  { num: '03', title: 'Industrial & Manufacturing', desc: 'Automation, Control Systems, And Predictive Maintenance Solutions' },
  { num: '04', title: 'Agriculture & Water', desc: 'Smart Irrigation Intelligence And Sustainable Water Management' },
  { num: '05', title: 'Institutional & Government', desc: 'Scalable Solutions For Public Sector And Institutional Projects' },
];

const whyFeatures = [
  { title: 'Independent & Engineering-Led', desc: 'Our Decisions Are Driven By Technical Merit, Not Vendor Agreements.' },
  { title: 'Unified Expertise', desc: 'Global Trading + Technical Consultation Under One Entity.' },
  { title: 'Retrofit-Focused', desc: 'Vendor-Agnostic Approach Integrating With Existing Infrastructure.' },
  { title: 'Cross-Border Execution', desc: 'Proven Capabilities Across International Markets.' },
];

const commitments = [
  'Technical integrity',
  'Transparent commercial practices',
  'Long-term client partnerships',
  'Measurable operational value',
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services');
        setServices([
          { _id: '1', title: 'Global Trading & Export', description: 'Sourcing, compliance, documentation, and cross-border logistics with precision.', icon: 'cube', order: 1, isActive: true },
          { _id: '2', title: 'Technical Consultation & Engineering Advisory', description: 'Consultation led by engineers with real-world execution experience.', icon: 'cube', order: 2, isActive: true },
          { _id: '3', title: 'Technology Delivery', description: 'Enabling intelligent infrastructure through advanced technologies.', icon: 'cube', order: 3, isActive: true },
          { _id: '4', title: 'Solution Delivery', description: 'Enabling intelligent infrastructure through advanced technologies.', icon: 'cube', order: 4, isActive: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div style={{ fontFamily: "'Nunito Sans', sans-serif", background: '#080e08', color: '#fff', overflowX: 'hidden' }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(5,10,5,0.97)' : 'rgba(5,10,5,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'background 0.3s',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/images/logo.png" alt="ABC Technologies Logo" style={{ height: 44, width: 'auto' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px', lineHeight: 1.1 }}>ABC</div>
              <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.5px', marginTop: 1 }}>Technologies</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 40, fontSize: 13, fontWeight: 600, letterSpacing: '1.5px' }}>
            {['ABOUT', 'SERVICES', 'SECTORS'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#4CAF50')}
                onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
                {link}
              </a>
            ))}
          </div>

          <a href="#contact" style={{
            padding: '10px 28px', border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: 50, fontSize: 13, fontWeight: 600, letterSpacing: '1px',
            color: '#fff', textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}>
            CONTACT US
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 72, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url(/images/af03747c0c13e0e2ab779d52ace923e92659e791.png) center/cover no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,10,5,0.96) 0%, rgba(5,10,5,0.85) 50%, rgba(5,10,5,0.55) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 20% 55%, rgba(30,80,30,0.3) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(10,40,10,0.4), transparent)' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', minHeight: 'calc(100vh - 72px)' }}>
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: 'clamp(42px, 5vw, 66px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 28, fontFamily: "'Eloran', sans-serif" }}>
              GLOBAL TRADING &amp;<br />
              <span style={{ color: '#4CAF50' }}>INTELLIGENT</span><br />
              <span style={{ color: '#4CAF50' }}>INFRASTRUCTURE SOLUTIONS</span>
            </h1>
            <p style={{ fontSize: 17, color: '#b0b8b0', lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
              Delivering engineered commodities, technical consulting, and advanced technology solutions across energy, infrastructure, automation, and sustainability sectors worldwide.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button style={{ padding: '14px 32px', background: '#4CAF50', borderRadius: 50, fontWeight: 700, fontSize: 14, letterSpacing: '1px', border: 'none', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#3d9e3d')}
                onMouseLeave={e => (e.currentTarget.style.background = '#4CAF50')}>
                DISCUSS A PROJECT
              </button>
              <button style={{ padding: '14px 32px', background: 'transparent', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 50, fontWeight: 700, fontSize: 14, letterSpacing: '1px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}>
                EXPLORE OUR CAPABILITIES <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div />
        </div>
      </section>

      {/* ── WHAT WE DO / SERVICES ──────────────────────────────────────── */}
      <section id="services" style={{ padding: '100px 0 120px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(180deg,#060d06 0%,#080f08 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: 64 }}>
            <p style={{ color: '#4CAF50', fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>WHAT WE DO</p>
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 20, fontFamily: "'Eloran', sans-serif" }}>
              YOUR SINGLE-WINDOW PARTNER FOR<br />
              <span style={{ color: '#4CAF50' }}>GLOBAL SOLUTIONS</span>
            </h2>
            <p style={{ color: '#888', fontSize: 16, maxWidth: 580, lineHeight: 1.7 }}>
              ABC Technologies LLC operates as a single-window partner for global clients seeking reliable sourcing, technical expertise, and deployment of advanced engineering and technology solutions.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '2px' }}>
              <span style={{ color: '#4CAF50' }}>OUR</span> SERVICES
            </h3>
          </div>

          {/* Services grid — dynamic */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} style={{ height: 420, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))
            ) : (
              services.map((s, i) => (
                <div key={s._id} style={{
                  position: 'relative',
                  background: i === 2
                    ? 'linear-gradient(180deg, rgba(18,52,22,0.95) 0%, rgba(8,28,10,0.98) 100%)'
                    : 'linear-gradient(180deg, rgba(10,18,10,0.9) 0%, rgba(6,12,6,0.95) 100%)',
                  border: `1px solid ${i === 2 ? 'rgba(76,175,80,0.55)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 14,
                  padding: '0 0 28px 0',
                  display: 'flex', flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, transform 0.3s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(76,175,80,0.55)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = i === 2 ? 'rgba(76,175,80,0.55)' : 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>

                  {/* Hexagon — right-aligned in top area */}
                  <div style={{
                    width: '100%',
                    height: 210,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    padding: '24px 12px 0 28px',
                    overflow: 'hidden',
                  }}>
                    <img
                      src="/images/hexagon.svg"
                      alt=""
                      style={{
                        width: 175,
                        height: 175,
                        objectFit: 'contain',
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Card text + button */}
                  <div style={{ padding: '16px 28px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, lineHeight: 1.3, color: '#fff' }}>{s.title}</h3>
                    <p style={{ color: '#999', fontSize: 14, lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{s.description}</p>
                    <button style={{
                      padding: '13px 20px',
                      background: i === 2 ? '#4CAF50' : 'transparent',
                      border: `1px solid ${i === 2 ? '#4CAF50' : 'rgba(255,255,255,0.18)'}`,
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => {
                        if (i !== 2) {
                          (e.currentTarget as HTMLElement).style.borderColor = '#4CAF50';
                          (e.currentTarget as HTMLElement).style.color = '#4CAF50';
                        }
                      }}
                      onMouseLeave={e => {
                        if (i !== 2) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
                          (e.currentTarget as HTMLElement).style.color = '#fff';
                        }
                      }}>
                      LEARN MORE <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SECTORS WE SERVE — bg: /images/beam.png ───────────────────── */}
      <section id="sectors" style={{ position: 'relative', padding: '100px 0 120px', borderTop: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        {/* beam.png background — road/runway perspective */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/beam.png)', backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
        {/* lighter overlay so road image is visible like in screenshot */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,8,3,0.62)' }} />
        {/* fade to dark at top and bottom edges */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,10,5,0.55) 0%, transparent 25%, transparent 75%, rgba(5,10,5,0.55) 100%)' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 20, fontFamily: "'Eloran', sans-serif" }}>
              SECTORS <span style={{ color: '#4CAF50' }}>WE SERVE</span>
            </h2>
            <p style={{ color: '#aaa', fontSize: 17, maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
              Our expertise spans across critical sectors, delivering tailored solutions that drive efficiency and sustainability.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {sectors.map((s, i) => (
              <div key={s.num} style={{
                background: 'rgba(8,14,8,0.82)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: '28px 22px 28px',
                transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(76,175,80,0.5)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(15,35,15,0.92)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(8,14,8,0.82)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}>
                {/* Number badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(76,175,80,0.12)',
                  border: '1px solid rgba(76,175,80,0.35)',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#4CAF50',
                  marginBottom: 24,
                  letterSpacing: '0.5px',
                }}>{s.num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, lineHeight: 1.3, color: '#fff' }}>{s.title}</h3>
                <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY / ENGINEERING-FIRST PHILOSOPHY ─────────────────────────── */}
      <section id="about" style={{ padding: '100px 0 120px', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 80% 50%, rgba(10,40,10,0.2), transparent)' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p style={{ color: '#4CAF50', fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16 }}>WHY COMACON</p>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 24, fontFamily: "'Eloran', sans-serif" }}>
              ENGINEERING-FIRST<br />
              <span style={{ color: '#4CAF50' }}>PHILOSOPHY</span>
            </h2>
            <p style={{ color: '#888', fontSize: 15, lineHeight: 1.8, marginBottom: 48 }}>
              Operating at the intersection of engineering, commerce, and technology, enabling clients to source, design, and deploy reliable systems across energy, infrastructure, automation, and sustainability domains.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {whyFeatures.map((f) => (
                <div key={f.title} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(30,70,30,0.4)', border: '1px solid rgba(76,175,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GreenBullet />
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{f.title}</h4>
                    <p style={{ color: '#777', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: 'rgba(10,30,10,0.7)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: 16, padding: '40px' }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
                OUR <span style={{ color: '#4CAF50' }}>COMMITMENT</span>
              </h3>
              <p style={{ color: '#888', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                We are committed to delivering measurable value through every engagement.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {commitments.map(c => (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: '#ccc' }}>{c}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(76,175,80,0.2)' }}>
                <p style={{ color: '#4CAF50', fontSize: 14, fontWeight: 500, fontStyle: 'italic' }}>
                  Strong backing from Udot's R&D and technology ecosystem
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORLDWIDE OPERATIONS — bg: /images/map.jpg ─────────────────── */}
      <section style={{ position: 'relative', padding: '100px 0 120px', borderTop: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        {/* map.jpg background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/map.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        {/* dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,5,0.78)' }} />
        {/* subtle green centre glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 100% 60% at 50% 40%, rgba(10,40,10,0.45), transparent 70%)' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <p style={{ color: '#4CAF50', fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 12 }}>GLOBAL OUTLOOK</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 20, fontFamily: "'Eloran', sans-serif" }}>
            WORLDWIDE <span style={{ color: '#4CAF50' }}>OPERATIONS</span>
          </h2>
          <p style={{ color: '#888', fontSize: 16, maxWidth: 620, margin: '0 auto 72px' }}>
            Operating from Dubai with strong operational ties across India, Africa, and other international markets, supporting projects and exports worldwide.
          </p>

          {/* Map pins */}
          <div style={{ position: 'relative', height: 220, marginBottom: 64 }}>
            {[
              { label: 'United Kingdom', top: '5%',  left: '42%' },
              { label: 'UAE',            top: '40%', left: '57%' },
              { label: 'India',          top: '46%', left: '64%' },
              { label: 'Kenya',          top: '55%', left: '55%' },
              { label: 'Tanzania',       top: '62%', left: '56%' },
              { label: 'South Africa',   top: '73%', left: '54%' },
            ].map(pin => (
              <div key={pin.label} style={{ position: 'absolute', top: pin.top, left: pin.left, transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} color="#4CAF50" fill="rgba(76,175,80,0.3)" />
                <span style={{ fontSize: 13, color: '#ccc', whiteSpace: 'nowrap' }}>{pin.label}</span>
              </div>
            ))}
          </div>

          {/* 3 feature boxes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { title: 'International Trade',      desc: 'Cross-Border Exports And Trade Execution' },
              { title: 'Multi-Country Projects',   desc: 'Complex Deployments Across Regions' },
              { title: 'OEM Partnerships',         desc: 'Co-Engineered Solutions With Global Partners' },
            ].map((b, i) => (
              <div key={b.title} style={{ border: '1px solid rgba(76,175,80,0.3)', borderRadius: 12, padding: '28px 24px', background: i === 1 ? 'rgba(30,70,30,0.3)' : 'rgba(5,10,5,0.55)' }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── READY TO MOVE YOUR PROJECT FORWARD (CTA) ───────────────────── */}
      <section style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(10,60,10,0.55), transparent 70%)' }} />
        <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.35 }} viewBox="0 0 1440 260" preserveAspectRatio="none">
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 720 + (i - 7) * 100;
            return <line key={i} x1={x} y1="0" x2={720 + (i - 7) * 400} y2="260" stroke="#4CAF50" strokeWidth="0.8" />;
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = i * 40;
            const spread = (i / 7) * 0.8;
            return <line key={`h${i}`} x1={720 * (1 - spread)} y1={y} x2={720 * (1 + spread)} y2={y} stroke="#4CAF50" strokeWidth="0.6" />;
          })}
        </svg>

        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(36px,5vw,68px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.0, marginBottom: 24, fontFamily: "'Eloran', sans-serif" }}>
            READY TO MOVE YOUR PROJECT<br />FORWARD?
          </h2>
          <p style={{ fontSize: 17, color: '#888', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Consultative engineering expertise—from strategy and design through implementation to measurable operational performance.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <button style={{ padding: '16px 44px', background: '#4CAF50', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, letterSpacing: '1px', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#3d9e3d')}
              onMouseLeave={e => (e.currentTarget.style.background = '#4CAF50')}>
              START A PROJECT
            </button>
            <button style={{ padding: '16px 44px', background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', borderRadius: 10, fontWeight: 700, fontSize: 16, letterSpacing: '1px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)')}>
              SCHEDULE A CALL <MessageCircle size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['GLOBAL EXECUTION', 'ENGINEERING-LED APPROACH', 'VENDOR-AGNOSTIC SOLUTIONS'].map((tag, i) => (
              <span key={tag} style={{ fontSize: 13, letterSpacing: '2px', color: '#4CAF50', fontWeight: 600 }}>
                {i > 0 && <span style={{ color: '#333', marginRight: 32 }}>•</span>}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER — bg: /images/globe.jpg ──────────────────────────────── */}
      <footer id="contact" style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '72px 0 40px', overflow: 'hidden' }}>
        {/* globe.jpg background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/globe.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        {/* dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,10,4,0.88)' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <img src="/images/logo.png" alt="ABC Technologies Logo" style={{ height: 52, width: 'auto' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 22, lineHeight: 1.1 }}>ABC</div>
                  <div style={{ fontSize: 12, color: '#777', letterSpacing: '0.5px' }}>Technologies</div>
                </div>
              </div>
              <p style={{ color: '#4CAF50', fontSize: 14, fontStyle: 'italic', marginBottom: 16 }}>Energy Redefined</p>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>ABC Technologies<br />UAE</p>
            </div>

            {/* Quick Links */}
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '2px', marginBottom: 20 }}>QUICK LINKS</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['About Us', 'Services', 'Sectors', 'Contact'].map(l => (
                  <li key={l}><a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#4CAF50')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '2px', marginBottom: 20 }}>SERVICES</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Global Trading & Export', 'Technical Consultation & Engineering Advisory', 'Technology & Solution Delivery'].map(l => (
                  <li key={l}><a href="#" style={{ color: '#888', textDecoration: 'none', fontSize: 13, lineHeight: 1.6, transition: 'color 0.2s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#4CAF50')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '2px', marginBottom: 20 }}>CONTACT</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Phone size={16} color="#4CAF50" />
                  <span style={{ color: '#888', fontSize: 14 }}>+971 00 223 0000</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MessageCircle size={16} color="#4CAF50" />
                  <span style={{ color: '#888', fontSize: 14 }}>+971 00223 0000</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mail size={16} color="#4CAF50" />
                  <span style={{ color: '#888', fontSize: 14 }}>abc@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 28, textAlign: 'center' }}>
            <p style={{ color: '#444', fontSize: 13 }}>© 2026 ABC Technologies LLC • UAE • All Rights Reserved</p>
          </div>
        </div>
      </footer>

    </div>
  );
}