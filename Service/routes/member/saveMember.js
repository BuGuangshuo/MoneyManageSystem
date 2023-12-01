/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-07 17:57:28
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-08 10:06:50
 * @FilePath: \MoneyNode\routes\member\saveMember.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { MemberModel } = require("../models")

/* 保存用户信息接口 */
router.post('/', function (req, res) {
    const { userName, infoName, groupName, groupId } = req.body;

    MemberModel.create({ userName, infoName, groupName, groupId }, function (err, data) {
    if (err) throw err;
    res.send({ code: 200, data, msg: "保存成功" });
  })
})

module.exports = router;