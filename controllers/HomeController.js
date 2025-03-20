const SerieModel = require("../models/Series");
const GenreModel = require("../models/Genre");

exports.GetIndex = (req, res, next) => {
    const searchTerm = req.query.search ? req.query.search.trim().toLowerCase() : "";
    const genreFilter = req.query.genreFilter ? req.query.genreFilter.trim() : "";

    SerieModel.GetAll((series) => {
        let filteredSeries = series;

        if (searchTerm) {
            filteredSeries = filteredSeries.filter(serie =>
                serie.name.toLowerCase().includes(searchTerm)
            );
        }

        if (genreFilter) {
            filteredSeries = filteredSeries.filter(serie =>
                serie.genreName === genreFilter
            );
        }

        GenreModel.GetAll((genres) => {
            res.render("home/index", {
                pageTitle: "Gestor Cine",
                s: filteredSeries,
                hasSeries: filteredSeries.length > 0,
                searchTerm: searchTerm,
                genres: genres,
                selectedGenre: genreFilter
            });
        });
    });
};

exports.GetSerie = (req, res, next) => {
    const id = req.params.serieId;

    SerieModel.GetById(id, (serie) => {
        if (serie) {
            const serieObj = new SerieModel(
                serie.id,
                serie.name,
                serie.imageURL,
                serie.genreName,
                serie.videoURL
            );
            serieObj.embeddedVideoURL = serieObj.getEmbeddedVideoURL();
        }
        res.render("home/series-detail", {
            pageTitle: `Series - ${serie?.name}`,
            serie: serie,
            hasSerie: serie ? true : false,
        });
    });
};