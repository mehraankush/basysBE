import patientModel from "../models/patientSchema.js";

export const getPatients = async (req, res) => {
    try {
        const { page = 1, limit = 10, status = 'all' } = req.query;
        console.log("Get Patients HIT", status);

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        // Build the aggregation pipeline
        let pipeline = [];

        if (status !== 'all') {
            pipeline.push({
                $match: {
                    'priorAuthorizations.status': status.charAt(0).toUpperCase() + status.slice(1)
                }
            });
        }

        // Add a field to store the matching prior authorizations
        pipeline.push({
            $addFields: {
                matchingAuthorizations: {
                    $filter: {
                        input: '$priorAuthorizations',
                        as: 'auth',
                        cond: status === 'all' ? {} : { $eq: ['$$auth.status', status.charAt(0).toUpperCase() + status.slice(1)] }
                    }
                }
            }
        });

        // Count documents for pagination
        const totalCount = await patientModel.aggregate([...pipeline, { $count: 'total' }]);

        // Add pagination to the pipeline
        pipeline.push(
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum }
        );

        // Execute the aggregation
        const patients = await patientModel.aggregate(pipeline);

        if (!patients || patients.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No patients found with the specified status'
            });
        }

        res.status(200).json({
            success: true,
            message: "Patients fetched successfully",
            patients,
            pagination: {
                page: pageNum,
                size: limitNum,
                totalCount: totalCount[0] ? totalCount[0].total : 0,
                totalPages: totalCount[0] ? Math.ceil(totalCount[0].total / limitNum) : 0
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching patients.'
        });
    }
};

export const getPatientById = async (req, res) => {
    try {

        const patient = await patientModel.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(201).json({
            success: true,
            patient
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching patient'
        });
    }
};

export const addPatient = async (req, res) => {
    try {
        const { name, age, condition, insurance, medicalHistory, treatments, priorAuthorizations } = req.body;
        console.log(req.body)
        const newPatient = new patientModel({
            name,
            age,
            condition,
            insurance,
            medicalHistory,
            treatments,
            priorAuthorizations
        });

        const patientSaved = await newPatient.save();

        res.status(201).json({
            success: true,
            message: "PATIENT ADDED SUCCESSFULLY",
            patientSaved
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in addPatient . '
        });
    }
}

export const addPriorAuthorization = async (req, res) => {
    const { treatment, status, insuranceResponse } = req.body;

    try {
        const patient = await patientModel.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const newAuthorization = {
            treatment,
            status,
            insuranceResponse
        };

        patient.priorAuthorizations.push(newAuthorization);
        await patient.save();

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error adding prior authorization', error });
    }
};

export const deletePatient = async (req, res) => {
    try {

        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting patient',
        });
    }
};

export const getStatusCounts = async (req, res) => {
    try {

        const statusCounts = await patientModel.aggregate([
            { $unwind: "$priorAuthorizations" },
            {
                $group: {
                    _id: "$priorAuthorizations.status",
                    count: { $sum: 1 }
                }
            }
        ]);

        console.log(statusCounts);

        const counts = {
            pending: 0,
            approved: 0,
            denied: 0
        };

        statusCounts.forEach(statusCount => {
            const status = statusCount._id.toLowerCase();
            if (status in counts) {
                counts[status] = statusCount.count;
            }
        });

        // Add the total count for all patients
        const totalPatients = await patientModel.countDocuments();

        res.status(200).json({
            success: true,
            message: "Status counts fetched successfully",
            counts: {
                all: totalPatients,
                ...counts
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching status counts.'
        });
    }
};
