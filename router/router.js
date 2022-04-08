
const express = require('express');
const Router = express.Router();
const indexContro = require('../control/indexContro');
const multer = require('multer')
// console.log(indexContro);

// Router.

// 解析 formdata 使用 multer 第三方 插件 解析 二进制文件
// 首页
Router.get('/',indexContro.index)
// 登录页
Router.get('/login',indexContro.login)

Router.use(multer({ dest: './data/img' }).array('username'));
Router.post('/up-login',indexContro.upLogin)

// 需要 验证 翻墙的路由
Router.use(indexContro.isUsers)

Router.get('/categoryAlter',indexContro.categoryAlter)

module.exports = Router;