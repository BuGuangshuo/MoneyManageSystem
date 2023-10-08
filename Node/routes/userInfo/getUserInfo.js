/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-07 16:15:51
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-07 18:30:37
 * @FilePath: \MoneyNode\routes\userInfo\getUserInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { UserInfo } = require("../models")

/* 获取用户信息接口 */
router.post('/', function (req, res) {
    const { username } = req.body;

    UserInfo.findOne({ userName: username }, function (err, data) {
    if (err) throw err;
    if(data) {
        res.send({ code: 200, data, msg: "" });
    } else {
        res.send({ code: 201, data, msg: "暂无用户信息" });
    }
  })
})

module.exports = router;
