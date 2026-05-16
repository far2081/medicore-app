"use client";

import { Users, Calendar, CreditCard, TrendingUp, Clock, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 7000 },
  { name: 'Jul', revenue: 8500 },
];

const patientData = [
  { name: 'Mon', patients: 20 },
  { name: 'Tue', patients: 25 },
  { name: 'Wed', patients: 15 },
  { name: 'Thu', patients: 30 },
  { name: 'Fri', patients: 28 },
  { name: 'Sat', patients: 10 },
  { name: 'Sun', patients: 5 },
];

const recentAppointments = [
  { id: '1', patient: 'Michael Johnson', time: '09:00 AM', status: 'Completed', doctor: 'Dr. Sarah Smith' },
  { id: '2', patient: 'Emily Davis', time: '10:30 AM', status: 'In Progress', doctor: 'Dr. John Doe' },
  { id: '3', patient: 'Robert Wilson', time: '11:15 AM', status: 'Waiting', doctor: 'Dr. Sarah Smith' },
  { id: '4', patient: 'Jessica Brown', time: '01:00 PM', status: 'Scheduled', doctor: 'Dr. Emily Chen' },
];

export default function DashboardHome() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Dashboard Overview</h1>
          <p className="text-muted">Welcome back! Here's what's happening at your clinic today.</p>
        </div>
        <button className="btn btn-primary">
          <Calendar size={18} /> New Appointment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(30, 136, 229, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
            <span className="badge badge-success">+12%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Patients</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>2,450</div>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(38, 166, 154, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--accent)' }}>
              <Calendar size={24} />
            </div>
            <span className="badge badge-success">+5%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Appointments Today</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>42</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--danger)' }}>
              <Clock size={24} />
            </div>
            <span className="badge badge-danger">-2%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Avg Wait Time</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>14 min</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--warning)' }}>
              <CreditCard size={24} />
            </div>
            <span className="badge badge-success">+18%</span>
          </div>
          <h3 className="text-muted" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Revenue (Month)</h3>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>Rs 4,520,000</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Revenue Overview</h3>
            <select className="form-input" style={{ width: 'auto', padding: '0.5rem' }}>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)' }} tickFormatter={(value) => `Rs ${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  itemStyle={{ color: 'var(--primary)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Patients This Week</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(38, 166, 154, 0.1)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow)' }} />
                <Bar dataKey="patients" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Today's Appointments</h3>
            <button className="btn-ghost" style={{ fontSize: '0.875rem' }}>View All</button>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{apt.patient}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>{apt.doctor}</div>
                    </td>
                    <td>{apt.time}</td>
                    <td>
                      <span className={`badge ${
                        apt.status === 'Completed' ? 'badge-success' : 
                        apt.status === 'In Progress' ? 'badge-primary' : 
                        apt.status === 'Waiting' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Recent Activities</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: FileText, title: 'New Prescription Added', desc: 'Dr. Smith added a prescription for Emily Davis', time: '10 mins ago', color: 'var(--primary)' },
              { icon: CreditCard, title: 'Invoice Paid', desc: 'Invoice #INV-2023 for Rs 15,000 was paid', time: '1 hour ago', color: 'var(--success)' },
              { icon: Users, title: 'New Patient Registered', desc: 'Robert Wilson registered as a new patient', time: '2 hours ago', color: 'var(--accent)' },
              { icon: TrendingUp, title: 'Subscription Renewed', desc: 'Clinic Pro plan renewed successfully', time: '1 day ago', color: 'var(--warning)' },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ backgroundColor: `${activity.color}15`, color: activity.color, padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', flexShrink: 0 }}>
                  <activity.icon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 500 }}>{activity.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-gray)', marginTop: '0.25rem' }}>{activity.desc}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
