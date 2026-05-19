'use client';

import { useState } from 'react';
import { Settings, Shield, CreditCard, Mail, Database, Save, Check } from 'lucide-react';

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // General settings state
  const [platformName, setPlatformName] = useState('MediCore Global');
  const [supportEmail, setSupportEmail] = useState('support@medicore.pro');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowSignups, setAllowSignups] = useState(true);

  // API Credentials
  const [stripeKey, setStripeKey] = useState('sk_test_51Nz...8x92');
  const [smtpServer, setSmtpServer] = useState('smtp.mailgun.org');
  const [smtpUser, setSmtpUser] = useState('postmaster@medicore.pro');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Platform Settings</h1>
          <p className="text-muted">Configure global application behavior, payment keys, security credentials, and email gateways.</p>
        </div>
        
        {saveSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
            <Check size={16} /> Changes saved successfully!
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        {/* Settings Navigation Tabs */}
        <aside className="card" style={{ height: 'fit-content', padding: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setActiveTab('general')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'general' ? '#f1f5f9' : 'transparent',
                fontWeight: activeTab === 'general' ? 600 : 500,
                color: activeTab === 'general' ? '#0f172a' : 'var(--text-gray)',
              }}
            >
              <Settings size={18} /> General System
            </button>

            <button 
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'security' ? '#f1f5f9' : 'transparent',
                fontWeight: activeTab === 'security' ? 600 : 500,
                color: activeTab === 'security' ? '#0f172a' : 'var(--text-gray)',
              }}
            >
              <Shield size={18} /> Platform Security
            </button>

            <button 
              onClick={() => setActiveTab('payments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'payments' ? '#f1f5f9' : 'transparent',
                fontWeight: activeTab === 'payments' ? 600 : 500,
                color: activeTab === 'payments' ? '#0f172a' : 'var(--text-gray)',
              }}
            >
              <CreditCard size={18} /> Billing & Stripe
            </button>

            <button 
              onClick={() => setActiveTab('mail')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'mail' ? '#f1f5f9' : 'transparent',
                fontWeight: activeTab === 'mail' ? 600 : 500,
                color: activeTab === 'mail' ? '#0f172a' : 'var(--text-gray)',
              }}
            >
              <Mail size={18} /> SMTP & Email
            </button>

            <button 
              onClick={() => setActiveTab('database')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'database' ? '#f1f5f9' : 'transparent',
                fontWeight: activeTab === 'database' ? 600 : 500,
                color: activeTab === 'database' ? '#0f172a' : 'var(--text-gray)',
              }}
            >
              <Database size={18} /> System Diagnostics
            </button>
          </div>
        </aside>

        {/* Settings Tab Content */}
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            {activeTab === 'general' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>General System Configuration</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">SaaS Platform Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Support Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Enable Maintenance Mode</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Redirects all public and tenant links to a maintenance screen.</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Allow New Registrations (SaaS Signup)</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Turn this off to temporarily freeze new clinic signups on your homepage.</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={allowSignups}
                      onChange={(e) => setAllowSignups(e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Security & Auth Parameters</h2>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Session Idle Timeout (Minutes)</label>
                  <input type="number" className="form-input" defaultValue={120} style={{ maxWidth: '200px' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-gray)', marginTop: '0.25rem', display: 'block' }}>Automatically signs out inactive users.</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Enforce Two-Factor Authentication (2FA)</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Force all Super Admin and Clinic Admin accounts to log in with an authenticator app.</div>
                    </div>
                    <input type="checkbox" defaultChecked={false} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>IP Access Restricted Firewall</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Block access to `/admin` routes from unrecognized public IP networks.</div>
                    </div>
                    <input type="checkbox" defaultChecked={false} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Stripe & Subscriptions Gateways</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Stripe Live Secret Key</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      value={stripeKey} 
                      onChange={(e) => setStripeKey(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stripe Webhook Secret (Signing secret)</label>
                    <input type="password" className="form-input" placeholder="whsec_..." />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Basic Plan Price ID (Monthly)</label>
                      <input type="text" className="form-input" placeholder="price_1H..." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Standard Plan Price ID (Monthly)</label>
                      <input type="text" className="form-input" placeholder="price_2H..." />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mail' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>SMTP Transporter Configuration</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">SMTP Gateway Host</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={smtpServer}
                      onChange={(e) => setSmtpServer(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SMTP Authentication User</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">SMTP Password</label>
                    <input type="password" className="form-input" placeholder="••••••••••••••••••••" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">SMTP Port</label>
                    <input type="number" className="form-input" defaultValue={587} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>System Diagnostics & DB Status</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 600 }}>Database Engine</span>
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>PostgreSQL</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 600 }}>Prisma Client version</span>
                    <span>v6.0.0</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 600 }}>NextJS Server Mode</span>
                    <span>Server-Side App Router (Node.js 20+)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: 600 }}>Active Connection Pools</span>
                    <span style={{ color: 'var(--success)' }}>Stable (Pool Size: 10)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'database' && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#0f172a' }}
                  disabled={isSaving}
                >
                  <Save size={18} /> {isSaving ? 'Saving Configurations...' : 'Save Configuration'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
