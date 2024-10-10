import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

function NoteItem(props) {
    let Context = useContext(noteContext);
    const { deleteNote } = Context;
    const { note,updateNote } = props;
    return (
        <div className='col md-3'>
            <div className="card my-3" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Note","success")}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>

            </div>
        </div>

    )
}
export default NoteItem