/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:48:51
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-05 11:16:36
 * @FilePath: \MoneyNode\routes\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { UserModel, MemberModel } = require("./models")

/* 注册接口 */
router.post('/', function (req, res) {
  const UserData = {
    username: req.body.username,
    password: req.body.password,
    infoname: req.body.infoname,
    level: 1
  }
  
  UserModel.findOne({ username: UserData.username }, function (err, data) {
    if (data) {
      res.send({ code: 201, data: {}, msg: "该用户已注册" });
    } else {
      UserModel.findOne({ infoname: UserData.infoname }, function (err, data) {
        if (data) {
          res.send({ code: 201, data: {}, msg: "昵称已被占用" });
        } else {
          // 保存到数据库
          UserModel.create({username: UserData.username,password: crypto.createHash('SHA256').update(UserData.password).digest('hex'),infoname: UserData.infoname,level: UserData.level, createTime: Date.now(), themeColor: '#536DFE', layout: 'left'}, function (err, data) {
            if (err) throw err;
            res.send({ code: 200, data: {}, msg: "success" });
          })
        }
      })
    }
  })
})

module.exports = router;
