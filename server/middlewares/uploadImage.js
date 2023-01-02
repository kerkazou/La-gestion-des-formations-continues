const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname));
  }
});

module.exports = multer({
  storage: storage,
  limits: 1024*1024,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
     cb(null, true)
  }
})