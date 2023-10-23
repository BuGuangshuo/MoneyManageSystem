var express = require("express");
var router = express.Router();
var { Target } = require("../models");

/* 注册接口 */
router.post("/", function (req, res) {
  const {
    targetName,
    amountVal,
    dateValue,
    timeType,
    editType,
    createUserName,
  } = req.body;
  // 保存到团队数据库
  Target.create(
    {
      targetName,
      amountVal,
      dateValue,
      currentCount: 0,
      timeType,
      editType,
      createUserName,
      createTime: Date.now(),
      updateTime: Date.now(),
    },
    function (err, data) {
      if (err) throw err;
      res.send({ code: 200, data, msg: "success" });
    }
  );
});

module.exports = router;
