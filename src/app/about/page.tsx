'use client';

import Link from 'next/link';
import { Activity, Users, Heart, Shield, Compass, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
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
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>Our Mission is to Empower Healthcare Providers</h1>
            <p className="text-muted" style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              We build intelligent, secure, and user-friendly software that allows doctors, clinics, and hospitals to focus on what matters most: patient care.
            </p>
          </div>

          {/* Mission and Vision Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }} className="grid-cols-1">
            <div className="card" style={{ padding: '2.5rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '10px', width: 'fit-content' }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Our Vision</h3>
              <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                To become the global standard for healthcare clinic management, offering seamless digital integrations, automated billing operations, and fast patient record workflows.
              </p>
            </div>

            <div className="card" style={{ padding: '2.5rem', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(38, 166, 154, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '10px', width: 'fit-content' }}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Our Story</h3>
              <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Founded by healthcare professionals and SaaS architects who were frustrated by slow, legacy clinic software. We built MediCore Pro to be fast, responsive, and completely secure.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', textAlign: 'center', marginBottom: '2.5rem', fontWeight: 700 }}>Core Values That Drive Us</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="grid-cols-1">
              {[
                { icon: Shield, title: 'Confidentiality First', desc: 'Patient privacy is embedded into our system architecture.' },
                { icon: Users, title: 'Collaborative Design', desc: 'Built in partnership with doctors and receptionists.' },
                { icon: Activity, title: 'Technical Excellence', desc: 'Super fast, crash-free performance with isolated databases.' }
              ].map((val, idx) => (
                <div key={idx} className="card" style={{ backgroundColor: 'white', padding: '1.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                    <val.icon size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>{val.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Simple CTA banner */}
          <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Want to join the healthcare revolution?</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              Create a free trial clinic account or talk to our consultants about custom billing options today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }} className="flex-col-mobile">
              <Link href="/signup" className="btn btn-primary">Start Free Trial</Link>
              <Link href="/contact" className="btn btn-outline" style={{ border: '1px solid white', color: 'white' }}>Contact Sales</Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
        <div className="container">
          <p style={{ color: '#94a3b8' }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Simplifying clinic workflows.</p>
        </div>
      </footer>
    </div>
  );
}
