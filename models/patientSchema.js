import mongoose  from 'mongoose'
import pkg from 'mongoose';
const { models } = pkg;

const PriorAuthorizationSchema = new mongoose.Schema({
    treatment: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied'],
        default: 'Pending'
    }, 
    insuranceResponse: { type: String },
},{
    timestamps: true
});

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    insurance: {
        provider: { type: String, required: true },
        policyNumber: { type: String, required: true },
        groupNumber: { type: String, required: true }
    },
    medicalHistory: [String],
    treatments: [String],
    priorAuthorizations: [PriorAuthorizationSchema],
},{
    timestamps: true
});

const patientModel = models.Patient || mongoose.model('Patient', patientSchema);

export default patientModel;
