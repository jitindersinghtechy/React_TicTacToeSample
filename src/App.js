import React from 'react'
import Welcome from './Component/Welcome'
import PlayersDetail from './Component/Players-detail'
import Winner from './Component/Winner';
import Game from './Game'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
    return (
        <Router>

            <div className="App">                
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/players" component={PlayersDetail} />
                    <Route path="/game" component={Game} />
                    <Route path="/winner" component={Winner} />
                </Switch>
            </div>

        </Router>
    )
}

export default App