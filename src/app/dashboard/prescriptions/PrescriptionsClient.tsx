'use client';

import { useState } from 'react';
import { FileText, Search, Plus, User, FileEdit, Clipboard } from 'lucide-react';
import { updatePatientHistory } from '../../actions/dashboard';

interface PatientPrescription {
  id: string;
  patientId: string;
  name: string;
  age: number | null;
  gender: string | null;
  history: string | null;
  phone: string | null;
  updatedAt: Date;
}

export default function PrescriptionsClient({
  initialPatients
}: {
  initialPatients: PatientPrescription[];
}) {
  const [patients, setPatients] = useState<PatientPrescription[]>(initialPatients);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientPrescription | null>(null);
  const [historyText, setHistoryText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId.toLowerCase().includes(search.toLowerCase())
  );

  const openPrescriptionModal = (patient: PatientPrescription) => {
    setSelectedPatient(patient);
    setHistoryText(patient.history || '');
    setError('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setIsSubmitting(true);
    setError('');

    const res = await updatePatientHistory(selectedPatient.id, historyText);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setShowModal(false);
      window.location.reload();
    }
  };

  const loadTemplate = (type: string) => {
    let template = '';
    if (type === 'general') {
      template = `Diagnosis: Mild Fever & Body Ache\n\nRx:\n1. Tab Paracetamol 500mg -- 1-0-1 (After Food) -- 3 Days\n2. Cap Multivitamin -- 0-1-0 (After Food) -- 10 Days\n\nInstructions: Drink plenty of warm fluids, rest well.`;
    } else if (type === 'flu') {
      template = `Diagnosis: Upper Respiratory Tract Infection (Flu)\n\nRx:\n1. Tab Cetirizine 10mg -- 0-0-1 (Before Sleep) -- 5 Days\n2. Tab Amoxicillin 500mg -- 1-0-1 (After Food) -- 5 Days\n3. Cough Syrup -- 2 tsp thrice daily -- 5 Days\n\nInstructions: Steam inhalation twice daily, avoid cold foods.`;
    } else if (type === 'hypertension') {
      template = `Diagnosis: Chronic Hypertension\n\nRx:\n1. Tab Amlodipine 5mg -- 1-0-0 (Morning) -- 30 Days\n2. Tab Aspirin 75mg -- 0-0-1 (Night) -- 30 Days\n\nInstructions: Reduce salt intake, regular BP monitoring.`;
    }
    setHistoryText(template);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Prescriptions & Patient Records</h1>
          <p className="text-muted">Draft prescriptions, track medical history, and issue clinical treatment instructions.</p>
        </div>
      </div>

      <div className="card">
        {/* Filters */}
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
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient Details</th>
                <th>Age & Gender</th>
                <th>Phone Number</th>
                <th>Current Prescription / Clinical Notes</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{patient.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{patient.patientId}</div>
                  </td>
                  <td>
                    {patient.age ? `${patient.age} Yrs` : '-'}, {patient.gender || '-'}
                  </td>
                  <td>{patient.phone || 'N/A'}</td>
                  <td>
                    <div style={{ 
                      maxWidth: '300px', 
                      whiteSpace: 'pre-wrap', 
                      fontSize: '0.875rem', 
                      maxHeight: '80px', 
                      overflowY: 'auto',
                      backgroundColor: '#f8fafc',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #f1f5f9'
                    }}>
                      {patient.history || <span style={{ color: 'var(--text-gray)', fontStyle: 'italic' }}>No prescription drafted yet</span>}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>
                    {new Date(patient.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <button 
                      onClick={() => openPrescriptionModal(patient)}
                      className="btn-ghost"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid rgba(30, 136, 229, 0.2)', borderRadius: '6px' }}
                    >
                      <FileEdit size={14} /> Draft prescription
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-gray)' }}>
                    No patients found. Add patients first in the directory to issue prescriptions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPatient && (
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
          <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={24} color="var(--primary)" /> Draft Medical Prescription
            </h2>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-gray)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <span>Patient: <b>{selectedPatient.name}</b></span>
              <span>ID: <b>{selectedPatient.patientId}</b></span>
              <span>Age/Gender: <b>{selectedPatient.age || '-'}/{selectedPatient.gender || '-'}</b></span>
            </div>

            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSave}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>Clinical Record & Rx Instructions</label>
                  
                  {/* Template Shortcuts */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" onClick={() => loadTemplate('general')} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      Fever Template
                    </button>
                    <button type="button" onClick={() => loadTemplate('flu')} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      Cold/Flu Template
                    </button>
                    <button type="button" onClick={() => loadTemplate('hypertension')} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                      BP Template
                    </button>
                  </div>
                </div>

                <textarea 
                  className="form-input" 
                  value={historyText}
                  onChange={(e) => setHistoryText(e.target.value)}
                  placeholder="Rx:&#10;1. Medicine Name -- Dose/Frequency -- Duration&#10;&#10;Instructions: Drink water, rest..."
                  style={{ height: '220px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.4', padding: '1rem' }}
                  required
                />
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
                  {isSubmitting ? 'Saving...' : 'Save & Print Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
