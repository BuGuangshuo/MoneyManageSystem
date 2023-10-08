/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-02 17:40:23
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-09 14:32:44
 * @FilePath: \MoneyNode\routes\group\validate\nameValidate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { GroupModel } = require("../models")

/* 注册接口 */
router.post('/', function (req, res) {
    const { groupName, groupId, type } = req.body;

    if(type === 'groupName') {
        GroupModel.findOne({ groupName }, function (err, data) {
            if (data) {
                res.send({ code: 201, data: {}, msg: "团队名称已存在" });
            } else {
                res.send({ code: 200, data: {}, msg: "" });
            }
      })
    } else if(type === 'groupId') {
        GroupModel.findOne({ groupId }, function (err, data) {
            if (data) {
                res.send({ code: 201, data: {}, msg: "团队号码已存在" });
            } else {
                res.send({ code: 200, data: {}, msg: "" });
            }
      })
    }
    
})

module.exports = router;
