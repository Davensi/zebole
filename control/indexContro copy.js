
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
indexContro.login = (req, res) => {
       res.sendFile(viewPath('login.html'))
      
};
// article 列表页
indexContro.article = (req, res) => {
       // res.render(('articleList.html'))
       templateViews(res,'articleList.html')
}
// 跳转后台管理页
indexContro.upLogin = async (req, res) => {
       log(req.body, 'body');
       let { username, password } = req.body;
       log('跳转');
       const sqlStr = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
       let data = await query(sqlStr);
       log(data, 'data')
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

// addArticle 添加分类
indexContro.addArticle = async (req, res) => {
       // res.render(('addArticle.html'))
       templateViews(res,'addArticle.html')
}
// upArticle 添加 文章分类 sql
indexContro.upArticle = async (req, res) => {
       let { title, status, orderBy } = req.body;
       log(req.body, 'body')
       const sqlStr = `insert into category (cate_name,status,orderBy)  values ('${title}',${status},${orderBy})`;
       let data = await query(sqlStr);


       res.json({ code: 0 })
}
// 获取数据 分类页
indexContro.getCategory = async (req, res) => {
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
// 删除 分类页 数据 
indexContro.DelCategory = async (req, res) => {

       log(req.query, 'res.query')
       let { id } = req.query;
       const sqlStr = `UPDATE category SET status = 1  WHERE cate_id = ${id}`;
       let data = await query(sqlStr);
       log(data, 'data')
       rows(data, res)
}
// alterCate 更改 分类 值
indexContro.alterCate = async (req, res) => {
       let { cate_id, value } = req.query;
       const sqlStr = `UPDATE category SET cate_name = '${value}'  WHERE cate_id = ${cate_id}`;
       let data = await query(sqlStr);
       log(data, 'data')
       // 判断 操作 是否成功
       rows(data, res)

}
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
indexContro.categoryAlter = async (req, res) => {
       
       templateViews(res,'categoryAlter.html')
       
};
module.exports = indexContro;