const db = require("models");
const Language = db.Language; // Nhập mô hình Language
const responseUtils = require("utils/responseUtils");

const languageController = {
  create: async (req, res) => {
    try {
      const languageData = req.body;
      const language = await Language.create(languageData);
      return responseUtils.ok(res, language);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getAll: async (req, res) => {
    try {
      const languages = await Language.findAll();
      return responseUtils.ok(res, languages);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  getById: async (req, res) => {
    try {
      const language = await Language.findByPk(req.params.id);
      if (!language) {
        return responseUtils.notFound(res);
      }
      return responseUtils.ok(res, language);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  update: async (req, res) => {
    try {
      const language = await Language.findByPk(req.params.id);
      if (!language) {
        return responseUtils.notFound(res);
      }

      await language.update(req.body);
      return responseUtils.ok(res, language);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const language = await Language.findByPk(req.params.id);
      if (!language) {
        return responseUtils.notFound(res);
      }

      await language.destroy();
      return responseUtils.noContent(res);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
};

module.exports = languageController;
