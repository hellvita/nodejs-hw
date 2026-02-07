import { Router } from 'express';
import { Note } from '../models/note.js';

const router = Router();

router.get('/notes', async (req, res) => {
  const notes = await Note.find();

  res.status(200).json(notes);
});

router.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
});

router.post('/notes', async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
});

router.delete('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
});

router.patch('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
});

export default router;
