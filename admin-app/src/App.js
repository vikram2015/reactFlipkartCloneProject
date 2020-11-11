import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from "./Container/Home/Home";
import Signin from "./Container/SignIn/Signin";
import Signup from "./Container/SignUp/Signup";


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
