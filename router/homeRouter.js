const express = require('express');
const cors = require('cors');
const homeContro = require('../control/homeContro');
// import express  from '../node_modules/experss'
const Router = express.Router();

Router.use(cors());
// 获取 主页 所有 数据
Router.get('/getAite',homeContro.getAite);
// 获取 所有 的分类 数据 
Router.get('/getCategoby', homeContro.getCategoby)
// 获取 内容 
Router.get('/geTitemAite', homeContro.geTitemAite)
Router.get('/getcateTag', homeContro.getcateTag)
// getAite

module.exports = Router;