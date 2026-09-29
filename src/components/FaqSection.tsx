import React, { useState } from 'react';
import { COMPREHENSIVE_FAQS } from '../data/content';
import { ChevronDown, Sparkles, HelpCircle, ShieldCheck, Clock, CalendarCheck, BookOpen, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    'cat-0-q-0': true,
  });

  const toggleQuestion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter categories and questions
  const displayedCategories = COMPREHENSIVE_FAQS.map((cat, catIdx) => {
    const isCatMatch = selectedCategoryId === 'all' || selectedCategoryId === cat.id;
    if (!isCatMatch) return null;

    const matchedQuestions = cat.questions
      .map((q, qIdx) => ({ ...q, originalIndex: `cat-${catIdx}-q-${qIdx}` }))
      .filter((q) => {
        if (!searchQuery.trim()) return true;
        const qText = (q.question + ' ' + q.answer + ' ' + (q.keyTakeaway || '')).toLowerCase();
        return qText.includes(searchQuery.toLowerCase().trim());
      });

    if (matchedQuestions.length === 0) return null;

    return {
      ...cat,
      filteredQuestions: matchedQuestions,
    };
  }).filter(Boolean);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'understanding':
        return <HelpCircle className="w-4 h-4 text-teal-700" />;
      case 'session-experience':
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
      case 'outcomes-frequency':
        return <Clock className="w-4 h-4 text-teal-700" />;
      case 'booking-logistics':
        return <CalendarCheck className="w-4 h-4 text-teal-800" />;
      default:
        return <BookOpen className="w-4 h-4 text-teal-700" />;
    }
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F2F7F5] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-white/90 border border-teal-200/80 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Aapke Sawal aur Hamare Jawab · FAQ</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Clear, Honest Answers for Your Trance Journey
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about trance state, safety, what happens in a session, how many meetings are helpful, the power of mindfulness, and simple online booking at tranceheal.in.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. 'safety', 'how many sessions', 'trance')..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-teal-200/80 rounded-full text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 shadow-xs placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-200/60 rounded-xl overflow-x-auto max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Topics ({COMPREHENSIVE_FAQS.reduce((acc, c) => acc + c.questions.length, 0)})
            </button>
            {COMPREHENSIVE_FAQS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.hindiLabel ? cat.hindiLabel.split('(')[0].trim() : cat.categoryTitle.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Groups */}
        <div className="space-y-8">
          {displayedCategories.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-teal-100 max-w-lg mx-auto">
              <p className="text-slate-600 text-sm">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategoryId('all');
                }}
                className="mt-3 text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
              >
                Reset search filters
              </button>
            </div>
          ) : (
            displayedCategories.map((cat) => {
              if (!cat) return null;
              return (
                <div key={cat.id} className="space-y-3">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 pb-2 border-b border-teal-900/10">
                    <span className="p-1.5 rounded-lg bg-teal-100/60">{getCategoryIcon(cat.id)}</span>
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-slate-900">
                        {cat.categoryTitle}
                      </h3>
                      {cat.hindiLabel && (
                        <span className="text-xs text-teal-800 font-medium block">
                          {cat.hindiLabel}
                        </span>
                      )}
                      <p className="text-xs text-slate-500">{cat.description}</p>
                    </div>
                  </div>

                  {/* Questions in Category */}
                  <div className="space-y-3 pt-1">
                    {cat.filteredQuestions.map((q) => {
                      const isOpen = !!openItems[q.originalIndex];
                      return (
                        <div
                          key={q.originalIndex}
                          className="bg-white rounded-2xl border border-teal-900/10 transition-all duration-200 overflow-hidden shadow-xs hover:border-teal-700/30"
                        >
                          <button
                            type="button"
                            onClick={() => toggleQuestion(q.originalIndex)}
                            className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                            aria-expanded={isOpen}
                          >
                            <span className="font-serif text-base sm:text-lg text-slate-900 font-medium leading-snug">
                              {q.question}
                            </span>
                            <div
                              className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                                isOpen ? 'rotate-180 bg-teal-50 text-teal-800' : 'text-slate-500'
                              }`}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 space-y-3">
                              <p className="leading-relaxed">{q.answer}</p>
                              {q.keyTakeaway && (
                                <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-100 text-xs text-teal-950 flex items-start gap-2">
                                  <span className="font-semibold text-teal-900 shrink-0">Key Takeaway:</span>
                                  <span>{q.keyTakeaway}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions reassurance box */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-teal-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base sm:text-lg text-slate-900 font-medium">
              Aapka koi vishesh sawal hai? Have a personal question?
            </h4>
            <p className="text-xs text-slate-500">
              Schedule a friendly 20-minute discovery consultation or reach out directly via WhatsApp / Email.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:tranceheal369@gmail.com"
              className="text-xs font-semibold text-slate-700 hover:text-teal-800 transition-colors"
            >
              tranceheal369@gmail.com
            </a>
            <a
              href="#schedule"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full transition-colors shadow-xs"
            >
              Book Free Clarity Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
