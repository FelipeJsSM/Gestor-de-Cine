const express = require("express");

const router = express.Router();
const AdminGenreController = require("../controllers/AdminGenreController");

router.get("/", AdminGenreController.GetGenreAdminIndex);
router.get("/edit-genre/:genreId", AdminGenreController.GetEditGenre);
router.get("/add-genre", AdminGenreController.GetAddGenre);
router.post("/add-genre", AdminGenreController.PostAddGenre);
router.post("/edit-genre", AdminGenreController.PostEditGenre);
router.post("/genre-delete", AdminGenreController.PostGenreDelete);

module.exports = router;