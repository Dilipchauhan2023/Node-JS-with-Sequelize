const express = require("express");
const router = express.Router();

const internRouter = require("./internRouter");
const skillRouter = require("./skillsRouter");
const mediaRouter = require("./mediaRouter");

router.use(internRouter);
router.use(skillRouter);
router.use(mediaRouter);

module.exports = router;
