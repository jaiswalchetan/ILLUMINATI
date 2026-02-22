
import React from 'react';
import { 
  Building2, ChevronRight, ChevronLeft, Presentation, TrendingUp, ShieldCheck, Sparkles,
  Play, ClipboardList, AlertCircle, Coins, Puzzle, TrendingDown, Scale, Cloud, HardHat,
  BarChart3, Calculator, Banknote, Warehouse, CheckCircle2, Zap, ArrowRight, Globe,
  Users, Target, MoveUpRight, LayoutDashboard, FileText, CircleDollarSign, Layers,
  Rocket, Shield, Star, Cpu, ZapOff, GanttChart, ArrowUpRight, BarChart, Megaphone,
  Code, Server, HandCoins, PieChart, Mail, User as UserIcon, Fingerprint, Palette,
  MapPin, Network, Briefcase, HeartHandshake
} from 'lucide-react';

const InvestorModule: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    { type: 'Title', content: { title: 'ILLUMINATI ERP', subtitle: 'Smart ERP for Construction & Infrastructure Industry', tagline: 'Illuminating efficiency in the infrastructure landscape.' } },
    {
      type: 'Problem',
      title: 'The Core Challenge',
      subtitle: "Construction is the world's second least digitized industry. The friction is real.",
      problems: [
        { icon: <ClipboardList className="w-8 h-8 text-rose-500" />, title: "Manual Project Tracking", desc: "Lack of digitization leads to massive data gaps and delayed site reporting." },
        { icon: <TrendingDown className="w-8 h-8 text-rose-500" />, title: "No Real-time Cost Control", desc: "Invisible burn rates lead to budget overruns that are only detected post-facto." },
        { icon: <Scale className="w-8 h-8 text-rose-500" />, title: "GST Compliance Issues", desc: "Complexity in tax calculations and credit tracking causes legal and financial risk." }
      ]
    },
    {
      type: 'Solution',
      title: 'The Solution',
      subtitle: 'Cloud-based Construction ERP designed for the high-velocity infrastructure sector.',
      solutions: [
        { icon: <HardHat className="w-6 h-6 text-indigo-400" />, title: "Project Tracking", desc: "Live site logs with geo-fencing and real-time activity streaming." },
        { icon: <BarChart3 className="w-6 h-6 text-indigo-400" />, title: "Budget vs Actual Control", desc: "Dynamic cost variance analysis (EAC) to prevent overruns." },
        { icon: <Sparkles className="w-6 h-6 text-indigo-400" />, title: "AI-based Insights", desc: "Strategic intelligence to optimize cash-runway." }
      ]
    },
    {
      type: 'Market',
      title: 'Market Opportunity',
      subtitle: "Capturing the backbone of India's infrastructure boom.",
      metrics: [
        { icon: <Globe className="w-10 h-10 text-indigo-400" />, label: "India Construction Market", value: "$600B+", sub: "Projected TAM by 2025" },
        { icon: <Building2 className="w-10 h-10 text-indigo-400" />, label: "SME Contractors", value: "50,000+", sub: "Serviceable Addressable Market" },
        { icon: <Target className="w-10 h-10 text-emerald-400" />, label: "Initial SaaS Target", value: "5,000", sub: "Beachhead Market Selection" }
      ]
    },
    {
      type: 'Revenue',
      title: 'Revenue Model',
      subtitle: 'Diversified income streams combining recurring SaaS with implementation & AMC.',
      tiers: [
        { name: 'Starter', price: '₹2,999', period: '/month', features: ['Up to 3 Projects', '5 Total Users', 'Basic Accounting'], icon: <Layers className="w-10 h-10 text-slate-400" />, color: 'bg-white/5 border-white/10' },
        { name: 'Professional', price: '₹6,999', period: '/month', features: ['Unlimited Projects', '20 Total Users', 'Full GST Engine'], icon: <Zap className="w-10 h-10 text-indigo-400" />, color: 'bg-indigo-600 border-indigo-400 shadow-xl', popular: true },
        { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited Scale', 'Full API Cluster', 'White Labeling'], icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />, color: 'bg-white/5 border-white/10' }
      ],
      nonSub: [
        { icon: <HeartHandshake className="w-5 h-5" />, label: 'Setup Fee', value: '₹25k – ₹1L' },
        { icon: <ShieldCheck className="w-5 h-5" />, label: 'AMC Support', value: '15% per Year' }
      ]
    },
    {
      type: 'Strategy',
      title: 'Target Strategy (India Focus)',
      subtitle: "Winning the Mumbai-Pune infrastructure corridor and beyond.",
      segments: [
        { icon: <MapPin className="w-10 h-10 text-rose-400" />, label: 'Mumbai Contractors', desc: 'Focus on Tier 1 metro projects.' },
        { icon: <Briefcase className="w-10 h-10 text-indigo-400" />, label: 'Contracting Firms', desc: 'Direct software adoption at firm level.' },
        { icon: <Building2 className="w-10 h-10 text-emerald-400" />, label: 'Real Estate SMEs', desc: 'High volume residential developers.' },
        { icon: <Network className="w-10 h-10 text-amber-400" />, label: 'Channel Partners', desc: 'Scalable network of industry resellers.' }
      ]
    },
    {
      type: 'Projection',
      title: 'Financial Projection',
      subtitle: 'Exponential scale enabled by high-retention SaaS.',
      years: [
        { year: 'Year 1', value: '₹1 Cr', height: 'h-1/4', color: 'bg-indigo-900/40', multiplier: 'Foundation' },
        { year: 'Year 2', value: '₹5 Cr', height: 'h-1/2', color: 'bg-indigo-600/60', multiplier: '5x Growth' },
        { year: 'Year 3', value: '₹20 Cr', height: 'h-full', color: 'bg-indigo-500', multiplier: '4x Scaling' }
      ]
    },
    {
      type: 'Funding',
      title: 'Funding Ask',
      subtitle: 'Strategic capital for market dominance.',
      ask: '₹1–2 Cr',
      allocation: [
        { icon: <Code className="w-6 h-6" />, label: 'Development', percent: 40, desc: 'Mobile app & AI engine' },
        { icon: <Megaphone className="w-6 h-6" />, label: 'Marketing', percent: 30, desc: 'SME acquisition' }
      ]
    },
    {
      type: 'CTA',
      title: 'Join the Revolution',
      subtitle: "Let's build the future together.",
      contact: { founder: 'Sameer Soni', email: 'sameer@illuminatierp.com', website: 'www.illuminatierp.com' }
    }
  ];

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col animate-in fade-in duration-700">
      <div className="flex-1 bg-slate-950 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-12 text-white">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-6xl">
          {currentSlide === 0 && (
            <div className="text-center space-y-12">
              <h1 className="text-[100px] font-black italic tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-500">
                ILLUMINATI <span className="text-indigo-500">ERP</span>
              </h1>
              <p className="text-3xl font-bold text-indigo-300">{slides[0].content?.subtitle}</p>
            </div>
          )}

          {currentSlide === 4 && (
            <div className="space-y-12 animate-in slide-in-from-right-8 duration-700">
               <div className="text-center">
                  <h2 className="text-7xl font-black tracking-tighter uppercase italic">Revenue Model</h2>
                  <p className="text-slate-400 text-xl font-medium mt-4">{slides[4].subtitle}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {slides[4].tiers?.map((tier, i) => (
                   <div key={i} className={`${tier.color} p-8 rounded-[40px] border relative overflow-hidden flex flex-col justify-between`}>
                     <div>
                       <h3 className="text-2xl font-black mb-1">{tier.name}</h3>
                       <p className="text-4xl font-black tracking-tighter mb-6">{tier.price}</p>
                       <ul className="space-y-3">
                         {tier.features.map((f, j) => (
                           <li key={j} className="text-[11px] font-bold flex items-center gap-2">
                             <CheckCircle2 className="w-4 h-4 text-indigo-300" /> {f}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 ))}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/5 p-8 rounded-[40px] border border-white/10">
                  <div className="space-y-4">
                     <h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs italic">Ancillary Revenue (High Net Margin)</h4>
                     <div className="grid grid-cols-2 gap-4">
                        {slides[4].nonSub?.map((item, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                             <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">{item.icon}</div>
                             <div>
                                <p className="text-white text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                                <p className="text-lg font-black text-white">{item.value}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                  <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20">
                     <p className="text-sm font-bold leading-relaxed text-indigo-200">
                       Subscription revenue is amplified by a <span className="text-white font-black">15% Annual Support</span> model and one-time <span className="text-white font-black">Onboarding Fees</span>, ensuring healthy day-one cash flow.
                     </p>
                  </div>
               </div>
            </div>
          )}

          {currentSlide === 5 && (
            <div className="space-y-16 animate-in slide-in-from-right-8 duration-700">
               <div className="text-center">
                  <h2 className="text-7xl font-black tracking-tighter uppercase italic italic">Target Strategy</h2>
                  <p className="text-slate-400 text-2xl font-medium mt-4">Capturing the High-Velocity India Market</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {slides[5].segments?.map((seg, i) => (
                   <div key={i} className="bg-white/5 p-10 rounded-[48px] border border-white/10 text-center group hover:bg-white/10 transition-all">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                        {React.cloneElement(seg.icon as React.ReactElement<any>, { className: 'text-indigo-400' })}
                      </div>
                      <h4 className="text-white font-black text-xl uppercase tracking-tighter mb-4">{seg.label}</h4>
                      <p className="text-slate-400 text-xs font-bold leading-relaxed">{seg.desc}</p>
                   </div>
                 ))}
               </div>
               <div className="flex justify-center">
                  <div className="bg-indigo-600 px-12 py-6 rounded-full shadow-[0_0_50px_rgba(79,70,229,0.4)] flex items-center gap-6">
                     <MapPin className="w-8 h-8 text-white" />
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Expansion Hub</p>
                        <p className="text-2xl font-black italic">Mumbai-Pune Infrastructure Corridor</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {currentSlide === 8 && (
            <div className="text-center space-y-12">
               <h2 className="text-[120px] font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 uppercase">THANK YOU</h2>
               <div className="space-y-2">
                  <p className="text-indigo-400 font-black uppercase tracking-widest text-sm italic">{slides[8].contact?.founder}</p>
                  <p className="text-2xl font-bold text-white tracking-tight">{slides[8].contact?.email}</p>
               </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-12 flex items-center gap-6 bg-white/5 px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-xl">
          <button onClick={prevSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-indigo-500 w-8' : 'bg-slate-700'}`} />
            ))}
          </div>
          <button onClick={nextSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="w-6 h-6" /></button>
        </div>
      </div>
    </div>
  );
};

export default InvestorModule;
