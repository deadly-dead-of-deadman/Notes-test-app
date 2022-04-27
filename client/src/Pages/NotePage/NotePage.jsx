import {useEffect, useState} from "react";
import {Notes,Form,Header} from "../../Components";
import './NotePage.scss';

export default function NotePage() {
    const [notes, setNotes] = useState([])
    const [header, setHeader] = useState('')
    const [text, setText] = useState('')
    const [edit_id, setEditId] = useState('add');

    const updateNotes = ()=>{
        fetch("http://127.0.0.1:5000/").then(
            res => res.json()
        ).then(
            data => {
                setNotes(data)
            }
        );
    }
    useEffect(() =>{
        updateNotes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {header, text, edit_id};
        fetch('/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
        }).then(() =>{
            updateNotes();
        })
        setEditId('add');
        setHeader('');
        setText('');
    }

    const editNote = (id_) => {
        const note = notes.find(({id})=>id===id_)
        setHeader(note.header);
        setText(note.text);
        setEditId(id_);
    }

    const deleteNote = (id) => {
        fetch('http://127.0.0.1:5000/delete/' + id, {
           method:'DELETE'
       }).then(()=>{
           updateNotes();
       })
   }

    return(
        <div className="note-page">
            <Header/>
            <div className="note-page-content">
                <Form setHeader={setHeader} setText={setText} handleSubmit={handleSubmit} header={header} text={text}/>
                <Notes editNote={editNote} noteList={notes} deleteNote={deleteNote}/>
            </div>
        </div>
    )
}