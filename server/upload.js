const IncomingForm = require("formidable").IncomingForm;
const {Storage} = require('@google-cloud/storage');
const projectId = 'utopian-theater-258905'
const keyFilename = '../../key.json'
const storage = new Storage({projectId,keyFilename});
const fs = require("fs");
const path = require("path");

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  form.on("file", (field, file) => {
    const tempPath = file.path;
    const targetPath = path.join(__dirname, "./"+file.name);

    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
    });

    console.log(targetPath);
    storage.bucket("typitoimagesave").upload(targetPath, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    }).then((res) => {
      console.log("SUCCESS");
      console.log(res);
      fs.unlink(targetPath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }).catch((error) => {
      console.log("ERROR!!!!!!!!!");
      console.log(error);
    });
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

//upload().catch(console.error);