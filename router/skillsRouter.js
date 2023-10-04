const express = require("express");
const router = express.Router();
const sequalize = require("sequelize");
const { Skills } = require("../models");
const skillRepo = require("../repo/skills.repo");

router.get("/skills", async (req, res) => {
  try {
    var skillsList = await skillRepo.skills();
    return res.send(skillsList);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

router.post("/skills", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body) {
      const { intern_id, technical_skills, other_skills } = req.body;
      console.log(req.body);
      const skillData = await skillRepo.skillAdd({
        intern_id,
        technical_skills,
        other_skills,
      });

      res.send(skillData);
    } else {
      console.log("no body found");
      res.send({ message: "body not found or available" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete("/skills/:id", async (req, res) => {
  const skillsId = req.params.id;
  try {
    const skillData = await Skills.findByPk(skillsId);
    if (!skillData) {
      return res.send({ Error: "intern data not found for this id" });
    }
    await skillRepo.skillDelete(skillData);
    res.send({ message: "skills removed !!" });
  } catch (err) {
    console.log(err);
  }
});

router.put("/skills/:id", async (req, res) => {
  const skillsId = req.params.id;
  try {
    const skillData = await Skills.findByPk(skillsId);
    if (!skillData) {
      return res.json({ error: "data not found" });
    }
    const { intern_id, technical_skills, other_skills } = req.body;
    console.log(req.body);
    await skillRepo.skillUpdate(skillData, {
      intern_id,
      technical_skills,
      other_skills,
    });
    res.send({ message: "data added !!" });
  } catch (error) {
    console.error(error);
    res.send({ error: "Error updating data" });
  }
});

module.exports = router;
