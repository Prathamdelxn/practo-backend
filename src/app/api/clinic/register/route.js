import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Clinic from '@/models/Clinic';

// Allow CORS
const setCorsHeaders = (res) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
};

// OPTIONS handler for preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

// POST: /api/clinic/register
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const {
      clinicName,
      clinicType,
      description,
      registrationNumber,
      taxId,
      specialties,
      logo,
      website,
      email,
      phone,
      address,
      password,
      city,
      state,
      postalCode,
      country,
      openingHours = {},
    } = body;

    // ✅ Filter out days with missing open/close times
    const cleanedOpeningHours = {};
    for (const [day, time] of Object.entries(openingHours)) {
      if (time.open && time.close) {
        cleanedOpeningHours[day] = time;
      }
    }

    const newClinic = await Clinic.create({
      clinicName,
      clinicType,
      description,
      registrationNumber,
      password,
      taxId,
      specialties,
      logo,
      website,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
      role:"clinic",
      country,
      openingHours: cleanedOpeningHours,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Clinic registered successfully',
        clinic: newClinic,
      },
      { status: 201 }
    );
    return setCorsHeaders(response);
  } catch (error) {
    console.error('Clinic registration error:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Server error',
        error: error.message,
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}
