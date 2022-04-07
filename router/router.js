
const express = require('express');
const Router = express.Router();
const indexContro = require('../control/indexContro');
console.log(indexContro);

Router.get('/',indexContro.index)

module.exports = Router;