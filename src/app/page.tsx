import { prisma } from '@/lib/prisma';
import { Building2, Activity, CreditCard, Users, Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SuperAdminDashboard() {
  const clinics = await prisma.clinic.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { users: true, patients: true }
      }
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Platform Overview</h1>
          <p className="text-muted">Manage tenant clinics and monitor global SaaS metrics.</p>
        </div>
        <button className="btn btn-primary" style={{ backgroundColor: '#0f172a' }}>
          <Plus size={18} /> Onboard New Clinic
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--primary)' }}>
              <Building2 size={24} />
            </div>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Active Clinics</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{clinics.length}</div>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--success)' }}>
              <CreditCard size={24} />
            </div>
            <span className="badge badge-success">+24%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>MRR (Monthly Recurring Revenue)</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>Rs 1,245,000</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--warning)' }}>
              <Users size={24} />
            </div>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Healthcare Professionals</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {clinics.reduce((acc, clinic) => acc + clinic._count.users, 0)}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--danger)' }}>
              <Activity size={24} />
            </div>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Platform Patients</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {clinics.reduce((acc, clinic) => acc + clinic._count.patients, 0)}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem' }}>Registered Clinics (Tenants)</h3>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Clinic Name</th>
                <th>Domain</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Users</th>
                <th>Patients</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td style={{ fontWeight: 600 }}>{clinic.name}</td>
                  <td style={{ color: 'var(--text-gray)' }}>{clinic.domain}.medicore.pro</td>
                  <td>
                    <span className="badge badge-primary">{clinic.plan}</span>
                  </td>
                  <td>
                    <span className={`badge ${clinic.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {clinic.status}
                    </span>
                  </td>
                  <td>{clinic._count.users}</td>
                  <td>{clinic._count.patients}</td>
                  <td>
                    <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', color: '#0f172a' }}>Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
