import express from 'express';
import {
  authUser,
  getUser,
  createUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', authUser);

router.use(protect);
router.route('/profile').get(getUser);

export default router;
