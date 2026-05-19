'use client';

import { useState } from 'react';
import { Calendar, Plus, Search, Filter, Clock, User, Check, X, Clipboard } from 'lucide-react';
import { createAppointment, updateAppointmentStatus } from '../../actions/dashboard';

interface PatientOption {
  id: string;
  patientId: string;
  name: string;
}

interface AppointmentData {
  id: string;
  date: Date;
  time: string;
  status: string;
  reason: string | null;
  notes: string | null;
  patient: {
    name: string;
    patientId: string;
  };
  doctor: {
    name: string;
  };
}

export default function AppointmentsClient({
  initialAppointments,
  patients
}: {
  initialAppointments: AppointmentData[];
  patients: PatientOption[];
}) {
  const [appointments, setAppointments] = useState<AppointmentData[]>(initialAppointments);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [aptDate, setAptDate] = useState('');
  const [aptTime, setAptTime] = useState('');
  const [aptReason, setAptReason] = useState('');
  const [aptNotes, setAptNotes] = useState('');

  const filtered = appointments.filter(apt => {
    const matchesSearch = apt.patient.name.toLowerCase().includes(search.toLowerCase()) || 
                          apt.patient.patientId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('patientId', selectedPatientId);
    formData.append('date', aptDate);
    formData.append('time', aptTime);
    formData.append('reason', aptReason);
    formData.append('notes', aptNotes);

    const res = await createAppointment(formData);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSelectedPatientId('');
      setAptDate('');
      setAptTime('');
      setAptReason('');
      setAptNotes('');
      setShowModal(false);
      window.location.reload();
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateAppointmentStatus(id, newStatus);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Appointments Scheduler</h1>
          <p className="text-muted">Schedule and manage visits, check-ups, and clinic consultations.</p>
        </div>
        <button 
          onClick={() => {
            if (patients.length === 0) {
              alert('Please add a patient in the Patients Directory first before scheduling an appointment.');
              return;
            }
            setShowModal(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={18} /> New Appointment
        </button>
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

          <select 
            className="form-input" 
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Appointments</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Scheduled Date & Time</th>
                <th>Doctor In Charge</th>
                <th>Reason / Chief Complaint</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{apt.patient.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{apt.patient.patientId}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                      <Calendar size={14} color="var(--primary)" />
                      {new Date(apt.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>
                      <Clock size={14} />
                      {apt.time}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
                        {apt.doctor.name.split(' ').pop()?.substring(0, 2).toUpperCase() || 'DR'}
                      </div>
                      <span>{apt.doctor.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{apt.reason || 'Routine Checkup'}</div>
                    {apt.notes && <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>Notes: {apt.notes}</div>}
                  </td>
                  <td>
                    <span className={`badge ${
                      apt.status === 'Completed' ? 'badge-success' : 
                      apt.status === 'Scheduled' ? 'badge-primary' : 'badge-danger'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {apt.status === 'Scheduled' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(apt.id, 'Completed')}
                            className="btn-ghost"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <Check size={14} /> Complete
                          </button>
                          <button 
                            onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                            className="btn-ghost"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <X size={14} /> Cancel
                          </button>
                        </>
                      )}
                      {apt.status !== 'Scheduled' && (
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-gray)', padding: '0.25rem 0.5rem' }}>None</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-gray)' }}>
                    No appointments scheduled matching filters.
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
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={24} color="var(--primary)" /> Schedule Appointment
            </h2>
            <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>Select patient and set time for consulting session.</p>

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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10:30 AM" 
                    className="form-input" 
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Reason / Complaint</label>
                <input 
                  type="text" 
                  placeholder="e.g. Toothache, Regular general checkup" 
                  className="form-input" 
                  value={aptReason}
                  onChange={(e) => setAptReason(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Doctor Notes</label>
                <textarea 
                  placeholder="Additional consulting context or symptoms..." 
                  className="form-input" 
                  style={{ height: '80px', resize: 'none' }}
                  value={aptNotes}
                  onChange={(e) => setAptNotes(e.target.value)}
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
                  {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
