const { Skills, Interns } = require("../models");

exports.skills = () => {
  return Skills.findAll({
    include: [{ model: Interns, as: "intern" }],
  });
};

exports.skillAdd = (skillData) => {
  return Skills.create({
    ...skillData,
  });
};

exports.skillUpdate = (skillData, skillData_update) => {
  return skillData.update({
    ...skillData_update,
  });
};

exports.skillDelete = (skillData) => {
  return skillData.destroy();
};
