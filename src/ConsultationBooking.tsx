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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (name === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-12">
        <div className="flex items-center text-[#a67c52] text-[10px] font-bold uppercase tracking-widest mb-4">
          <Calendar className="w-3 h-3 mr-2" />
          APPOINTMENT BOOKING
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Book a Consultation
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          Please fill out the form below with your details and a brief description of what you'd like to discuss.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-slate-200 shadow-sm p-8 md:p-10 mb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-bold text-slate-700">First Name</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Jane"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-bold text-slate-700">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-slate-700">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-slate-300'} p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-medium mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="mobileNumber" className="block text-sm font-bold text-slate-700">Mobile Number</label>
            <input 
              type="tel" 
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="+44 7700 900077"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-bold text-slate-700">Preferred Date</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className={`w-full border ${errors.date ? 'border-red-500' : 'border-slate-300'} p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs font-medium mt-1">{errors.date}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-bold text-slate-700">Preferred Time</label>
              <input 
                type="time" 
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-bold text-slate-700">Description</label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-slate-300 p-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
              placeholder="Please briefly describe what you'd like to discuss in our consultation..."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full md:w-auto bg-[#1a1f24] text-white font-bold px-8 py-4 hover:bg-black transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
