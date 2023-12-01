/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:48:51
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-08 18:02:18
 * @FilePath: \MoneyNode\routes\menu.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

var { MenuModel } = require("./models")

router.get('/', function(req,res) {
  MenuModel.aggregate([
    {
      $lookup: {
        from: "menu_childrens",
        localField: "menu_id",
        foreignField: "parent_id",
        as: 'childrens'
      }
    }
  ],(err,docs)=>{
    if (err) throw err;
    res.send({code: 200, data: docs, msg: "ok"})
  })
});

module.exports = router;
