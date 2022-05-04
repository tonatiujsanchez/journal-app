import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../actions/auth"
import { startNewNote } from "../../actions/notes"

import JournalEntries from "./JournalEntries"


const Siderbar = () => {

    const dispatch = useDispatch()
    const { name } = useSelector( state => state.auth )


    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () =>{
        dispatch( startNewNote() )
    }

    return (
        <aside className="journal__siderbar">
            <div className="journal__sider-navbar">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>{ name }</span>
                </h3>
                <button className="btn"
                        onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket fa-xl"></i>
                </button>
            </div>
            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-4x pointer" onClick={handleAddNew}></i>
                <p className="mt-3 pointer" onClick={handleAddNew}>Nueva entrada</p>
            </div>

            <JournalEntries />
        </aside>
    )
}

export default Siderbar