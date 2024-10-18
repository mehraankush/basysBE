import express from 'express';
const router = express.Router();

import authorizationRoutes from './authorizationRoutes.routes.js';
import patientRoutes from './patientRoutes.routes.js';

router.use('/patients', patientRoutes);
router.use('/authorizations', authorizationRoutes);

export default router;