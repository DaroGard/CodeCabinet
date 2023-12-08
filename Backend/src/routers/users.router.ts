import express from 'express';
import { getUsers, getUser, addFolder } from '../controllers/users.controller';

let router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put("/:id/folders", addFolder);

export default router;