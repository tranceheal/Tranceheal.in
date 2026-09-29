import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const toggleSound = () => {
    const nextState = !ambientPlaying;
    soundscapes.toggleOceanWaves(nextState);
    if (nextState) {
      soundscapes.playSingingBowl(432);
    }
    setAmbientPlaying(nextState);
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Mindfulness Benefits', href: '#benefits' },
    { label: 'Online Scheduler', href: '#schedule' },
    { label: 'Client Stories', href: '#testimonials' },
    { label: 'Meditation Insights', href: '#insights' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAF9]/90 backdrop-blur-md border-b border-emerald-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Clean single brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1"
          aria-label="TranceHeal Home"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-700 to-emerald-800 flex items-center justify-center text-white shadow-sm shadow-teal-900/20">
            <Sparkles className="w-4 h-4 text-emerald-200" />
          </span>
          <span className="font-serif text-2xl tracking-wide font-medium text-slate-800 group-hover:text-teal-900 transition-colors">
            TranceHeal
          </span>
        </a>

        {/* Zone 2: 4-5 Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-600 hover:text-teal-800 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-700 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Ambient Audio Toggle & Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleSound}
            title={ambientPlaying ? 'Mute serene ocean ambience' : 'Play serene ocean ambience'}
            className={`p-2.5 rounded-full border transition-all duration-200 flex items-center gap-2 text-xs font-medium cursor-pointer ${
              ambientPlaying
                ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-sm'
                : 'bg-white/80 border-slate-200 text-slate-600 hover:text-teal-800 hover:border-teal-200'
            }`}
            aria-label="Toggle serene background ambience"
          >
            {ambientPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-teal-700 animate-pulse" />
                <span className="hidden sm:inline text-xs text-teal-800">Calm Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline text-xs text-slate-500">Ocean Sound</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBookClick}
            className="px-5 py-2.5 text-sm font-medium text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-full shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
          >
            Book Session
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-800 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-[#F8FAF9] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-teal-800 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                toggleSound();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 flex items-center justify-center gap-2"
            >
              {ambientPlaying ? <Volume2 className="w-4 h-4 text-teal-700" /> : <VolumeX className="w-4 h-4" />}
              <span>{ambientPlaying ? 'Mute Ambient Waves' : 'Play Serene Ocean Waves'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3 text-center text-sm font-medium text-white bg-teal-800 rounded-xl hover:bg-teal-900 transition-colors"
            >
              Book Complimentary Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
