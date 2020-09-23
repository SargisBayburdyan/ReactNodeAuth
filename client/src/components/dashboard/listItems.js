import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TableChartIcon from "@material-ui/icons/TableChart";
import styles from "../styles";

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ListItem
          className={classes.listitem}
          button
          component={Link}
          to={"/user/dashboard/meinesensoren"}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Meine Sensoren" />
        </ListItem>
        <ListItem
          className={classes.listitem}
          button
          component={Link}
          to={"/user/dashboard/datentabelle"}
        >
          <ListItemIcon button>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Temperaturmessungen" />
        </ListItem>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ListItems);
