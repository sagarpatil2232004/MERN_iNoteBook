const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/note");
const { body, validationResult } = require('express-validator');
const router = express.Router();
require('dotenv').config();


router.use(express.json());



//Route 1: Fetch all notes of a specific user /api/notes/getAllNotes . login required
router.get("/getAllNotes", fetchuser, async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id });
        res.json({ notes });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



//Route 2:add a note of a specific user /api/notes/addnote . login required
router.post("/addnote", fetchuser, [
    body('title', 'Please Enter a valid title').isLength({ min: 1 }),
    body('description', 'Please Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {


    try {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json("Please enter valid details");
        }


        const userID = req.user.id;
        const { title, description, tag } = req.body;

        const note = new Note({
            user: userID,
            title,
            description,
            tag,

        })

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



//Route 3:update a specific note of a specific user PUT: /api/notes/updateNote . login required
router.put("/updateNote/:id", fetchuser, [
    body('title', 'Please Enter a valid title').isLength({ min: 1 }),
    body('description', 'Please Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json("Please enter valid details");
        }


        const newNote = {};

        const { title, description, tag } = req.body;


        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }else{
            console.log(note);
        }

        // Ensure the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized action" });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { $set: newNote },
            { new: true } // Ensure the updated document is returned
        );

        res.json(updatedNote);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})




//Route 4:delete a specific note of a specific user DELETE: /api/notes/deleteNote . login required
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Ensure the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized action" });
        }

       await Note.findByIdAndDelete(req.params.id);

        res.json({ message: "Note has been deleted", id: req.params.id });


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})





module.exports = router;