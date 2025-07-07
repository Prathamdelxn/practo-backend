import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Appointment from "@/models/Appointments";
import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { clinicId } = params;

    if (!clinicId) {
      return NextResponse.json({ success: false, message: "clinicId is required" }, { status: 400 });
    }

    // Step 1: Get doctors under the clinic
    const clinicDoctors = await Doctor.find({ clinicId }).select("_id");
    const doctorIds = clinicDoctors.map((doc) => doc._id.toString());

    if (doctorIds.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Step 2: Get appointments with status "checkedIn"
    const appointments = await Appointment.find({
      doctorId: { $in: doctorIds },
      status: "checkedIn"
    });

    // Step 3: Get distinct patientIds from those appointments
    const patientIds = [...new Set(appointments.map((a) => a.patientId))];

    // Step 4: Fetch corresponding patients
    const patients = await Patient.find({ _id: { $in: patientIds } });

    return NextResponse.json({
      success: true,
      data: patients,
    });

  } catch (error) {
    console.error("Error fetching clinic checkin patients:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
