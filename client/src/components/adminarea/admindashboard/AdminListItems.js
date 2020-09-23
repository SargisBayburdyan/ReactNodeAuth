import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WorkIcon from "@material-ui/icons/Work";
import TableChartIcon from "@material-ui/icons/TableChart";
import { withStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";

import styles from "../../styles";

class AdminListItems extends React.Component {
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
          to={"/admin/dashboard/users"}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Aktive Benutzer" />
        </ListItem>
        <ListItem
          className={classes.listitem}
          button
          component={Link}
          to={"/admin/dashboard/usersinaktiv"}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Inaktive Benutzer" />
        </ListItem>
        <ListItem
          className={classes.listitem}
          button
          component={Link}
          to={"/admin/dashboard/sensoren"}
        >
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Alle Sensoren" />
        </ListItem>
        <ListItem
          className={classes.listitem}
          button
          component={Link}
          to={"/admin/dashboard/data"}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Daten hinzufügen" />
        </ListItem>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AdminListItems);
