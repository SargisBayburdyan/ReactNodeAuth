import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import styles from "../styles";

import TopMenu from "../header/HeaderMenu";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {},
    };
  }

  componentWillMount = () => {
    this.getUser();
  };

  getUser = () => {
    fetch("/profile/getuser")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ user: data });
      });
  };

  render() {
    console.log(this.state);

    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Fragment>
        <TopMenu />
        <CssBaseline />
        <div>
          {" "}
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.toolbarTitle}
              >
                {user.firstName + " " + user.lastName}
              </Typography>
              <nav>
                <Link
                  variant="button"
                  color="textPrimary"
                  href="#"
                  className={classes.link}
                >
                  Features
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  href="#"
                  className={classes.link}
                >
                  Enterprise
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  href="#"
                  className={classes.link}
                >
                  Support
                </Link>
              </nav>
              <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Username: {user.username}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Email: {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Adresse:{" "}
              {user.street +
                ", " +
                user.appartment +
                ", " +
                user.zipcode +
                ", " +
                user.city}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Telefonnummer: {user.phone}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Unternehmen: {user.companyName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6" color="inherit" noWrap>
              Erstellt am: {user.timestamp}
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MyProfile);
