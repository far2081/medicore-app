'use client';

import { useState } from 'react';
import { Search, Plus, Filter, Building2, Trash2, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';
import { createClinic, toggleClinicStatus, updateClinicPlan, deleteClinic } from '../../actions/admin';

interface ClinicData {
  id: string;
  name: string;
  domain: string | null;
  plan: string;
  status: string;
  createdAt: Date;
  _count: {
    users: number;
    patients: number;
  };
}

export default function ClinicsClient({ initialClinics }: { initialClinics: ClinicData[] }) {
  const [clinics, setClinics] = useState<ClinicData[]>(initialClinics);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [newClinicName, setNewClinicName] = useState('');
  const [newClinicDomain, setNewClinicDomain] = useState('');
  const [newClinicPlan, setNewClinicPlan] = useState('Basic');
  const [newClinicStatus, setNewClinicStatus] = useState('Active');

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(search.toLowerCase()) ||
      (clinic.domain && clinic.domain.toLowerCase().includes(search.toLowerCase()));
    const matchesPlan = planFilter === 'All' || clinic.plan === planFilter;
    const matchesStatus = statusFilter === 'All' || clinic.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('name', newClinicName);
    formData.append('domain', newClinicDomain);
    formData.append('plan', newClinicPlan);
    formData.append('status', newClinicStatus);

    const res = await createClinic(formData);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      // Success, reset form & modal
      setNewClinicName('');
      setNewClinicDomain('');
      setNewClinicPlan('Basic');
      setNewClinicStatus('Active');
      setShowModal(false);
      
      // Reload clinics (or we can just window.location.reload because it's simpler since server actions revalidate)
      window.location.reload();
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    if (confirm('Are you sure you want to change this clinic\'s status?')) {
      const res = await toggleClinicStatus(id, currentStatus);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  const handlePlanChange = async (id: string, newPlan: string) => {
    const res = await updateClinicPlan(id, newPlan);
    if (res.success) {
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('WARNING: Are you sure you want to permanently delete this clinic? All associated data will be lost.')) {
      const res = await deleteClinic(id);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clinics (Tenants)</h1>
          <p className="text-muted">Monitor and manage all clinic subscriptions and database tenants.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn btn-primary" 
          style={{ backgroundColor: '#0f172a' }}
        >
          <Plus size={18} /> Onboard New Clinic
        </button>
      </div>

      <div className="card">
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            <input 
              type="text" 
              placeholder="Search by clinic name or domain..." 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="All">All Plans</option>
            <option value="Basic">Basic Plan</option>
            <option value="Standard">Standard Plan</option>
            <option value="Premium">Premium Plan</option>
            <option value="Trial">Trial Plan</option>
          </select>

          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Clinic Name</th>
                <th>Subdomain / Domain</th>
                <th>Plan Tier</th>
                <th>Status</th>
                <th>Staff count</th>
                <th>Patients count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td style={{ fontWeight: 600 }}>{clinic.name}</td>
                  <td style={{ color: 'var(--text-gray)' }}>{clinic.domain || 'no-domain'}.medicore.pro</td>
                  <td>
                    <select
                      value={clinic.plan}
                      onChange={(e) => handlePlanChange(clinic.id, e.target.value)}
                      className="form-input"
                      style={{ padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.875rem' }}
                    >
                      <option value="Trial">Trial</option>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleToggleStatus(clinic.id, clinic.status)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span className={`badge ${clinic.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {clinic.status}
                      </span>
                    </button>
                  </td>
                  <td>{clinic._count.users}</td>
                  <td>{clinic._count.patients}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleToggleStatus(clinic.id, clinic.status)}
                        className="btn-ghost"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        {clinic.status === 'Active' ? <XCircle size={14} color="var(--danger)" /> : <CheckCircle size={14} color="var(--success)" />}
                        {clinic.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => handleDelete(clinic.id)}
                        className="btn-ghost"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClinics.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-gray)' }}>
                    No clinics found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={24} color="#0f172a" /> Onboard Clinic Tenant
            </h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Set up a new workspace instance for a clinic.</p>

            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleOnboard}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Clinic Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. City Dental Care"
                  value={newClinicName}
                  onChange={(e) => {
                    setNewClinicName(e.target.value);
                    // auto generate domain slug
                    setNewClinicDomain(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                  }}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Workspace Slug (Subdomain) *</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. city-dental"
                    value={newClinicDomain}
                    onChange={(e) => setNewClinicDomain(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                    style={{ flexGrow: 1 }}
                    required
                  />
                  <span style={{ marginLeft: '0.5rem', color: 'var(--text-gray)', fontSize: '0.875rem' }}>.medicore.pro</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Pricing Plan</label>
                  <select 
                    className="form-input"
                    value={newClinicPlan}
                    onChange={(e) => setNewClinicPlan(e.target.value)}
                  >
                    <option value="Trial">Trial</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-input"
                    value={newClinicStatus}
                    onChange={(e) => setNewClinicStatus(e.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="btn btn-outline"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-dark)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ backgroundColor: '#0f172a' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Onboarding...' : 'Onboard Clinic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
