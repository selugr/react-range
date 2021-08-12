import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'
import routes from './middlewares/routes'
import './App.css'

const App = () => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    {routes.map(({ path, Component }, key) =>
                        <Route path={path} key={key}>
                            <Component/>
                        </Route>
                    )}
                    <Redirect from="*" to="/exercise1"/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
