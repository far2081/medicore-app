import Link from 'next/link';
import Image from 'next/image';
import { Activity, Shield, Clock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity color="var(--primary)" size={32} />
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>MediCore Pro</span>
        </div>
        <nav className="header-nav">
          <Link href="#features" className="header-link">Features</Link>
          <Link href="#pricing" className="header-link">Pricing</Link>
          <Link href="#testimonials" className="header-link">Testimonials</Link>
          <div className="header-actions">
            <Link href="/login" className="btn btn-ghost">Log In</Link>
            <Link href="/signup" className="btn btn-primary">Start Free Trial</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-shape"></div>
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-8 animate-fade-in">
          <div className="hero-content">
            <h1 className="hero-title">Smart Healthcare SaaS Platform for Modern Clinics</h1>
            <p className="hero-subtitle">
              Manage your entire hospital or clinic from one powerful dashboard. Real-time appointments, secure patient records, automated billing, and insightful analytics.
            </p>
            <div className="hero-buttons">
              <Link href="/signup" className="btn btn-primary hero-btn">
                Start 14-Day Free Trial <ChevronRight size={20} />
              </Link>
              <Link href="/demo" className="btn btn-outline hero-btn">
                Request Demo
              </Link>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', marginRight: '2px' }}></div>
                ))}
              </div>
              <span style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>Trusted by 500+ clinics worldwide</span>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="glass-card" style={{ padding: '0.5rem' }}>
              <Image 
                src="/hero.png" 
                alt="MediCore Dashboard" 
                width={600} 
                height={400} 
                style={{ borderRadius: '12px', width: '100%', height: 'auto', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Everything you need to run your clinic</h2>
            <p className="text-muted" style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              A complete suite of tools designed specifically for healthcare professionals to streamline daily operations.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {[
              { icon: Activity, title: 'Patient Management', desc: 'Securely manage medical records, history, and prescriptions with real-time access.' },
              { icon: Clock, title: 'Smart Appointments', desc: 'Automated scheduling with SMS/Email reminders to reduce no-shows.' },
              { icon: CreditCard, title: 'Automated Billing', desc: 'Generate PDF invoices, track payments, and manage expenses seamlessly.' },
              { icon: Shield, title: 'Role-Based Access', desc: 'Separate portals for Admins, Doctors, and Receptionists with precise permissions.' }
            ].map((feature, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'white', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <feature.icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p className="text-muted" style={{ lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Simple, Transparent Pricing</h2>
            <p className="text-muted" style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Choose the perfect plan for your clinic's needs. Scale as you grow.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8" style={{ alignItems: 'center' }}>
            {/* Basic Plan */}
            <div className="card" style={{ padding: '3rem 2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-gray)' }}>Basic</h3>
              <div style={{ margin: '1.5rem 0', fontSize: '3rem', fontWeight: 800 }}>Rs 5,000<span style={{ fontSize: '1rem', color: 'var(--text-gray)', fontWeight: 500 }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Up to 2 Doctors', '1000 Patients/mo', 'Basic Scheduling', 'Email Support'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                    <CheckCircle2 size={20} color="var(--success)" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=basic" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Get Started</Link>
            </div>
            
            {/* Premium Plan */}
            <div className="card" style={{ padding: '3.5rem 2rem', border: '2px solid var(--primary)', transform: 'scale(1.05)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600 }}>Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Professional</h3>
              <div style={{ margin: '1.5rem 0', fontSize: '3rem', fontWeight: 800 }}>Rs 10,000<span style={{ fontSize: '1rem', color: 'var(--text-gray)', fontWeight: 500 }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Up to 10 Doctors', 'Unlimited Patients', 'Advanced Analytics', 'SMS Reminders', 'Priority Support'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                    <CheckCircle2 size={20} color="var(--success)" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=pro" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Started</Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card" style={{ padding: '3rem 2rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-gray)' }}>Enterprise</h3>
              <div style={{ margin: '1.5rem 0', fontSize: '3rem', fontWeight: 800 }}>Custom</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {['Unlimited Doctors', 'Multiple Clinics', 'Custom Integrations', 'Dedicated Account Manager', '24/7 Phone Support'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                    <CheckCircle2 size={20} color="var(--success)" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div className="grid grid-cols-4 gap-8" style={{ marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Activity color="var(--accent)" size={32} />
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>MediCore</span>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>The complete hospital and clinic management platform for modern healthcare providers.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 600 }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} MediCore Pro SaaS. Created by Farhana Aamir | Contact: <a href="mailto:farzunmir@gmail.com" style={{ color: 'var(--primary-light)' }}>farzunmir@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
