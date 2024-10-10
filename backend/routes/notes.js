const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//get all notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred")
    }
})
//add notes
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid name').isLength({ min: 5 }),
    body('description', 'At least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            user:req.user.id,
            title: title,
            description: description,
            tag: tag
        });
        const savenote = await note.save()
        res.json(note);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred")
    }
})
//update notes
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote={};
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        let note =await Note.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred")
    }
})
//delete notes
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    try {
        let note =await Note.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note Deleted",note});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred")
    }
})

module.exports = router