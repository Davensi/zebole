
const path = require('path');
const fs = require('fs');

const indexContro = {};

const sql = require('../model/sqlControl');

const viewPath = _path => path.join(path.dirname(__dirname), '/views/', _path);

console.log(viewPath('index.html'));

indexContro.index = (req, res) => {
       res.send(viewPath('index.html'))
}
module.exports = indexContro;