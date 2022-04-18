let homeContro = {};

const { log } = require('console');
const path = require('path');


const query = require('../model/sqlControl');

const homeLocal = 'http://127.0.0.1:4000'

// 获取 所有 数据
homeContro.getAite = async (req, res) => {
    log('获取所有数据');
    let { limit = 1, page = 1 } = req.query;
    const pageS = (page - 1) * limit;
    let sqlStr = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 left JOIN category t2 on t1.cate_id = t2.cate_id
       left JOIN users t3 ON t1.cate_id = t3.avatar   WHERE t1.status = 1
        order by t1.id desc limit ${pageS},${limit}`;

    let data = await query(sqlStr);

    console.log(data, 'data');
    res.json({
        data,
        homeLocal
    })

}
// 获取 所有 分类 内容
homeContro.getCategoby = async (req, res) => {
    log('所有分类');
    let { cate_id, limit = 2, page = 1 } = req.query;
    log(limit, page, 'll')
    log(req.query, 'query')
    const pageS = (page - 1) * limit;
    console.log(cate_id, 'id');
    let sql = `SELECT  t1.*,t2.cate_name FROM article t1 LEFT JOIN category t2 ON t1.cate_id = t2.cate_id  WHERE t2.cate_id= ${cate_id} 
    limit ${pageS},${limit}
    `
    let data = await query(sql);
    console.log(data, 'dataaa');

    res.json({
        data,
        homeLocal
    })
}
// 获取 指定 内容
homeContro.geTitemAite = async (req, res) => {
    log('详情页');
    let { id } = req.query;
    id = parseInt(id);
    console.log(id, 'id');
    let sqlStr = `SELECT
	t1.*, t2.cate_name,
	t3.username
FROM
	article t1
LEFT JOIN category t2 ON t1.cate_id = t2.cate_id
LEFT JOIN users t3 ON t1.cate_id = t3.avatar
WHERE
	t1.id = ${id}`;

    let data = await query(sqlStr);

    res.json({
        data,
        homeLocal
    })
}

// SELECT cate_id,cate_name FROM category 
// 获取 所有 的 分类 标签
homeContro.getcateTag = async (req, res) => {
    log('查数据');
    let { id } = req.query;
    id = parseInt(id);
    console.log(id, 'id');
    let sqlStr = `SELECT cate_id,cate_name FROM category`;

    let data = await query(sqlStr);
    data.homeLocal = homeLocal;
    res.json(data)
}
module.exports = homeContro;