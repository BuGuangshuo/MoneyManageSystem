var express = require('express');
var router = express.Router();
var { GroupModel } = require("../models")

router.post('/', function (req, res) {
    const { groupId } = req.body;
    if(!groupId) {
        GroupModel.find({}, function (err, data) {
            if (err) throw err;
            if(data) {
                res.send({ code: 200, data, msg: "success" });
            }
          })
    } else {
        GroupModel.findOne({ groupId, isPublic: 'public' }, function (err, data) {
            if (err) throw err;
            if(data) {
                res.send({ code: 200, data, msg: "success" });
            } else {
                res.send({ code: 201, data: null, msg: "未检索到团队" });
            }
          })
    }
    
})

module.exports = router;
