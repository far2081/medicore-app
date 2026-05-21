'use client';

import Link from 'next/link';
import { Activity, ArrowLeft, Shield, FileText } from 'lucide-react';

export default function PrivacyPage() {
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
        <div className="container" style={{ maxWidth: '800px', backgroundColor: 'white', padding: '3.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(38, 166, 154, 0.1)', color: 'var(--accent-dark)', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              <FileText size={16} /> Legal Guidelines
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Privacy Policy</h1>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Last updated: May 20, 2026</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155' }}>
            
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>1. Introduction & Overview</h2>
              <p>
                MediCore Pro ("we", "our", "us") values your privacy and the confidentiality of patient information. This Privacy Policy details how we collect, store, and process personal and medical data when your clinic accesses our SaaS platforms, services, and web tools.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>2. HIPAA Compliance & Patient Data</h2>
              <p>
                For the purposes of the Health Insurance Portability and Accountability Act (HIPAA), MediCore Pro acts as a Business Associate for our clinic tenants. Patient records, medical files, prescriptions, and visit histories are categorized as Protected Health Information (PHI) and are fully encrypted and segregated inside isolated databases.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>3. Information We Collect</h2>
              <p>
                We collect registration details (e.g., clinic administrator name, email, phone number, clinic name, domain) and billing parameters needed for subscriptions. We do not sell, trade, or share any tenant database information with third-party advertisers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>4. Security Audits & Access Restriction</h2>
              <p>
                We execute regular database backups and vulnerability checks. Clinic admins have tools to restrict access routes, enforce Session timeouts, and verify audit logs of receptionist activity. It is the tenant's responsibility to protect admin user credentials and passwords.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>5. Contact Legal Desk</h2>
              <p>
                If you have questions about compliance or have feedback on our data storage systems, please email us directly at <a href="mailto:privacy@medicore.pro" style={{ color: 'var(--primary)', fontWeight: 600 }}>privacy@medicore.pro</a>.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
        <div className="container">
          <p style={{ color: "#94a3b8" }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Created by Farhana Aamir | Contact: <a href="mailto:farzunmir@gmail.com" style={{ color: "var(--primary-light)" }}>farzunmir@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}
