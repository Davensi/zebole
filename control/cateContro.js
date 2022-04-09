
let cateContro = {};
const query = require('../model/sqlControl');
// castCat
cateContro.inCate = async (req, res) => {
    console.log('查询', req.query);
    let { cate_id } = req.query;
    const sqlStr = `SELECT * FROM category WHERE cate_id = ${cate_id}`;
    let data = await query(sqlStr);
    console.log(data);
    
    res.json({
        data,
        code: 0,
        msg: "ok",
        count: 1,
    })
}
module.exports = cateContro;