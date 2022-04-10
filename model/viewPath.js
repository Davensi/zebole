const viewPath = (_path,path) => path.join(path.dirname(__dirname), '/views/', _path);

module.exports = viewPath;