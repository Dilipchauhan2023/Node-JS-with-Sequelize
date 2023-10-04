const express = require("express");
const router = express.Router();
const sequalize = require("sequelize");
const { Interns } = require("../models");
const internRepo = require("../repo/interns.repo");

router.get("/interns", async (req, res) => {
  try {
    var internList = await internRepo.interns();
    return res.send(internList);
  } catch (err) {
    console.log(err);
  }
});

router.post("/interns", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      const { first_name, last_name, email } = req.body;
      console.log(req.body);
      const internData = await internRepo.internAdd({
        first_name,
        last_name,
        email,
      });
      res.send({ message: "data added !!", internData });
    } else {
      console.log("no body found");
      res.send({ message: "body not found or available" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete("/interns/:id", async (req, res) => {
  const internId = req.params.id;
  try {
    const internData = await Interns.findByPk(internId);
    if (!internData) {
      return res.send({ Error: "intern data not found for this id" });
    }
    await internRepo.interDelete(internData);
    res.send({ message: "Intern removed !!" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/interns/:id", async (req, res) => {
  const internId = req.params.id;
  try {
    const internData = await Interns.findByPk(internId);
    if (!internData) {
      return res.json({ error: "data not found" });
    }
    const { first_name, last_name, email } = req.body;
    console.log(req.body);
    await internRepo.interUpdate(internData, {
      first_name,
      last_name,
      email,
    });
    res.send({ message: "data added !!" });
  } catch (error) {
    console.error(error);
    res.send({ error: "Error updating data" });
  }
});

module.exports = router;
