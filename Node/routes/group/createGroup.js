var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { GroupModel } = require("../models")

/* 注册接口 */
router.post('/', function (req, res) {
    const { groupName, groupId, isPublic, imageUrl, memo, createUserName } = req.body;
    // 保存到团队数据库
    GroupModel.create({ groupName, groupId, isPublic, imageUrl, memo, createUserName, memberCount: 1, createTime: Date.now() }, function (err, data) {
    if (err) throw err;
    res.send({ code: 200, data, msg: "success" });
  })
})

module.exports = router;
