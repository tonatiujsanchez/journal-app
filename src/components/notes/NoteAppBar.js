import { useDispatch, useSelector } from "react-redux"
import { startSaveNote, startUploading } from "../../actions/notes"


const NoteAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector( state => state.notes )
    
    const date = new Date(active.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })


    const handleSave = () => {
        dispatch( startSaveNote( active ) )
    }

    const handlePicture = () => {
        document.querySelector('#filePicture').click()
    }

    const handleFileChange = ( e ) => {
        const file = e.target.files[0]

        if( file ){
            dispatch( startUploading( file ) )
        }
    }

    return (
        <div className="notes__appbar animate__animated animate__fadeInDown">
            <span>{ date }</span>
            <input 
                type="file" 
                style={{ display: 'none' }}
                id="filePicture"
                onChange={ handleFileChange } />
            <div>
                <button
                    onClick={ handlePicture } 
                    className="btn">
                    Picture
                </button>
                <button className="btn"
                       onClick={ handleSave } >
                        Save
                </button>
            </div>
        </div>
    )
}

export default NoteAppBar