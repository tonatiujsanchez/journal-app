import { Redirect } from "react-router-dom"

import { Switch, Route } from "react-router-dom"
import LoginScreen from "../components/auth/LoginScreen"
import RegisterScreen from "../components/auth/RegisterScreen"



const AuthRouter = () => {
    return (
        <Switch>
            <Route exact path='/auth/login' component={ LoginScreen }/>
            <Route exact path='/auth/register' component={ RegisterScreen }/>
            <Redirect to="/auth/register" />
        </Switch>
    )
}

export default AuthRouter