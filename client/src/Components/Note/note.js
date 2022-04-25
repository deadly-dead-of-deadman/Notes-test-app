import React from "react";

export const Note = ({ noteList }) => {
        function deleteNote (id)
        {
            console.log(id)
            fetch("http://127.0.0.1:5000/delete/" + id, {
                method:'DELETE'
            }).then(()=>{
                window.location.reload()
            })
        }

    return (
        <div class ="notes">
            {noteList.map(note => {
                return (
                    <div class="note" id={note.id} key={note.id}>
                            <h2>{note.header}</h2>
                            <h3>{note.text}</h3>
                            <button class="deleteButton" onClick={()=> deleteNote(note.id)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}