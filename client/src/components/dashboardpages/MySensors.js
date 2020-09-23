import React from "react";
import { withStyles } from "@material-ui/core";
import styles from "../styles";

class MySensors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return <div>Meine Sensoren</div>;
  }
}

export default withStyles(styles)(MySensors);
