import express from 'express';
import { getFolders, getFolder, updateFolder, deleteFolder, addFolder} from '../controllers/folders.controller';

let router = express.Router();

router.get('/', getFolders);
router.get('/:id', getFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);
router.post('/', addFolder);

export default router;