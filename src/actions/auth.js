
import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { startLoading, finishLoading } from "./ui"



export const startLoginEmailPassword = ( email, password ) => {
    return ( dispatch ) => {

        dispatch( startLoading() )

        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user })=>{
                
                dispatch( login( user.uid, user.displayName ) )
                dispatch( finishLoading() )
            })
            .catch( e =>{
                console.log( e )
                dispatch( finishLoading() )
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
                console.log(e)
                dispatch( finishLoading() )
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

    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}