import { prisma } from '@/lib/prisma';
import PrescriptionsClient from './PrescriptionsClient';

export const dynamic = 'force-dynamic';

export default async function PrescriptionsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      patientId: true,
      name: true,
      age: true,
      gender: true,
      history: true,
      phone: true,
      updatedAt: true
    }
  });

  return <PrescriptionsClient initialPatients={patients} />;
}
