
const path = require('path');
const fs = require('fs');

const indexContro = {};
let userInfo;
const query = require('../model/sqlControl');
const { log } = require('console');

const viewPath = _path => path.join(path.dirname(__dirname), '/views/', _path);

console.log(viewPath('index.html'));

indexContro.index = (req, res) => {
       res.render(('index.html'))
}
indexContro.login = (req, res) => {
       res.sendFile(viewPath('login.html'))
};

// 跳转后台管理页
indexContro.upLogin = async (req, res) => {
       log(req.body, 'body');
       let { username, password } = req.body;
       log('跳转');
       const sqlStr = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
       let data = await query(sqlStr)
       if (data.length === 0) {
              res.send(`
       <script>
             console.log(99)
             alert('密码错误')
             location.href='login'
       </script>
       `)
       }
       req.session.userInfo = req.body;
       userInfo = req.session.userInfo;
       res.redirect('/');
};
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

       res.render('categoryAlter.html')
};
module.exports = indexContro;