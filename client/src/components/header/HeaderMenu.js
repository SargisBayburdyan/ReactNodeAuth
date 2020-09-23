import React, { useContext, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import WorkIcon from "@material-ui/icons/Work";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import { AuthContext } from "../useruth/AuthContext";
import ProfileContent from "./ProfileContent";
import ProjectList from "../projects/ProjectList";

import styles from "../styles";

const HeaderMenu = (props) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [projectAnchorEl, setProjectAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const { classes } = props;

  const handleUserClick = (e) => {
    setUserAnchorEl(e.currentTarget);
  };

  const handleUserClose = (e) => {
    setUserAnchorEl(null);
  };

  const handleProjectClick = (e) => {
    setProjectAnchorEl(e.currentTarget);
  };

  const handleProjectClose = (e) => {
    setProjectAnchorEl(null);
  };

  useEffect(() => {
    fetch("/account/getuser")
      .then((res) => res.json())
      .then((data) => {
        setUsername({
          data,
        });
      });
  }, []);
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          color="textPrimary"
          noWrap
          className={classes.title}
        >
          AppBay solutions
        </Typography>
        <Typography
          component="h6"
          color="textPrimary"
          noWrap
          className={classes.usernameTop}
        >
          {username.data}
        </Typography>
        &nbsp;&nbsp;
        <IconButton>
          <WorkIcon
            fontSize="large"
            color="secondary"
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleProjectClick}
          />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={projectAnchorEl}
          keepMounted
          open={Boolean(projectAnchorEl)}
          onClose={handleProjectClose}
        >
          <ProjectList />
        </Menu>
        &nbsp;&nbsp;
        <ListItemIcon>
          <AccountCircleIcon
            fontSize="large"
            color="secondary"
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleUserClick}
          />
          <Menu
            className={classes.profileMenu}
            elevation={2}
            getContentAnchorEl={null}
            anchorEl={userAnchorEl}
            keepMounted
            open={Boolean(userAnchorEl)}
            onClose={handleUserClose}
          >
            <ProfileContent />
          </Menu>
        </ListItemIcon>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(HeaderMenu);
