"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Interns }) {
      this.belongsTo(Interns, { as: "intern", foreignKey: "intern_id" });
    }
  }
  Skills.init(
    {
      intern_id: DataTypes.INTEGER,
      technical_skills: DataTypes.STRING,
      other_skills: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skills",
      underscored: true,
      tableName: "skills",
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
    }
  );
  return Skills;
};
