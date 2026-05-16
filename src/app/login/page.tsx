"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Lock } from 'lucide-react';

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple PIN check
    if (pin === '1234') {
      router.push('/dashboard'); // Clinic Admin
    } else if (pin === '0000') {
      router.push('/admin'); // Super Admin
    } else {
      setError('Invalid PIN code. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'var(--primary-light)', color: 'white', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
            <Activity size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-dark)', margin: 0 }}>MediCore Pro</h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Secure System Login</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} /> Enter 4-Digit Access PIN
            </label>
            <input 
              type="password" 
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="e.g. 1234" 
              className="form-input" 
              style={{ fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.5rem' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
            Unlock System
          </button>
        </form>

        <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-gray)', textAlign: 'center' }}>
          <p>Demo Codes:</p>
          <p>Clinic Admin: <b>1234</b></p>
          <p>Super Admin: <b>0000</b></p>
        </div>
      </div>
    </div>
  );
}
