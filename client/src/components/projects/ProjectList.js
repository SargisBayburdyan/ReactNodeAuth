import React, { Fragment } from "react";
import WorkIcon from "@material-ui/icons/Work";
import { withStyles } from "@material-ui/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

import styles from "../styles";

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      allProjects: [],
      projectName: null,
      newProjectOpen: false,
      projAnchorEl: null,
    };
  }

  componentDidMount = () => {
    this.getProjectsList();
  };

  getProjectsList = () => {
    const { allProjects } = this.state;
    fetch("/project/list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          allProjects: [...allProjects, ...data],
        });
      })
      .catch((err) => console.log(err));
  };

  handleProjectClick = (e) => {
    this.setState({ projAnchorEl: e.currentTarget });
  };

  handleProjectClose = () => {
    this.setState({ projAnchorEl: null });
  };

  newProjectOpen = (e) => {
    this.setState({
      newProjectOpen: true,
    });
  };

  newProjectClose = () => {
    this.setState({
      newProjectOpen: false,
    });
  };

  projectChange = (e) => {
    this.setState({
      projectName: e.target.value,
    });
  };

  createNewProject = () => {
    fetch("/project/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(this.state),
      //TODO: nur den Namen senden
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          newProjectOpen: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { projAnchorEl, allProjects, newProjectOpen } = this.state;

    console.log(this.state);

    const myprojects = allProjects.map((project, index) => {
      return (
        <ListItem key={index} button onClick={this.handleProjectClose}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary={project.name} />
        </ListItem>
      );
    });

    return (
      <div>
        {myprojects}
        <ListItem>
          {newProjectOpen ? (
            <div>
              <Grid container>
                <Grid item xs={9}>
                  <TextField
                    id="standard-basic"
                    placeholder="Project Name"
                    name="projectName"
                    onChange={this.projectChange}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={this.createNewProject}>
                    <CheckIcon fontSize="small" color="primary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={this.newProjectClose}
                    className={classes.projectClose}
                  >
                    <CloseIcon fontSize="small" color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ) : (
            <IconButton onClick={this.newProjectOpen}>
              <AddCircleIcon button color="primary" fontSize="large" />
            </IconButton>
          )}
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(ProjectList);
