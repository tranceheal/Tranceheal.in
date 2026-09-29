import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost, BLOG_STRATEGY_TOPICS, BlogStrategyItem } from '../data/content';
import { Sparkles, ArrowRight, BookOpen, Clock, Check, Volume2, Search, Target, Compass, X } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

export const BlogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'strategy'>('articles');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedStrategyItem, setSelectedStrategyItem] = useState<BlogStrategyItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const categories = ['All', 'Subconscious Mind', 'Meditation', 'Stress Relief', 'Mindfulness'];

  const filteredPosts =
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const toggleReaderAmbient = () => {
    const next = !isAmbientOn;
    soundscapes.toggleThetaWave(next);
    setIsAmbientOn(next);
  };

  const handleCloseModal = () => {
    if (isAmbientOn) {
      soundscapes.toggleThetaWave(false);
      setIsAmbientOn(false);
    }
    setSelectedPost(null);
  };

  return (
    <section id="insights" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-300/60">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Gyan aur Dhyana Hub · ध्यान और ज्ञान</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Mindfulness Insights &amp; Subconscious Mind Wisdom
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Explore gentle meditation techniques, calming breathing rituals, and our complete SEO editorial plan for tranceheal.in.
          </p>
        </div>

        {/* View Switcher: Live Published Articles vs. Content Strategy Roadmap */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl max-w-md">
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'articles'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Articles &amp; Guided Exercises ({BLOG_POSTS.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('strategy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'strategy'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>SEO Content Plan ({BLOG_STRATEGY_TOPICS.length})</span>
            </button>
          </div>

          {activeTab === 'articles' && (
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/50 rounded-xl overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: ARTICLES VIEW */}
        {activeTab === 'articles' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-8 border border-emerald-900/10 hover:border-teal-700/30 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-teal-800">{post.category}</span>
                    {post.hindiBadge && (
                      <span className="text-[11px] text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded-full">
                        {post.hindiBadge}
                      </span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-slate-900 font-medium group-hover:text-teal-950 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-medium text-teal-700">Target Keyword:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono">
                      &quot;{post.targetKeyword}&quot;
                    </code>
                  </div>

                  <div className="mt-5 space-y-1.5">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block">
                      Core Insights:
                    </span>
                    {post.takeaways.slice(0, 2).map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0 mt-1.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-2 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Article &amp; Exercise</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TAB 2: SEO CONTENT STRATEGY & ROADMAP */}
        {activeTab === 'strategy' && (
          <div className="mt-10 space-y-8 animate-fade-in">
            <div className="bg-white rounded-3xl p-8 border border-teal-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>SEO Content Architecture for tranceheal.in</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium">
                High-Intent Keywords for Hypnotherapy, Meditation &amp; Stress Relief
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-slate-600">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-1">
                  <span className="font-bold text-teal-900 text-sm block">Core Primary Keywords</span>
                  <p>
                    Targeting &quot;hypnotherapy benefits&quot;, &quot;guided meditation techniques&quot;, &quot;stress relief&quot;, and &quot;mindfulness exercises&quot;.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <span className="font-bold text-emerald-900 text-sm block">Authentic &amp; Ethical</span>
                  <p>
                    Clear distinction from medical diagnosis, keeping hypnotherapy centered as a tranquil, respectful, subconscious modality.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">Bilingual Connect</span>
                  <p>
                    Blending Hindi-English emotional clarity (Sukoon, Avachetan Man, Chinta mukti) so Indian and NRI clients feel right at home.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy Topic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_STRATEGY_TOPICS.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-teal-900/10 hover:border-teal-700/30 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono text-teal-800 font-semibold">Plan 0{idx + 1}</span>
                      <span className="bg-teal-50 text-teal-900 px-2.5 py-0.5 rounded-full font-medium">
                        {item.monthlyVolumePotential}
                      </span>
                    </div>

                    <div>
                      {item.hindiSubheading && (
                        <span className="text-xs text-teal-700 font-medium block">
                          {item.hindiSubheading}
                        </span>
                      )}
                      <h4 className="font-serif text-xl text-slate-900 font-medium leading-snug mt-0.5">
                        {item.topicTitle}
                      </h4>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">Target Keyword:</span>
                        <code className="text-teal-800 font-mono font-medium">&quot;{item.targetKeyword}&quot;</code>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">Intent:</span>
                        <span>{item.searchIntent}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">Content Pillar:</span>
                        <span className="text-slate-800 font-medium">{item.contentPillars}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block">
                        Editorial Outline Blueprint:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {item.sereneContentOutline.slice(0, 3).map((line, lIdx) => (
                          <li key={lIdx} className="text-slate-600 truncate">
                            • {line}
                          </li>
                        ))}
                        <li className="text-slate-400 italic text-[11px]">
                          + {item.sereneContentOutline.length - 3} more sections...
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500 italic max-w-xs truncate">
                      {item.keyTakeaway}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedStrategyItem(item)}
                      className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>View Full Outline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Full Article Reader */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-teal-800">{selectedPost.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedPost.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>Target Keyword: &quot;{selectedPost.targetKeyword}&quot;</span>
                  </div>
                  <h3
                    id="article-modal-title"
                    className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium leading-snug"
                  >
                    {selectedPost.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-sm font-semibold shrink-0"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Ambient Reader Mode Bar */}
              <div className="mt-4 p-3 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between text-xs text-teal-950">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-teal-700" />
                  <span>Serene Reading Atmosphere (6 Hz Theta Frequency)</span>
                </div>
                <button
                  type="button"
                  onClick={toggleReaderAmbient}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                    isAmbientOn
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-white text-teal-900 border border-teal-200'
                  }`}
                >
                  {isAmbientOn ? 'Tone Active' : 'Enable Theta Tone'}
                </button>
              </div>

              {/* Article Content */}
              <div className="mt-6 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                {/* Practical Exercise Box */}
                {selectedPost.exerciseTitle && (
                  <div className="mt-8 p-6 rounded-2xl bg-[#F0FDF4] border border-emerald-200 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      <Sparkles className="w-4 h-4 text-emerald-700" />
                      <span>{selectedPost.exerciseTitle}</span>
                    </div>

                    <p className="text-xs text-emerald-950 font-medium">
                      Try this simple exercise right now:
                    </p>

                    <ol className="space-y-2 pt-1">
                      {selectedPost.exerciseSteps?.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                          <span className="font-semibold text-emerald-800 shrink-0 font-mono">
                            0{idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Key Takeaways */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Key Insights
                  </h4>
                  <ul className="space-y-2">
                    {selectedPost.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">tranceheal.in/insights</span>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Strategy Item Blueprint View */}
        {selectedStrategyItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="strategy-modal-title"
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">
                    Content Strategy Blueprint · {selectedStrategyItem.contentPillars}
                  </span>
                  <h3 id="strategy-modal-title" className="font-serif text-2xl text-slate-900 font-medium mt-1">
                    {selectedStrategyItem.topicTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStrategyItem(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="font-semibold text-slate-600 block text-xs">Primary Target Keyword:</span>
                    <span className="text-teal-900 font-mono font-medium">&quot;{selectedStrategyItem.targetKeyword}&quot;</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block text-xs">Monthly Volume Potential:</span>
                    <span className="text-slate-900 font-medium">{selectedStrategyItem.monthlyVolumePotential}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-slate-600 block text-xs">Search Intent:</span>
                    <span className="text-slate-900">{selectedStrategyItem.searchIntent}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Complete Editorial Outline:
                  </h4>
                  <ol className="space-y-2 bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                    {selectedStrategyItem.sereneContentOutline.map((item, idx) => (
                      <li key={idx} className="text-slate-800 text-xs leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 text-slate-700 text-xs">
                  <span className="font-semibold text-slate-900 block mb-0.5">Strategic Role:</span>
                  {selectedStrategyItem.keyTakeaway}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStrategyItem(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
