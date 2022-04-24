import { Redirect } from "react-router-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import JournalScreen from "../components/journal/JournalScreen"
import AuthRouter from "./AuthRouter"




const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/auth" component={ AuthRouter } />
                    <Route exact path="/" component={ JournalScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter