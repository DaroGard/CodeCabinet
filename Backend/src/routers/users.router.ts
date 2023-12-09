import express from 'express';
import { getUsers, getUser, updateUser, addUser, deleteFolder } from '../controllers/users.controller';

let router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.post('/', addUser);
router.delete('/:id/folders/:folderId', deleteFolder);

export default router;