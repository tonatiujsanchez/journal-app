import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activeNote, stratDeleteNote } from "../../actions/notes"
import useForm from "../../hooks/useForm"
import NoteAppBar from "./NoteAppBar"


const NoteScreen = () => {
    

    const dispatch = useDispatch()

    const { active:note } = useSelector( state => state.notes )
    
    const [ values, handleInputChange, resetForm ] =  useForm( note )
    const { id, title, body } = values
   
    const activeId = useRef( note.id )
    const activeUrl = useRef( note.url )

    useEffect(()=>{
        if( note.id !== activeId.current ){
            resetForm( note )
            activeId.current = note.id
        }
        if( note.url !== activeUrl.current ){
            resetForm( note )
            activeUrl.current = note.url
        }

    },[note, resetForm])

    useEffect(()=>{
        dispatch( activeNote( id, values ) )
    },[values, dispatch])

    

    const handleDelete = () => {
        dispatch( stratDeleteNote( id ) )
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content animate__animated animate__fadeInDown animate__faster">
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
                        <img src={ note.url } alt={ title } />
                    </div>
                }
            </div>
            <button
                onClick={ handleDelete } 
                className="btn btn-danger">
                    Eliminar
            </button>
        </div>
    )
}

export default NoteScreen