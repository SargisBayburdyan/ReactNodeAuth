import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import styles from "../../styles";

import HeaderMenu from "../../header/HeaderMenu";

class AdminSensors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    return (
      <Fragment>
        <HeaderMenu />
        <div>Alle Sensoren</div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdminSensors);
