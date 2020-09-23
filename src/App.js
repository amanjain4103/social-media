import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
// import Home from "./components/Home/Home";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/">
            <SignUp />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
