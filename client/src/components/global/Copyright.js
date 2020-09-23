import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styles from "../styles";

class Copyright extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return (
      <Fragment>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://appbaysolutions.com/">
            AppBay solutions
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Copyright);
