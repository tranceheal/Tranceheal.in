import React from 'react';
import { Mail, Phone, MapPin, Shield, Sparkles, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Ethos */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center text-teal-200">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors">
                TranceHeal
              </span>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Trance Healing &amp; Hypnotherapy Sanctuary. Dedicated to helping you quiet mental noise, achieve deep restful sleep, and awaken genuine inner peace (Sukoon) through the power of your subconscious mind.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href="mailto:tranceheal369@gmail.com"
                  className="hover:text-teal-300 transition-colors"
                >
                  tranceheal369@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">Online Worldwide &amp; Studio · tranceheal.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-white font-semibold text-xs uppercase tracking-wider block">
              Our Offerings · सेवाएं
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Hypnotherapy &amp; Mind Detox
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Past Life Regression (PLR)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Reiki Energy &amp; Chakra Balancing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-300 transition-colors">
                  Habit Mastery &amp; Quitting Smoking
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-teal-300 transition-colors">
                  Complimentary 20-Min Discovery Call
                </a>
              </li>
            </ul>
          </div>

          {/* Ethical Guidance & Disclaimer */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-white font-semibold text-xs uppercase tracking-wider block">
              Ethical Sanctuary &amp; Trust
            </span>
            <p className="text-slate-400 leading-relaxed text-xs">
              Practicing in accordance with international ethical standards for hypnotherapists and spiritual energy healers. Every consultation is private, respectful, and safe.
            </p>
            <div className="pt-2 flex items-center gap-4 text-teal-400 text-xs">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>100% Safe &amp; Confidential</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                <span>Empathetic Guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            <strong>Ethical &amp; Wellness Notice:</strong> Hypnotherapy and Reiki healing are holistic wellness and subconscious relaxation modalities designed to support natural mental peace, mindfulness, and personal growth. They are not medical treatments or psychiatric interventions.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} TranceHeal (tranceheal.in). All rights reserved.</p>
          <p>Sukoon, Shanti aur Avachetan Man ki Shakti · tranceheal.in</p>
        </div>
      </div>
    </footer>
  );
};
