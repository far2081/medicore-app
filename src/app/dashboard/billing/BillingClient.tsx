'use client';

import { useState } from 'react';
import { CreditCard, Plus, Search, Filter, Check, ShieldCheck, DollarSign, Receipt } from 'lucide-react';
import { createInvoice, payInvoice } from '../../actions/dashboard';

interface PatientOption {
  id: string;
  patientId: string;
  name: string;
}

interface InvoiceData {
  id: string;
  amount: number;
  status: string;
  date: Date;
  patient: {
    name: string;
    patientId: string;
  };
}

export default function BillingClient({
  initialInvoices,
  patients
}: {
  initialInvoices: InvoiceData[];
  patients: PatientOption[];
}) {
  const [invoices, setInvoices] = useState<InvoiceData[]>(initialInvoices);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('Unpaid');

  const filtered = invoices.filter(inv => {
    const matchesSearch = inv.patient.name.toLowerCase().includes(search.toLowerCase()) || 
                          inv.patient.patientId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate metrics
  const totalRevenue = invoices.reduce((acc, cur) => cur.status === 'Paid' ? acc + cur.amount : acc, 0);
  const outstanding = invoices.reduce((acc, cur) => cur.status === 'Unpaid' ? acc + cur.amount : acc, 0);
  const paidCount = invoices.filter(inv => inv.status === 'Paid').length;
  const unpaidCount = invoices.filter(inv => inv.status === 'Unpaid').length;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('patientId', selectedPatientId);
    formData.append('amount', amount);
    formData.append('status', invoiceStatus);

    const res = await createInvoice(formData);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSelectedPatientId('');
      setAmount('');
      setInvoiceStatus('Unpaid');
      setShowModal(false);
      window.location.reload();
    }
  };

  const handlePay = async (id: string) => {
    if (confirm('Mark this invoice as Paid?')) {
      const res = await payInvoice(id);
      if (res.success) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Billing & Invoices</h1>
          <p className="text-muted">Manage patient billing, generate invoices, and log consulting fees.</p>
        </div>
        <button 
          onClick={() => {
            if (patients.length === 0) {
              alert('Please add a patient in the Patients Directory first before generating an invoice.');
              return;
            }
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--success)' }}>
              <Receipt size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>Collected</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Revenue Collected</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Rs {totalRevenue.toLocaleString()}</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--danger)' }}>
              <CreditCard size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>Due</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Outstanding Balance</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>Rs {outstanding.toLocaleString()}</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--primary)' }}>
              <ShieldCheck size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Invoices</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Paid Invoices count</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{paidCount} paid</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem', borderRadius: '6px', color: 'var(--warning)' }}>
              <Filter size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Invoices</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Pending Invoices</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{unpaidCount} unpaid</div>
        </div>
      </div>

      <div className="card">
        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            <input 
              type="text" 
              placeholder="Search by patient name or ID..." 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Invoices</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        {/* Invoices Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice Ref</th>
                <th>Patient Details</th>
                <th>Date Generated</th>
                <th>Fee Amount</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-gray)' }}>INV-{inv.id.substring(0, 8).toUpperCase()}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{inv.patient.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{inv.patient.patientId}</div>
                  </td>
                  <td>
                    {new Date(inv.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ fontWeight: 600 }}>Rs {inv.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-danger'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    {inv.status === 'Unpaid' ? (
                      <button 
                        onClick={() => handlePay(inv.id)}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', border: '1px solid var(--success)', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'transparent' }}
                      >
                        <Check size={14} /> Log Payment
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-gray)', padding: '0.25rem 0.5rem' }}>Receipt Settled</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-gray)' }}>
                    No invoices generated matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
          <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2rem', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Receipt size={24} color="var(--primary)" /> Generate Patient Invoice
            </h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Log consulting fees, medical services, and tests charges.</p>

            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleCreate}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Select Patient *</label>
                <select 
                  className="form-input" 
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  required
                >
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Amount (PKR) *</label>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', fontWeight: 600, color: 'var(--text-gray)' }}>Rs</span>
                  <input 
                    type="number" 
                    placeholder="e.g. 1500" 
                    className="form-input" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ paddingLeft: '2.5rem' }}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Initial Status</label>
                <select 
                  className="form-input"
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}
                >
                  <option value="Unpaid">Unpaid (Invoice Pending)</option>
                  <option value="Paid">Paid (Cash / Card Settled)</option>
                </select>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Generating...' : 'Generate Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
