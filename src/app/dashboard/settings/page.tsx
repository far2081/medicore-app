'use client';

import { useState } from 'react';
import { Settings, Shield, Clock, Users, Save, Check } from 'lucide-react';

export default function ClinicSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Clinic configurations
  const [clinicName, setClinicName] = useState('City Hospital Clinic');
  const [clinicPhone, setClinicPhone] = useState('+92 300 1234567');
  const [clinicAddress, setClinicAddress] = useState('12-A Block, Gulberg III, Lahore, Pakistan');
  const [slotDuration, setSlotDuration] = useState('30');
  const [openTime, setOpenTime] = useState('09:00 AM');
  const [closeTime, setCloseTime] = useState('06:00 PM');

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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinic Configurations</h1>
          <p className="text-muted">Configure clinic profile, daily consulting hours, slot durations, and clinic security.</p>
        </div>
        
        {saveSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600 }}>
            <Check size={16} /> Configurations updated successfully!
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        {/* Navigation Sidebar */}
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
                backgroundColor: activeTab === 'general' ? 'rgba(30, 136, 229, 0.08)' : 'transparent',
                fontWeight: activeTab === 'general' ? 600 : 500,
                color: activeTab === 'general' ? 'var(--primary)' : 'var(--text-gray)',
              }}
            >
              <Settings size={18} /> Clinic Profile
            </button>

            <button 
              onClick={() => setActiveTab('hours')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'hours' ? 'rgba(30, 136, 229, 0.08)' : 'transparent',
                fontWeight: activeTab === 'hours' ? 600 : 500,
                color: activeTab === 'hours' ? 'var(--primary)' : 'var(--text-gray)',
              }}
            >
              <Clock size={18} /> Consulting Hours
            </button>

            <button 
              onClick={() => setActiveTab('staff')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeTab === 'staff' ? 'rgba(30, 136, 229, 0.08)' : 'transparent',
                fontWeight: activeTab === 'staff' ? 600 : 500,
                color: activeTab === 'staff' ? 'var(--primary)' : 'var(--text-gray)',
              }}
            >
              <Users size={18} /> Clinic Staff List
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
                backgroundColor: activeTab === 'security' ? 'rgba(30, 136, 229, 0.08)' : 'transparent',
                fontWeight: activeTab === 'security' ? 600 : 500,
                color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-gray)',
              }}
            >
              <Shield size={18} /> Portal Security
            </button>
          </div>
        </aside>

        {/* Tab content panel */}
        <div className="card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            {activeTab === 'general' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>Clinic Profile</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Official Clinic Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Clinic Contact Phone</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={clinicPhone}
                      onChange={(e) => setClinicPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Physical Address</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Clinic URL Slug (Tenant Hostname)</label>
                    <input type="text" className="form-input" value="city-hospital" disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subscription Tier Level</label>
                    <input type="text" className="form-input" value="Pro / Standard Plan" disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', color: 'var(--primary)', fontWeight: 600 }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>Consulting Hours & Slot Duration</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Consultation Session Duration</label>
                    <select 
                      className="form-input"
                      value={slotDuration}
                      onChange={(e) => setSlotDuration(e.target.value)}
                    >
                      <option value="15">15 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="45">45 Minutes</option>
                      <option value="60">60 Minutes</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Clinic Shift Start (Opening)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Clinic Shift End (Closing)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'staff' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>Authorized Clinic Staff Roles</h2>
                
                <div className="table-container" style={{ margin: '1rem 0' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Assigned Role</th>
                        <th>Account Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Dr. Sarah Smith</td>
                        <td>sarah.smith@medicore.pro</td>
                        <td><span className="badge badge-primary">Doctor / Admin</span></td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Asma Khan</td>
                        <td>asma.khan@medicore.pro</td>
                        <td><span className="badge badge-accent">Receptionist</span></td>
                        <td><span className="badge badge-success">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>Portal Security Configurations</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Strict HIPAA Patient Data Log Access</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Keep track of every user action regarding reading history logs.</div>
                    </div>
                    <input type="checkbox" defaultChecked={true} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Enable Patient Booking Portal Link</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)' }}>Enables patients to visit `city-hospital.medicore.pro/book` to select times.</div>
                    </div>
                    <input type="checkbox" defaultChecked={false} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'staff' && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  disabled={isSaving}
                >
                  <Save size={18} /> {isSaving ? 'Updating...' : 'Save Settings'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
