'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, Mail, Phone, MapPin, CheckCircle, ArrowLeft, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    clinicSize: '1-5',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header className="header" style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity color="var(--primary)" size={32} />
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>MediCore Pro</Link>
        </div>
        <Link href="/" className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', overflow: 'hidden' }} className="grid-cols-1">
            
            {/* Info Side */}
            <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,136,229,0.15) 0%, transparent 70%)', top: '-100px', right: '-100px' }}></div>
              <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(38,166,154,0.1) 0%, transparent 70%)', bottom: '-50px', left: '-50px' }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(30, 136, 229, 0.15)', color: 'var(--primary-light)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' }}>
                  <Sparkles size={16} /> Enterprise Solutions
                </div>
                <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', lineHeight: '1.25' }}>Let's build the future of your clinic together</h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                  Discuss clinic subscriptions, custom feature development, dedicated server setups, and onboarding packages with our product experts.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Email Us</div>
                      <a href="mailto:sales@medicore.pro" style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>sales@medicore.pro</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Call Us</div>
                      <a href="tel:+923000000000" style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>+92 (300) 123-4567</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Office HQ</div>
                      <span style={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>MediCore Suite 402, Block 5, Clifton, Karachi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', marginTop: '3rem', fontSize: '0.875rem', color: '#64748b', position: 'relative', zIndex: 1 }}>
                &copy; {new Date().getFullYear()} MediCore Inc. Trusted by healthcare institutions worldwide.
              </div>
            </div>

            {/* Form Side */}
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1.25rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <CheckCircle size={48} />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>Thank You!</h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Your message has been received. One of our enterprise sales team representatives will reach out to you within the next 2 hours.
                  </p>
                  <Link href="/" className="btn btn-primary" style={{ minWidth: '160px' }}>
                    Return to Homepage
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: 700 }}>Contact Enterprise Sales</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>Fill out the form below and we will get back to you shortly.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-cols-1">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-input"
                        placeholder="e.g. Dr. Aamir"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Work Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="doctor@clinic.com"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-cols-1">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="form-input"
                        placeholder="+92 300 1234567"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Clinic/Hospital Name</label>
                      <input
                        type="text"
                        name="clinicName"
                        required
                        className="form-input"
                        placeholder="e.g. Shifa Clinic"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        value={formData.clinicName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Number of Doctors/Staff</label>
                    <select
                      name="clinicSize"
                      className="form-input"
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', backgroundColor: 'white' }}
                      value={formData.clinicSize}
                      onChange={handleChange}
                    >
                      <option value="1-5">1 - 5 staff members</option>
                      <option value="6-20">6 - 20 staff members</option>
                      <option value="21-50">21 - 50 staff members</option>
                      <option value="50+">50+ (Enterprise Hospital)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Message / Requirements</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="form-input"
                      placeholder="Please tell us about your facility and any custom requirements..."
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', fontSize: '1rem', border: 'none', borderRadius: '8px', fontWeight: 600, background: 'var(--primary)' }}
                  >
                    {loading ? (
                      'Connecting...'
                    ) : (
                      <>
                        <Send size={18} /> Connect with Sales
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
