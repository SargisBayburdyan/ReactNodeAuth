var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, AppBayDB_URL } = require("./configs/serverConfig");
const newUserToDB = require("./signup/newUserToDb");
const newUserConfirm = require("./signup/newUserConfirm");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const authRouter = require("./routes/authRouter");
const passwordRouter = require("./routes/passwordRouter");
const adminRouter = require("./routes/adminRouter");
const acoountRouter = require("./routes/accountRouter");
const mediaRouter = require("./routes/mediaRouter");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const projectRouter = require("./routes/projectRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.CLIENT_ORIGIN);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", authRouter);
app.use("/resetpassword", passwordRouter);
app.use("/admin", adminRouter);
app.use("/account", acoountRouter);
app.use("/media", mediaRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/project", projectRouter);

app.post("/signupuser", newUserToDB.createNewUser);

app.get("/signupuser/confirm/:id", newUserConfirm.emailConfirm);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect(
    AppBayDB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },

    () => {
      app.listen(PORT, () =>
        console.log("Verbindung mit AppBayDB erfolgreich")
      );
    }
  )
  .catch((err) => console.log(err));

module.exports = app;
