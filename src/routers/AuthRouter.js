import { Redirect } from "react-router-dom"

import { Switch, Route } from "react-router-dom"
import LoginScreen from "../components/auth/LoginScreen"
import RegisterScreen from "../components/auth/RegisterScreen"



const AuthRouter = () => {
    return (
        <div className="auth__main">
            <div className="auth__box-container animate__animated animate__fadeIn animate__faster">
                <Switch>
                    <Route exact path="/auth/login" component={ LoginScreen }/>
                    <Route exact path="/auth/register" component={ RegisterScreen }/>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}

export default AuthRouter


