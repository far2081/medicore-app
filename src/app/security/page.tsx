'use client';

import Link from 'next/link';
import { Activity, Shield, Key, FileText, Database, Server, RefreshCw, ArrowLeft, Check } from 'lucide-react';

export default function SecurityPage() {
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
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(30, 136, 229, 0.1)', color: 'var(--primary-dark)', padding: '0.5rem 1.25rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              <Shield size={16} /> Enterprise Grade Security
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Your Patient Data is Safe with Us</h1>
            <p className="text-muted" style={{ fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              At MediCore Pro, security isn't an afterthought. We employ industry-leading protocols to encrypt, isolate, and protect sensitive healthcare information.
            </p>
          </div>

          {/* Core Security Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }} className="grid-cols-1">
            <div className="card" style={{ padding: '2rem', backgroundColor: 'white', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', color: 'var(--primary)', padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
                <Key size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>End-to-End Encryption</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  All data is encrypted in transit using TLS 1.3 and at rest using military-grade AES-256 encryption. Your database connections are fully secured.
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'white', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(38, 166, 154, 0.1)', color: 'var(--accent)', padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
                <Shield size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>HIPAA & GDPR Compliance</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Designed around patient confidentiality. Our storage architecture complies fully with HIPAA security rules and GDPR data protection regulations.
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'white', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
                <Database size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Hourly Backups & Recovery</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  We keep historical transaction logs and perform hourly automated database snapshots. Rest assured, your clinic records can be restored instantly in an emergency.
                </p>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'white', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1rem', borderRadius: '12px', flexShrink: 0 }}>
                <Server size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Isolated Tenant Databases</h3>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Multi-tenant isolation ensures no overlapping connections. Each clinic's records and files are segregated to prevent unauthorized leakage or data bleeding.
                </p>
              </div>
            </div>
          </div>

          {/* Security Standards banner */}
          <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '20px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,136,229,0.1) 0%, transparent 70%)', top: '-80px', right: '-80px' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 700 }}>Our Regulatory Alignment</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="grid-cols-1">
                {[
                  'HIPAA compliant storage environments',
                  'SSL/TLS secure transit gateways',
                  'Role-based permissions & audit trails',
                  'SOC 2 Type II compliance standards',
                  'IP restriction firewalls availability',
                  '2-Factor Authentication (2FA) enforcement'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                      <Check size={14} />
                    </div>
                    <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
        <div className="container">
          <p style={{ color: '#94a3b8' }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Secure Patient Data & Analytics Platform.</p>
        </div>
      </footer>
    </div>
  );
}
