const GenreModel = require("../models/Genre");

exports.GetGenreAdminIndex = (req, res, next) => {
    GenreModel.GetAll((genres) => {
        res.render("genres/genres-list", {
            pageTitle: "Genre Admin",
            g: genres,
            hasGenres: genres.length > 0,
            IsGenrePage: true,
        });
    });
};

exports.GetAddGenre = (req, res, next) => {
    res.render("genres/save-genre", {
        pageTitle: "Agregar Genero",
        editMode: false,
        IsGenrePage: true,
    });
};

exports.GetEditGenre = (req, res, next) => {
    const id = req.params.genreId;

    GenreModel.GetById(id, (genre) => {
        if (!genre) {
            return res.redirect("genres/save-genre");
        }

        res.render("genres/save-genre", {
            pageTitle: `Editar - ${genre?.name} `,
            genre: genre,
            editMode: true,
            IsGenrePage: true,
        });
    });
};

exports.PostAddGenre = (req, res, next) => {
    const name = req.body.Name;

    const genre = new GenreModel(null, name);
    genre.Save();

    res.redirect("/admin/genres/");
};

exports.PostEditGenre = (req, res, next) => {
    const id = req.body.GenreId;
    const name = req.body.Name;

    const genre = new GenreModel(id, name);
    genre.Save();

    res.redirect("/admin/genres/");
};

exports.PostGenreDelete = (req, res, next) => {
    const genreId = req.body.GenreId;
    GenreModel.Delete(genreId);

    res.redirect("/admin/genres/");
};