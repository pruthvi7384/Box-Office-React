import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Starred from './pages/Starred.js';

function App() {
  return (
    <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/starred">
          <Starred/>
        </Route>
        <Route>
          <div>
              Page Is Note Found !
          </div>
        </Route>
    </Switch>
   
  );
}

export default App;
