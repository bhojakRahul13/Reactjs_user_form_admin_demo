import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Table from "./Components/Display";
import User from "./Components/User";
import NotFound from "./Components/NotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/reg" component={Register} />
          <Route exact path="/dis" component={Table} />
          <Route path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
