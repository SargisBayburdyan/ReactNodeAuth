import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Notifications from "react-notify-toast";
import { withStyles } from "@material-ui/core/styles";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/UnProtectedRoute";

import DashboardNavigation from "./DashboardNavigation";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ConfirmSignup from "./components/signup/ConfirmSignup";
import Admin from "./components/adminarea/Admin";
import ResetPassword from "./components/resetpass/ResetPassword";
import CheckEmail from "./components/resetpass/CheckEmail";
import ConfirmEmail from "./components/resetpass/ConfirmEmail";

import styledTheme from "./styledTheme";
import styles from "./components/styles";
import AdminDashboardNavigation from "./AdminDashboardNavigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { classes } = this.props;

    const content = () => {
      return (
        <Router>
          <CssBaseline />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route
              exact
              path="/admin"
              render={() => <Redirect to="/admin/dashboard/users" />}
            />
            <Route
              exact
              path="/user"
              render={() => <Redirect to="/user/dashboard/meinesensoren" />}
            />
            <div className={classes.root}>
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/signup" component={Signup} />
              <PublicRoute
                exact
                path="/resetpassword"
                component={ResetPassword}
              />
              <PublicRoute exact path="/checkemail" component={CheckEmail} />
              <PublicRoute
                exact
                path="/confirm/email/:id"
                component={ConfirmEmail}
              />
              <PublicRoute
                exact
                path="/bestaetigen/:id"
                component={ConfirmSignup}
              />

              <PrivateRoute
                exact
                path="/user/dashboard/:page"
                roles={["user", "admin"]}
                component={DashboardNavigation}
              />
              <PrivateRoute
                exact
                path="/admin/dashboard/:adminpage"
                roles={["admin"]}
                component={AdminDashboardNavigation}
              />
              <PrivateRoute
                exact
                path="/admin"
                roles={["admin"]}
                component={Admin}
              />
            </div>
          </Switch>
        </Router>
      );
    };

    return (
      <div className={"container fadein"}>
        <Notifications />
        <main>{content()}</main>
      </div>
    );
  }
}

export default styledTheme(withStyles(styles)(App));
