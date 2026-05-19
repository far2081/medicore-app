import { prisma } from '@/lib/prisma';
import ClinicsClient from './ClinicsClient';

export const dynamic = 'force-dynamic';

export default async function ClinicsAdminPage() {
  const clinics = await prisma.clinic.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { users: true, patients: true }
      }
    }
  });

  return <ClinicsClient initialClinics={clinics} />;
}
