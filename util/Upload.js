const multer = require('multer');
const path = require("path");
const GCONST = require('./GlobalConst');
const fs = require('fs');

// 文件上传配置
const fileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(req.body);
        callback(null, "defaultUploadDir");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// // 由前端輸入會上傳的路徑,angular中使用HttpParams,將地址寫到param中,在server用req.query取得
// // 這樣,可以直接在router.post參數中使用
// // 但會改變url地址,默認加上了params的屬性,上傳地址可見,所以不推薦

// const paramStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         let dest = `${GCONST.defaultUploadDir}/` + req.body.dest;
//         let stat = null;
//         try {
//             stat = fs.statSync(dest);
//         } catch (err) {
//             fs.mkdirSync(dest);
//         }
//         if (stat && !stat.isDirectory()) {
//             throw new Error('文件目录： "' + dest + '已存在！"');
//         }
//         cb(null, dest);
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });


// multer文件上传,可指定上传路径,不在router参数里直接用
let uploadFunction = (req, res, dest) => {

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let newDestination = dest;
            let stat = null;
            try {
                // 检查传入的路径是否存在，不存在则创件
                stat = fs.statSync(newDestination);
            } catch (err) {
                fs.mkdirSync(newDestination);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('文件目录： "' + dest + '已存在！"');
            }
            cb(null, newDestination);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });

    let upload = multer({
        storage: storage
    }).single('file');

    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    })
};


module.exports = {
    fileUpdate: multer({ 'storage': fileStorage }),
    // paramUpdate: multer({ 'storage': paramStorage }),
    uploadFunction,

}

