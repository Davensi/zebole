const userContro = {}
const md5 = require('md5');
const { passwode_salt } = require('../config/config')
const path = require('path');
const rows = require('../model/rowsContro');
const cookie = require('cookie-parser')
const fs = require('fs');
const query = require('../model/sqlControl');
const viewPath = require('../model/viewPath')
const templateViews = require('../model/template');
const { log } = require('console');
// 返回登录页
userContro.login = (req, res) => {
       res.sendFile(viewPath('login.html', path))

};
// 登录 校验 接口
userContro.upLogin = async (req, res) => {

       let { username, password } = req.body;
       password = md5(password, passwode_salt)

       const sqlStr = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
       let data = await query(sqlStr);
       
      
      
       if (data.length === 0) {
              res.json({
                     err: 0,
                     msg: "账号密码错误请重试"
              })
       } else {
              let { id, avatar } = data[0];
              req.session.userInfo = req.body;
              userInfo = req.session.userInfo;
              // 查询 user 表中 与 信息 关联的 表 并 返回
              let sql = `SELECT t1.avatar,t2.*	from users as t1 LEFT JOIN user_relevancy as t2 on   t1.avatar=${avatar}	 = t2.avatar_id  `;

              let dataS = await query(sql);
              dataS = dataS[0]
              // res.redirect('/');
              res.json({
                     err: 1,
                     msg: "user",
                     dataS
              })
       };

};

// cookie 退出登录 
userContro.outLog = async (req, res) => {
       console.log('退出登录');
       res.cookie('userInfo', '')
       // 销毁当前session
       req.session.destroy(function (err) {
              if (err) {
                     throw err;
              }
       })

       res.send('ok')
}
// 修改 用户 信息 submitUserText
userContro.eaitUserText = async (req, res) => {
//       
       let imgSrc;
       // 上一级 路径
       const imgDirname = `${path.dirname(__dirname)}`;
       // 头像 所在 的 路径
       const imgPath = `/static/harder/`;
       // 各项 参数
       let { pic, _content, _name, _sex, avatar, newPic } = req.body;
       // 判断 是否 上传 了 新文件 
       if (newPic !== pic) {
             
              // console.log(newPic, 'newPic');
              // console.log('没传');
              // 所需 操作文件 参数 
              let { originalname, filename, destination } = req.file;
              // 重命名文件
              fs.rename(path.join(`${imgDirname}${imgPath}${filename}`), path.join(`${imgDirname}${imgPath}${originalname}`), (err) => {
                     if (err) console.log(err, 'on');
                     console.log('ok');
              });
              // 删除 原来的 图片
              console.log(path.join(`${imgDirname}/${pic}`,'路径'));
              fs.unlink(path.join(`${imgDirname}/${pic}`), (err, data) => {
                     if (err) throw err;
                     
                     log('删除成功')
                 })
                 pic = newPic;

       }
       // path.join(`${__dirname}/data/img/${filename}`)
       // 判断是否 更改了图片
       console.log('avatar_id',avatar);
       const sqlStr = `UPDATE user_relevancy set pic = '${pic}', intro = '${_content}', name = '${_name}',sex = ${_sex} WHERE  avatar_id = ${avatar}`;
       let data = await query(sqlStr); 
       // 重新 查询 表 设置 cookie
       let sql = ` SELECT t1.avatar,t2.*	from users as t1 LEFT JOIN user_relevancy as t2 on t1.avatar = ${avatar} = t2.avatar_id  limit  1`;
       console.log(sql,'sql');
       let dataS = await query(sql);
       console.log(dataS,'dataS更新为');
       res.cookie('userInfo',JSON.stringify(dataS[0]), { expires: new Date(Date.now() + 8 * 2 * 3600000), path: '/' })
       res.send('yes')
}

// 修改密码  editPassword editPasswordView
userContro.editPasswordView = async (req, res) => {
       res.sendFile(viewPath('editPasswordView.html', path))
}
module.exports = userContro;