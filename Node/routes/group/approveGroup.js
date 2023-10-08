/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-08 15:02:06
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-13 14:09:29
 * @FilePath: \MoneyNode\routes\group\approveGroup.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var { Approve, UserInfo, MemberModel, GroupModel } = require("../models")

/* 注册接口 */
router.post('/', function (req, res) {
    const { userName, approveStatus, approveUser, rejectText = null } = req.body;

    if(approveStatus === 'RUNNING') {
        Approve.findOne({ userName }, (err, data) => {
            if(data) {
                res.send({ code: 201, data, msg: "此团队已申请" });
            } else {
                UserInfo.findOne({ userName }, function (err, data2) {
                    if (err) throw err;
                    if(data2) {
                        GroupModel.findOne({ createUserName: approveUser }, function (err, data3) {
                            if (err) throw err;
                            if(data3) {
                                Approve.create({ userName, createTime: Date.now(), approveTime: null, approveStatus, approveUser, infoName: data2.infoName, privinceData: data2.privinceData, secondCity: data2.secondCity, status: data2.status, career: data2.career, salary: Number(data2.salary), avaterSrc: data2.avaterSrc, groupId: data3.groupId, groupName: data3.groupName }, function (err, data3) {
                                    if (err) throw err;
                                    res.send({ code: 200, data: data3, msg: "申请成功" });
                                })
                            }
                          })
                        
                    } else {
                        res.send({ code: 201, data, msg: "暂无用户信息" });
                    }
                  })
                
            }
        })
    } else {
        Approve.findOneAndUpdate({userName}, { 
            $set: {
                approveStatus: approveStatus,
                rejectText,
                approveTime: Date.now()
            }
         }, { new: true }, function (err, data) {
            if (err) throw err;
            if(approveStatus === 'FINISH') {
                MemberModel.create({ userName, infoName: data.infoName, groupName: data.groupName, groupId: data.groupId }, function (err, data2) {
                    if (err) throw err;
                });
                GroupModel.findOne({ createUserName: approveUser }, function (err, data3) {
                    if (err) throw err;
                    GroupModel.updateOne({ createUserName: approveUser }, { memberCount: data3.memberCount + 1}, function (err, data2) {
                        if (err) throw err;
                        
                    })
                })
            }
            res.send({ code: 200, data, msg: "update Sucess" });
        })
    }
    
})

module.exports = router;
