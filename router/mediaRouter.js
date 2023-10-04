const express = require("express");
const router = express.Router();
const { Media } = require("../models");

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null.false);
      cb(new Error("not allow this file "));
    }
  },
});

router.post(
  "/profile",
  upload.single("avatar"),
  async function (req, res, next) {
    const file = req.file;
    console.log("file data : " + file);
    var body = req.body;
    var uuid = uuidv4();

    let destination = "uploads/" + uuid;

    fs.mkdir(__basedir + "/" + destination, {}, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("folder created");
      }
    });

    let large_pic = destination + "/large.webp";

    await sharp(file.buffer)
      .toBuffer()
      .then((data) => {
        fs.writeFile(__basedir + "/" + large_pic, data, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("folder created");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    Media.create({
      uuid: uuid,
      path: large_pic,
      name: file.originalname,
    })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ message: err });
      });
  }
);

module.exports = router;
