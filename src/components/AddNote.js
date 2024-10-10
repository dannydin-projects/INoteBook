import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import Notes from './Notes';
export default function AddNote(props) {
    let Context = useContext(noteContext);
    const { addNote } = Context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added","success");
    }

    return (
        <>
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form className="my-3">
                    <div className="mb-3 form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" value={note.title} onChange={onChange} required/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" value={note.description} onChange={onChange} required/>
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" value={note.tag} onChange={onChange} required/>
                    </div>
                    <button disabled={ note.title.length<5 || note.description.length<5 }type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
        <Notes showAlert={props.showAlert}/>
        </>

    )
}
