import React from 'react';
import logo from './logo.svg';
import './App.css';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routing from "../src/routing"
import Notification from "./components/Notification"
function App() {
  return (

    <Provider store={store}>
      <Router>
        <Routing />
        <Notification />
      </Router>
    </Provider>
  );
}

export default App;
