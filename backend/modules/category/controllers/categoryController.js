const categoryService = require("modules/category/services/categoryService");
const responseUtils = require("utils/responseUtils");

const categoryController = {
  getAll: async (req, res) => {
    const categories = await categoryService.getAllCategories();
    return responseUtils.ok(res, categories);
  },
  getById: async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return responseUtils.notFound(res, { message: "Category not found" });
    }
    return responseUtils.ok(res, category);
  },
  create: async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    return responseUtils.created(res, category);
  },
  update: async (req, res) => {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      return responseUtils.ok(res, category);
    } catch (error) {
      return responseUtils.notFound(res, { message: error.message });
    }
  },
  // Phương thức xóa category
  delete: async (req, res) => {
    try {
      const deletedCategory = await categoryService.deleteCategory(req.params.id);
      if (!deletedCategory) {
        // Nếu không tìm thấy danh mục, trả về 404
        return responseUtils.notFound(res);
      }
      // Nếu xóa thành công, trả về 204 No Content
      return responseUtils.noContent(res);
    } catch (error) {
      // Xử lý lỗi
      return responseUtils.error(res, error.message);
    }
  },
};

module.exports = categoryController;
