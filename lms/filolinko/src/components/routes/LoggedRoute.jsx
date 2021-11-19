import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
export default function LoggedRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) {
          return (
            <Redirect
              to={{ pathname: "/courses", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
