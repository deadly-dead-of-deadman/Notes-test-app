import './Form.scss';

export default function Form({handleSubmit, setHeader, setText, header, text}){

    return (
        <form className='note-form' onSubmit={handleSubmit}>
            <h1 className="title">Add note</h1>
            <div className="inputs">
                <input className='input' type='text' required value={header} onChange={(e) => setHeader(e.target.value)} placeholder='Header'/>
                <input className='input' type='text' required value={text} onChange={(e) => setText(e.target.value)} placeholder='Content'/>
            </div>
            <button className='saveButton'>Save</button>
        </form>
    )
}