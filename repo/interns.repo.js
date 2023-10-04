const { Interns, Skills } = require("../models");

exports.interns = () => {
  return Interns.findAll({
    attributes: { exclude: ["last_name"] },
  });
};

exports.internAdd = (internData) => {
  return Interns.create({
    ...internData,
    created_at: Date(),
  });
};

exports.interUpdate = (internData, interData_update) => {
  return internData.update({
    ...interData_update,
  });
};

exports.interDelete = (interData) => {
  return interData.destroy();
};
