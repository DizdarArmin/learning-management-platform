import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
export default function RoleRoute({ component: Component, ...rest }) {
  const { userData } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userData) {
          if (userData.role === "teacher") {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }
      }}
    />
  );
}
