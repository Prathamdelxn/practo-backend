import { NextResponse } from 'next/server';
import Doctor from '@/models/Doctor';
import dbConnect from '@/utils/db';
import bcrypt from 'bcryptjs';

// Set CORS headers
const setCorsHeaders = (response) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

// Handle preflight request
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

// Handle PUT request to update a doctor by ID
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const updates = await req.json();

    // If password is included, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    // Update the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return setCorsHeaders(
        NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
      );
    }

    return setCorsHeaders(
      NextResponse.json({ message: 'Doctor updated successfully', doctor: updatedDoctor }, { status: 200 })
    );
  } catch (error) {
    console.error('Error updating doctor:', error);
    return setCorsHeaders(
      NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    );
  }
}
