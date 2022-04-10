const loginContro = {}

const path = require('path');
const rows = require('../model/rowsContro');
const fs = require('fs');
const query = require('../model/sqlControl');
const viewPath = require('../model/viewPath')
const templateViews = require('../model/template');
// 返回登录页
loginContro.login = (req, res) => {
    res.sendFile(viewPath('login.html',path))
   
};
// 登录 校验 接口
loginContro.upLogin = async (req, res) => {
    
    let { username, password } = req.body;
     
    const sqlStr = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    let data = await query(sqlStr);
   
    if (data.length === 0) {
           res.json({
                  err: 0,
                  msg: "账号密码错误请重试"
           })
    } else {

           req.session.userInfo = req.body;
           userInfo = req.session.userInfo;
           // res.redirect('/');
           res.json({
                  err: 1,
                  msg: "user"
           })
    };

};
module.exports = loginContro;