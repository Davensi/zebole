
const PORT = 4000;
// 导入路由
const ROUTER = require('./router/router')
// 导入  express 框架 
const express = require('express');

// git reset cbf505  $ git commit -am '完成博客基本搭建'


const app = express();
// 挂载
app.use(ROUTER);

  require('dotenv').config('.env');
console.log( process.env);
 
app.listen(PORT, () => {
    console.log(`server is port ${PORT}`);
})
    ;