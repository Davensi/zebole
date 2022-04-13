const userContro = {}
const md5 = require('md5');
const { passwode_salt } = require('../config/config')
const path = require('path');
const rows = require('../model/rowsContro');

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
              console.log(path.join(`${imgDirname}/${pic}`, '路径'));
              fs.unlink(path.join(`${imgDirname}/${pic}`), (err, data) => {
                     if (err) throw err;

                     log('删除成功')
              })
              pic = newPic;

       }
       // path.join(`${__dirname}/data/img/${filename}`)
       // 判断是否 更改了图片
       console.log('avatar_id', avatar);
       const sqlStr = `UPDATE user_relevancy set pic = '${pic}', intro = '${_content}', name = '${_name}',sex = ${_sex} WHERE  avatar_id = ${avatar}`;
       let data = await query(sqlStr);
       // 重新 查询 表 设置 cookie
       let sql = ` SELECT t1.avatar,t2.*	from users as t1 LEFT JOIN user_relevancy as t2 on t1.avatar = ${avatar} = t2.avatar_id  limit  1`;
       console.log(sql, 'sql');
       let dataS = await query(sql);
       console.log(dataS, 'dataS更新为');
       res.cookie('userInfo', JSON.stringify(dataS[0]), { expires: new Date(Date.now() + 8 * 2 * 3600000), path: '/' })
       res.send('yes')
}

// 修改密码  editPassword editPasswordView
userContro.editPasswordView = async (req, res) => {
       res.sendFile(viewPath('editPasswordView.html', path))
}

// 验证 账号 是否 正确 
userContro.inUser = async (req, res) => {
       let { username } = req.body;
       console.log(username);
       let sql = `SELECT users.username FROM users   WHERE   users.username = '${username}'`;
        
       let data = await query(sql);
       res.send(data)

};
// 更改 密码 edtiPassword
userContro.edtiPassword = async (req, res) => {

}
console.log(md5(12345));
// 验证 密码 是否 正确 
userContro.inPassword = async (req, res) => {
       let { password,username } = req.body;
      
       password = md5(password, passwode_salt)
       // let { username } = req.cookies;
       console.log(password,'password1');
       console.log('827ccb0eea8a706c4c34a16891f84e7b', 'password2');
       console.log(username,'username');
       // console.log(res.cookie('username'), 'name');
       let sql = `SELECT users.username,users.id from users WHERE  users.username = '${username}' and users.password = '${password}'`;


       let data = await query(sql);
       console.log(data,'查到的数据');
       if (data[0]?.username) {
              res.cookie('user', data[0].id)
              console.log('没有错误');
       } else {
              res.cookie('user', 'false')
              console.log('账号密码有误');
       }
       res.send(data)

};
// editPassword 修改 密码
userContro.editPassword = async (req, res) => {
       let {user:id,password} = req.body;
       password = md5(password, passwode_salt)
       console.log(id,'id');
       let sql =`UPDATE users SET password = '${password}'  WHERE  id = ${id}`
       console.log(password,'password');
       let data = await query(sql);
       console.log(data);
       // res.send('yes')
       rows(data,res)
}

module.exports = userContro;