import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { notify } from "react-notify-toast";
import styles from "../styles";

import Spinner from "../global/Spinner";
import Copyright from "../global/Copyright";

//Regular Expression for password validation
const passwordRegex = RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

//form validation
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordChanged: false,
      formErrors: {
        password: "",
        confirmPassword: "",
      },
      isLoading: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "password":
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Ihr Passwort muss mindestens 8 Zeichen enthalten" +
            " mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen";
        break;
      case "confirmPassword":
        formErrors.confirmPassword =
          value !== this.state.password
            ? "Bitte geben Sie das gleiche Passwort ein"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { id } = this.props.match.params;

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
      fetch(`/reset/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            this.setState({ passwordChanged: true });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.error("FORM INVALID");
    }
  };

  render() {
    const { classes } = this.props;
    const { formErrors } = this.state;
    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Passwort Zurücksetzen
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.password.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Passwort"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.password}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Passwort bestätigen"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    onChange={this.handleChange}
                  />
                  {formErrors.confirmPassword.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.confirmPassword}
                    </span>
                  )}
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Beenden
              </Button>

              <Grid item>
                <Link href="/" variant="body2">
                  {"Zurück zum Login"}
                </Link>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ResetPassword);
