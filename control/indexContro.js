
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

       let imgPath  = path.dirname(__dirname);
       let { id,pic} = req.query;
       
       if(pic){
              console.log('删除 一个 对 应 的文件');
              fs.unlink(path.join(imgPath,pic),(err)=>{
                     if(err) throw err;
                     console.log('删除成功·。。。。');
              })
              console.log(path.join(imgPath,pic),'path');
       }

       //  console.log('删除',id);
       let sql = `DELETE FROM article WHERE article.id = ${id}`;
       let data = await query(sql);
       // 等待处理 sql 语句
       res.send('yes')
}

//  修改 文章 接口
indexContro.editArticleData = async (req, res) => {

       let { add_date, author, cate_id, content, pic, status, title, alter_id, imgSrc } = req.body;

       console.log(req.body);
       // 等待处理 sql 语句
       // 判断是否 更改了图片
       // if (req.files) {
       //        console.log('传了');
       //        let { originalname, filename, destination } = req.files;
       //        // 重命名文件
       //        fs.rename(path.join(`${imgDirname}/${filename}`), path.join(`${imgDirname}/${originalname}`), (err) => {
       //               if (err) console.log(err, 'on');
       //               console.log('ok');
       //        });
       // }
       // console.log(imgSrc, 'imgSrc');

       res.send('yes')
}

// 获取 rticle 数据 && 搜索
indexContro.getArticle = async (req, res) => {

       let { limit, page, id, keyWord } = req.query;
       const pageS = (page - 1) * limit;


       let sql1 = `SELECT count(*) FROM article `;

       let sqlStr = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 left JOIN category t2 on t1.cate_id = t2.cate_id
       left JOIN users t3 ON t1.cate_id = t3.avatar 
        order by t1.id desc limit ${pageS},${limit}`;
       // 带 查询 的 sql 语句 
       let sachet = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 left JOIN category t2 on t1.cate_id = t2.cate_id
       left JOIN users t3 ON t1.cate_id = t3.avatar
       where t1.title like '%${keyWord}%'  order by t1.id desc limit ${pageS},${limit}`;
       if (keyWord) {
              console.log('我在搜索');
              // where t1.title like '${sachet}' 
              // sachet = `where t1.title like '%${sachet}%' `
              sql1 += ` where article.title like '%${keyWord}%' `;

              sqlStr = sachet;
       };
       let data2 = await query(sql1);
       let count = data2[0]['count(*)'];
       console.log(count, '总数');

       if (req.query?.id) {
              sqlStr = `SELECT * FROM article where id = ${req.query.id}`;
       }

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
indexContro.isUsers = (req, res, next) => {
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

// 统计文章的 总数  addUpcate
indexContro.addUpcate = async (req, res, next) => {
       // 将 数据 处理 返回
       let sql = ` SELECT t2.cate_name,count(t1.id)  from article t1 LEFT JOIN category t2 ON t1.cate_id = t2.cate_id GROUP BY t2.cate_name ORDER BY  count(t1.id) desc`;
       let data = await query(sql);
       console.log(data, 'data');
       res.send(data)
}
// 添加 文章 页面 
indexContro.addArticle = async (req, res) => {
       templateViews(res, 'addArticle.html')

}
// 添加 文章 接口
indexContro.addArticleData = async (req, res) => {
       const imgPath = `/static/arti/`;
       const imgDirname = `${path.dirname(__dirname)}`;
       let { title, cate_id, avatar, add_date, content, status } = req.body;
       if (req.body?.status) {
              status = 0;
       } else {
              status = 1;
       }
       console.log(status, ' status');
       let pic = ''
       if (req.file) {
              let { originalname, filename, destination } = req.file;
              // 重命名文件

              fs.rename(path.join(`${imgDirname}${imgPath}${filename}`), path.join(`${imgDirname}${imgPath}${originalname}`), (err) => {
                     if (err) console.log(err, 'on');
                     console.log('ok');

              });

              pic = imgPath + originalname;
              console.log(pic, 'pic');

       }


       let sql = `insert into article (title,cate_id,status,content,add_date,author,pic)  values('${title}','${cate_id}','${status}','${content}','${add_date}','${avatar}','${pic}')`;

       let data = await query(sql);
       rows(data, res)

}




module.exports = indexContro;