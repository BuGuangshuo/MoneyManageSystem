/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-07 16:12:03
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-13 10:28:01
 * @FilePath: \MoneyNode\routes\userInfo\editUserInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { UserInfo, Approve } = require("../models")

/* 保存用户信息接口 */
router.post('/', function (req, res) {
    const { userName, infoName, privinceData, secondCity, career, status, salary, avaterSrc, avaterSrcOnly } = req.body;

    if(userName) {
        if(!avaterSrcOnly) {
            UserInfo.findOneAndUpdate({ userName }, {
                $set: {
                    infoName,
                    privinceData,
                    secondCity,
                    career,
                    status,
                    salary: Number(salary),
                    avaterSrc
                }
            }, { new: true }, function (err, data) {
                if (err) throw err;
                res.send({ code: 200, data, msg: "保存成功" });
              })
        } else {
            UserInfo.findOneAndUpdate({ userName }, {
                $set: {
                    avaterSrc
                }
            }, { new: true }, function (err, data) {
                if (err) throw err;
                if(data) {
                    Approve.findOneAndUpdate({ userName }, {
                        $set: {
                            avaterSrc
                        }
                    }, { new: true }, function (err, data2) {
                        if (err) throw err;
                        res.send({ code: 200, data, msg: "保存成功" });
                      })
                }
               
              });
        }
        
    } else {
        res.send({ code: 402, msg: "缺少用户标识" });
    }
})

module.exports = router;