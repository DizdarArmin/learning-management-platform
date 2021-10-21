import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/style/base.scss";
import SignUpPage from "./view/SignUpPage";
import LoginPage from "./view/LoginPage";
import ProfilePage from "./view/ProfilePage";
import { authInstance } from "./scripts/firebase";

import { useUser } from "./state/UserProvider";
import ProtectedRoute from "./components/shared/ProtectedRoute";

export default function App() {
  const { isLogged } = useUser();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute
            isLogged={isLogged}
            path="/profile"
            component={ProfilePage}
          />
        </Switch>
      </Router>
    </div>
  );
}
