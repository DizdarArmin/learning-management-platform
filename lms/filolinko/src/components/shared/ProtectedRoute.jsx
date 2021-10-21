import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
  isLogged: isLogged,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogged) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}
