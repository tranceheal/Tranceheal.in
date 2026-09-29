import React, { useState } from 'react';
import { SERVICES, ServiceItem } from '../data/content';
import { Calendar as CalendarIcon, Clock, Video, Building2, CheckCircle2, Download, Sparkles, ChevronLeft, ChevronRight, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { soundscapes } from '../utils/soundscapes';

interface SchedulerProps {
  initialServiceId?: string;
}

export const InteractiveScheduler: React.FC<SchedulerProps> = ({ initialServiceId }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'discovery-call'
  );
  const [sessionFormat, setSessionFormat] = useState<'online' | 'studio'>('online');
  const [timezone, setTimezone] = useState<string>('Asia/Kolkata (IST +5:30)');

  // Calendar dates generation (next 14 days)
  const today = new Date();
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // starting tomorrow
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date>(availableDates[0]);

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '02:15 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');

  // Form Details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    focusArea: 'Overthinking & Restless Mind',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    serviceTitle: string;
    dateTimeString: string;
    format: string;
  } | null>(null);

  const selectedService: ServiceItem =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Audio chime on successful booking
    soundscapes.playSingingBowl(528);

    setTimeout(() => {
      const ref = 'TH-' + Math.floor(100000 + Math.random() * 900000);
      const dateStr = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const formatStr =
        sessionFormat === 'online'
          ? 'Online Video (Google Meet / Zoom)'
          : 'TranceHeal Sanctuary Studio';

      setConfirmation({
        referenceId: ref,
        serviceTitle: selectedService.title,
        dateTimeString: `${dateStr} at ${selectedTime} (${timezone.split(' ')[0]})`,
        format: formatStr,
      });

      setIsSubmitting(false);
    }, 600);
  };

  const downloadCalendarIcs = () => {
    if (!confirmation) return;

    const startDateTime = new Date(selectedDate);
    const [time, modifier] = selectedTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    startDateTime.setHours(hours, minutes, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + 75);

    const formatDateForIcs = (date: Date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TranceHeal//tranceheal.in//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${confirmation.referenceId}@tranceheal.in
DTSTAMP:${formatDateForIcs(new Date())}
DTSTART:${formatDateForIcs(startDateTime)}
DTEND:${formatDateForIcs(endDateTime)}
SUMMARY:TranceHeal: ${confirmation.serviceTitle}
DESCRIPTION:Your session with TranceHeal is confirmed.\\nReference: ${confirmation.referenceId}\\nFormat: ${confirmation.format}\\nFor questions or WhatsApp support: tranceheal369@gmail.com
LOCATION:${confirmation.format}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `TranceHeal_${confirmation.referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-[#F8FAF9] border-b border-emerald-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Online Scheduler · समय आरक्षित करें</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Reserve Your Session with TranceHeal
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your preferred offering, choose online or in-studio format, and lock in a tranquil time slot. Instant confirmation details are provided right away.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-teal-200 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2]" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-teal-800 block">
                Session Successfully Reserved
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-medium mt-1">
                Aapka Samay Nischit Hua! We Welcome You.
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Booking ID: {confirmation.referenceId}
              </p>
            </div>

            {/* Session Card Info */}
            <div className="p-6 rounded-2xl bg-teal-50/60 border border-teal-100 text-left space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-teal-200/60">
                <span className="text-slate-500 font-medium">Selected Offering:</span>
                <span className="font-semibold text-teal-950">{confirmation.serviceTitle}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-teal-200/60">
                <span className="text-slate-500 font-medium">Date &amp; Time:</span>
                <span className="font-semibold text-teal-950">{confirmation.dateTimeString}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-teal-200/60">
                <span className="text-slate-500 font-medium">Session Format:</span>
                <span className="font-semibold text-teal-950">{confirmation.format}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Direct Support:</span>
                <a
                  href="mailto:tranceheal369@gmail.com"
                  className="font-semibold text-teal-800 hover:underline"
                >
                  tranceheal369@gmail.com
                </a>
              </div>
            </div>

            {/* Preparation notice */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Pre-Session Serenity Checklist:</span>
              <p>• Avoid caffeine or heavy energy stimulants 1–2 hours before your session.</p>
              <p>• Wear loose, comfortable clothing and use stereo headphones for online video calls.</p>
              <p>• A calendar confirmation and meeting link have been prepared for your personal record.</p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={downloadCalendarIcs}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
              {/* Step 1 & 2: Modality & Delivery format (Col 1-5) */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-[#FAFDFB]">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-teal-800">
                    Step 1 of 3
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
                    Select Your Offering
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Choose the journey aligned with your current life situation.
                  </p>
                </div>

                {/* Modality Cards */}
                <div className="space-y-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        selectedServiceId === s.id
                          ? 'bg-white border-teal-700 shadow-sm ring-2 ring-teal-700/20'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-teal-800">
                          {s.number}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{s.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-teal-950">{s.energyExchange}</span>
                        </div>
                      </div>
                      <h4 className="font-serif text-base font-semibold text-slate-900 mt-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {s.tagline}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Delivery Format & Timezone */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Format &amp; Location
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSessionFormat('online')}
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          sessionFormat === 'online'
                            ? 'bg-teal-50 border-teal-700 text-teal-950 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Online Video Call</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSessionFormat('studio')}
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                          sessionFormat === 'studio'
                            ? 'bg-teal-50 border-teal-700 text-teal-950 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>In-Studio Visit</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Timezone
                    </label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                    >
                      <option value="Asia/Kolkata (IST +5:30)">India Standard Time (IST +5:30)</option>
                      <option value="Asia/Dubai (GST +4:00)">Gulf Standard Time (GST +4:00)</option>
                      <option value="Asia/Singapore (SGT +8:00)">Singapore Time (SGT +8:00)</option>
                      <option value="Europe/London (BST +1:00)">London / UK (GMT/BST)</option>
                      <option value="America/New_York (EDT -4:00)">US Eastern Time (EDT)</option>
                      <option value="America/Los_Angeles (PDT -7:00)">US Pacific Time (PDT)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2 & 3: Calendar Date Picker & Time Slots & Client Form (Col 6-12) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-teal-800">
                    Step 2 of 3
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
                    Select Date &amp; Time
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Live real-time slots currently available for booking.
                  </p>
                </div>

                {/* 14-Day Date Carousel */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Upcoming 14 Days
                    </span>
                    <span className="text-xs text-teal-800 font-medium">
                      {selectedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {availableDates.map((date, idx) => {
                      const isSelected =
                        date.toDateString() === selectedDate.toDateString();
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = date.getDate();

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`flex-shrink-0 w-14 py-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-800 border-teal-800 text-white shadow-md'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className="block text-[11px] uppercase tracking-wider opacity-80">
                            {dayName}
                          </span>
                          <span className="block text-base font-serif font-bold mt-0.5">
                            {dayNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Available Time Slots */}
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-2">
                    Available Time Slots for{' '}
                    <span className="text-teal-800">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-teal-50 border-teal-700 text-teal-950 font-semibold ring-2 ring-teal-700/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Intake & Client Info Form */}
                <form onSubmit={handleBookingSubmit} className="pt-4 border-t border-slate-200 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-teal-800">
                      Step 3 of 3
                    </span>
                    <h4 className="font-serif text-xl text-slate-900 font-medium">
                      Your Details &amp; Intentions
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Priya Sharma"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="priya@example.com"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Focus Area *
                      </label>
                      <select
                        name="focusArea"
                        value={formData.focusArea}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                      >
                        <option value="Overthinking & Restless Mind">Overthinking &amp; Restless Mind (चिंता/ओवरथिंकिंग)</option>
                        <option value="Deep Restful Sleep & Insomnia">Deep Restful Sleep &amp; Relaxation (नींद और विश्राम)</option>
                        <option value="Past Life Regression (PLR)">Past Life Regression (पूर्व जन्म स्मृति सत्र)</option>
                        <option value="Habit Mastery & Smoking Cessation">Habit Mastery &amp; Quitting Smoking (आदत मुक्ति)</option>
                        <option value="Stage Fear & Self Confidence">Stage Fear &amp; Public Confidence (मंच भय और आत्मविश्वास)</option>
                        <option value="Reiki Energy & Chakra Balancing">Reiki Energy &amp; Chakra Balancing (चक्र संतुलन)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Message or Life Goal (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Share what you hope to experience or release during our time together..."
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-teal-800 hover:bg-teal-900 active:bg-teal-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-900/10 disabled:opacity-70"
                  >
                    <span>{isSubmitting ? 'Confirming Your Slot...' : 'Confirm Appointment / समय आरक्षित करें'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    100% Confidential · Free rescheduling with 24h notice · No spam ever
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
