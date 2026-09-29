import React, { useState } from 'react';
import { CLIENT_SUCCESS_STORIES, ClientSuccessStory } from '../data/content';
import { Star, Sparkles, CheckCircle2, Quote, Shield, Clock, HeartHandshake, ArrowRight, X } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'overthinking' | 'sleep' | 'burnout' | 'past-life' | 'habits'>('all');
  const [selectedStory, setSelectedStory] = useState<ClientSuccessStory | null>(null);

  const filteredItems =
    filter === 'all'
      ? CLIENT_SUCCESS_STORIES
      : CLIENT_SUCCESS_STORIES.filter((t) => t.category === filter);

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F2F7F5] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-300/60">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Real Experiences · वास्तविक अनुभव</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Inspiring Stories of Inner Peace &amp; Subconscious Awakening
            </h2>
          </div>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
            Read how individuals moved from racing thoughts, sleeplessness, and stubborn habits into lasting calm (Sukoon) and spiritual lightness with TranceHeal.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mt-8 flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl overflow-x-auto max-w-2xl">
          {[
            { id: 'all', label: 'All Stories (5)' },
            { id: 'overthinking', label: 'Overthinking & Worry' },
            { id: 'habits', label: 'Habits & Smoking' },
            { id: 'past-life', label: 'Past Life Regression' },
            { id: 'burnout', label: 'Fatigue & Balance' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-3xl p-7 border border-emerald-900/10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Rating & Verification */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-teal-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                    <span>Verified Journey</span>
                  </div>
                </div>

                {/* Client Initials & Anonymized Background */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-800">{story.clientInitials}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.clientRole}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.location}</span>
                  </div>
                  <h3 className="font-serif text-lg font-medium text-slate-900 group-hover:text-teal-950 transition-colors leading-snug">
                    {story.headline}
                  </h3>
                </div>

                {/* Direct Quote with Hinglish touch */}
                <blockquote className="text-xs sm:text-sm text-slate-700 italic border-l-2 border-teal-700 pl-3 leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                {/* Key Positive Outcome Highlight */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-start gap-2 text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{story.positiveOutcomesAchieved[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Metadata and Case Study Modal Trigger */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {story.timeframe}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedStory(story)}
                  className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1.5 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Full Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Detailed Journey Modal */}
        {selectedStory && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-teal-800">Experience Story: {selectedStory.clientInitials}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedStory.clientRole}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedStory.location}</span>
                  </div>
                  <h3
                    id="case-study-title"
                    className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium leading-snug"
                  >
                    {selectedStory.headline}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-sm font-semibold shrink-0"
                  aria-label="Close story"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Protocol Badge Bar */}
              <div className="mt-4 p-3 rounded-2xl bg-teal-50 border border-teal-100 flex flex-wrap items-center justify-between gap-2 text-xs text-teal-950">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-700" />
                  <span className="font-semibold">{selectedStory.timeframe}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Shared with client permission · 100% Confidential</span>
                </div>
              </div>

              {/* Content Sections */}
              <div className="mt-6 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
                <div>
                  <h4 className="font-serif text-lg font-medium text-slate-900 mb-2">
                    1. Background &amp; Initial Struggles
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedStory.clientBackground}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-medium text-slate-900 mb-2">
                    2. Specific Challenges &amp; Thoughts Faced
                  </h4>
                  <ul className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    {selectedStory.challengesFaced.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-medium text-slate-900 mb-2">
                    3. How TranceHeal Guided the Shift
                  </h4>
                  <div className="space-y-2.5">
                    {selectedStory.howTranceHealAddressed.map((step, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100/80 text-slate-800">
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900">
                    <HeartHandshake className="w-4 h-4 text-emerald-700" />
                    <span>The Role of Mindfulness &amp; Relaxation (सचेतनता का प्रभाव)</span>
                  </div>
                  <p className="text-emerald-950 leading-relaxed">
                    {selectedStory.mindfulnessAndRelaxationImpact}
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-medium text-slate-900 mb-2">
                    4. Lasting Positive Outcomes Achieved
                  </h4>
                  <div className="space-y-2">
                    {selectedStory.positiveOutcomesAchieved.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <blockquote className="p-4 rounded-2xl bg-slate-100 border-l-4 border-teal-800 text-slate-800 italic">
                  &ldquo;{selectedStory.quote}&rdquo;
                  <span className="block not-italic text-xs text-slate-500 font-semibold mt-2">
                    — {selectedStory.clientInitials}, {selectedStory.clientRole} ({selectedStory.location})
                  </span>
                </blockquote>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-mono">tranceheal.in · Client Journey Archives</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStory(null)}
                    className="px-5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="#schedule"
                    onClick={() => setSelectedStory(null)}
                    className="px-5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    Book Your Own Discovery Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
