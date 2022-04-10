
let cateContro = {};
 
const path = require('path');
const rows = require('../model/rowsContro');
const fs = require('fs');
const query = require('../model/sqlControl');
const viewPath = require('../model/viewPath')
const templateViews = require('../model/template');
const { log } = require('console');

// 搜索 接口
cateContro.inCate = async (req, res) => {
    console.log('查询', req.query);
    let { cate_id:val } = req.query;
    // 模糊 查询 表中 所有 字段
    let sqlStr = ` select * FROM category WHERE CONCAT(cate_id,cate_name,orderBy) LIKE '%${val}%' LIMIT 10`;
    // const sqlStr = `SELECT * FROM category WHERE cate_id = ${cate_id}`;
    let data = await query(sqlStr);
    // console.log(data);
    
    res.json({
        data,
        code: 0,
        msg: "ok",
        count: data.length,
    })
}
// 删除 分类页数据 接口
cateContro.DelCategory = async (req, res) => {

    log(req.query, 'res.query')
    let { id } = req.query;
    const sqlStr = `UPDATE category SET status = 1  WHERE cate_id = ${id}`;
    let data = await query(sqlStr);
    log(data, 'data')
    rows(data, res)
}
// 获取分类页数据
cateContro.getCategory = async (req, res) => {
    const sqlStr = `SELECT * FROM category WHERE status = 0`;
    let data = await query(sqlStr);

    if (data) {

    }
    let obj = {
           data,
           "code": 0,
           "msg": "",
           "count": data.length,
    }
    res.json(obj)
}
// 分类 首页 
cateContro.categoryAlter = async (req, res) => {
       
    templateViews(res,'categoryAlter.html')
    
};
// 修改 分类 文章 接口
cateContro.alterCate = async (req, res) => {
    let { cate_id, value } = req.query;
    const sqlStr = `UPDATE category SET cate_name = '${value}'  WHERE cate_id = ${cate_id}`;
    let data = await query(sqlStr);
    
    // 判断 操作 是否成功
    rows(data, res)

}
// 添加 分类接口
cateContro.upCate = async (req, res) => {
    let { title, status, orderBy } = req.body;
     
    const sqlStr = `insert into category (cate_name,status,orderBy)  values ('${title}',${status},${orderBy})`;
    let data = await query(sqlStr);


    res.json({ code: 0 })
}
// cateContro
module.exports = cateContro;