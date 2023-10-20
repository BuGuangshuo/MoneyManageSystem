var express = require("express");
var router = express.Router();

var { Target } = require("../models");

/* GET users listing. */
router.post("/", async function (req, res) {
  const list = await Target.find({}).sort("updateTime");

  if (list) {
    res.json({
      code: 200,
      data: { result: list },
      msg: "ok",
    });
  }
});

module.exports = router;
