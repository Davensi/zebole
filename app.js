
const PORT = 4000;
// 导入路由
const ROUTER = require('./router/router')
const homeROUTER = require('./router/homeRouter')
// 导入  express 框架 
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session')
const artTemplate = require('art-template');
const express_template = require('express-art-template');
 
 
const app = express();



// 托管静态 资源 
app.use('/static', express.static('static/'));
// 
 
// 配置一个  session 


// 配置模板的路径
// 这里的 views文件 不能修改 它默认的就是views
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件  默认为 art
app.engine('html', express_template);
// 修改模板引擎的 后缀 为 html
// app.set('view engine', 'str'); 只有str可以修改
app.set('view engine', 'html');
app.use(session({
  name: 'sessionuIndex',
  // 用户 session   加密 防止客户 篡改
  secret: "Z&&>zs__",
  cookie: {
    // 访问路径
    path: "/",
    // 设置 cookie 能不能 被客户端获取 默认为 true
    httpOnly: false,
    // 放置 毫秒值  设置时间为 十分钟 当十分钟没访问 就过期 没过期访问再次刷新为 十分钟
    maxAge: 60000 * 60,
  }
}));

app.use('/api',homeROUTER);

app.use(ROUTER);
 

require('dotenv').config('.env');
// console.log( process.env);

app.listen(PORT, () => {
  console.log(`server is port ${PORT}`);
});
