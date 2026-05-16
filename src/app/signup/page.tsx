'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, Mail, Lock, User, Building2, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signup } from '../actions/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const result = await signup(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f8fafc' }}>
      {/* Left Side - Visual */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#0f172a', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '4rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }} className="hidden md:flex">
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <Activity color="#3b82f6" size={40} />
            <span style={{ fontSize: '2rem', fontWeight: 800 }}>MediCore Pro</span>
          </div>
          
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Join the future of <span style={{ color: '#3b82f6' }}>Healthcare Management.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '3rem', maxWidth: '500px' }}>
            Start your 14-day free trial today. No credit card required. Cancel anytime.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              'Unlimited patient records',
              'Advanced doctor scheduling',
              'Automated billing & pharmacy',
              'Real-time analytics dashboard'
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ backgroundColor: '#1e293b', padding: '0.5rem', borderRadius: '50%', color: '#3b82f6' }}>
                  <ChevronRight size={16} />
                </div>
                <span style={{ fontSize: '1.125rem' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Create your account</h2>
            <p style={{ color: '#64748b' }}>Enter your details to start your free trial</p>
          </div>

          {error && (
            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', border: '1px solid #fee2e2' }}>
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', border: '1px solid #dcfce7' }}>
              <CheckCircle2 size={18} />
              Account created successfully! Redirecting to login...
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input name="name" required type="text" placeholder="John Doe" className="form-input" style={{ paddingLeft: '2.75rem', width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Clinic Name</label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input name="clinicName" required type="text" placeholder="City Clinic" className="form-input" style={{ paddingLeft: '2.75rem', width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input name="email" required type="email" placeholder="name@company.com" className="form-input" style={{ paddingLeft: '2.75rem', width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input name="password" required type="password" placeholder="••••••••" className="form-input" style={{ paddingLeft: '2.75rem', width: '100%', height: '45px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              </div>
            </div>

            <button disabled={loading} type="submit" className="btn btn-primary" style={{ height: '48px', fontSize: '1rem', marginTop: '1rem', width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b', fontSize: '0.875rem' }}>
            Already have an account? <Link href="/login" style={{ color: '#3b82f6', fontWeight: 600 }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

