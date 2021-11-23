const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/Note.js");
const verify = require("../middleware/verify");

const router = express.Router();

// middleware to check if token is valid before accessing further routes
router.use(verify);

// get all notes for a user
router
  .route("/")
  .get((req, res) => {
    Note.find({ user: req.user._id }, (err, foundNotes) => {
      res.json({ foundNotes });
    });
  })
  .post((req, res) => {
    const { title, message } = req.body;
    try {
      const newNote = new Note({
        user: req.user._id,
        title,
        message,
      });
      newNote.save();
      res.json({ createdNote: newNote });
    } catch (err) {
      return next(err);
    }
  });

router
  .route("/:noteId")
  // get note
  .get((req, res) => {
    const id = req.params.noteId;
    Note.findById(id, (err, foundNote) => {
      res.json({ foundNote });
    });
  })

  // delete note
  .delete(async (req, res, next) => {
    const id = req.params.noteId;
    try {
      const note = await Note.findById(id);
      if (note.user === req.user._id) {
        await note.deleteOne();
        res.json("deleted note");
      } else {
        const error = new Error("You are not authorized to delete this note");
        error.status = 403;
        return next(error);
      }
    } catch (err) {
      return next(err);
    }
  })
  // update note
  .put((req, res) => {
    const id = req.params.noteId;
    const { title, message } = req.body;
    Note.findByIdAndUpdate(
      id,
      { title, message },
      { new: true },
      (err, updatedNote) => {
        res.json({ updatedNote });
      }
    );
  });

module.exports = router;
