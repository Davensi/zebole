
const express = require('express');
const Router = express.Router();

const indexContro = require('../control/indexContro');
const cateContro = require('../control/cateContro');
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
// 获取分类数据
Router.get('/getCategory',indexContro.getCategory)
// 修改分类 数据
Router.get('/alterCate',indexContro.alterCate)
// 删除 排序 分类
Router.get('/DelCategory',indexContro.DelCategory)
// 文章列表页
Router.get('/article',indexContro.article)
// 添加文章分类 页
Router.get('/addArticle',indexContro.addArticle)
// 添加文章 接口
Router.post('/upArticle',indexContro.upArticle)
// 文章分类 搜索
Router.get('/inCate',cateContro.inCate)

// 需要 验证 翻墙的路由
Router.use(indexContro.isUsers)
Router.get('/categoryAlter',indexContro.categoryAlter)

module.exports = Router;