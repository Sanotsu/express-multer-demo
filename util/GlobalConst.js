const fs = require('fs');
const path = require('path');

let pathList = {
    defaultUploadDir: path.join(__dirname, '../upload'),
    textUploadDir: path.join(__dirname, '../upload/text'),
    audioUploadDir: path.join(__dirname, '../upload/audio'),
    pictureUploadDir: path.join(__dirname, '../upload/picture'),
    vedioUploadDir: path.join(__dirname, '../upload/vedio'),
};

// 检查路径是否存在,不存在则创建
let checkDir = (p) => {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
};

(() => {
    Object.keys(pathList).map(k => pathList[k]).forEach(checkDir);
})()

module.exports = pathList