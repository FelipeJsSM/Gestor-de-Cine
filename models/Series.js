const { FILE } = require("dns");
const fileHandler = require("../util/FileHandler");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "series.json"
);

module.exports = class Serie {
  constructor(id, name, imageURL, genreName, videoURL) {
    this.id = id;
    this.name = name;
    this.imageURL = imageURL;
    this.genreName = genreName;
    this.videoURL = videoURL;
  }

  getEmbeddedVideoURL() {
    if (!this.videoURL) return "";
    return this.videoURL
  }

  Save() {
    fileHandler.GetAllDataFromFile(dataPath, (series) => {
      if (this.id) {
        const editSerieIndex = series.findIndex(
          (s) => s.id === this.id
        );
        series[editSerieIndex] = this;
        fileHandler.SaveDataInFile(dataPath, series);
      } else {
        this.id = Math.random().toString();
        series.push(this);
        fileHandler.SaveDataInFile(dataPath, series);
      }
    });
  }

  static GetAll(cb) {
    fileHandler.GetAllDataFromFile(dataPath, cb);
  }

  static GetById(id, cb) {
    fileHandler.GetAllDataFromFile(dataPath, (series) => {
      const serie = series.find((s) => s.id === id);
      if (serie) {
        serie.embeddedVideoURL = serie.videoURL.replace("watch?v=", "embed/");
      }
      cb(serie);
    });
  }

  static Delete(id) {
    fileHandler.GetAllDataFromFile(dataPath, (series) => {
      const newSerieList = series.filter((s) => s.id !== id);
      fileHandler.SaveDataInFile(dataPath, newSerieList);
    });
  }
};
