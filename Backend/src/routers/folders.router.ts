import express from 'express';
import { getFolders, getFolder } from '../controllers/folders.controller';

let router = express.Router();

router.get('/', getFolders);
router.get('/:id', getFolder);

export default router;