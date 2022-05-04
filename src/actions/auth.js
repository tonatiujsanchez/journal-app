
import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { startLoading, finishLoading } from "./ui"

import Swal from 'sweetalert2'
import { notesLogoutPurge } from "./notes"

/*===== ====== ====== LOGIN ====== ====== ======*/ 
/*===== ====== ====== ====== ====== ====== ======*/ 

export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch( startLoading() )

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user })=>{
                
                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading() )
            })
            .catch( e =>{

                const errorCode = e.code
                dispatch( finishLoading() )

                if( errorCode === 'auth/user-not-found' ){
                    Swal.fire('Error', 'El correo ingresado no esta registrado', 'error')
                    return
                }
                if( errorCode === 'auth/wrong-password'){
                    Swal.fire('Error', 'Contraseña incorrecta', 'error')
                    return
                }

                Swal.fire('Error', 'Hubo un error inesperado al intentar iniciar sesión', 'error')
            })
                
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) =>{
    return ( dispatch ) => {

        dispatch( startLoading() )

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user })=>{  

                await user.updateProfile({ displayName: name })
                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading() )
            })
            .catch( e => {

                const errorCode = e.code
                dispatch( finishLoading() )

                if(errorCode === 'auth/email-already-in-use'){
                    Swal.fire('Error', `Ya existe una cuenta registada con el correo: ${email}`, 'error')
      
                }else{
                    Swal.fire('Error', `Hubo un error al intentar crear la cuenta, intentelo nuevamente`, 'error')
                }
            })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        dispatch( startLoading() )

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user })=>{

                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading() )
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() )
            })
    }
}

export const login = (uid, displayName) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}



/*===== ====== ====== LOGOUT ====== ====== ======*/ 
/*===== ====== ====== ====== ====== ====== ======*/ 

export const startLogout = () => {
    return async( dispatch ) => {
        try {
            
            await firebase.auth().signOut()
            dispatch( logout() )
            dispatch( notesLogoutPurge() )
            
        } catch (error) {
            throw error
        }
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}


