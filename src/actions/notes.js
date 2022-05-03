import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config"

import { types } from "../types/types"

import { loadNotes } from "../helpers/loadNotes"


export const startNewNote = () => {

    return async(dispatch, getState) => {

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch( activeNote( doc.id, newNote ) )
    }
}



export const activeNote = (id, note) => {
    
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }

}



export const startLoadingNotes = ( uid ) => {

    return async(dispatch) => {

        const notes = await loadNotes( uid )
        dispatch( setNotes(notes) )
    }
}



export const setNotes = ( notes ) => {

    return {
        type: types.notesLoad,
        payload: notes
    }
}



export const startSaveNote = ( note ) => {

    return async( dispatch, getState ) =>{
        const { uid } = getState().auth

        if( !note.url ){
            delete note.url
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        try {

            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )
            dispatch( refreshNote( note.id, note ) )
            Swal.fire('¡Guardado!', 'La nota se guardo correctamente', 'success')
            
        } catch (error) {
            Swal.fire('¡Error!', 'Hubo un error al guardar', 'error')
        }
    }
}



export const refreshNote = ( id, note ) => {
    
    return {
        type: types.notesUpdated,
        payload: {
            id,
            note
        }
    }
}