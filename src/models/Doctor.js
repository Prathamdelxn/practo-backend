import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profileImage:{type:String,required:true},
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  specialty: { type: String, required: true },
  supSpeciality: { type: String, },
  experience: { type: Number, required: true },
  consultantFee:{type:Number},
  qualifications: [String],
  licenseNumber: { type: String, },
  hospital: { type: String, required: true },
  hospitalAddress: { type: String,  },
  clinicId:{type:String},
  hospitalNumber:{ type: String, },
  isVerified: { type: Boolean, default: false },
  role:{type:String,default:"doctor"},
  available:{
    days:[{ type: String,}],
    time:{ type: String,},
  }
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
