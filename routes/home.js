const express = require("express");
const path = require("path");

const router = express.Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.GetIndex);
router.get("/serie-detail/:serieId", HomeController.GetSerie);

module.exports = router;