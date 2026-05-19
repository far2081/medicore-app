'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createClinic(formData: FormData) {
  const name = formData.get('name') as string;
  const domainInput = formData.get('domain') as string;
  const plan = formData.get('plan') as string;
  const status = formData.get('status') as string;

  if (!name || !domainInput) {
    return { error: 'Please fill out all required fields.' };
  }

  const domain = domainInput.toLowerCase().replace(/\s+/g, '-');

  try {
    const existing = await prisma.clinic.findUnique({
      where: { domain },
    });

    if (existing) {
      return { error: 'Domain already exists. Choose another one.' };
    }

    await prisma.clinic.create({
      data: {
        name,
        domain,
        plan: plan || 'Basic',
        status: status || 'Active',
      },
    });

    revalidatePath('/admin/clinics');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Something went wrong.' };
  }
}

export async function updateClinicPlan(id: string, plan: string) {
  try {
    await prisma.clinic.update({
      where: { id },
      data: { plan },
    });
    revalidatePath('/admin/clinics');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update plan.' };
  }
}

export async function toggleClinicStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  try {
    await prisma.clinic.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath('/admin/clinics');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update status.' };
  }
}

export async function deleteClinic(id: string) {
  try {
    // Delete clinic
    await prisma.clinic.delete({
      where: { id },
    });
    revalidatePath('/admin/clinics');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete clinic.' };
  }
}
