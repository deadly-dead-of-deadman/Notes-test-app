import React, {useState} from "react";

export const Form = ({handleSubmit, setHeader, setText, header, text})=> {

    const [editHeader, setEditHeader] = useState('')
    const [editText, setEditText] = useState('')

    const handleEdit = (id) =>{
        let curUser = 0;
        const editNote = {editHeader,editText,curUser}
        fetch('/edit', {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editNote)
        }).then(() =>{
            console.log('note added')
        })
    }

    return (
        <div class = "note-form">
            <h2>Add note</h2>
            <form onSubmit={handleSubmit}>
                <div class ="form-header">
                    <input type='text'
                           required value = {header} onChange={(e) => setHeader(e.target.value)}
                    placeholder="Header"></input>
                </div>
                <div class ="form-content">
                    <input type='text'
                           required value = {text} onChange={(e) => setText(e.target.value)}
                    placeholder="Content"></input>
                </div>
                <span>
                    <button class ="saveButton">Save</button>
                </span>
            </form>
        </div>
    )
}