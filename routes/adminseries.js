const express = require("express");

const router = express.Router();
const AdminSerieController = require("../controllers/AdminSeriesController");

router.get("/", AdminSerieController.GetSerieAdminIndex);
router.get("/edit-serie/:serieId", AdminSerieController.GetEditSerie);
router.get("/add-serie", AdminSerieController.GetAddSerie);
router.post("/add-serie", AdminSerieController.PostAddSerie);
router.post("/edit-serie", AdminSerieController.PostEditSerie);
router.post("/serie-delete", AdminSerieController.PostSerieDelete);
module.exports = router;