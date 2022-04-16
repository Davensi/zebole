const path = require('path');
const rows = require('../model/rowsContro');
const fs = require('fs');
const query = require('../model/sqlControl');

const templateViews = require('../model/template');
const { log } = require('console');

const systemContro = {};

// 返回 配置页
systemContro.system = (req, res) => {
    console.log('修改页11');
    templateViews(res, 'system.html')
}
// 获取 配置页 数据
systemContro.getSystem = async (req, res) => {
    const sqlStr = `SELECT * FROM system`;
    let data = await query(sqlStr);

    // log(data, 'data')

    let obj = {
        data,
        "code": 0,
        "msg": "",
        "count": data.length,
    }
    res.json(obj)
}
// alterSys
// 修改 配置
systemContro.alterSys = async (req, res) => {
    let { id, name, val } = req.query;
    console.log(id, 'id');
    console.log(name, 'name');
    const sqlStr = `UPDATE system set name = '${name}',val = '${val}' WHERE id = ${id}`;
    let data = await query(sqlStr);
    log(req.query, 'data')
    // 判断 操作 是否成功
    rows(data, res)
}
// addSystem 添加 一个配置
systemContro.addSystem = async (req, res) => {
    templateViews(res, 'addSystem.html')
}

// 添加数据
systemContro.upSystem = async (req, res) => {
    let { name, val } = req.body;
    if (name.length === 0) {
        name = 'a' + Date.now();
    }
    const sqlStr = `insert into system (name,val)  values ('${name}','${name}')`;
    let data = await query(sqlStr);


    res.json({ code: 0 })
}
// DelSys 删除 一个 tex 配置
systemContro.DelSystem = async (req, res) => {
    console.log('删除');
    let { id } = req.query;

    const sqlStr = ` delete from system where id = ${id}`;
    let data = await query(sqlStr);
    log(data, 'data')
    rows(data, res)

}

// 搜索 查询 配置 接口 
systemContro.inSystem = async (req, res) => {
    let { id, name, val, limit } = req.query;

    let sqlStr = ` select * FROM system WHERE CONCAT(id,name,val) LIKE '%${val}%' LIMIT 10`;
    let data = await query(sqlStr);
    // console.log(data);
    console.log(req.query, '查询配置');

    res.json({
        data,
        code: 0,
        msg: "ok",
        count: 1,
    })



}
// log 修改页
systemContro.logDdit = async (req, res) => {


}
// log 修改 接口 
systemContro.logDditPic = async (req, res) => {
    const imgPath = `/static/logPic/`;
    const imgDirname = `${path.dirname(__dirname)}`;

    let { originalname, filename, destination } = req.file;
    // 重命名文件

    fs.rename(path.join(`${imgDirname}${imgPath}${filename}`), path.join(`${imgDirname}${imgPath}${originalname}`), (err) => {
        if (err) console.log(err, 'on');
        console.log('ok');

    });
    pic = imgPath + originalname;
    console.log(pic, 'pic');
    const sqlStr = `UPDATE system set  val = '${pic}' WHERE name = 'pic'`;
    let data = await query(sqlStr);
    log(req.query, 'data')
    // 判断 操作 是否成功
    rows(data, res)

}
module.exports = systemContro;