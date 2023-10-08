/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:48:51
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-26 13:59:40
 * @FilePath: \MoneyNode\routes\register.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { UserModel } = require("../models")
let ObjectId = require('mongodb').ObjectId;

/* 更新设置接口 */
router.post('/', function (req, res) {    
    const settingType = req.body;
    const { type, value, userId } = settingType;
    const _userId = ObjectId(userId);

    UserModel.updateOne({'_id': _userId},{
        [type]: value
    }, function (err, data) {
        if(data) {
            UserModel.findOne({'_id': _userId}, function (err, data) {
                if(data) {
                    res.send({ code: 200, data: { username: data.username, infoname: data.infoname, level: data.level, id: data._id, themeColor: data.themeColor, layout: data.layout }, msg: "sucess" });
                }
            })
        }
    });
  });
  
module.exports = router;