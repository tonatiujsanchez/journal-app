import { useDispatch, useSelector } from "react-redux"
import { activeNote, removeActiveNote } from "../../actions/notes"


const JournalEntry = ({ id, title, body, date, url }) => {

    const dispatch = useDispatch()
    const { active } = useSelector( state => state.notes )

    const weekday = new Date(date).toLocaleDateString('es-ES', { weekday: 'long' })
    const day = new Date(date).toLocaleDateString('es-ES', { day: '2-digit' })
    
    const handleActive = () => {
        if( active?.id === id ){
            dispatch( removeActiveNote() )
        }else{
            dispatch( activeNote( id,{ title, body, date, url } ))
        }

    }


    return (
        <div className={`journal__entry pointer animate__animated animate__fadeInDown animate__faster ${ active?.id === id ? 'active':'' }`}
            onClick={ handleActive }>
            { url &&
                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }} >
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title pointer">{ title || 'Sin titulo' }</p>
                <p className="journal__entry-content pointer">{ body || 'Sin Contenido' }</p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ weekday }</span>
                <h4>{ day }</h4>
            </div>
        </div>
    )
}

export default JournalEntry