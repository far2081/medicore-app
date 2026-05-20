import { prisma } from '@/lib/prisma';
import PatientsClient from './PatientsClient';

export const dynamic = 'force-dynamic';

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <PatientsClient initialPatients={patients} />;
}
