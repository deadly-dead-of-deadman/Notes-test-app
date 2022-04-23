import React, {useEffect, useState} from "react";
import {Note} from '../Components/Note/note';
import {Form} from "../Components/Form/form";

export const NotePage = ()=>{
    const [note, setNote] = useState([])

    useEffect(() =>{
        fetch("/").then(
            res => res.json()
        ).then(
            data => setNote(data)
        )
    }, [])


    return(
        <>
            <Form/>
            <Note noteList={note}/>
        </>
    )
}