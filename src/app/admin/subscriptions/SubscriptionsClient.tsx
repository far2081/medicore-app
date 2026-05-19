'use client';

import { useState } from 'react';
import { CreditCard, ArrowUpRight, CheckCircle, RefreshCw, Users, Shield } from 'lucide-react';
import { updateClinicPlan } from '../../actions/admin';

interface ClinicSub {
  id: string;
  name: string;
  domain: string | null;
  plan: string;
  status: string;
  createdAt: Date;
}

export default function SubscriptionsClient({ initialClinics }: { initialClinics: ClinicSub[] }) {
  const [clinics, setClinics] = useState<ClinicSub[]>(initialClinics);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');

  // Stats calculation
  const stats = clinics.reduce((acc, clinic) => {
    if (clinic.status !== 'Active') return acc;
    if (clinic.plan === 'Basic') {
      acc.mrr += 5000;
      acc.basicCount += 1;
    } else if (clinic.plan === 'Standard') {
      acc.mrr += 15000;
      acc.standardCount += 1;
    } else if (clinic.plan === 'Premium') {
      acc.mrr += 30000;
      acc.premiumCount += 1;
    } else {
      acc.trialCount += 1;
    }
    return acc;
  }, { mrr: 0, basicCount: 0, standardCount: 0, premiumCount: 0, trialCount: 0 });

  const activeClinicsCount = clinics.filter(c => c.status === 'Active').length;

  const handlePlanChange = async (id: string, newPlan: string) => {
    const res = await updateClinicPlan(id, newPlan);
    if (res.success) {
      window.location.reload();
    }
  };

  const filtered = clinics.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === 'All' || c.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Subscriptions Management</h1>
          <p className="text-muted">Manage recurring plans, subscriptions billing, and SaaS plans metrics.</p>
        </div>
      </div>

      {/* Subscription Stats cards */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--primary)' }}>
              <CreditCard size={20} />
            </div>
            <span className="badge badge-success">+15.4%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Estimated Monthly Revenue</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Rs {stats.mrr.toLocaleString()}</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(38, 166, 154, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--accent)' }}>
              <CheckCircle size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Active tenants</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Paid Subscriptions</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.basicCount + stats.standardCount + stats.premiumCount} / {activeClinicsCount}</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--warning)' }}>
              <RefreshCw size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Free mode</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Active Trial Accounts</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stats.trialCount} clinics</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--danger)' }}>
              <Users size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Churn rate</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>SaaS Retention Rate</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>98.2%</div>
        </div>
      </div>

      {/* Plan Distribution Progress Bars */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Subscription Plans Distribution</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { name: 'Trial Plan (Free)', count: stats.trialCount, price: 'Rs 0', color: 'var(--text-gray)', total: clinics.length },
            { name: 'Basic Plan', count: stats.basicCount, price: 'Rs 5,000 / mo', color: 'var(--primary)', total: clinics.length },
            { name: 'Standard Plan', count: stats.standardCount, price: 'Rs 15,000 / mo', color: 'var(--accent)', total: clinics.length },
            { name: 'Premium Plan', count: stats.premiumCount, price: 'Rs 30,000 / mo', color: 'var(--warning)', total: clinics.length },
          ].map((item, idx) => {
            const pct = item.total > 0 ? (item.count / item.total) * 100 : 0;
            return (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>{item.name} <span style={{ color: 'var(--text-gray)', fontWeight: 400 }}>({item.price})</span></span>
                  <span>{item.count} clinics ({pct.toFixed(0)}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px', transition: 'width 0.4s' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem' }}>Billing Tenants & Plans</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Search clinic name..." 
              className="form-input" 
              style={{ width: '250px', padding: '0.5rem' }} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="form-input" 
              style={{ width: 'auto', padding: '0.5rem' }}
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="All">All Plans</option>
              <option value="Trial">Trial</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Clinic</th>
                <th>Current Plan</th>
                <th>Price Rate</th>
                <th>Billing status</th>
                <th>Enrolled Date</th>
                <th>Change Plan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((clinic) => {
                let rate = 'Rs 0 / month';
                if (clinic.plan === 'Basic') rate = 'Rs 5,000 / month';
                else if (clinic.plan === 'Standard') rate = 'Rs 15,000 / month';
                else if (clinic.plan === 'Premium') rate = 'Rs 30,000 / month';

                return (
                  <tr key={clinic.id}>
                    <td style={{ fontWeight: 600 }}>{clinic.name}</td>
                    <td>
                      <span className={`badge ${
                        clinic.plan === 'Premium' ? 'badge-warning' : 
                        clinic.plan === 'Standard' ? 'badge-primary' : 
                        clinic.plan === 'Basic' ? 'badge-success' : 'badge-ghost'
                      }`} style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                        {clinic.plan}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{rate}</td>
                    <td>
                      <span className={`badge ${clinic.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {clinic.status === 'Active' ? 'Active Billing' : 'Suspended'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                      {new Date(clinic.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td>
                      <select 
                        value={clinic.plan} 
                        onChange={(e) => handlePlanChange(clinic.id, e.target.value)}
                        className="form-input" 
                        style={{ padding: '0.25rem 0.5rem', width: 'auto', fontSize: '0.875rem' }}
                      >
                        <option value="Trial">Trial</option>
                        <option value="Basic">Basic (Rs 5,000)</option>
                        <option value="Standard">Standard (Rs 15,000)</option>
                        <option value="Premium">Premium (Rs 30,000)</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-gray)' }}>
                    No matching billing accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
