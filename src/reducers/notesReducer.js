/*
    {
        notes: [],
        active: null  
        active: {
            id: '12315463', 
            title: '',
            body: '',
            imageUrl: '',
            date: 13213546231  
        }
    }
*/
import { types } from "../types/types"

 

const initialState = {
    notes: [],
    active: null  
}

export const notesReducer = (state = initialState, action) => {


    switch (action.type) {

        case types.notesAddNew:

            return{
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesActiveRemove:
            return{
                ...state,
                active: null
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map( note => (
                    note.id === action.payload.id 
                        ? action.payload.note
                        : note
                ))
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => (
                    note.id !== action.payload
                ))
            }

        case types.notesLogoutCleaning:
            return action.payload

        default:
            return state
    }
}