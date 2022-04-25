import React, {useEffect, useState} from "react";
import {Note} from '../Components/Note/note';
import {Form} from "../Components/Form/form";
import {Header} from "../Components/Header/header";

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
        <div class ="note-page">
            <Header/>
            <Form/>
            <Note noteList={note}/>
        </div>
    )
}