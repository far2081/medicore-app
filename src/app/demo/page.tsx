'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, Calendar, Clock, Video, CheckCircle, ArrowLeft, Send, Play } from 'lucide-react';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinicName: '',
    demoDate: '',
    demoTime: '10:00',
    timezone: 'GMT+5 (PKT)',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', overflow: 'hidden' }} className="grid-cols-1">
            
            {/* Info Side */}
            <div style={{ backgroundColor: '#f1f5f9', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(30, 136, 229, 0.1)', color: 'var(--primary-dark)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem' }}>
                  <Play size={16} /> Product Demo
                </div>
                <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1.25rem', lineHeight: '1.25' }}>See MediCore Pro in Action</h2>
                <p style={{ color: 'var(--text-gray)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                  Book a personalized 15-minute live screen-share demo session with one of our onboarding specialists. We'll show you how to configure the clinic dashboard for your specific workflow.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>Personalized Walkthrough</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>A tailored demo based on your clinic size, specializations, and staff count.</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <Video size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>Live Screen-Share (Google Meet)</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>No download required. Click the Meet invite link in your calendar to join.</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>15-Minute Dynamic Session</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Fast-paced overview with Q&A. We respect your time and schedule.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '2rem', marginTop: '3rem', fontSize: '0.875rem', color: 'var(--text-gray)' }}>
                Have urgent technical questions? Reach out to <a href="mailto:support@medicore.pro" style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>support@medicore.pro</a>
              </div>
            </div>

            {/* Form Side */}
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1.25rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <CheckCircle size={48} />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>Demo Booked!</h2>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Your demo session has been scheduled successfully for <strong>{formData.demoDate}</strong> at <strong>{formData.demoTime} ({formData.timezone})</strong>. 
                  </p>
                  <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontSize: '0.875rem' }}>
                    A Google Meet invitation link has been dispatched to <strong>{formData.email}</strong>.
                  </p>
                  <Link href="/" className="btn btn-primary" style={{ minWidth: '160px' }}>
                    Return to Homepage
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', fontWeight: 700 }}>Schedule Live Demo</h3>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>Select your preferred date, time, and tell us who you are.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-input"
                      placeholder="Dr. Aamir"
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Clinic/Facility Name</label>
                    <input
                      type="text"
                      name="clinicName"
                      required
                      className="form-input"
                      placeholder="MediCore Wellness Center"
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                      value={formData.clinicName}
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-cols-1">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Demo Date</label>
                      <input
                        type="date"
                        name="demoDate"
                        required
                        className="form-input"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none' }}
                        value={formData.demoDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Preferred Time Slot</label>
                      <select
                        name="demoTime"
                        className="form-input"
                        style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', backgroundColor: 'white' }}
                        value={formData.demoTime}
                        onChange={handleChange}
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>Select Timezone</label>
                    <select
                      name="timezone"
                      className="form-input"
                      style={{ width: '100%', padding: '0.625rem 0.875rem', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', backgroundColor: 'white' }}
                      value={formData.timezone}
                      onChange={handleChange}
                    >
                      <option value="GMT+5 (PKT)">Pakistan Standard Time (GMT+5)</option>
                      <option value="GMT+4 (GST)">Gulf Standard Time (GMT+4)</option>
                      <option value="GMT+0 (GMT)">Greenwich Mean Time (GMT+0)</option>
                      <option value="GMT-5 (EST)">Eastern Standard Time (GMT-5)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', fontSize: '1rem', border: 'none', borderRadius: '8px', fontWeight: 600, background: 'var(--primary)' }}
                  >
                    {loading ? (
                      'Scheduling...'
                    ) : (
                      <>
                        <Calendar size={18} /> Schedule My Demo
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
