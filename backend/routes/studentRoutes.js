import express from 'express';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { searchStudentsByRoll } from '../controllers/studentControllers.js';


const studentRouter = express.Router();

studentRouter.get('/search-by-roll', authenticateToken, authorizeRoles("admin"), searchStudentsByRoll);

export default studentRouter;