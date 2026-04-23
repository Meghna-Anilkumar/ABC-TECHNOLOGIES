// frontend/src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { serviceService } from '../services/serviceService';
import type { IService } from '../types';

const Home = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services');
        // Fallback services from Figma
        setServices([
          { _id: '1', title: "Global Trading & Export", description: "Sourcing, compliance, documentation, and cross-border logistics with precision.", icon: "cube", order: 1, isActive: true },
          { _id: '2', title: "Technical Consultation & Engineering Advisory", description: "Consultation led by engineers with real-world execution experience.", icon: "cube", order: 2, isActive: true },
          { _id: '3', title: "Technology Delivery", description: "Enabling intelligent infrastructure through advanced technologies.", icon: "cube", order: 3, isActive: true },
          { _id: '4', title: "Solution Delivery", description: "Enabling intelligent infrastructure through advanced technologies.", icon: "cube", order: 4, isActive: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navbar - Exact Figma */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">ABC</h1>
              <p className="text-[10px] text-gray-400 -mt-1">Technologies</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <a href="#services" className="hover:text-green-400 transition-colors">SERVICES</a>
            <a href="#sectors" className="hover:text-green-400 transition-colors">SECTORS</a>
            <a href="#philosophy" className="hover:text-green-400 transition-colors">PHILOSOPHY</a>
            <a href="#global" className="hover:text-green-400 transition-colors">GLOBAL</a>
          </div>

          <button 
            onClick={() => window.location.href = '/admin/login'}
            className="px-8 py-3 border border-white/40 hover:border-white rounded-full text-sm font-medium transition-all"
          >
            Admin Portal
          </button>
        </div>
      </nav>

      {/* HERO SECTION - Exact Figma Match */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[url('/images/af03747c0c13e0e2ab779d52ace923e92659e791.png')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,100,0.18),transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center min-h-screen">
          <div className="space-y-8 z-10">
            <h1 className="text-6xl md:text-7xl font-bold leading-none tracking-tighter">
              GLOBAL TRADING &amp;<br />
              <span className="text-green-500">INTELLIGENT</span><br />
              INFRASTRUCTURE SOLUTIONS
            </h1>

            <p className="text-xl text-gray-300 max-w-lg">
              Delivering engineered commodities, technical consulting, and advanced technology solutions across energy, infrastructure, automation, and sustainability sectors worldwide.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-green-600 hover:bg-green-500 rounded-full font-semibold text-lg flex items-center gap-3 transition-all"
              >
                DISCUSS A PROJECT
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 border border-white/50 hover:border-white rounded-full font-semibold text-lg transition-all"
              >
                EXPLORE OUR CAPABILITIES →
              </motion.button>
            </div>
          </div>

         
        </div>
      </section>

      {/* WHAT WE DO / SERVICES */}
      <section id="services" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-3">WHAT WE DO</h2>
            <p className="text-3xl text-green-400 font-light">YOUR SINGLE-WINDOW PARTNER FOR GLOBAL SOLUTIONS</p>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              ABC Technologies LLC operates as a single-window partner for global clients seeking reliable sourcing, technical expertise, and deployment of advanced engineering and technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="h-96 bg-zinc-900 rounded-3xl animate-pulse" />)
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-zinc-950 border border-white/10 hover:border-green-500/60 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Globe className="w-9 h-9 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-5 leading-tight">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                  <div className="mt-10 pt-6 border-t border-white/10 flex items-center text-green-400 text-sm font-medium">
                    Learn More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SECTORS WE SERVE */}
      <section id="sectors" className="py-24 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tight mb-4">SECTORS WE SERVE</h2>
            <p className="text-xl text-gray-400">Our expertise spans across critical sectors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Power & Energy", desc: "Advanced Solutions For Power Generation, Distribution, And Energy Optimization" },
              { num: "02", title: "Real Estate & Infrastructure", desc: "Smart Building Systems And Intelligent Infrastructure Management" },
              { num: "03", title: "Industrial & Manufacturing", desc: "Automation, Control Systems, And Predictive Maintenance Solutions" },
              { num: "04", title: "Agriculture & Water", desc: "Smart Irrigation And Sustainable Water Management" },
              { num: "05", title: "Institutional & Government", desc: "Scalable Solutions For Public Sector And Institutional Projects" },
            ].map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border border-white/10 p-8 rounded-3xl hover:border-green-500/40 transition-all group"
              >
                <div className="text-green-500 text-5xl font-bold mb-6 opacity-30 group-hover:opacity-100 transition">{sector.num}</div>
                <h3 className="text-2xl font-semibold mb-4">{sector.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING-FIRST PHILOSOPHY */}
      <section id="philosophy" className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <h2 className="text-5xl font-bold tracking-tight mb-6">ENGINEERING-FIRST PHILOSOPHY</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Operating at the intersection of engineering, commerce, and technology, enabling clients to source, design, and deploy reliable systems across energy, infrastructure, automation, and sustainability domains.
              </p>
            </div>
            <div className="md:col-span-7 grid md:grid-cols-2 gap-8">
              {[
                { title: "Independent & Engineering-Led", desc: "Our Decisions Are Driven By Technical Merit, Not Vendor Agreements." },
                { title: "Unified Expertise", desc: "Global Trading + Technical Consultation Under One Entity." },
                { title: "Retrofit-Focused", desc: "Vendor-Agnostic Approach Integrating With Existing Infrastructure." },
                { title: "Cross-Border Execution", desc: "Proven Capabilities Across International Markets." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                  <div className="text-green-500 text-4xl">✓</div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL OUTLOOK */}
      <section id="global" className="py-24 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold tracking-tight mb-4">WORLDWIDE OPERATIONS</h2>
          <p className="text-xl text-gray-400 mb-16">Operating from Dubai with strong operational ties across India, Africa, and other international markets.</p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["United Kingdom", "UAE", "India", "Kenya", "Tanzania", "South Africa"].map(city => (
              <div key={city} className="flex items-center gap-2 bg-zinc-900 px-6 py-3 rounded-3xl border border-white/10">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-6xl font-bold tracking-tighter mb-6">READY TO MOVE YOUR PROJECT FORWARD?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Consultative engineering expertise—from strategy and design through implementation to measurable operational performance.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="px-12 py-5 bg-green-600 hover:bg-green-500 rounded-2xl font-semibold text-lg transition-colors">
              START A PROJECT
            </button>
            <button className="px-12 py-5 border border-white/40 hover:border-white rounded-2xl font-semibold text-lg transition-colors">
              SCHEDULE A CALL
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-400 text-sm">
          © 2026 ABC Technologies LLC • UAE • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Home;