/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-05 11:17:15
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-08 16:38:01
 * @FilePath: \MoneyNode\routes\member\getMember.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { MemberModel, UserInfo, GroupModel, Approve } = require("../models")

router.post('/', function (req, res) {
    const { username } = req.body;
    
    MemberModel.findOne({ userName: username }, function (err, data) {
    if (err) throw err;
    if(data) {
        UserInfo.findOne({ userName: username }, function (err, data2) {
            if (err) throw err;
                if(data2) {
                    GroupModel.findOne({ groupName: data.groupName }, function (err, data3) {
                        if(data3) {
                            Approve.find({ groupId: data3.groupId, approveStatus: 'FINISH' }, function (err, data4) {
                                res.send({ code: 200, data: { groupInfo: { member: data, group: data3, groupMemberList: data4 }, userInfo: data2 }, msg: "sucess" });
                            })
                        } else {
                            res.send({ code: 201, data: { groupInfo: null, userInfo: data2 }, msg: "暂无团队" });
                        }   
                    })        
                } else {
                    res.send({ code: 201, data2, msg: "暂无用户信息" });
                }
          });        
    } else {
        res.send({ code: 201, data: null, msg: "成员不存在" });
    }
  })
})

module.exports = router;