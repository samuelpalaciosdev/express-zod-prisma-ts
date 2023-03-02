import express from 'express';
import authenticateUser, { authorizePermissions } from '../middleware/authentication';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userControllers';
const router = express.Router();

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/:id').get(getSingleUser);
router.route('/me').get(authenticateUser, showCurrentUser);
router.route('/update').patch(authenticateUser, updateUser);
router.route('/updatePassword').patch(authenticateUser, updateUserPassword);

export default router;
