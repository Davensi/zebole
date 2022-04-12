
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
    let { cate_id: val } = req.query;
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
    let { limit, page } = req.query;
    const pageS = (page - 1) * limit;
    // SELECT count(*) FROM users  
    // 分页 算法 当前 页 -1 除以 页总数
    /*
        1 -1 = 0  0 * 2 = 0 
        2 - 1 = 1 1 * 2 = 2
    */
    // SELECT count(*) FROM users
    const sql1 = `SELECT count(*) FROM category`;
    let data2 = await query(sql1);
    let count =data2[0]['count(*)'];
    const sql2 = `SELECT * FROM category WHERE status = 0 limit ${pageS},${limit}`;
    // const sql2 = ``
    let data = await query(sql2);
    if (data) {

    }
    // console.log(data,count,'数据');
    let obj = {
        count,
        data,
        "code": 0,
        "msg": "",

    }
    res.json(obj)
}
// 分类 首页 
cateContro.categoryAlter = async (req, res) => {

    templateViews(res, 'categoryAlter.html')

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

// addArticle 添加分类页
cateContro.addArticle = async (req, res) => {
    // res.render(('addArticle.html'))
    templateViews(res, 'addArticle.html')
}
// cateContro
module.exports = cateContro;