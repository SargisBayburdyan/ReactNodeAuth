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
import styles from "../styles";
import generateRandomID from "uuid/v4";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
class UploadCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      uploaded: false,

      cardType: null,
      uploadCard: {},
      uploadItem: null,
      uploadItemURL: null,
      progress: 0,
      project: null,
      open: false,
    };
  }

  componentWillMount = () => {
    this.setState({ project: this.props.currentproject });
  };

  handleChange = (files) => {
    this.setState({ uploadItem: files });
  };

  handleUpload = (e) => {
    const { uploadItem, project } = this.state;

    var itemID = generateRandomID();
    if (uploadItem !== null && project !== "") {
      const upload = storage.ref(`docs/${itemID}`).put(uploadItem[0]);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("media")
            .child(itemID)
            .getDownloadURL()
            .then((url) => {
              let uploadObject = {
                itemID: itemID,
                itemURL: url,
                type: "media",
              };
              this.setState({
                uploadCard: uploadObject,
              });
            })
            .then(() => {
              fetch("/project/upload", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                });
            });
        }
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { progress, open, uploaded, uploadItemURL } = this.state;
    return (
      <Fragment>
        {uploaded ? (
          <Card item className={classes.uploadCard}>
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
                    className={classes.uploadItem}
                    src={uploadItemURL}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Card item className={classes.uploadCard}>
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
                <br />
                <br />
                <Grid item xs={12} sm={12}>
                  <DropzoneArea
                    open={open}
                    filesLimit={1}
                    acceptedFiles={[
                      "image/jpeg",
                      "image/png",
                      "image/bmp",
                      "video/mp4",
                      "video/avi",
                      "video/wmv",
                      "video/mpeg",
                    ]}
                    showPreviewsInDropzone={true}
                    maxFileSize={5000000}
                    type="file"
                    classname={classes.dropzone}
                    onChange={this.handleChange}
                  />
                </Grid>
                <br />
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container>
                {progress > 0 ? (
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color="primary"
                      max="100"
                    />
                  </Grid>
                ) : null}

                <br />
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    onClick={this.handleUpload}
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        )}
        <ArrowDownwardIcon fontSize="large" color="primary" />
      </Fragment>
    );
  }
}

export default withStyles(styles)(UploadCard);
