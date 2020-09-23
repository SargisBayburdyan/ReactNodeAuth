import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import styles from "../styles";

import HeaderMenu from "../header/HeaderMenu";

class Settings extends React.Component {
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
        <div>Settings</div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Settings);
