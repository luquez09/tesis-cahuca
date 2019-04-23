import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from './components/NavBar';
import Inicio from './components/Inicio/Index'
import Combustibles from './components/combustibles/index'

const routes = [
  { path: "/", exact: true, main: Inicio },
  { path: "/Generales", main: Inicio },
  { path: "/Contact", main: Inicio },
  { path: "/combustibles", exact: true, main: Combustibles }
];

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <div>
            <NavBar />
            {routes.map((route, index) => (

              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </div>

          <div style={{ flex: 1, paddingTop: "10px" }}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
