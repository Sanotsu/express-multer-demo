var express = require('express');
var router = express.Router();

const GCONST = require('../util/GlobalConst');
const upload = require('../util/Upload');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/upload',/*upload.fileUpdate.single('file'), */async function (req, res, next) {

  // 指定文件上传路径
  let uploadPath = 'test_upload';
  // 等到文件上传完成
  await upload.uploadFunction(req, res, uploadPath);

  const file = req.file;
  console.log(req.file);
  //如果得到了文件，就返回上传成功
  if (file) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ success: false });
  }

  // res.status(200);
});


module.exports = router;
