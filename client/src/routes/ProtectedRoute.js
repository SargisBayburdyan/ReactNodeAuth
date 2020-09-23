import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../components/useruth/AuthContext";

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );

        if (!roles.includes(user.role))
          return (
            <Redirect
              to={{
                pathname: "/dashboard/meinesensoren",
                state: { from: props.location },
              }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
