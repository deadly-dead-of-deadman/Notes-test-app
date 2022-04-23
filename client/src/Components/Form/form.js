import React, {useState} from "react";

export const Form = ({userInput, onChange})=> {

    const [header, setHeader] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {header, text};

        fetch('/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
        }).then(() =>{
            console.log('shits added')
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                    <input type='text'
                           required value ={header} onChange={(e) => setHeader(e.target.value)}></input>
                    <input type='text'
                           required value = {text} onChange={(e) => setText(e.target.value)}></input>
                    <button value='Создать'></button>
            </form>
        </>
    )
}
