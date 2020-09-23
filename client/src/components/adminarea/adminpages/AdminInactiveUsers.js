import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../../styles";

import HeaderMenu from "../../header/HeaderMenu";

class AdminInActiveUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: [],
    };
  }

  componentWillMount = () => {
    this.getAllUsers();
  };

  deactivateUser = (index) => {
    const { users } = this.state;

    const email = users[index].email;

    fetch("/admin/useractive", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  deleteUser = (index) => {
    const { users } = this.state;
    const email = users[index].email;

    fetch("/admin/deleteuser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  getAllUsers = () => {
    const { users } = this.state;
    fetch("admin/allusersinactive")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          users: [...users, ...data],
        });
      });
  };
  render() {
    const { classes } = this.props;
    const { users } = this.state;

    const userCards = users.map((user, index) => {
      return (
        <Fragment>
          <Grid item xs={6} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography
                  key={index}
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {user.firstName}
                </Typography>
                <Typography
                  key={index}
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {user.lastName}
                </Typography>
                <Typography variant="h6" key={index}>
                  Unternehmensname: {user.companyName}
                </Typography>
                <Typography variant="h6" key={index}>
                  Email: {user.email}
                </Typography>
                <Typography variant="h6" key={index}>
                  Telefonnummer: {user.phone}
                </Typography>
                <Typography variant="h6" key={index}>
                  Adresse: {user.street}, {user.appartment}, {user.zipcode},{" "}
                  {user.city}
                </Typography>
                <Typography variant="h6" key={index}>
                  Role: {user.role}
                </Typography>
                <Typography variant="h6" key={index}>
                  Erstellt: {user.timestamp}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container>
                  <IconButton
                    color="primary"
                    onClick={() => this.deactivateUser(index)}
                  >
                    <UnarchiveIcon />
                  </IconButton>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => this.deleteUser(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <HeaderMenu />
        <Grid container spacing={2}>
          {userCards}
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdminInActiveUsers);
