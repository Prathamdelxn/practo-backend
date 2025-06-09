import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String,  required: true,},
  clinicType: { type: String,   required: true,},
  description: { type: String,},
  registrationNumber: {type: String, required: true,unique: true,},
  taxId: {type: String,required: true,},
  specialties: {type: [String],default: [],},
  logo: { type: String, },
  website: {type: String,},
  email: { type: String,},
  phone: {type: String,},
  password:{type:String},
  address: { type: String, },
  city: { type: String,},
  state: {type: String,},
  role:{type:String ,default:"clinic"},
  postalCode: {type: String,},
  country: {type: String,},
  openingHours: {
    monday: { open: { type: String, default: '' },close: { type: String, default: '' },},
    tuesday:{ open: { type: String, default: '' },close: { type: String, default: '' },},
    wednesday:{ open: { type: String, default: '' },close: { type: String, default: '' },},
    thursday: { open: { type: String, default: '' },close: { type: String, default: '' },},
    friday: { open: { type: String, default: '' },close: { type: String, default: '' },},
    saturday: { open: { type: String, default: '' },close: { type: String, default: '' },},
    sunday: { open: { type: String, default: '' },close: { type: String, default: '' },},
  }
}, {
  timestamps: true,
});

export default mongoose.models.Clinic || mongoose.model('Clinic', clinicSchema);
