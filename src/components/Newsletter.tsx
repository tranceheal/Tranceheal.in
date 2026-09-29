import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, Download, ArrowRight } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    soundscapes.playSingingBowl(528);
    setSubmitted(true);
  };

  const downloadFreeAudioGuide = () => {
    const textContent = `TRANCEHEAL - THE TRANQUIL MIND DISPATCH
==================================================
5-MINUTE EVENING THETA MEDITATION & SUBCONSCIOUS RELIEF SCRIPT
Trance Healing & Hypnotherapy Sanctuary | tranceheal.in | tranceheal369@gmail.com
==================================================

PREPARATION:
Sit or lie down comfortably in a dim, peaceful room. Loosen any tight clothing.
Take three gentle breaths through your nose, exhaling with a soft audible sigh (Aah...).

THE 5-STEP PROTOCOL:

1. THE SIGHT RETREAT (0:00 - 1:00)
Fix your gaze upward at a chosen spot on the ceiling or wall.
Notice how after thirty seconds, your eyelids feel comfortably heavy.
Silently count backward: 3... 2... 1...
Allow the eyelids to drop closed as if pulling soft velvet curtains shut.

2. THE HEAVINESS INVITATION (1:00 - 2:00)
Shift your awareness to the tips of your shoulders.
Notice where you have been holding daily stress or tension.
With your next exhalation, invite your shoulders to drop half an inch lower.
Let your jaw un-clench slightly, teeth gently separated, tongue resting soft.

3. THE DIAPHRAGM RELEASE (2:00 - 3:00)
Inhale for a count of 4: feel the belly softly expand like a calm wave.
Hold for a count of 4: appreciate the absolute stillness between thoughts.
Exhale for a count of 8: let the mattress or armchair support 100% of your body weight.
You have nothing left to solve tonight.

4. THE SUBCONSCIOUS ANCHOR (3:00 - 4:00)
Repeat mentally three times:
"Mera man shant hai, meri aatma surakshit hai, aur gehri neend mujhe mil rahi hai."
(My mind is peaceful, my soul is safe, and restful sleep flows effortlessly to me.)

5. SURRENDER TO THE REST (4:00 - 5:00)
Let go of counting.
Let go of breathing techniques.
Allow your subconscious mind to watch over your body as you drift into sweet sleep.

Warmly,
TranceHeal Sanctuary (tranceheal.in)`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'TranceHeal_Evening_Theta_Guide.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAF9] via-[#EBF4F2] to-[#F0FDF4] border-b border-emerald-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-teal-200/80 shadow-xl overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-100/60 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-teal-800">
                  Welcome to TranceHeal Family · स्वागत है
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium mt-1">
                  Aapka Subscription Safal Hua!
                </h3>
                <p className="mt-2 text-slate-600 text-sm max-w-md mx-auto">
                  We have welcomed <strong className="text-slate-800">{email}</strong>. Look out for our fortnightly guided audio meditations and subconscious peaceful prompts.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={downloadFreeAudioGuide}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Evening Theta Guide / गाइड डाउनलोड करें</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50/80 border border-teal-200/60 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>The Peaceful Mind Newsletter · शांति संदेश</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Nourish Your Subconscious Mind Every Fortnight
              </h2>

              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Join our community of seekers. Receive original guided audio meditations, mindfulness breathing prompts, and insights on tapping your subconscious power (Avachetan Man).
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-lg mx-auto">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <span>Subscribe Free / जुड़ें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span>Zero spam</span>
                  <span aria-hidden="true">·</span>
                  <span>Unsubscribe anytime with 1-click</span>
                  <span aria-hidden="true">·</span>
                  <span>Free Theta Guide on sign-up</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
