/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-07 16:12:03
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-13 10:28:01
 * @FilePath: \MoneyNode\routes\userInfo\saveUserInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { UserInfo } = require("../models")

/* 保存用户信息接口 */
router.post('/', function (req, res) {
    const { params } = req.body;
    const { step1, step2, step3, step4, username, infoname} = params;

    UserInfo.create({ userName: username, infoName: infoname, privinceData: step1.privinceData, secondCity: step1.secondCity, status: step2.status, salary: Number(step4.salary), career: step3.career, avaterSrc: null }, function (err, data) {
    if (err) throw err;
    res.send({ code: 200, data, msg: "保存成功" });
  })
})

module.exports = router;