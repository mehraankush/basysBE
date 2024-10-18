import express from 'express';
const router = express.Router();

import {
    addPatient,
    deletePatient,
    getPatientById,
    getPatients
} from '../controllers/patientController.js';

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.delete('/:id', deletePatient);

router.post('/', addPatient);

export default router;
