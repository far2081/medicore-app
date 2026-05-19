import { prisma } from '@/lib/prisma';
import AppointmentsClient from './AppointmentsClient';

export const dynamic = 'force-dynamic';

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'desc' },
    include: {
      patient: {
        select: {
          name: true,
          patientId: true
        }
      },
      doctor: {
        select: {
          name: true
        }
      }
    }
  });

  const patients = await prisma.patient.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      patientId: true,
      name: true
    }
  });

  return (
    <AppointmentsClient 
      initialAppointments={appointments} 
      patients={patients} 
    />
  );
}
