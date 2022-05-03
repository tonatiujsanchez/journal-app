import { useSelector } from "react-redux"
import NoteScreen from "../notes/NoteScreen"
import NothingSelected from "./NothingSelected"
import Siderbar from "./Siderbar"


const JournalScreen = () => {

    const { active } = useSelector( state => state.notes )

    
    return (
        <div className="journal__main-content">
            <Siderbar />
            <main>
                { active
                    ? <NoteScreen />
                    : <NothingSelected />
                }                
            </main>
        </div>
    )
}

export default JournalScreen