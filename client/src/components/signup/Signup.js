import React, { Fragment } from "react";
import { notify } from "react-notify-toast";
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
import PhoneInput from "material-ui-phone-number";
import styles from "../styles";

import Copyright from "../global/Copyright";
import Spinner from "../global/Spinner";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passwordRegex = RegExp(
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
);

const zipCodeRegex = RegExp(/(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})/);

const appartmentRegex = RegExp(/^[0-9]$/);

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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      phone: null,
      street: null,
      appartment: null,
      zipcode: null,
      city: null,
      country: null,
      companyName: null,
      password: null,
      confirmPassword: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        appartment: "",
        zipcode: "",
        city: "",
        country: "",
        username: "",
        companyName: "",
        password: "",
        confirmPassword: "",
      },
      sendEmail: false,
      checked: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log("FORM IS VALID");
      this.setState({ sendEmail: true });
      fetch(`/signupuser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ sendEmail: false });
          notify.show(data.msg);
          this.form.reset();
        })
        .catch((err) => console.log(err));
    } else {
      console.error("FORM INVALID");
    }
  };

  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "Mindestens 2 Zeichen erforderlich" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 2 ? "Mindestens 3 Zeichen erforderlich" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Bitte geben Sie die gültige E-Mail-Adresse ein";
        break;
      case "street":
        formErrors.street =
          value.length < 50 ? "" : "Bitte geben Sie weniger als 50 Zeichen ein";
        break;
      case "appartment":
        formErrors.appartment = appartmentRegex.test(value)
          ? ""
          : "Bitte geben Sie die gültige E-Mail-Adresse ein";
        break;
      case "zipcode":
        formErrors.zipcode = zipCodeRegex.test(value)
          ? ""
          : "Bitte geben Sie die gültige Postleitzahl ein";
        break;
      case "city":
        formErrors.city =
          value.length < 20 ? "" : "Bitte geben Sie weniger als 20 Zeichen ein";
        break;
      case "country":
        formErrors.country =
          value.length < 20 ? "" : "Bitte geben Sie weniger als 20 Zeichen ein";
        break;
      case "username":
        formErrors.username =
          value.length < 6 ? "Mindestens 6 Zeichen erforderlich" : "";
        break;
      case "companyName":
        formErrors.companyName =
          value.length < 50 ? "" : "Bitte geben Sie weniger als 50 Zeichen ein";
        break;
      case "password":
        formErrors.password = passwordRegex.test(value)
          ? ""
          : "Ihr Passwort muss mindestens 8 Zeichen enthalten" +
            "  mindestens ein Großbuchstabe, ein Kleinbuchstabe, eine Zahl und ein Sonderzeichen";
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

  handleCheckboxChange = (e) => {
    e.preventDefault();
    this.setState({ checked: e.target.checked });
  };

  handlePhoneChange = (value) => {
    this.setState({
      phone: value,
    });
  };
  render() {
    const { classes } = this.props;
    const { formErrors, sendEmail, checked } = this.state;
    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
              ref={(el) => (this.form = el)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={formErrors.firstName.length > 0 ? "error" : null}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Vorname"
                    autoComplete="given-name"
                    onChange={this.handleChange}
                  />
                  {formErrors.firstName.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.firstName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={formErrors.lastName.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Nachame"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={this.handleChange}
                  />
                  {formErrors.lastName.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.lastName}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.username.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Benutzername"
                    name="username"
                    autoComplete="username"
                    onChange={this.handleChange}
                  />
                  {formErrors.username.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.username}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.email.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Adresse"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.email}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <PhoneInput
                    variant="outlined"
                    fullWidth
                    disableAreaCodes
                    defaultCountry="de"
                    name="phone"
                    onChange={this.handlePhoneChange}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <TextField
                    className={formErrors.street.length > 0 ? "error" : null}
                    variant="outlined"
                    fullWidth
                    required
                    name="street"
                    label="Straße"
                    id="street"
                    autoComplete="street-address"
                    onChange={this.handleChange}
                  />
                  {formErrors.street.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.street}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    className={
                      formErrors.appartment.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    fullWidth
                    required
                    name="appartment"
                    label="Hausnummer"
                    id="appartment"
                    autoComplete="address"
                    onChange={this.handleChange}
                  />
                  {formErrors.street.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.street}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={formErrors.zipcode.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    name="zipcode"
                    label="PLZ"
                    id="zipcode"
                    autoComplete="postal-code"
                    onChange={this.handleChange}
                  />
                  {formErrors.zipcode.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.zipcode}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    className={formErrors.city.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="Stadt"
                    id="city"
                    autoComplete="address-level2"
                    onChange={this.handleChange}
                  />
                  {formErrors.city.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.city}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={formErrors.country.length > 0 ? "error" : null}
                    variant="outlined"
                    required
                    fullWidth
                    name="country"
                    label="Land"
                    id="country"
                    autoComplete="country"
                    onChange={this.handleChange}
                  />
                  {formErrors.country.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.country}
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={
                      formErrors.companyName.length > 0 ? "error" : null
                    }
                    variant="outlined"
                    fullWidth
                    required
                    id="company"
                    label="Unternehmen"
                    name="companyName"
                    autoComplete="company"
                    onChange={this.handleChange}
                  />
                  {formErrors.companyName.length > 0 && (
                    <span className={classes.errorMessage}>
                      {formErrors.companyName}
                    </span>
                  )}
                </Grid>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        checked={checked}
                        onChange={this.handleCheckboxChange}
                      />
                    }
                    label="Ich stimme den Allgemeinen Geschäftsbedingungen zu"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={(sendEmail, !checked)}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up &nbsp; {sendEmail ? <Spinner size="1x" /> : ""}
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Sie haben bereits ein Konto? Einloggen
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Signup);
