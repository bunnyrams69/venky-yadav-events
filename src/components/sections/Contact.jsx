import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission (replace with Netlify form or API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  return (
    <section id="contact" className="section bg-dot-grid">
      <SectionHeader eyebrow="LET'S PLAN TOGETHER" headline="Your Event Starts With Hello." />

      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="glass-card"
              style={{ padding: '48px 40px' }}
              data-netlify="true"
              name="inquiry"
            >
              <input type="hidden" name="form-name" value="inquiry" />

              {/* Row 1: Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">YOUR NAME</label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">PHONE</label>
                  <input
                    id="contact-phone"
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 99999 99999"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Email + Event Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">EMAIL</label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-event">EVENT TYPE</label>
                  <select
                    id="contact-event"
                    className="form-input"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                  >
                    <option value="">Select event</option>
                    <option value="Birthday">Birthday Decoration</option>
                    <option value="Wedding">Wedding Decoration</option>
                    <option value="Reception">Reception Setup</option>
                    <option value="Catering">Catering Services</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="House Warming">House Warming</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date + Guests */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-date">EVENT DATE</label>
                  <input
                    id="contact-date"
                    className="form-input"
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-guests">GUEST COUNT</label>
                  <input
                    id="contact-guests"
                    className="form-input"
                    type="number"
                    name="guests"
                    placeholder="Approx. guests"
                    value={formData.guests}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="form-group" style={{ marginBottom: '28px' }}>
                <label className="form-label" htmlFor="contact-message">TELL US YOUR VISION</label>
                <textarea
                  id="contact-message"
                  className="form-input"
                  name="message"
                  placeholder="Describe your dream event — themes, colors, preferences..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '15px',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Inquiry
                  </>
                )}
              </button>

              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @media (max-width: 600px) {
                  .form-grid-2 { grid-template-columns: 1fr !important; }
                }
              `}</style>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card"
              style={{
                padding: '64px 48px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle size={36} color="var(--gold-primary)" />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                }}
              >
                Thank You!
              </h3>

              <p className="text-body" style={{ maxWidth: '400px' }}>
                Venky Yadav's team will contact you shortly. We can't wait to make your event unforgettable!
              </p>

              <button
                className="btn-outline"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '' });
                }}
                style={{ marginTop: '8px' }}
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
