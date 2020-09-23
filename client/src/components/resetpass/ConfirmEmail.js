import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import styles from "../styles";

import Spinner from "../global/Spinner";

class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirming: false,
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;

    fetch(`/reset/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ isConfirming: false });
        notify.show(data.msg);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { isConfirming } = this.state;

    return (
      <Grid item xs={12} sm={6} className={classes.confirmSignup}>
        {isConfirming ? (
          <Spinner size="1x" />
        ) : (
          <Button
            component={Link}
            to="/resetpassword/:id"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            zur Zurückmeldung
          </Button>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(ConfirmEmail);
