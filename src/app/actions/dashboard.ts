'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createAppointment(formData: FormData) {
  const patientId = formData.get('patientId') as string;
  const dateStr = formData.get('date') as string;
  const time = formData.get('time') as string;
  const reason = formData.get('reason') as string;
  const notes = formData.get('notes') as string;
  const status = formData.get('status') as string || 'Scheduled';

  if (!patientId || !dateStr || !time) {
    return { error: 'Please fill all required fields.' };
  }

  try {
    let doctor = await prisma.user.findFirst({
      where: { role: { in: ['Doctor', 'ClinicAdmin'] } }
    });

    if (!doctor) {
      doctor = await prisma.user.create({
        data: {
          name: 'Dr. Sarah Smith',
          email: 'sarah.smith@medicore.pro',
          password: 'password123',
          role: 'Doctor',
        }
      });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!patient) {
      return { error: 'Patient not found.' };
    }

    await prisma.appointment.create({
      data: {
        date: new Date(dateStr),
        time,
        reason,
        notes,
        status,
        patientId,
        doctorId: doctor.id,
        clinicId: patient.clinicId
      }
    });

    revalidatePath('/dashboard/appointments');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Something went wrong.' };
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/dashboard/appointments');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update status.' };
  }
}

export async function createInvoice(formData: FormData) {
  const patientId = formData.get('patientId') as string;
  const amountStr = formData.get('amount') as string;
  const status = formData.get('status') as string || 'Unpaid';

  if (!patientId || !amountStr) {
    return { error: 'Please fill out all required fields.' };
  }

  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return { error: 'Please enter a valid amount.' };
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!patient) {
      return { error: 'Patient not found.' };
    }

    await prisma.invoice.create({
      data: {
        amount,
        status,
        patientId,
        clinicId: patient.clinicId
      }
    });

    revalidatePath('/dashboard/billing');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to create invoice.' };
  }
}

export async function payInvoice(id: string) {
  try {
    await prisma.invoice.update({
      where: { id },
      data: { status: 'Paid' }
    });
    revalidatePath('/dashboard/billing');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to mark invoice as paid.' };
  }
}

export async function updatePatientHistory(patientId: string, history: string) {
  try {
    await prisma.patient.update({
      where: { id: patientId },
      data: { history }
    });
    revalidatePath('/dashboard/prescriptions');
    revalidatePath('/dashboard/patients');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update patient prescription/history.' };
  }
}
