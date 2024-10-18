import express from 'express';
const router = express.Router();

import {
    getAuthorizations,
    submitAuthorization
} from '../controllers/authorizationController.js';
import { getStatusCounts } from '../controllers/patientController.js';


router.post('/', submitAuthorization);
router.get('/', getAuthorizations);
router.get('/status', getStatusCounts);

export default router;
