const { Category } = require("models");

const categoryService = {
  getAllCategories: async () => {
    return await Category.findAll();
  },
  getCategoryById: async (id) => {
    return await Category.findByPk(id);
  },
  createCategory: async (data) => {
    return await Category.create(data);
  },
  updateCategory: async (id, data) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");
    return await category.update(data);
  },
  deleteCategory: async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error("Category not found");
    return await category.destroy();
  },
};

module.exports = categoryService;
