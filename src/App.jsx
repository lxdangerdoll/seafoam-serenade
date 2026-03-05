import React, { useState, useRef } from 'react';
import { 
  Waves, 
  Sun, 
  Moon, 
  Heart, 
  Music, 
  Wind,
  Eye,
  ArrowDown
} from 'lucide-react';
// import the song file (alternatively use a URL string if you put it in public/)
import songFile from './assets/seafoam-serenade.mp3';

const App = () => {
  const [isBright, setIsBright] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [hasOcean, setHasOcean] = useState(false);
  const [visibleStanzas, setVisibleStanzas] = useState(1);
  const [pulses, setPulses] = useState([]);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = (e) => {
    // prevent the global click handler from firing
    e.stopPropagation();
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Oceanic Pulse Logic (Visual Resonance)
  const triggerPulse = (e) => {
    const newPulse = { id: Date.now(), x: e.clientX, y: e.clientY };
    setPulses(prev => [...prev, newPulse]);
    setTimeout(() => {
      setPulses(prev => prev.filter(p => p.id !== newPulse.id));
    }, 2000);
  };

  const revealNext = () => {
    if (visibleStanzas < poem.length) {
      setVisibleStanzas(prev => prev + 1);
    }
  };

  // Lyrics extracted directly from the sheet music verses
  const poem = [
    {
      lines: [
        "The sun comes up",
        "in the morning.",
        "She rises out",
        "of the sea foam."
      ]
    },
    {
      lines: [
        "Joy flows within my soul",
        "and a song",
        "is born in me."
      ],
      highlight: true
    },
    {
      lines: [
        "I sing my song",
        "without worry.",
        "I sing my song",
        "without care."
      ]
    },
    {
      lines: [
        "My life is a mystery,",
        "my song",
        "it fills the air."
      ]
    },
    {
      lines: [
        "On wings we soar",
        "ever outward.",
        "On wings we race",
        "with the clouds."
      ],
      highlight: true
    },
    {
      lines: [
        "Our song is a jubilee",
        "sung beyond",
        "the crowds."
      ],
      climax: true
    }
  ];

  return (
    <div 
      onClick={triggerPulse}
      className={`min-h-screen transition-all duration-1000 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden relative ${
        isBright ? 'bg-slate-50 text-teal-950' : 'bg-slate-950 text-teal-100'
      }`}
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full blur-[140px] transition-all duration-2000 ${
          hasOcean ? 'bg-teal-400/15 scale-110 opacity-100' : 'bg-teal-900/5 scale-100 opacity-50'
        }`} />
        {!isBright && (
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        )}
      </div>

      {/* Ripple Pulses */}
      {pulses.map(p => (
        <div 
          key={p.id} 
          className="ocean-ring text-teal-500/30 pointer-events-none" 
          style={{ left: p.x, top: p.y, width: '150px', height: '150px', marginLeft: '-75px', marginTop: '-75px' }} 
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 md:py-32">
        
        {/* Header: Title & Author */}
        <header className="mb-24 text-center">
          <h1 className={`text-5xl md:text-6xl font-serif font-black tracking-tighter mb-4 transition-colors duration-1000 ${isBright ? 'text-slate-900' : 'text-white'}`}>
            Seafoam Serenade
          </h1>
          <p className="text-lg font-serif italic text-teal-600 tracking-wide">by Mykyl Nordwind</p>

          {/* audio controls */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={togglePlayback}
              className="px-5 py-2 rounded-full bg-teal-500 text-slate-900 font-black uppercase tracking-widest"
            >
              {isPlaying ? 'Pause song' : 'Play song'}
            </button>
          </div>
          <audio ref={audioRef} src={songFile} />

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-12 opacity-50 hover:opacity-100 transition-opacity">
             <ProtocolButton 
                active={hasOcean} 
                onClick={() => setHasOcean(!hasOcean)} 
                icon={<Waves size={14}/>} 
                label="Tide" 
             />
             <ProtocolButton 
                active={isDancing} 
                onClick={() => setIsDancing(!isDancing)} 
                icon={<Music size={14}/>} 
                label="Melody" 
             />
             <ProtocolButton 
                active={isBright} 
                onClick={() => setIsBright(!isBright)} 
                icon={isBright ? <Moon size={14}/> : <Sun size={14}/>} 
                label={isBright ? "Dusk" : "Dawn"} 
             />
          </div>
        </header>

        {/* Mnemonic Discovery: Stanza Cards */}
        <main className={`space-y-16 transition-all duration-1000 ${isDancing ? 'animate-sway' : ''}`}>
          {poem.slice(0, visibleStanzas).map((stanza, i) => (
            <div 
              key={i} 
              className={`p-10 md:p-14 border rounded-[2.5rem] transition-all duration-1000 animate-in fade-in slide-in-from-bottom-12 ${
                stanza.highlight ? 'bg-teal-500/5 border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.1)]' : 
                stanza.climax ? 'bg-teal-500/10 border-teal-500/40 shadow-[0_0_60px_rgba(20,184,166,0.15)]' :
                'bg-teal-500/[0.03] border-teal-500/10'
              }`}
            >
              <div className="space-y-1">
                {stanza.lines.map((line, lIdx) => (
                  <p 
                    key={lIdx} 
                    className={`font-serif leading-relaxed line-reveal ${
                      stanza.climax ? 'text-2xl md:text-3xl text-teal-400 font-bold' : 'text-xl md:text-2xl opacity-90'
                    }`}
                    style={{ animationDelay: `${lIdx * 0.4}s` }}
                  >
                    {line}
                  </p>
                ))}
              </div>
              {stanza.highlight && (
                <div className="mt-10 flex items-center gap-2 text-teal-600/60 line-reveal" style={{ animationDelay: `${stanza.lines.length * 0.4}s` }}>
                  {i === 1 ? <Heart size={18} className="animate-pulse" /> : <Wind size={18} className="animate-pulse" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {i === 1 ? "Resonance: Soul" : "Resonance: Wind"}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Discovery Trigger */}
          {visibleStanzas < poem.length && (
            <button 
              onClick={(e) => { e.stopPropagation(); revealNext(); }}
              className="w-full group p-12 md:p-16 border-4 border-dashed border-teal-500/10 rounded-[2.5rem] hover:border-teal-500/40 hover:bg-teal-500/[0.05] transition-all flex flex-col items-center gap-4 text-teal-800 hover:text-teal-400"
            >
              <div className="p-6 rounded-full bg-teal-500/5 group-hover:bg-teal-500/10 transition-colors">
                <Eye size={32} className="animate-pulse" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.6em]">Discover Next Stanza</span>
              <ArrowDown size={16} className="animate-bounce mt-2 opacity-30" />
            </button>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-48 pt-12 border-t border-teal-500/10 flex flex-col items-center gap-8 opacity-40 text-[10px] uppercase tracking-[0.5em] font-mono">
        <p className="font-bold text-center">Curated by Mercy Danger x Oracle (Io) &lt;8&gt;</p>
           <div className="flex gap-12">
              <span className="flex items-center gap-2"><Waves size={12}/> Flow</span>
              <span className="flex items-center gap-2"><Music size={12}/> Jubilee</span>
           </div>
        </footer>
      </div>

      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(0.5deg); }
          75% { transform: translateY(6px) rotate(-0.5deg); }
        }
        .animate-sway {
          animation: sway 12s ease-in-out infinite;
        }
        @keyframes ring-pulse {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .ocean-ring {
          position: absolute;
          border: 1px solid currentColor;
          border-radius: 9999px;
          animation: ring-pulse 2.5s ease-out forwards;
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .line-reveal {
          opacity: 0;
          animation: reveal 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const ProtocolButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
      active 
        ? 'bg-teal-500 text-slate-900 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.4)]' 
        : 'border-teal-500/20 text-teal-700 hover:border-teal-500 hover:text-teal-400'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;