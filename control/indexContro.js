
const path = require('path');
const rows = require('../model/rowsContro');
const fs = require('fs');

const indexContro = {};
// 摸版配置
const templateViews = require('../model/template');
let userInfo;
const query = require('../model/sqlControl');
const { log } = require('console');

const viewPath = _path => path.join(path.dirname(__dirname), '/views/', _path);

console.log(viewPath('index.html'));

// 首页
indexContro.index = (req, res) => {
       templateViews(res,'index.html')
}
// 登录页
 
// article 列表页
indexContro.article = (req, res) => {
       // res.render(('articleList.html'))
       templateViews(res,'articleList.html')
}
// 跳转后台管理页

// addArticle 添加分类
indexContro.addArticle = async (req, res) => {
       // res.render(('addArticle.html'))
       templateViews(res,'addArticle.html')
}
// upArticle 添加 文章分类 sql

 

// 获取 bookList 数据
indexContro.articleList = async (req, res) => {
       const sqlStr = `SELECT * FROM article  WHERE status = 0`;
       let data = await query(sqlStr);
       let obj = {
              data,
              "code": 0,
              "msg": "",
              "count": data.length,
       }
       res.json(obj)
}
//   验证是否翻墙的路由
// session
indexContro.isUsers = (req, res, next) => {
       if (req.session.userInfo !== '') {
              next();
       } else {
              res.redirect('/login');
       }
}
// 分类修页

module.exports = indexContro;