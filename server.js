const path = require("path");
const express = require("express");
const multer = require("multer");

const productController = require("./controllers/product");
const aboutCompany = require("./controllers/aboutCompany")
const aboutTeamMembear = require("./controllers/aboutTeamMembar")
const blog = require("./controllers/blog")
const advertising = require("./controllers/advertising")
const bag = require("./controllers/bag")

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

app.get("/all/products", productController.getProducts);
app.get("/selected/product/:id", productController.getProductDetail);
app.delete("/delete/product/:id", isAuth, productController.deleteProduct);
app.post("/create/product", isAuth, productController.createProduct);
app.post("/update/product", isAuth, productController.getProductUpdate);

app.get("/all/about/companys", aboutCompany.getAboutCompanys);
app.get("/selected/about/company/:id", aboutCompany.getAboutCompanyDetail);
app.delete("/delete/about/company/:id", isAuth, aboutCompany.deleteAboutCompany);
app.post("/create/about/company", isAuth, aboutCompany.createAboutCompany);
app.post("/update/about/company", isAuth, aboutCompany.getAboutCompanyUpdate);

app.get("/all/about/team/membears", aboutTeamMembear.getAboutTeamMembars);
app.get("/selected/about/team/membear/:id", aboutTeamMembear.getAboutTeamMembarDetail);
app.delete("/delete/about/team/membear/:id", isAuth, aboutTeamMembear.deleteAboutTeamMembar);
app.post("/create/about/team/membear", isAuth, aboutTeamMembear.createAboutTeamMembar);
app.post("/update/about/team/membear", isAuth, aboutTeamMembear.getAboutTeamMembarUpdate);

app.get("/all/blogs", blog.getBlogs);
app.get("/selected/blog/:id", blog.getBlogDetail);
app.delete("/delete/blog/:id", isAuth, blog.deleteBlog);
app.post("/create/blog", isAuth, blog.createBlog);
app.post("/update/blog", isAuth, blog.getBlogUpdate);

app.get("/all/advertisings", advertising.getAdvertisings);
app.get("/selected/advertising/:id", advertising.getAdvertisingDetail);
app.delete("/delete/advertising/:id", isAuth, advertising.deleteAdvertising);
app.post("/create/advertising", isAuth, advertising.createAdvertising);
app.post("/update/advertising", isAuth, advertising.getAdvertisingUpdate);

app.post("/user/login", authControllerUser.login);
app.post("/user/register", authControllerUser.signup);
app.post("/user/update/account", authControllerUser.getUserUpdate);
app.get("/user/:id", authControllerUser.getUserDetail);

app.post("/admin/login", authControllerAdmin.login);
app.post("/admin/register", authControllerAdmin.signup);
app.post("/admin/update/account", authControllerAdmin.getAdminUpdate);

app.get("/all/bag/:userId", bag.getBags)
app.post("/create/bag/:userId", bag.createBag)
app.delete("/delete/bag/:userId/:id", bag.deleteBag)

mongoConnect(() => {
  app.listen(process.env.PORT || 8000, () => console.log("Server Started!"));
});
