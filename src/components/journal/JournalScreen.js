import NoteScreen from "../notes/NoteScreen"
import NothingSelected from "./NothingSelected"
import Siderbar from "./Siderbar"


const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Siderbar />
            <main>
                {/* <NothingSelected /> */}
                <NoteScreen />
            </main>
        </div>
    )
}

export default JournalScreen