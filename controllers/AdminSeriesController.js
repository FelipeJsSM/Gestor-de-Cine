const SerieModel = require("../models/Series");
const GenreModel = require("../models/Genre");

exports.GetSerieAdminIndex = (req, res, next) => {
  SerieModel.GetAll((series) => {
    res.render("series/series-list", {
      pageTitle: "Serie Admin",
      s: series,
      hasSeries: series.length > 0,
      IsSeriePage: true,
    });
  });
};

exports.GetAddSerie = (req, res, next) => {
  GenreModel.GetAll((genres) => {
    res.render("series/save-serie", {
      pageTitle: "Agregar Serie",
      genres: genres,
      editMode: false,
      IsSeriePage: true,
    });
  });
};

exports.GetEditSerie = (req, res, next) => {
  const id = req.params.serieId;

  SerieModel.GetById(id, (serie) => {

    if (!serie) {
      return res.redirect("series/save-serie");
    }

    GenreModel.GetAll((genres) => {
      res.render("series/save-serie", {
        pageTitle: `Editar - ${serie?.name} `,
        serie: serie,
        genres: genres,
        editMode: true,
        IsSeriePage: true,
      });
    });
  });
};

exports.PostAddSerie = (req, res, next) => {
  const name = req.body.Name;
  const image = req.body.imageURL;
  const video = req.body.videoURL;
  const genre = req.body.genreName;

  const serie = new SerieModel(null, name, image, genre, video);
  serie.Save();

  res.redirect("/admin/series/");
};

exports.PostEditSerie = (req, res, next) => {
  const id = req.body.SerieId;
  const name = req.body.Name;
  const image = req.body.imageURL;
  const video = req.body.videoURL;
  const genre = req.body.genreName;

  const serie = new SerieModel(id, name, image, genre, video);
  serie.Save();

  res.redirect("/admin/series/");
};

exports.PostSerieDelete = (req, res, next) => {
  const serieId = req.body.SerieId;
  SerieModel.Delete(serieId);

  res.redirect("/admin/series/");
};