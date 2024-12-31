require("express-router-group");
const express = require("express");
const middlewares = require("kernels/middlewares");
const { validate } = require("kernels/validations");
const exampleController = require("modules/examples/controllers/exampleController");
const router = express.Router({ mergeParams: true });
const verifyToken = require("kernels/middlewares/authMiddleware")

// ===== EXAMPLE Request, make this commented =====
// router.group("/posts",middlewares([authenticated, role("owner")]),(router) => {
//   router.post("/create",validate([createPostRequest]),postsController.create);
//   router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//   router.delete("/delete/:postId", postsController.destroy);
// }
// );

const categoryController = require("modules/category/controllers/categoryController");
const categoryValidation = require("modules/category/validations/categoryValidation"); 
const languageController = require("modules/language/controllers/languageController");
const blogValidation = require("modules/blog/validations/blogValidation");
const blogController = require("modules/blog/controllers/blogController");
const commentController = require("modules/comment/controllers/commentController");
const PostController = require("modules/post/controllers/PostController")

router.get("/categories/:id", categoryController.getById);
router.post("/categories", validate(categoryValidation.create), categoryController.create);
router.put("/categories/:id", validate(categoryValidation.update), categoryController.update);
router.delete("/categories/:id", categoryController.delete);

router.post("/languages", validate([]), languageController.create);
router.get("/languages", languageController.getAll);
router.get("/languages/:id", languageController.getById);
router.put("/languages/:id", validate([]), languageController.update);
router.delete("/languages/:id", languageController.delete);

router.post("/blogs", validate(blogValidation.create), blogController.create);
router.get("/blogs", blogController.getAll);
router.get("/blogs/:id", blogController.getById);
router.put("/blogs/:id", validate(blogValidation.update), blogController.update);
router.delete("/blogs/:id", blogController.delete);

// New api
router.get('/blogRequire', blogController.getAllRequire); //articles.json
router.get("/categories", categoryController.getAll); //categories.json
router.get("/comments", commentController.getAll); 
router.post("/comments", commentController.create);
// router.post("/posts", PostController.createPost);
// router.delete('/posts/:id', PostController.deletePost);
// router.post('/posts/:blog_id/add-language',PostController.addBlogContent);
// router.get('/posts/:blog_id/contents', PostController.getBlogContents);
// router.put('/posts/:blog_id/contents/:content_id', PostController.updateBlogContent);

router.group('/posts', (router) => { //, [authenticated, role('owner')]
  router.post("/", PostController.createPost); // Tạo bài viết
  router.delete('/:id', PostController.deletePost); // Xóa bài viết
  router.post('/:blog_id/add-language', PostController.addBlogContent); // Thêm nội dung
  router.get('/:blog_id/contents', PostController.getBlogContents); // Lấy danh sách nội dung
  router.put('/:blog_id/contents/:content_id', PostController.updateBlogContent); // Cập nhật nội dung
});

module.exports = router;

router.group("/example", validate([]), (router) => {
  router.get('/', exampleController.exampleRequest)
})

module.exports = router;
