
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
       templateViews(res, 'index.html')
}

// article  列表页
indexContro.article = (req, res) => {
       // res.render(('articleList.html'))
       templateViews(res, 'articleList.html')
}
indexContro.editArticle = (req, res) => {
       // res.render(('articleList.html'))
       templateViews(res, 'editArticle.html')
}

// 删除 文章接口
indexContro.DelArticle = async (req, res) => {

       let { id } = req.query;
       //  console.log('删除',id);
       // 等待处理 sql 语句
       res.send('yes')
}

//  修改 文章 接口
indexContro.alterArticle = async (req, res) => {

       let { add_date, author, cate_id, content, pic, status, title, alter_id, imgSrc } = req.body;

       // 等待处理 sql 语句
       // 判断是否 更改了图片
       if (req.files) {
              console.log('传了');
              let { originalname, filename, destination } = req.files;
              // 重命名文件
              fs.rename(path.join(`${imgDirname}/${filename}`), path.join(`${imgDirname}/${originalname}`), (err) => {
                     if (err) console.log(err, 'on');
                     console.log('ok');
              });
       }
       console.log(imgSrc, 'imgSrc');
       
       res.send('yes')
}

// 获取 rticle 数据
indexContro.getArticle = async (req, res) => {

       let { limit, page } = req.query;
       const pageS = (page - 1) * limit;
       // SELECT t1.*,t2.cate_name	from article as t1   LEFT JOIN category as t2  on   t1.cate_id = t2.cate_id
       // let sqlStr = `SELECT * FROM article limit ${pageS},${limit}`;
       // let sqlStr = `SELECT t1.*,t2.cate_name	from article as t1   LEFT JOIN category as t2  on   t1.cate_id = t2.cate_id limit ${pageS},${limit}`
       let sqlStr = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 left JOIN category t2 on t1.cate_id = t2.cate_id left JOIN users t3 ON t1.cate_id = t3.avatar limit ${pageS},${limit}`
       const sql1 = `SELECT count(*) FROM article `;
       let data2 = await query(sql1);
       let count =data2[0]['count(*)'];
       console.log(count,);
       // if (req.query?.id) {
       //        sqlStr = `SELECT * FROM article where id = ${req.query.id}`;
       // }

       let data = await query(sqlStr);
       let obj = {
              count,
              data,
              "code": 0,
              "msg": "",
               
       }
       res.json(obj)
}
//   验证是否翻墙的路由
// session
indexContro.isUsers =  (req, res, next) => {
              // let _path = ['/up-login', '/login'];
              // let { url } = req;
              // log(url, 'path');
              // if (_path.includes(url)) {
              //        //     log('无需验证');
                     next();
              // } else {

              //        if (req.session.userInfo) {
              //               //  log('有凭证')
              //               next();
              //        } else {
              //               res.redirect('/login');
              //        }
              // }



}


module.exports = indexContro;