import mongoose from 'mongoose'
import pkg from 'mongoose';
const { models } = pkg;


const authorizationRequestSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    doctorNotes: String,
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Denied'],
        default: 'Pending'
    },
    dateOfService: {
        type: Date,
        required: true
    },
    insurancePlan: String,
    diagnosisCode: String,
},{
    timestamps: true
});

const AuthorizationRequest = models.AuthorizationRequest || mongoose.model('AuthorizationRequest', authorizationRequestSchema);

export default AuthorizationRequest;
