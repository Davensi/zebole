
const express = require('express');
const Router = express.Router();
// 文章控制器
const indexContro = require('../control/indexContro');
// 分类控制器
const cateContro = require('../control/cateContro');
// 配置 控制器
const systemContro = require('../control/systemContro');
// 登录 控制器
const loginContro = require('../control/loginContro');
const multer = require('multer')
 

 

// 解析 formdata 使用 multer 第三方 插件 解析 二进制文件
Router.use(multer({ dest: './data/img' }).array('username'));
// 首页
Router.get('/',indexContro.index)
// 登录页
Router.get('/login',loginContro.login)
// 登录 
Router.post('/up-login',loginContro.upLogin)


// 获取分类数据
Router.get('/getCategory',cateContro.getCategory)

// 修改分类 数据
Router.get('/alterCate',cateContro.alterCate)

// 删除 排序 分类
Router.get('/DelCategory',cateContro.DelCategory)

// 文章列表页
Router.get('/article',indexContro.article)

// 添加文章分类 页
Router.get('/addArticle',indexContro.addArticle)

// 添加文章 接口
Router.post('/upCate',cateContro.upCate)

// 文章分类 搜索
Router.get('/inCate',cateContro.inCate)


//  配置页面
Router.get('/system',systemContro.system)
// 获取 配置 页数据
Router.get('/getSystem',systemContro.getSystem)
// 修改修改 配置 数据
Router.get('/alterSys',systemContro.alterSys)
// 配置添加页
Router.get('/addSystem',systemContro.addSystem)
// 添加 配置页 数据
Router.post('/upSystem',systemContro.upSystem)
// 删除配置页数据
Router.get('/DelSystem',systemContro.DelSystem)
// 搜索配置 
Router.get('/inSystem',systemContro.inSystem)

// 需要 验证 翻墙的路由
Router.use(indexContro.isUsers)
// 修改
Router.get('/categoryAlter',cateContro.categoryAlter)

module.exports = Router;