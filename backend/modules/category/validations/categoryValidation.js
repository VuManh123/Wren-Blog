const { body } = require("express-validator");

const categoryValidation = {
  create: [
    body("name").notEmpty().withMessage("Name is required"),
    body("slug").notEmpty().withMessage("Slug is required"),
  ],
  update: [
    body("name").optional().notEmpty().withMessage("Name must not be empty"),
    body("slug").optional().notEmpty().withMessage("Slug must not be empty"),
  ],
};

module.exports = categoryValidation;
