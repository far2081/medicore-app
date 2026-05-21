'use client';

import Link from 'next/link';
import { Activity, ArrowLeft, Scale, FileText } from 'lucide-react';

export default function TermsPage() {
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
              <Scale size={16} /> User Agreement
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Terms of Service</h1>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Last updated: May 20, 2026</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: '1.7', color: '#334155' }}>
            
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>1. Acceptance of Agreement</h2>
              <p>
                By registering an account, starting a 14-day free trial, or subscribing to one of our billing plans, your organization ("Tenant", "Clinic") agrees to be bound by these Terms of Service. If you do not accept these terms, you may not access or use our dashboard resources.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>2. Account Activation & Tenant Limits</h2>
              <p>
                When creating a clinic account, you must provide valid registration details. Each subscription plan imposes limits on the number of active doctors, appointment records, and billing actions. Overstepping these limits will prompt a plan upgrade suggestion.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>3. SaaS Pricing, Billing & Refunds</h2>
              <p>
                Subscribed accounts are billed on a recurring monthly or annual basis. Prices are stated in PKR or USD. You can cancel your subscription at any time via the admin billing screen. Suspended accounts will have their databases kept intact for 30 days before termination.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>4. Indemnification & Limitation of Liability</h2>
              <p>
                MediCore Pro is a clinic management support tool. We do not provide clinical medical diagnoses or health recommendations. Clinics and their doctors are solely responsible for the correctness of prescribed medication, patient assessments, and billing reports generated through the software.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>5. Revisions of the Agreement</h2>
              <p>
                We reserve the right to revise or modify these Terms of Service. Clinic administrators will be notified of major terms revisions via email or platform announcements 15 days before changes apply.
              </p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem 0', textAlign: 'center', fontSize: '0.875rem' }}>
        <div className="container">
          <p style={{ color: "#94a3b8" }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Terms & Agreement. Created by Farhana Aamir | Contact: <a href="mailto:farzunmir@gmail.com" style={{ color: "var(--primary-light)" }}>farzunmir@gmail.com</a></p>
        </div>
      </footer>
    </div>
  );
}
