'use client';

import { useState } from 'react';
import { Search, Plus, Filter, User, UserPlus } from 'lucide-react';
import { createPatient } from '../../actions/dashboard';

interface PatientData {
  id: string;
  patientId: string;
  name: string;
  email: string | null;
  phone: string | null;
  age: number | null;
  gender: string | null;
  history: string | null;
  createdAt: Date;
}

export default function PatientsClient({ initialPatients }: { initialPatients: PatientData[] }) {
  const [patients, setPatients] = useState<PatientData[]>(initialPatients);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [history, setHistory] = useState('');

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientId.toLowerCase().includes(search.toLowerCase()) ||
    (p.phone && p.phone.includes(search))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('history', history);

    const res = await createPatient(formData);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAge('');
      setGender('Male');
      setHistory('');
      setShowModal(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Patients Directory</h1>
          <p className="text-muted">Manage all registered patients in the clinic.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add New Patient
        </button>
      </div>

      <div className="card">
        {/* Search */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            <input 
              type="text" 
              placeholder="Search by name, ID or phone number..." 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Age & Gender</th>
                <th>History Summary</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{patient.patientId}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{patient.name}</div>
                  </td>
                  <td>
                    <div>{patient.phone || 'N/A'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{patient.email || ''}</div>
                  </td>
                  <td>{patient.age ? `${patient.age} Yrs` : '-'}, {patient.gender || '-'}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {patient.history || 'None'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-gray)' }}>
                    No patients found. Click Add New Patient to register one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
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
              <UserPlus size={24} color="var(--primary)" /> Register New Patient
            </h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Enter patient's basic personal and contact details.</p>

            {error && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Ali Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 03001234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="e.g. ali@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Age (Years)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 35"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select 
                    className="form-input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Initial Medical History / Case Context</label>
                <textarea 
                  className="form-input" 
                  placeholder="e.g. Patient has history of high BP..."
                  style={{ height: '80px', resize: 'none' }}
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
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
                  {isSubmitting ? 'Registering...' : 'Register Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
