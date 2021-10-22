import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/style/base.scss";
import SignUpPage from "./view/SignUpPage";
import LoginPage from "./view/LoginPage";
import ProfilePage from "./view/ProfilePage";
import PrivateRoute from "./components/shared/PrivateRoute";
import Courses from "./view/Courses";
import Students from "./view/Students";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/courses" component={Courses} />
          <PrivateRoute path="/students" component={Students} />
        </Switch>
      </Router>
    </div>
  );
}
