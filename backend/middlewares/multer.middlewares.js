const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    const uploadPath = path.join(__dirname,"../public/temp")
      cb(null, uploadPath)
  },
  filename : (req,file,cb) => {
    cb(null,Date.now() + "_" + file.originalname);
  }
})
const upload = multer({ storage})

module.exports = upload;