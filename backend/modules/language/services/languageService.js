// modules/language/services/languageService.js
const { Language } = require("models/language");

const languageService = {
  createLanguage: async (data) => {
    return await Language.create(data);
  },

  getAllLanguages: async () => {
    return await Language.findAll();
  },

  getLanguageById: async (id) => {
    return await Language.findByPk(id);
  },

  updateLanguage: async (id, data) => {
    const language = await Language.findByPk(id);
    if (!language) {
      throw new Error("Language not found");
    }
    return await language.update(data);
  },

  deleteLanguage: async (id) => {
    const language = await Language.findByPk(id);
    if (!language) {
      throw new Error("Language not found");
    }
    return await language.destroy();
  },
};

module.exports = languageService;
