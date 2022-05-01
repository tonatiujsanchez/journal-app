import { useDispatch } from "react-redux"
import { startLogout } from "../../actions/auth"

import JournalEntries from "./JournalEntries"


const Siderbar = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    return (
        <aside className="journal__siderbar">
            <div className="journal__sider-navbar">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>Brandon</span>
                </h3>
                <button className="btn"
                        onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket fa-xl"></i>
                </button>
            </div>
            <div className="journal__new-entry pointer">
                <i className="far fa-calendar-plus fa-4x"></i>
                <p className="mt-3 pointer">Nueva entrada</p>
            </div>

            <JournalEntries />
        </aside>
    )
}

export default Siderbar