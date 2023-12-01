var express = require('express');
var router = express.Router();

var { UserModel } = require("../models")

/* GET users listing. */
router.post('/', async function (req, res) {
    const pageNum = Number(req.body.page);   // 第几页的数据
    const pageSize = Number(req.body.size);   // 一页显示几条数据
    const sortType = req.body.sorts[0].propetryName;
    const direction = req.body.sorts[0].direction;
    const getDayStartTime = Math.floor(new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime())
    const getDayEndTime = Math.floor(new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime() + 24 * 60 * 60 * 1000 - 1)

    let sortDirection = direction === 'desc' ? `-${sortType}` : sortType

    const total = await UserModel.find({}).countDocuments();
    const list = await UserModel.find({}).skip((pageNum-1)*pageSize).limit(pageSize).sort(sortDirection);

    const todayUserCount = await UserModel.find({}).where('createTime').gt(getDayStartTime).lt(getDayEndTime)

    if(list){
        res.json({
        code: 200,
        data:{ result: list, total, todayUserCount: todayUserCount.length },
        msg: 'ok'
        })
    }
    });

module.exports = router;