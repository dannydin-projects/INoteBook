import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial=[];
    const [notes, setNotes] = useState(notesInitial);
    //get all notes
    const getNotes = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: "GET", 
            headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
        const note =await response.json();
        setNotes(note);
    }
    //add a note
    const addNote = async (title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnotes`,{
            method: "POST", 
            headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            body: JSON.stringify({title,description,tag}) 
            });
        const note =await response.json();
        //logic
        setNotes((prevNotes) => [...prevNotes, note]);
    }
    //delete note
    const deleteNote =async (id) => {
        //apicall
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method: "DELETE", 
            headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
        const json =await response.json();
        //logic
        console.log("Deleting note of id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    //edit note

    const editNote = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method: "PUT", 
            headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            body: JSON.stringify({title,description,tag}) 
            });
        const json =await response.json();
        let newNotes=JSON.parse(JSON.stringify(notes));
        //logic
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;