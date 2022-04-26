import NoteAppBar from "./NoteAppBar"


const NoteScreen = () => {
  return (
    <div className="notes__main-content">
        <NoteAppBar />
        <div className="notes__content">
            <input 
                type="text"
                placeholder="Un título genial"
                className="notes__title-input"
                autoComplete="off" />
            <textarea 
                placeholder="Qúe pasó hoy" 
                className="notes__textarea">
            </textarea>
            <div className="notes__image">
                <img src="https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg" alt="Foto de la nota" />
            </div>
        </div>
    </div>
  )
}

export default NoteScreen