var express = require('express');
var router = express.Router();

var { Approve } = require("../models")

/* GET users listing. */
router.post('/', async function (req, res) {
    const pageNum = Number(req.body.page);   // 第几页的数据
    const pageSize = Number(req.body.size);   // 一页显示几条数据
    const sortType = req.body.sorts[0].propetryName;
    const direction = req.body.sorts[0].direction;
    const search = req.body.search || [];

    let filter = {};
    let sortDirection = direction === 'desc' ? `-${sortType}` : sortType

    if(search) {
        if(search.length) {
            search.forEach(item => {
                if(item.value) {
                    if (item.operator === 'IN') {
                        filter[item.propetryName] = { '$in': item.value }
                    } else if(item.operator === 'LIKE') {
                        let regex = new RegExp(item.value, 'i');
                        
                        filter = {$or: [
                            { infoName: { $regex: regex} },
                            { userName: { $regex: regex} },
                            { career: { $regex: regex} },
                        ]}
                    } else if(item.operator === 'BETWEEN') {
                        filter[item.propetryName] = { '$gte': item.value[0], '$lte': item.value[1] }
                    } else {
                        filter[item.propetryName] = item.value
                    }
                }
            })
        }
    } else {
        res.send({code: 500, message: '参数不能为空'})
    }

    const total = await Approve.find(filter).countDocuments();
    const list = await Approve.find(filter).skip((pageNum-1)*pageSize).limit(pageSize).sort(sortDirection);

    if(list){
        res.json({
        code: 200,
        data:{ result: list, total },
        msg: 'ok'
        })
    }
    });

module.exports = router;