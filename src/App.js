import React from 'react';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Switch>
        <Route exact path="/">
          Hi How are you
        </Route>
        <Route>
          This Is 404 Page.
        </Route>
    </Switch>
  );
}

export default App;
