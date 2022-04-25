import React, {useEffect, useState} from "react";
import {Note} from '../Components/Note/note';
import {Form} from "../Components/Form/form";

export const NotePage = ()=>{
    const [note, setNote] = useState([])

    useEffect(() =>{
        fetch("http://127.0.0.1:5000/").then(
            res => res.json()
        ).then(
            data => {
                setNote(data)
            }
        )
    }, [])

    return(
        <div>
            <div class = "note-form">
                <Form/>
            </div>
                <Note noteList={note}/>
        </div>
    )
}