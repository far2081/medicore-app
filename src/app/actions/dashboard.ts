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

export async function createPatient(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const ageStr = formData.get('age') as string;
  const gender = formData.get('gender') as string;
  const history = formData.get('history') as string;

  if (!name) {
    return { error: 'Patient name is required.' };
  }

  const age = ageStr ? parseInt(ageStr, 10) : null;

  try {
    // 1. Get the current clinic ID (first doctor user's clinic)
    let doctor = await prisma.user.findFirst({
      where: { role: { in: ['Doctor', 'ClinicAdmin'] } }
    });

    if (!doctor || !doctor.clinicId) {
      // Find any clinic
      const clinic = await prisma.clinic.findFirst();
      if (!clinic) {
        return { error: 'No clinic found in database. Please configure a clinic first.' };
      }
      // Create a default doctor in that clinic
      doctor = await prisma.user.create({
        data: {
          name: 'Dr. Sarah Smith',
          email: 'sarah.smith@medicore.pro',
          password: 'password123',
          role: 'Doctor',
          clinicId: clinic.id
        }
      });
    }

    const clinicId = doctor.clinicId!;

    // 2. Generate incremental Patient ID: e.g. PAT-1001
    const count = await prisma.patient.count({
      where: { clinicId }
    });
    const patientId = `PAT-${1001 + count}`;

    // 3. Create Patient
    await prisma.patient.create({
      data: {
        patientId,
        name,
        email: email || null,
        phone: phone || null,
        age,
        gender: gender || null,
        history: history || null,
        clinicId
      }
    });

    revalidatePath('/dashboard/patients');
    revalidatePath('/dashboard/appointments');
    revalidatePath('/dashboard/prescriptions');
    revalidatePath('/dashboard/billing');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Something went wrong.' };
  }
}
