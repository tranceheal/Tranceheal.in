import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Wind, Sparkles } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [countdown, setCountdown] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('idle');
      setCountdown(4);
      return;
    }

    // Set initial phase
    if (phase === 'idle') {
      setPhase('inhale');
      setCountdown(4);
      soundscapes.playSingingBowl(432);
    }

    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (phase === 'inhale') {
          setPhase('hold');
          return 7;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 8;
        } else {
          // exhale finished -> back to inhale
          setPhase('inhale');
          setCycleCount((c) => c + 1);
          soundscapes.playSingingBowl(528);
          return 4;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      setCountdown(4);
      soundscapes.playSingingBowl(432);
    } else {
      setIsActive(false);
      setPhase('idle');
      setCountdown(4);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('idle');
    setCountdown(4);
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Gently inhale through your nose (श्वास अंदर लें)... filling the belly with peaceful air.';
      case 'hold':
        return 'Hold softly (श्वास रोकें)... feel the serene stillness between your thoughts.';
      case 'exhale':
        return 'Slowly release through your mouth (श्वास धीरे-धीरे छोड़ें)... releasing all tension.';
      default:
        return 'Press begin to experience 60 seconds of gentle conscious breathing and mental peace.';
    }
  };

  const getCircleScaleClass = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-125 transition-transform duration-[4000ms] ease-out';
      case 'hold':
        return 'scale-125 transition-none';
      case 'exhale':
        return 'scale-95 transition-transform duration-[8000ms] ease-in';
      default:
        return 'scale-100 transition-transform duration-700';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F8FAF9] via-[#F0FDF4]/50 to-[#EBF4F2] border-b border-emerald-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-white/90 border border-teal-200 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
          <Wind className="w-3.5 h-3.5 text-teal-600" />
          <span>Pranic Calming Breath · प्राणायाम और शांति</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight text-balance">
          Experience Immediate Calm in 4-7-8 Rhythm
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto text-balance">
          A gentle, natural breathing exercise practiced before hypnotherapy and meditation to quiet racing thoughts and bring you into peace (Sukoon).
        </p>

        {/* Interactive Breath Chamber */}
        <div className="mt-10 relative bg-white/90 border border-teal-100 rounded-3xl p-8 sm:p-12 shadow-lg shadow-teal-900/5 max-w-xl mx-auto backdrop-blur-xs">
          {/* Animated Concentric Rings */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
            {/* Outer halo */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-br from-teal-200/40 via-emerald-100/30 to-sky-200/40 blur-xl ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
            />

            {/* Middle decorative border */}
            <div className="absolute inset-4 rounded-full border border-teal-200/70 border-dashed animate-spin [animation-duration:40s]" />

            {/* Responsive scale orb */}
            <div
              className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 shadow-xl flex flex-col items-center justify-center text-white select-none ${getCircleScaleClass()}`}
            >
              {phase === 'idle' ? (
                <div className="text-center px-4">
                  <Sparkles className="w-6 h-6 text-teal-200 mx-auto mb-1 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-teal-100">Ready</span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest font-semibold text-teal-200">
                    {phase === 'inhale' ? 'Inhale / श्वास लें' : phase === 'hold' ? 'Hold / रोकें' : 'Exhale / छोड़ें'}
                  </span>
                  <span className="block font-serif text-4xl sm:text-5xl font-bold mt-1">
                    {countdown}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Instructions */}
          <p className="mt-6 text-xs sm:text-sm font-medium text-slate-700 min-h-[40px] flex items-center justify-center px-4">
            {getPhaseInstruction()}
          </p>

          {/* Control Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleExercise}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all ${
                isActive
                  ? 'bg-rose-700 hover:bg-rose-800 text-white'
                  : 'bg-teal-800 hover:bg-teal-900 text-white'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Practice</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Begin 4-7-8 Breath / प्रारंभ करें</span>
                </>
              )}
            </button>

            {isActive && (
              <button
                type="button"
                onClick={resetExercise}
                className="p-2.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Reset breath exercise"
                aria-label="Reset breath exercise"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cycles count */}
          {cycleCount > 0 && (
            <div className="mt-4 text-[11px] font-mono text-teal-800">
              Completed cycles: {cycleCount} · Mind settling into calm
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
