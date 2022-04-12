
const query = require('../model/sqlControl')
async function templateViews(res, _path, data) {
    let sql = 'SELECT * FROM system';
    let bear = await query(sql);
    let obj = {}
    // 加工 数据 得到 完整对象
    bear.forEach((item, i) => {
        let { name, val } = item;
        // console.log(name);
        obj[name] = val;

    });
     
    setTimeout(()=>{
        res.render(_path,obj)
    },10)
    
}

module.exports = templateViews;