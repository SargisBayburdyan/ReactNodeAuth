import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";

import HeaderMenu from "./components/header/HeaderMenu";
import Dashboard from "./components/dashboard/Dashboard";
import styles from "./components/styles";

import MySensors from "./components/dashboardpages/MySensors";
import DataTable from "./components/dashboardpages/DataTable";
import Settings from "./components/userpages/Settings";
import MyProfile from "./components/userpages/MyProfile";
import Payments from "./components/userpages/Payments";

class DashboardNavigation extends React.Component {
  render() {
    const { classes } = this.props;
    const { params } = this.props.match;

    return (
      <Fragment>
        <HeaderMenu />
        <Dashboard />

        <main className={classes.content}>
          {(function () {
            switch (params.page) {
              case "meinesensoren":
                return <MySensors />;
              case "datentabelle":
                return <DataTable />;
              case "einstellungen":
                return <Settings />;
              case "personaleinfo":
                return <MyProfile />;
              case "zahlungen":
                return <Payments />;
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
