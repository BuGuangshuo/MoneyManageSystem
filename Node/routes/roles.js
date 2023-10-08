/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:48:51
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-09 14:41:01
 * @FilePath: \MoneyNode\routes\roles.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

var { UserModel, GroupModel } = require("./models")

router.get('/', function(req, res, next) {
  const username = req.query.user
  UserModel.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "level",
        foreignField: "role_type",
        as: 'roles'
      }
    },{ $match: { username } }
  ],(err,docs)=>{
    if (err) throw err;
    GroupModel.findOne({ createUserName: username }, (err, data) => {

      if(!data) {
        let menuList = [];
        if(docs.length) {
          menuList = { ...docs[0].roles[0], menu: docs[0].roles[0].menu.filter(item => item !== '/groupManage/approveManage')}
        }
        res.send({code: 200, data: menuList, msg: "ok2"})
      } else {
        res.send({code: 200, data: docs.length ? docs[0].roles[0] : [], msg: "ok"})
      }
    })
  })
});

module.exports = router;
