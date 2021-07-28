
import Axios from 'axios';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/home.component';

export default class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="App">       
              <Switch>
                <Route exact path="/" component={() => <Home/>} />               
              </Switch>
            </div>
      </BrowserRouter >
    );

  }
}
