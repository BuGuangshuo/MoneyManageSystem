var express = require('express');
var router = express.Router();
let ObjectId = require('mongodb').ObjectId;

var { UserModel } = require("../models")

/* GET users listing. */
router.post('/', async function (req, res) {
    const userId = req.body.id
    const _userId = ObjectId(userId);

    const result = await UserModel.deleteOne({"_id": _userId})

    if(result){
        res.json({
        code: 200,
        data:{ userId },
        msg: 'delete success'
        })
    } else {
        res.send({code: 100, msg: 'delete failed'})
    }
    });

module.exports = router;