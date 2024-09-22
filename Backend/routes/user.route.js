import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import { updateUser,deleteUser } from '../controllers/user.controller';
// import { verifyToken } from '../utils/verifyUser';


const router=express.Router();


router.post('/update/:id', verifyToken, updateUser);
router.post('/delete/:id', verifyToken, deleteUser);


export default router;