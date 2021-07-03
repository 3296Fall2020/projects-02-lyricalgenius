import Signin from './components/pages/signin.js';
import '../node_modules/jquery/dist/jquery.min.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/js/dist/dropdown.js';
import '../node_modules/popper.js'
import React, { Component } from 'react';
import Navbar from './components/userSongInput/navbar'
import Error from './components/pages/404.js';

import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

toast.configure()

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Signin} />
            <Navbar />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;