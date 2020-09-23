import React from "react";
import { withStyles } from "@material-ui/core";
import styles from "../styles";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return <div>Admin Seite</div>;
  }
}

export default withStyles(styles)(Admin);
