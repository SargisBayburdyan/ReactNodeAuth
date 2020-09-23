import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import WebIcon from "@material-ui/icons/Web";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import { notify } from "react-notify-toast";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "../../styles";

//Cards
import UploadCard from "../../cards/Upload";
import MediaCardTemplate from "../../cardtemplates/MediaCardTemplate";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      cardTypeAnchorEl: null,
      files: [],
      cards: [],
      fieldsDisabled: true,
      projectInfos: [],
      project: "",
      disableChooseProject: true,
    };
  }

  componentWillMount = () => {
    //this.getProjectsList();
    this.getProjectsList();
  };

  componentDidMount = () => {
    const { projectInfos, cards } = this.state;
    let project = localStorage.getItem("project");

    this.setState({ project: project });
  };

  getProjectsList = () => {
    const { projectInfos, project, cards } = this.state;
    fetch("/project/list")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          loading: false,
          projectInfos: [...projectInfos, ...data],
        });
      });
  };

  handleDrop = (files) => {
    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      fileList.push(files[i].name);
    }
    this.setState({ files: fileList });
  };

  selectProject = (index) => {
    const { projectInfos, cards, project } = this.state;
    let projectName = projectInfos[index].projectName;
    localStorage.setItem("project", projectName);

    window.location.reload();
  };

  changeProjectName = () => {
    const { projectInfos, cards, project } = this.state;
    this.setState({ disableChooseProject: false });
  };

  handleClick = (e) => {
    this.setState({ cardTypeAnchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ cardTypeAnchorEl: null });
  };

  createQuestionCard = () => {
    console.log("Question");
    this.setState({ cardType: "Question" });
    this.handleClose();
  };
  createMediaCard = () => {
    console.log("Media");
    this.setState({ cardType: "Media" });
    this.handleClose();
  };
  createAudioCard = () => {
    console.log("Audio");
    this.setState({ cardType: "Audio" });
    this.handleClose();
  };
  createWebpageCard = () => {
    console.log("Webpage");
    this.setState({ cardType: "Webpage" });
    this.handleClose();
  };

  createCard = () => {
    const { cardType, project } = this.state;

    if (cardType === "Media") {
      return (
        <Fragment>
          {" "}
          <UploadCard handleDrop={this.handleDrop}>
            <div style={{ height: 200, width: 300 }}>
              {this.state.files.map((file, index) => (
                <div key={index}>{file}</div>
              ))}
            </div>
          </UploadCard>
        </Fragment>
      );
    } else if (cardType === "Audio") {
      console.log("Audio Card called");
    } else if (cardType === "Webpage") {
      console.log("Webpage card called");
    }
  };

  render() {
    const { classes } = this.props;
    const {
      cardTypeAnchorEl,
      project,
      projectInfos,
      disableChooseProject,
      createCardDisabled,
      cards,
    } = this.state;

    console.log(this.state);

    if (projectInfos.length > 0) {
      for (let i = 0; i < projectInfos.length; i++) {
        let projectName = projectInfos[i].projectName;
        let cardsInfo = projectInfos[i].cards;
        if (projectName === project && cardsInfo.length > 0) {
          for (let j = 0; j < cardsInfo.length; j++) {
            let projectCards = projectInfos[i].cards[j];

            cards.push(projectCards);
          }
        }
      }
    }

    const myCards = cards.map((card, index) => {
      const type = card.type;

      return (
        <Fragment>
          {type === "media" ? (
            <Fragment>
              <MediaCardTemplate key={index} stimURL={card.stimURL} />
            </Fragment>
          ) : null}
        </Fragment>
      );
    });

    const myprojects = projectInfos.map((projectInfo, index) => {
      return (
        <MenuItem
          key={index}
          value={projectInfo.projectName}
          onClick={() => this.selectProject(index)}
        >
          {projectInfo.projectName}
        </MenuItem>
      );
    });

    return (
      <Fragment>
        <Container className={classes.projDesignContainer}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Card className={classes.surveyCard}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    Start
                  </Typography>
                </CardContent>
                <CardActions>
                  {" "}
                  <Grid item xs={6} sm={6}>
                    <FormControl
                      fullWidth
                      disabled={disableChooseProject}
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Choose Project
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={project}
                      >
                        {myprojects}
                      </Select>
                    </FormControl>
                  </Grid>
                  {disableChooseProject ? (
                    <Grid item xs={2} sm={2}>
                      <IconButton onClick={this.changeProjectName}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
            <Grid item md={1}>
              <ArrowDownwardIcon fontSize="large" color="primary" />
            </Grid>

            <Grid item>{myCards}</Grid>

            <Grid item>{this.createCard()}</Grid>
            {disableChooseProject ? (
              <Grid>
                <AddCircleIcon
                  fontSize="large"
                  color="primary"
                  variant="contained"
                  onClick={this.handleClick}
                />
                <Menu
                  className={classes.profileMenu}
                  elevation={2}
                  getContentAnchorEl={null}
                  anchorEl={cardTypeAnchorEl}
                  open={Boolean(cardTypeAnchorEl)}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={this.createQuestionCard}>
                    <ListItemIcon>
                      <QuestionAnswerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Question" />
                  </MenuItem>
                  <MenuItem
                    className={classes.profileMenuItem}
                    onClick={this.createMediaCard}
                  >
                    <ListItemIcon>
                      <PermMediaIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Media" />
                  </MenuItem>
                  <MenuItem
                    className={classes.profileMenuItem}
                    onClick={this.createAudioCard}
                  >
                    <ListItemIcon>
                      <AudiotrackIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Audio" />
                  </MenuItem>
                  <MenuItem
                    className={classes.profileMenuItem}
                    onClick={this.createWebpageCard}
                  >
                    <ListItemIcon>
                      <WebIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Webpage" />
                  </MenuItem>
                </Menu>
              </Grid>
            ) : null}
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Project);
