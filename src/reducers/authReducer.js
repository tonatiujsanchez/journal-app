
/*
    {
        uid: 12315496843sdfdsd2
        name: 'Brandon'
    }

*/


import { types } from "../types/types"


const initialState = {
    name: 'Brandon',
    uid: Date.now(),
    email: 'brandon@gmail.com',
    direction: {
        calle: 'Avenida principal',
        ciudad: 'Tlapa de Comonfort' 
    }
}

export const authReducer = (state = {}, action) => {
    
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,  
            } 
        case types.logout:
            return { } 

        default:
            return state
    }

}