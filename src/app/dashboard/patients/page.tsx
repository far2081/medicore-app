import { prisma } from '@/lib/prisma';
import { Search, Plus, Filter } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Patients Directory</h1>
          <p className="text-muted">Manage all registered patients in the clinic.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add New Patient
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
            <input 
              type="text" 
              placeholder="Search by name, ID or phone number..." 
              className="form-input" 
              style={{ paddingLeft: '2.5rem' }} 
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Age & Gender</th>
                <th>History Summary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{patient.patientId}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{patient.name}</div>
                  </td>
                  <td>
                    <div>{patient.phone || 'N/A'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{patient.email}</div>
                  </td>
                  <td>{patient.age ? `${patient.age} Yrs` : '-'}, {patient.gender || '-'}</td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {patient.history || 'None'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>View</button>
                      <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: 'var(--primary)' }}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-gray)' }}>
                    No patients found. Add a new patient to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
          <div>Showing 1 to {patients.length} of {patients.length} entries</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline" style={{ padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Prev</button>
            <button className="btn-primary" style={{ padding: '0.25rem 0.75rem', borderRadius: '4px' }}>1</button>
            <button className="btn-outline" style={{ padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
