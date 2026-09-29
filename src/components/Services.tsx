import React, { useState } from 'react';
import { SERVICES, ServiceItem } from '../data/content';
import { ArrowRight, Check, Sparkles, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F2F7F5] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-300/60">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>TranceHeal Offerings · हमारी सेवाएं</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
              Gentle Pathways to Inner Peace &amp; Subconscious Harmony
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-md">
            Every session is personalized, warm, and conducted in a confidential, peaceful atmosphere. Available globally via secure video call (Zoom/Google Meet) or in our private studio.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-8 border border-emerald-900/10 hover:border-teal-700/30 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Top line: Index & duration */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-teal-900">{service.number}.</span>
                    <span className="uppercase tracking-wider font-semibold text-teal-800">
                      {service.sessionType.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{service.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-teal-950">{service.energyExchange}</span>
                  </div>
                </div>

                {/* Hindi Title & English Title */}
                {service.hindiTitle && (
                  <span className="text-xs font-medium text-teal-700 block mb-1">
                    {service.hindiTitle}
                  </span>
                )}
                <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium group-hover:text-teal-950 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-teal-800">
                  {service.tagline}
                </p>

                {/* Paragraph Description */}
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Core Benefits */}
                <div className="mt-6 space-y-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    Key Session Benefits:
                  </span>
                  <ul className="space-y-2 pt-1">
                    {service.benefitsList.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-2">
                    Especially Helpful For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.recommendedFor.map((rec, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
                >
                  View Details &amp; Preparation
                </button>

                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Book This Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Service Details */}
        {selectedService && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100">
              <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                    {selectedService.hindiTitle || 'TranceHeal Experience'}
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
                    {selectedService.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{selectedService.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-teal-900">{selectedService.energyExchange}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-700">
                <p className="leading-relaxed">{selectedService.description}</p>

                <div>
                  <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    What You Will Experience:
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.benefitsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 space-y-1">
                  <span className="font-semibold text-teal-900 text-xs uppercase tracking-wider block">
                    Pre-Session Relaxation Preparation:
                  </span>
                  <p className="text-xs text-teal-950 leading-relaxed">
                    Wear loose, comfortable clothing and avoid heavy caffeine 1–2 hours prior. For online sessions, ensure a peaceful room where you can recline comfortably with stereo headphones.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const s = selectedService;
                    setSelectedService(null);
                    onSelectService(s);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-full transition-colors cursor-pointer"
                >
                  Schedule This Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
