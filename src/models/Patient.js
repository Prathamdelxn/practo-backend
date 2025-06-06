import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
     
    },
    lastName: {
      type: String,
      
    },
    dateOfBirth: {
      type: Date,
      
    },
    gender: {
      type: String,
     
    },
    phone: {
      type: String,
     
    },
    email: {
      type: String,
    
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    medicalHistory: {
      type: String,
    },
    allergies: {
      type: String,
    },
    currentMedications: {
      type: String,
    },
    symptoms: {
      type: String,
    
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Patient || mongoose.model("Patient", patientSchema);
