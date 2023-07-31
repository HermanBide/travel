import express  from "express";
import { updateUser, deleteUser, getAllUser, getSingleUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.put('/:id', updateUser )
router.delete('/:id', deleteUser )
router.get('/:id', verifyUser, getSingleUser )
router.get('/', getAllUser )

export default router