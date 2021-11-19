import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "../src/style/base.scss";
import Home from "./view/Home";
import SignUp from "./view/SignUp";
import Login from "./view/Login";

import Routes from "./components/routes/Routes";
import LoggedRoute from "./components/routes/LoggedRoute";
import Recover from "./view/Recover";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recover" component={Recover} />
          <LoggedRoute path="/register" component={SignUp} />
          <LoggedRoute path="/login" component={Login} />
          <Routes />
        </Switch>
      </Router>
    </div>
  );
}
