import { db } from "../firebase/firebase-config"


export const loadNotes = async( uid ) => {
  
    const notesSnap = await db.collection(`${uid}/journal/notes`).get()
    let notes = []
    
    notesSnap.forEach( doc => {
        notes = [ ...notes, { ...doc.data(), id:doc.id} ]
    })

    return notes
}
