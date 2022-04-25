import React, {useState} from "react";

export const Form = ({userInput, onChange})=> {

    const [header, setHeader] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        const note = {header, text};

        fetch('/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
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
                           required value ={header} onChange={(e) => setHeader(e.target.value)}></input>
                    <label>Header</label>
                </div>
                <div class ="form-content">
                    <input type='text'
                           required value = {text} onChange={(e) => setText(e.target.value)}></input>
                    <label>Content</label>
                </div>
                <span>
                    <button class ="saveButton">Save</button>
                </span>

            </form>
        </div>
    )
}
