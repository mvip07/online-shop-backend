const path = require("path");
const express = require("express");
const multer = require("multer");

const productController = require("./controllers/product");
const aboutCompany = require("./controllers/aboutCompany")
const aboutTeamMembear = require("./controllers/aboutTeamMembar")
const blog = require("./controllers/blog")
const advertising = require("./controllers/advertising")
const bag = require("./controllers/bag")
const category = require("./controllers/category")

const authControllerUser = require("./controllers/user");
const authControllerAdmin = require("./controllers/adminUser")
const isAuth = require("./util/isAuth");
const mongoConnect = require("./util/db").mongoConnect;

const app = express();
require("dotenv").config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/all/products", isAuth, productController.getProducts);
app.get("/selected/product/:id", isAuth, productController.getProductDetail);
app.delete("/delete/product/:id", isAuth, productController.deleteProduct);
app.post("/create/product", isAuth, productController.createProduct);
app.post("/update/product", isAuth, productController.getProductUpdate);

app.get("/all/about/companys", isAuth, aboutCompany.getAboutCompanys);
app.get("/selected/about/company/:id", isAuth, aboutCompany.getAboutCompanyDetail);
app.delete("/delete/about/company/:id", isAuth, aboutCompany.deleteAboutCompany);
app.post("/create/about/company", isAuth, aboutCompany.createAboutCompany);
app.post("/update/about/company", isAuth, aboutCompany.getAboutCompanyUpdate);

app.get("/all/about/team/membears", isAuth, aboutTeamMembear.getAboutTeamMembars);
app.get("/selected/about/team/membear/:id", isAuth, aboutTeamMembear.getAboutTeamMembarDetail);
app.delete("/delete/about/team/membear/:id", isAuth, aboutTeamMembear.deleteAboutTeamMembar);
app.post("/create/about/team/membear", isAuth, aboutTeamMembear.createAboutTeamMembar);
app.post("/update/about/team/membear", isAuth, aboutTeamMembear.getAboutTeamMembarUpdate);

app.get("/all/blogs", isAuth, blog.getBlogs);
app.get("/selected/blog/:id", isAuth, blog.getBlogDetail);
app.delete("/delete/blog/:id", isAuth, blog.deleteBlog);
app.post("/create/blog", isAuth, blog.createBlog);
app.post("/update/blog", isAuth, blog.getBlogUpdate);

app.get("/all/advertisings", isAuth, advertising.getAdvertisings);
app.get("/selected/advertising/:id", isAuth, advertising.getAdvertisingDetail);
app.delete("/delete/advertising/:id", isAuth, advertising.deleteAdvertising);
app.post("/create/advertising", isAuth, advertising.createAdvertising);
app.post("/update/advertising", isAuth, advertising.getAdvertisingUpdate);

app.post("/user/login", authControllerUser.login);
app.post("/user/register", authControllerUser.signup);
app.post("/user/update/account", authControllerUser.getUserUpdate);
app.get("/user/:id", authControllerUser.getUserDetail);

app.post("/admin/login",  authControllerAdmin.login);
app.post("/admin/register", authControllerAdmin.signup);
app.post("/admin/update/account", authControllerAdmin.getAdminUpdate);

app.get("/all/bag/:userId", isAuth, bag.getBags)
app.post("/create/bag/:userId", isAuth, bag.createBag)
app.delete("/delete/bag/:userId/:id", isAuth, bag.deleteBag)

app.get("/all/categoys", isAuth, category.getCategory);
app.get("/selected/category/:id", isAuth, category.getCategoryDetail);
app.delete("/delete/category/:id", isAuth, category.deleteCategory);
app.post("/create/category", isAuth, category.createCategory);
app.post("/update/category", isAuth, category.getCategoryUpdate);

mongoConnect(() => {
  app.listen(process.env.PORT || 8000, () => console.log("Server Started!"));
});
