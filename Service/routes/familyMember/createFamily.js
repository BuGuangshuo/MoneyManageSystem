var express = require('express');
var router = express.Router();
var { FamilyModel } = require("../models")

/* 注册接口 */
router.post('/', function (req, res) {
  const UserData = {
    userId: req.body.userId,
    familyName: req.body.familyName
  }
  
  FamilyModel.findOne({ owerId: UserData.userId }, function (err, data) {
    if (data) {
      res.send({ code: 201, data: {}, msg: "您已经拥有一个家庭" });
      return
    } else {
      // 保存到数据库
      const result = { owerId: UserData.userId, familyName: UserData.familyName, createTime: Date.now(), updateTime: Date.now() }
      FamilyModel.create(result, function (err, data) {
        if (err) throw err;
        res.send({ code: 200, data: result, msg: "success" });
      })
    }
  })
})

module.exports = router;
