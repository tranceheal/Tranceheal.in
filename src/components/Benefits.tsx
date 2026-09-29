import React, { useState } from 'react';
import { BENEFITS } from '../data/content';
import { Sparkles, Brain, Heart, Moon, Shield } from 'lucide-react';

export const Benefits: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mindfulness' | 'subconscious'>('mindfulness');

  const benefitIcons = [
    <Heart className="w-5 h-5 text-teal-700" key="heart" />,
    <Brain className="w-5 h-5 text-teal-700" key="brain" />,
    <Moon className="w-5 h-5 text-teal-700" key="moon" />,
    <Shield className="w-5 h-5 text-teal-700" key="shield" />,
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>The Art of Inner Stillness · मन की शांति</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight text-balance">
            How mindfulness &amp; trance healing restore your natural peace
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Instead of fighting your thoughts with stressful willpower, gentle trance and mindfulness guide you into deep relaxation. We help quiet the noise where patterns actually reside: in your subconscious mind (Avachetan Man) and daily emotional habits.
          </p>
        </div>

        {/* Interactive Segmented Selector */}
        <div className="mt-8 flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-xl max-w-md border border-slate-300/40">
          <button
            type="button"
            onClick={() => setActiveTab('mindfulness')}
            className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'mindfulness'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mindfulness &amp; Calm (सचेतनता)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subconscious')}
            className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'subconscious'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Subconscious Power (अवचेतन मन)
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BENEFITS.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-teal-900/10 hover:border-teal-700/30 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header line with icon & metric */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 flex items-center justify-center shrink-0">
                    {benefitIcons[index % benefitIcons.length]}
                  </div>

                  {/* Quantitative proof metric without pills */}
                  <div className="text-right">
                    <span className="font-serif text-2xl sm:text-3xl text-teal-900 font-semibold block leading-none">
                      {item.experienceMetric}
                    </span>
                    <span className="text-[11px] text-slate-500 max-w-[140px] block mt-0.5">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Subtitle in Hindi/English */}
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                  {item.hindiSubtitle}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-medium mt-1 leading-snug">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                  {item.subtitle}
                </p>

                <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Zero-Pill Footer: Somatic Anchor text */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-teal-900">Experience Anchor:</span>
                <span className="text-slate-600 font-medium">{item.focusArea}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
