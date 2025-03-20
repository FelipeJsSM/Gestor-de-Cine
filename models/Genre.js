const { FILE } = require("dns");
const fileHandler = require("../util/FileHandler");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "genre.json"
);

module.exports = class Genre {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  Save() {
    fileHandler.GetAllDataFromFile(dataPath, (genres) => {
      if (this.id) {
        const editGenreIndex = genres.findIndex(
          (g) => g.id === this.id
        );

        genres[editGenreIndex] = this;
        fileHandler.SaveDataInFile(dataPath, genres);
      } else {
        this.id = Math.random().toString();
        genres.push(this);
        fileHandler.SaveDataInFile(dataPath, genres);
      }
    });
  }

  static GetAll(cb) {
    fileHandler.GetAllDataFromFile(dataPath, cb);
  }

  static GetById(id, cb) {
    fileHandler.GetAllDataFromFile(dataPath, (genres) => {
      const genre = genres.find((g) => g.id === id);
      cb(genre);
    });
  }

  static Delete(id) {
    fileHandler.GetAllDataFromFile(dataPath, (genres) => {
      const newGenreList = genres.filter((g) => g.id !== id);
      fileHandler.SaveDataInFile(dataPath, newGenreList);
    });
  }
};
