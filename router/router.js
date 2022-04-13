
const express = require('express');
// import express  from '../node_modules/experss'
const Router = express.Router();
// 文章控制器
const indexContro = require('../control/indexContro');
// 分类控制器
const cateContro = require('../control/cateContro');
// 配置 控制器
const systemContro = require('../control/systemContro');
// 登录 控制器
const userContro = require('../control/userContro');
const multer = require('multer')
const cookie = require('cookie-parser')
Router.use(cookie())

// 解析post参数
Router.use(express.json())
Router.use(express.urlencoded({ extended: true }));

// 解析 formdata 使用 multer 第三方 插件 解析 二进制文件
const upload = multer({ 
    dest: './static/upData' 
})

 

const upHarder= multer({ dest: './static/harder' });

 
// 需要 验证 翻墙的路由
Router.use(indexContro.isUsers)

Router.get('/',indexContro.index);

// 文章 页数据 getArticle
Router.get('/getArticle',indexContro.getArticle)
// 删除 文章
Router.get('/DelArticle',indexContro.DelArticle)
// 修改 文章 内容
Router.post('/alterArticle', upload.single('title'),indexContro.alterArticle)
// 获取 文章的 总数 
Router.get('/addUpcate', indexContro.addUpcate)

// 登录页
Router.get('/login',userContro.login)
// 验证 是否 有 该 账户
Router.post('/inUser',userContro.inUser)
// 验证 密码
Router.post('/inPassword',userContro.inPassword)
// 更改密码
Router.post('/editPassword',userContro.editPassword)
// 退出登录
Router.get('/outLog',userContro.outLog)
// 修改 用户信息 接口 eaitUserText   upHarder.single('harderImg')
 
Router.post('/eaitUserText',upHarder.single('harderImg'),userContro.eaitUserText)
// 修改 密码
Router.get('/editPasswordView',upHarder.single('harderImg'),userContro.editPasswordView)

// 登录 校验 接口
Router.post('/up-login',upload.single('username') ,userContro.upLogin)

// 获取分类数据 接口
Router.get('/getCategory',cateContro.getCategory)

// 修改分类 数据 接口
Router.get('/alterCate',cateContro.alterCate)

// 删除 排序 分类 接口
Router.get('/DelCategory',cateContro.DelCategory)

// 文章列表页 
Router.get('/article',indexContro.article)

// 修改文章页
Router.get('/editArticle',indexContro.editArticle)

// 添加文章分类 接口
Router.get('/addArticle',cateContro.addArticle)

// 添加文章 接口
// Router.post('/upCate',cateContro.upCate)

// 文章分类 搜索 接口
Router.get('/inCate',cateContro.inCate)
 
//  配置页面
Router.get('/system',systemContro.system)
// 获取 配置 页数据 接口
Router.get('/getSystem',systemContro.getSystem)

// 修改修改 配置 接口
Router.get('/alterSys',systemContro.alterSys)

// 配置添加页
Router.get('/addSystem',systemContro.addSystem)

// 添加 配置页 接口
Router.post('/upSystem',systemContro.upSystem)

// 配置 删除页  接口
Router.get('/DelSystem',systemContro.DelSystem)

// 配置 搜索  接口
Router.get('/inSystem',systemContro.inSystem)

// 修改  文章分类 表 
Router.get('/categoryAlter',cateContro.categoryAlter)

module.exports = Router;