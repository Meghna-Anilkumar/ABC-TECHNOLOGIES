

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              🌍
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">ABC</h1>
              <p className="text-xs text-gray-400 -mt-1">Technologies</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#about" className="hover:text-green-400 transition">About</a>
            <a href="#services" className="hover:text-green-400 transition">Services</a>
            <a href="#sectors" className="hover:text-green-400 transition">Sectors</a>
            <a href="#contact" className="hover:text-green-400 transition">Contact</a>
          </div>
          <button className="px-6 py-2.5 bg-green-600 hover:bg-green-500 rounded-full text-sm font-medium transition">
            Contact Us
          </button>
        </div>
      </nav>

      {/* Hero Section - Placeholder */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#0f0_0%,transparent_70%)] opacity-20"></div>
        <div className="text-center z-10 px-6 max-w-5xl">
          <h1 className="text-7xl md:text-8xl font-bold leading-none tracking-tighter mb-6">
            GLOBAL TRADING &amp;<br />
            <span className="text-green-500">INTELLIGENT</span><br />
            INFRASTRUCTURE
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Delivering engineered commodities, technical consulting, and advanced technology solutions worldwide.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-medium text-lg transition glow-green">
              Discuss a Project
            </button>
            <button className="px-8 py-4 border border-white/30 hover:border-white/60 rounded-xl font-medium text-lg transition">
              Explore Capabilities →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;