var express = require("express");
var router = express.Router();

const Contact = require('../models/contact.model')

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.sendFile(path.join(__dirname, "../../dist/cms/browser/index.html"));
  // res.render("index", { title: "CMS" });
});

// Post Contacts


module.exports = router;
