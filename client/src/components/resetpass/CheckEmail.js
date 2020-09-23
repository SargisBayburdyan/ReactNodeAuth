import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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

class CheckEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkEmail: "",
      sendEmail: false,
      formErrors: {
        checkEmail: "",
      },
      isLoading: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "checkEmail":
        formErrors.checkEmail = emailRegex.test(value)
          ? ""
          : "Bitte geben Sie die gültige E-Mail-Adresse ein";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.setState({ sendEmail: true });

    const { id } = this.props.match.params;

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
      fetch(`/resetpassword/email`, {
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
            this.setState({ sendEmail: false });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.error("FORM INVALID");
    }
  };

  render() {
    const { classes } = this.props;
    const { sendEmail, formErrors } = this.state;
    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Email bestätigen
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={
                      formErrors.checkEmail.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Adresse"
                    name="checkEmail"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  {formErrors.checkEmail.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.checkEmail}
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
                E-mail senden &nbsp; &nbsp;
                {sendEmail ? <Spinner size="1x" /> : ""}
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

export default withStyles(styles)(CheckEmail);
