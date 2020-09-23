import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArchiveIcon from "@material-ui/icons/Archive";
import styles from "../../styles";

import HeaderMenu from "../../header/HeaderMenu";

class AdminActiveUsers extends React.Component {
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

    fetch("/admin/userinactive", {
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
    fetch("/admin/allusersactive")
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
            <Card key={index}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {user.firstName}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {user.lastName}
                </Typography>
                <Typography variant="h6">
                  Unternehmensname: {user.companyName}
                </Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Typography variant="h6">
                  Telefonnummer: {user.phone}
                </Typography>
                <Typography variant="h6">
                  Adresse: {user.street}, {user.appartment}, {user.zipcode},{" "}
                  {user.city}
                </Typography>
                <Typography variant="h6">Role: {user.role}</Typography>
                <Typography variant="h6">Erstellt: {user.timestamp}</Typography>
              </CardContent>
              <CardActions>
                <Grid container>
                  <IconButton
                    color="primary"
                    onClick={() => this.deactivateUser(index)}
                  >
                    <ArchiveIcon />
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

export default withStyles(styles)(AdminActiveUsers);
