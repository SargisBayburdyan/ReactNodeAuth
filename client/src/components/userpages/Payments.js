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
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "../styles";

import HeaderMenu from "../header/HeaderMenu";

class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    const { classes } = this.props;

    const tiers = [
      {
        title: "Free",
        price: "0",
        description: [
          "10 users included",
          "2 GB of storage",
          "Help center access",
          "Email support",
        ],
        buttonText: "Sign up for free",
        buttonVariant: "outlined",
      },
      {
        title: "Pro",
        subheader: "Most popular",
        price: "15",
        description: [
          "20 users included",
          "10 GB of storage",
          "Help center access",
          "Priority email support",
        ],
        buttonText: "Get started",
        buttonVariant: "contained",
      },
      {
        title: "Enterprise",
        price: "30",
        description: [
          "50 users included",
          "30 GB of storage",
          "Help center access",
          "Phone & email support",
        ],
        buttonText: "Contact us",
        buttonVariant: "outlined",
      },
    ];
    const footers = [
      {
        title: "Company",
        description: ["Team", "History", "Contact us", "Locations"],
      },
      {
        title: "Features",
        description: [
          "Cool stuff",
          "Random feature",
          "Team feature",
          "Developer stuff",
          "Another one",
        ],
      },
      {
        title: "Resources",
        description: [
          "Resource",
          "Resource name",
          "Another resource",
          "Final resource",
        ],
      },
      {
        title: "Legal",
        description: ["Privacy policy", "Terms of use"],
      },
    ];

    return (
      <Fragment>
        <HeaderMenu />
        <CssBaseline />
        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Payments
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Choose your pack Text
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={tier.title === "Pro" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* <div>
          {" "}
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
        </div> */}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Payments);
