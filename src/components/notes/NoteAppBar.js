import { useDispatch, useSelector } from "react-redux"
import { startSaveNote } from "../../actions/notes"


const NoteAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector( state => state.notes )
    
    const date = new Date(active.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })


    const handleSave = () => {
        dispatch( startSaveNote( active ) )
    }

    return (
        <div className="notes__appbar">
            <span>{ date }</span>
            <div>
                <button className="btn">Picture</button>
                <button className="btn"
                       onClick={ handleSave } >
                        Save
                </button>
            </div>
        </div>
    )
}

export default NoteAppBar