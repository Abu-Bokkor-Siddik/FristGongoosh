import express from 'express';

import { AcademicSemesterControllers } from './academicSemester.controller';
import { validateRequest } from '../user/useer.route';
import { AcademicSemesterValidations } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemeste,
);

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
