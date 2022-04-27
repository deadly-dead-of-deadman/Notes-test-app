import './Note.scss';
import { ReactComponent as CloseIcon} from '../../assets/svg/closeIcon.svg';
import { ReactComponent as EditIcon} from '../../assets/svg/editIcon.svg';

export default function Note({ note, deleteNote, editNote }) {
    return (
        <div className='note'>
            <h3 className='note-header'>{note.header}</h3>
            <span className='note-text'>{note.text}</span>
            <button className='delete-button' onClick={()=> deleteNote(note.id)}>
                <CloseIcon />
            </button>
            <button className='edit-button' onClick={()=> editNote(note.id)}>
                <EditIcon />
            </button>
        </div>
    )
}