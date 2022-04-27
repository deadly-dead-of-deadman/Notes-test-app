import {Note} from '..'
import './Notes.scss';

export default function Notes({ noteList, editNote, deleteNote }) {
    return (
        <div className ='notes'>
            {noteList?noteList.map(note => <Note note={note} deleteNote={deleteNote} editNote={editNote} key={note.id}/>):null}
        </div>
    )
}