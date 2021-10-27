import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "../src/style/base.scss";
import Home from "./view/Home";
import SignUp from "./view/SignUp";
import Login from "./view/Login";

import LoggedRoutes from "./components/shared/LoggedRoutes";
import CoursesTeacher from "./components/CoursesTeacher";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CoursesTeacher} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={Login} />
          <LoggedRoutes />
        </Switch>
      </Router>
    </div>
  );
}
