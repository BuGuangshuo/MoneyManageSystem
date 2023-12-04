// /*
//  * @Author: 卜广硕 guangshuo.bu@datatist.com
//  * @Date: 2023-05-10 18:20:23
//  * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
//  * @LastEditTime: 2023-06-12 16:11:11
//  * @FilePath: \MoneyNode\app.js
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// var express = require("express");

var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://buguangshuo:107815@moneydatebase.sslg2ca.mongodb.net/money",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const EXPRESS = require("express");
const app = EXPRESS();

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

var users = require("./routes/users");

//中间件配置

// 开启所有请求都支持跨域
app.use(cors());
app.use(EXPRESS.json());
app.use(bodyParser.urlencoded({ extended: false })); //解析form传过来的值
//静态文件托管
// app.use('/static',EXPRESS.static("static"))

//路由中间件
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
app.use("/v1/users", users);
app.use("/v1/register", regRouter);

app.get("/", (req, res) => {
  res.send(`MoneySystem Service`);
});

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
