import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../components/useruth/AuthContext";

const UnProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated)
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

export default UnProtectedRoute;
