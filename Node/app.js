/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-10 18:20:23
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-12 16:11:11
 * @FilePath: \MoneyNode\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/money", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var indexRouter = require("./routes/index");
var regRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var menuRouter = require("./routes/menu");
var rolesRouter = require("./routes/roles");

var userQueryRouter = require("./routes/userManage/userQuery");
var userDelRouter = require("./routes/userManage/userDelete");

var createFamilyRouter = require("./routes/familyMember/createFamily");

var settingRouter = require("./routes/systemSetting/themeSetting");

var createGroupRouter = require("./routes/group/createGroup");
var getGroupRouter = require("./routes/group/getGroup");
var groupValidateRouter = require("./routes/group/validate");
var approveGroup = require("./routes/group/approveGroup");

var getMemberRouter = require("./routes/member/getMember");
var saveMemberRouter = require("./routes/member/saveMember");

var getUserInfoRouter = require("./routes/userInfo/getUserInfo");
var saveUserInfoRouter = require("./routes/userInfo/saveUserInfo");
var editUserInfoRouter = require("./routes/userInfo/editUserInfo");

var getProcessRouter = require("./routes/processGroup/getProcess");

var targetListBy = require("./routes/target/targetListBy");
var saveTarget = require("./routes/target/saveTarget");

var app = express();

//修改限制大小
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/v1/register", regRouter);
app.use("/v1/login", loginRouter);
app.use("/v1/menu", menuRouter);
app.use("/v1/roles", rolesRouter);

app.use("/v1/userManage/user/query", userQueryRouter);
app.use("/v1/userManage/user/delete", userDelRouter);

app.use("/v1/family/create", createFamilyRouter);

app.use("/v1/systemSetting/systemSetting", settingRouter);

app.use("/v1/group/create", createGroupRouter);
app.use("/v1/group/get", getGroupRouter);
app.use("/v1/group/validate", groupValidateRouter);
app.use("/v1/group/approve", approveGroup);

app.use("/v1/member/get", getMemberRouter);
app.use("/v1/member/save", saveMemberRouter);

app.use("/v1/userInfo/get", getUserInfoRouter);
app.use("/v1/userInfo/save", saveUserInfoRouter);
app.use("/v1/userInfo/edit", editUserInfoRouter);

app.use("/v1/process/get", getProcessRouter);

app.use("/v1/target/listBy", targetListBy);
app.use("/v1/target/save", saveTarget);

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

module.exports = app;
