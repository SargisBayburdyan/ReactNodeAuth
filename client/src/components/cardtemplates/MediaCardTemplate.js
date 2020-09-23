import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { storage } from "../firebase/Firebase";
import generateRandomID from "uuid/v4";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DropzoneArea } from "material-ui-dropzone";
import { notify } from "react-notify-toast";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import styles from "../styles";

class MediaCardTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      projectInfos: [],
      stimURL: null,
      project: null,
    };
  }

  componentWillMount = () => {
    let project = localStorage.getItem("project");
    this.setState({ project: project, stimURL: this.props.stimURL });
  };

  render() {
    const { classes } = this.props;
    const { projectInfos, project } = this.state;

    return (
      <Fragment>
        {" "}
        <Card item className={classes.surveyCard}>
          <CardContent>
            <Grid container>
              <Typography className={classes.title} color="textSecondary">
                Media
              </Typography>
              <IconButton>
                <DeleteIcon fontSize="medium" color="primary" />
              </IconButton>
            </Grid>
            <Grid container direction="column" alignItems="center">
              <Grid item xs={12} sm={12}>
                <img
                  alt=""
                  className={classes.mediaItem}
                  src={this.state.stimURL}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <ArrowDownwardIcon fontSize="large" color="primary" />
      </Fragment>
    );
  }
}

export default withStyles(styles)(MediaCardTemplate);
