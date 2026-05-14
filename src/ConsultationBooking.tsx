import React, { useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function ConsultationBooking() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    description: '',
    date: '',
    time: '10:00'
  });
  const [errors, setErrors] = useState({
    email: '',
    date: ''
  });
  const [touched, setTouched] = useState({
    email: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Perform real-time validation if the field has been touched
    if (name === 'email' && touched.email) {
      if (!value) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'email') {
      if (!formData.email) {
        setErrors(prev => ({ ...prev, email: 'Email is required' }));
      } else if (!validateEmail(formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ email: true });

    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address (e.g. name@example.com)' }));
      return;
    }

    if (!formData.date) {
      setErrors(prev => ({ ...prev, date: 'Please select a preferred date' }));
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  if (isSubmitted) {
    const eventTitle = `Consultation with Northstar Studio (${formData.firstName} ${formData.lastName})`;
    const eventDescription = `Consultation request: ${formData.description}`;
    const startDateTime = new Date(`${formData.date}T${formData.time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatGCalDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const gCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&details=${encodeURIComponent(eventDescription)}&dates=${formatGCalDate(startDateTime)}/${formatGCalDate(endDateTime)}`;
    
    const outlookLink = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(eventDescription)}&startdt=${startDateTime.toISOString()}&enddt=${endDateTime.toISOString()}`;

    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-serif text-slate-900 mb-4 tracking-tight">Booking Request Received</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Thank you, {formData.firstName}. We have received your consultation request for <strong>{formData.date} at {formData.time}</strong> and will be in touch shortly to confirm.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8 inline-block text-left w-full max-w-md">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Add to your calendar</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              href={gCalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-2 px-4 text-sm font-medium hover:bg-slate-50 transition-colors rounded shadow-sm"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="" className="w-4 h-4" />
              Google Calendar
            </a>
            <a 
              href={outlookLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-2 px-4 text-sm font-medium hover:bg-slate-50 transition-colors rounded shadow-sm"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" alt="" className="w-4 h-4" />
              Outlook
            </a>
          </div>
        </div>

        <div className="block pt-4">
          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors underline decoration-dotted"
          >
            Back to booking form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pt-16">
      {/* Header */}
      <div className="mb-20">
        <div className="flex items-center text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-6 gap-2">
          <Calendar className="w-4 h-4" />
          SESSION RESERVATION
        </div>
        <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-10 tracking-tighter leading-[0.95]">
          Request a <span className="italic text-accent">Strategic</span> Session.
        </h1>
        <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
          Operational refactoring starts with clarity. Reserve a dedicated consultation to discuss your systemic requirements and architectural goals.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-slate-100 shadow-2xl rounded-[3.5rem] p-10 md:p-20 mb-32 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
        
        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label htmlFor="firstName" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="lastName" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label htmlFor="email" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                required
                className={`w-full bg-slate-50 border ${errors.email ? 'border-red-200' : 'border-slate-100'} p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm`}
                placeholder="jane@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1 italic">{errors.email}</p>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="mobileNumber" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <input 
                type="tel" 
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                placeholder="+44 7700 900077"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label htmlFor="date" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Date</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={`w-full bg-slate-50 border ${errors.date ? 'border-red-200' : 'border-slate-100'} p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm`}
              />
              {errors.date && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-1 italic">{errors.date}</p>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="time" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Time</label>
              <input 
                type="time" 
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Session Intent</label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-[2rem] text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm resize-y"
              placeholder="Please briefly describe the specific operational friction you'd like to address..."
            />
          </div>

          <div className="pt-8">
            <button 
              type="submit"
              className="group w-full md:w-auto bg-slate-900 text-white font-bold px-12 py-6 rounded-2xl hover:bg-accent transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Submit Reservation
                <CheckCircle2 className="w-4 h-4 ml-4 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
