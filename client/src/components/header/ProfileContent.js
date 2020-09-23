import React, { useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import PaymentIcon from "@material-ui/icons/Payment";
import AuthService from "../useruth/Authservice";
import { AuthContext } from "../useruth/AuthContext";

import styles from "../styles";

const ProfileContent = (props) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { classes } = props;

  const handleLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setIsAuthenticated(false);
      }
    });
  };

  return (
    <Fragment>
      <MenuItem
        className={classes.profileMenuItem}
        component={Link}
        to="/user/dashboard/personaleinfo"
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Personale Info" />
      </MenuItem>
      <MenuItem
        className={classes.profileMenuItem}
        component={Link}
        to="/user/dashboard/zahlungen"
      >
        <ListItemIcon>
          <PaymentIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Zahlungen" />
      </MenuItem>
      <MenuItem
        className={classes.profileMenuItem}
        component={Link}
        to="/user/dashboard/einstellungen"
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Einstellungen" />
      </MenuItem>
      <MenuItem
        className={classes.profileMenuItem}
        component={Link}
        to="#/login"
        onClick={handleLogout}
      >
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Abmelden" />
      </MenuItem>
    </Fragment>
  );
};

export default withStyles(styles)(ProfileContent);
