import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import { withStyles } from "@material-ui/core";
import ListItems from "./AdminListItems";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import styles from "../../styles";

const defaultTheme = createMuiTheme({ typography: { useNextVariants: true } });

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  handleDrawerOpen = (e) => {
    e.preventDefault();
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = (e) => {
    e.preventDefault();
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider
        theme={{
          ...defaultTheme,
          palette: {
            ...defaultTheme.palette,
            secondary: {
              color: `${process.env.REACT_APP_PRIMARY_COLOR}`,
              contrastText: "#ffffff",
            },
          },
        }}
      >
        <Paper className={classes.dashboard}>
          <List className={classes.dashboardItems}>
            <ListItems />
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
