import React from "react";

export const Note = ({ noteList }) => {
    return (
        <>
            {noteList.map(note => {
                return (
                    <div key={note.id}>
                        <h2>{note.header}</h2>
                        <h3>{note.text}</h3>
                    </div>
                )
            })}
        </>
    )
}