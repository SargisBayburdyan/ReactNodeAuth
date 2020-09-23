import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";

import HeaderMenu from "./components/header/HeaderMenu";
import AdminDashboard from "./components/adminarea/admindashboard/AdminDashboard";
import styles from "./components/styles";

import Settings from "./components/userpages/Settings";
import MyProfile from "./components/userpages/MyProfile";
import AdminActiveUsers from "./components/adminarea/adminpages/AdminActiveUsers";
import AdminInActiveUsers from "./components/adminarea/adminpages/AdminInactiveUsers";
import AdminSensoren from "./components/adminarea/adminpages/AdminSensors";
import Project from "./components/adminarea/adminpages/Project";

class DashboardNavigation extends React.Component {
  render() {
    const { classes } = this.props;
    const { params } = this.props.match;

    return (
      <Fragment>
        <HeaderMenu />
        <AdminDashboard />

        <main className={classes.content}>
          {(function () {
            switch (params.adminpage) {
              case "users":
                return <AdminActiveUsers />;
              case "usersinaktiv":
                return <AdminInActiveUsers />;
              case "sensoren":
                return <AdminSensoren />;
              case "einstellungen":
                return <Settings />;
              case "personaleinfo":
                return <MyProfile />;
              case "data":
                return <Project />;
              default:
                return null;
            }
          })()}
        </main>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DashboardNavigation);
