/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-02-17 14:28:29
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-25 18:25:33
 * @FilePath: \MoneyNode\routes\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

var { UserModel } = require('./models')

/* GET users listing. */
router.post('/', function (req, res) {
  const UserData = {
    username: req.body.username,
    password: req.body.password,
    infoname: req.body.infoname,
    level: 1
  }

  UserModel.findOne({
    username: UserData.username,
    password: UserData.password
  }, function (err, data) {
    if (err) throw err
    if (data) {
      res.send({ code: 200, data: { username: data.username, infoname: data.infoname, level: data.level, id: data._id, themeColor: data.themeColor, layout: data.layout }, msg: "登录成功" });
    } else {
      res.send({ code: 201, data: {}, msg: "账号或密码错误" });
    }
  })
});

module.exports = router;
