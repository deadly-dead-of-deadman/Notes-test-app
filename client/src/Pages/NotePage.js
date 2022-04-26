import React, {useEffect, useState} from "react";
import {Note} from '../Components/Note/note';
import {Form} from "../Components/Form/form";
import {Header} from "../Components/Header/header";
import Modal from "../Components/Modal/modal";

export const NotePage = ()=>{
    const [note, setNote] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [header, setHeader] = useState('')
    const [text, setText] = useState('')

    function closeModal(){
        setModalActive(false)
    }

    useEffect(() =>{
        fetch("http://127.0.0.1:5000/").then(
            res => res.json()
        ).then(
            data => {
                setNote(data)
            }
        )
    }, [])

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

    return(
        <div>
            <div className="note-page">
                <Header setModalActive ={setModalActive}/>
                <div className="note-page-content">
                    <Form setHeader={setHeader} setText={setText} handleSubmit={handleSubmit} header={header} text={text}/>
                    <Note setHeader={setHeader} setText={setText} noteList={note}/>
                </div>
            </div>
            {modalActive && <Modal closeModal={closeModal}/>}
        </div>
    )
}