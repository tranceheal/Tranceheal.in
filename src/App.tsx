/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BreathingExercise } from './components/BreathingExercise';
import { Benefits } from './components/Benefits';
import { Services } from './components/Services';
import { InteractiveScheduler } from './components/InteractiveScheduler';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { ServiceItem } from './data/content';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('discovery-call');

  const scrollToSchedule = () => {
    const el = document.getElementById('schedule');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    scrollToSchedule();
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-slate-800 flex flex-col selection:bg-teal-200 selection:text-teal-900">
      {/* Top Bar Contract (3 zones) */}
      <Navbar onBookClick={scrollToSchedule} />

      <main className="flex-1">
        {/* 1. Hero Section with Value Proposition and Serene Sanctuary Aesthetics */}
        <Hero
          onBookClick={scrollToSchedule}
          onExploreClick={scrollToServices}
        />

        {/* 2. Interactive Somatic Breathwork Exercise (Immediate Visceral Calm) */}
        <BreathingExercise />

        {/* 3. Benefits of Mindfulness, Relaxation & Neuroplastic Trance */}
        <Benefits />

        {/* 4. Clinical Hypnotherapy Modalities & Services */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* 5. Online Scheduling Widget & Booking Form */}
        <InteractiveScheduler initialServiceId={selectedServiceId} key={selectedServiceId} />

        {/* 6. Transformative Client Stories & Testimonials */}
        <Testimonials />

        {/* 7. Guided Meditation Techniques & Subconscious Insights Blog */}
        <BlogSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />

        {/* 9. Newsletter Signup Form (The Tranquil Mind Dispatch) */}
        <Newsletter />
      </main>

      {/* 10. Footer with Contact & Disclaimers */}
      <Footer />
    </div>
  );
}
