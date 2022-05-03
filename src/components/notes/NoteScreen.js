import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activeNote } from "../../actions/notes"
import useForm from "../../hooks/useForm"
import NoteAppBar from "./NoteAppBar"


const NoteScreen = () => {
    

    const dispatch = useDispatch()

    const { active:note } = useSelector( state => state.notes )
    
    const [ values, handleInputChange, resetForm ] =  useForm( note )
    const { id, title, body } = values
   
    const activeId = useRef( note.id )

    useEffect(()=>{
        if( note.id !== activeId.current ){
            resetForm( note )
            activeId.current = note.id
        }
    },[note, resetForm])

    useEffect(()=>{
        dispatch( activeNote( id, values ) )
    },[values, dispatch])

    

    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={ handleInputChange }
                    placeholder="Un título genial"
                    className="notes__title-input"
                    autoComplete="off" />
                <textarea
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                    placeholder="Qúe pasó hoy"
                    className="notes__textarea">
                </textarea>
                { note.url &&
                    <div className="notes__image">
                        <img src="https://definicion.de/wp-content/uploads/2009/12/paisaje-1.jpg" alt="Foto de la nota" />
                    </div>
                }
            </div>
        </div>
    )
}

export default NoteScreen