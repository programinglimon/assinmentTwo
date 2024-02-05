const http = require("http");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage:storage}).single('myFile')

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url === "/") {
      res.write("This is Home Page");
      res.end();
    } else if (req.url === "/about") {
      res.write("This is About Page");
      res.end();
    } else if (req.url === "/contact") {
      res.write("This is Contact Page");
      res.end();
    } else if (req.url === "/file-write") {
      fs.writeFile("demo.txt", "hello world", function (err) {
        if (err) {
          res.write("create faild");
        }
      });
      res.write("create success");
      res.end();
    } else if (req.url === "/upload") {
      upload(req , res , function(err){
        if(err){
            res.write('file upload failed')
        }else{
            res.write('file upload success')
        }
      })
      res.write('file upload success')
      res.end();
    }
  })
  .listen(5500, function () {
    console.log("listening on port 5500");
  });
