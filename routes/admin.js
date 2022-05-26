const { response } = require("express");
var express = require("express");
const { done } = require("express-hbs/lib/resolver");
const async = require("hbs/lib/async");
var router = express.Router();
var productHelpers = require("../helpers/product-helpers");
/* GET users listing. */
router.get("/", function (req, res, next) {
  productHelpers.getAllproducts().then((products) => {
    console.log(products);
    res.render("admin/view-products", { admin: true, products });
  });
});
router.get("/add-product", function (req, res) {
  res.render("admin/add-product", { admin: true });
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.Image;
    console.log(id);
    image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
      if (!err) {
        res.render("admin/add-product");
      } else {
        console.log(err);
      }
    });
    res.render("admin/add-product");
  });
});

router.get("/delete-product/:id", (req, res) => {
  let proId = req.params.id;
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect("/admin/");
  });
});
router.get("/edit-product/:id", async (req, res) => {
  let product = await productHelpers.getProductDetailes(req.params.id);
  console.log(product);
  res.render("admin/edit-product", { admin: true, product });
});
router.post("/edit-product/:id", (req, res) => {
  let id = req.params.id;
  productHelpers.updateProduct(req.params.id, req.body).then(() => {
    res.redirect("/admin");
    if (req.files.Image) {
      let image = req.files.Image;
      image.mv("./public/product-images/" + id + ".jpg");
    }
  });
});
module.exports = router;
