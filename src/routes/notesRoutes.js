import { Router } from 'express';
import * as controller from '../controllers/notesController.js';

const router = Router();

router.get('/notes', controller.getAllNotes);

router.get('/notes/:noteId', controller.getNoteById);

router.post('/notes', controller.createNote);

router.delete('/notes/:noteId', controller.deleteNote);

router.patch('/notes/:noteId', controller.updateNote);

export default router;
