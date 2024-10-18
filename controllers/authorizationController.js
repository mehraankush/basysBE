import AuthorizationRequest from '../models/authorizationSchema.js'
import PatientModel from '../models/patientSchema.js'

export const submitAuthorization = async (req, res) => {
    try {
        const { patientId, treatment, doctorNotes, dateOfService, insurancePlan, diagnosisCode } = req.body;

        console.log("submitAuthorization HIT", req.body);

        // Validate the required fields
        if (!patientId || !treatment || !dateOfService) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID, Treatment, and Date of Service are required.'
            });
        }

        const patient = await PatientModel.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            })
        }

        const newAuthorizationRequest = new AuthorizationRequest({
            patientId,
            treatment,
            doctorNotes,
            dateOfService,
            insurancePlan,
            diagnosisCode
        });

        // Save the authorization request
        await newAuthorizationRequest.save();
        patient.priorAuthorizations.push({
            treatment,
            status: 'Pending',
        });

        await patient.save();

        return res.status(201).json({
            success: true,
            message: 'Authorization request submitted successfully.',
            authorizationRequest: newAuthorizationRequest
        });

    } catch (error) {
        console.error("Error in submitAuthorization:", error);
        return res.status(500).json({
            success: false,
            message: 'Error in submitting authorization request.'
        });
    }
};

export const getAuthorizations = async (req, res) => {
    try {

        console.log("submitAuthorization HIT")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in getting Authorization. ' });
    }
}