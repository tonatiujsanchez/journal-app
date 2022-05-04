import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config"

import { types } from "../types/types"

import { loadNotes } from "../helpers/loadNotes"
import { fileUpload } from '../helpers/fileUpload'


export const startNewNote = () => {

    return async(dispatch, getState) => {

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch( addNewNote( doc.id, newNote ) )
        dispatch( activeNote( doc.id, newNote ) )
    }
}


export const addNewNote = (id, newNote) => {
    return {    
        type: types.notesAddNew,
        payload:{
            id, 
            ...newNote
        }

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

export const removeActiveNote = () => {
    
    return {
        type: types.notesActiveRemove
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

export const startUploading = ( file ) => {
    
    return async( dispatch, getState )=> {

        const { active } = getState().notes

        Swal.fire({
            title: 'Cargando...',
            text: 'Espere porfavor',
            allowOutsideClick: false,
            didOpen: () =>{
                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload( file )
        active.url = fileUrl

        dispatch( startSaveNote( active ) )
        
        Swal.close()
    }
}



export const stratDeleteNote = ( id ) => {
    return async( dispatch, getState ) => {

        const confirmDelete = await Swal.fire({
            title: '¿Eliminar?',
            text: "Desea eliminar esta nota",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
          })

        if( confirmDelete.isConfirmed ){

            Swal.fire({
                title: 'Cargando...',
                text: 'Espere porfavor',
                allowOutsideClick: false,
                didOpen: () =>{
                    Swal.showLoading()
                }
            })

            const { uid } = getState().auth
            try {
                await db.doc(`${uid}/journal/notes/${id}`).delete()
                dispatch( deleteNote( id ) )
                Swal.fire('¡Eliminado!', 'La nota se elimino correctamente', 'success')
            } catch (error) {
                throw error
            }
        }

    }
}


export const deleteNote = ( id ) => {
    return{
        type: types.notesDelete,
        payload: id
    }
}




export const notesLogoutPurge = () => {
  return {
      type: types.notesLogoutCleaning,
      payload: {
          notes: [],
          active: null
      }
  }
}
