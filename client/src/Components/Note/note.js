import React from "react";

export const Note = ({ noteList }) => {
    return (
        <div class ="notes">
            {noteList.map(note => {
                return (
                    <div class="note" key={note.id}>
                            <h2>{note.header}</h2>
                            <h3>{note.text}</h3>
                    </div>
                )
            })}
        </div>
    )
}