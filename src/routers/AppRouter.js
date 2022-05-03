import { useEffect, useState } from "react"
import { BrowserRouter, Switch, Redirect } from "react-router-dom"
import { useDispatch } from "react-redux"
import JournalScreen from "../components/journal/JournalScreen"
import AuthRouter from "./AuthRouter"

import { firebase } from '../firebase/firebase-config'
import { login } from "../actions/auth"

import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { startLoadingNotes } from "../actions/notes"


const AppRouter = () => {

    const dispatch = useDispatch()
    
    const [ checking, setChecking ] = useState(true)
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged( 
            async( user )=>{
                if( user?.uid ){
                    dispatch( login( user.uid, user.displayName ) )
                    dispatch( startLoadingNotes(  user.uid ) )

                    setIsLoggedIn(true)
                }else{
                    setIsLoggedIn(false)
                }

                setChecking( false )
        })
    },[ dispatch, setChecking, setIsLoggedIn ])


    if( checking ){
        return (
            <h2>Cargando...</h2>
        )
    }

    return (
        <BrowserRouter>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />


                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter