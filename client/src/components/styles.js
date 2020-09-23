const drawerWidth = 220;

const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: "60px",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toolbar: {
    backgroundColor: "white",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: { borderBottom: `1px solid ${theme.palette.divider}` },
  appBarShift: {
    width: `100%`,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontWeight: "1000",
    letterSpacing: "4px",
  },

  usernameTop: {
    fontWeight: "600",
    letterSpacing: "2px",
  },

  dashboard: {
    backgroundColor: "#4caf50",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    minWidth: drawerWidth,
  },
  dashboardItems: {
    color: "#ffffff",
  },
  table: {
    minWidth: "650",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
  },
  listitem: {
    "&:hover": { backgroundColor: "#2196f3" },
    "&:focus": {
      backgroundColor: "#2196f3",
    },
  },
  table: {
    minWidth: 700,
  },
  profileMenu: {
    marginTop: "40px",
  },

  profileMenuItem: {
    "&:hover": {
      backgroundColor: "#4caf50",
    },
  },
  logoTopMenu: {
    width: "40px",
    height: "50px",
  },
  errorMessage: {
    color: "red",
    fontSize: "0.75em",
    display: "relative",
  },
  confirmSignup: {
    marginTop: "250px",
    marginLeft: "650px",
  },
  upload: {
    display: "none",
  },
  uploadRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  uploadInput: {
    display: "none",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  projectCard: {
    margin: "20px",
    flexDirection: "row",
    backgroundColor: theme.palette.background.paper,
  },

  surveyCard: {
    minWidth: "400px",
    marginTop: "10px",
  },
  dropzone: {
    border: "#ed6847",
    position: "absolute",
    top: "10px",
    zIndex: 9999,
  },
  mediaItem: {
    height: "350px",
    width: "350px",
  },

  projectClose: {
    marginLeft: "10px",
  },
  uploadCard: {
    minWidth: "400px",
    marginTop: "10px",
  },
  uploadItem: {
    height: "350px",
    width: "350px",
  },

  dropzone: {
    border: "#ed6847",
    position: "absolute",
    top: "10px",
    zIndex: 9999,
  },
});

export default styles;
