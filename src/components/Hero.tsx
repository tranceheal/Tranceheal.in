import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles, Moon, Sun } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  const playSingingChime = () => {
    soundscapes.playSingingBowl(528); // 528Hz Solfeggio frequency for inner peace and mental tranquility
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7F5] via-[#EBF4F2] to-[#F8FAF9] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-emerald-900/10">
      {/* Background Soft Organic Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-200/25 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-white/80 border border-teal-200/60 px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Trance Healing · Hypnotherapy · Past Life Regression · Reiki</span>
            </div>

            {/* Main Headline with Hinglish Touch */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.14] text-balance">
              Gently quiet your racing mind. <br className="hidden sm:inline" />
              <span className="italic font-normal text-teal-800">Pao Asli Sukoon aur Shanti.</span>
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              When willpower and continuous overthinking leave you exhausted, gentle hypnotherapy and trance healing help you connect directly with your subconscious mind (Avachetan Man). Release deep-seated fears, enjoy deep restful sleep, and awaken your inner confidence in a serene, judgment-free space.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="px-7 py-4 text-base font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-full shadow-md shadow-teal-900/15 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
              >
                <span>Book Free Discovery Call / प्रारंभ करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-4 text-base font-medium text-slate-700 hover:text-teal-900 bg-white/90 hover:bg-white border border-slate-200/90 hover:border-teal-300 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs"
              >
                Explore Services &amp; Sessions
              </button>
            </div>

            {/* Quiet Trust Markers */}
            <div className="pt-4 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Certified Trance Practitioner</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-teal-700 shrink-0" />
                <span>100% Safe &amp; Confidential</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Online Video &amp; Studio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Serene Sanctuary Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Atmospheric Card */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                      Live Inner Sanctuary
                    </span>
                  </div>
                  <span className="font-mono text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-1 rounded-full">
                    Theta State (4–8 Hz)
                  </span>
                </div>

                {/* Subconscious Mind Illustration & Calming Quote */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EBF4F2] via-[#F4F9F7] to-white border border-teal-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                      Avachetan Man (Subconscious)
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">90% of Mind Power</span>
                  </div>

                  <p className="font-serif text-lg text-slate-800 italic leading-snug">
                    &ldquo;Jab man shant hota hai, tab zindagi ke sabhi raste aasan ho jate hain.&rdquo;
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    When you enter a peaceful trance state, the chatter of your conscious mind softens. Your subconscious gently absorbs calmness, self-respect, and positive growth.
                  </p>
                </div>

                {/* Interactive Singing Bowl Chime */}
                <div className="pt-2 flex items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-slate-900 block">
                      528 Hz Heart Bell Chime
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Click to hear a calming singing bowl sound
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={playSingingChime}
                    className="px-4 py-2 text-xs font-semibold text-teal-900 bg-white hover:bg-teal-50 border border-teal-200 rounded-full transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                    aria-label="Play 528Hz calming singing bowl sound"
                  >
                    Play Chime
                  </button>
                </div>

                {/* What We Help With */}
                <div className="space-y-2 pt-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700 block uppercase tracking-wider text-[10px]">
                    Specialized Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">Overthinking &amp; Worry</span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">Deep Restful Sleep</span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">Past Life Regression (PLR)</span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">Stage Fear &amp; Confidence</span>
                    <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">Reiki Chakra Balancing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
