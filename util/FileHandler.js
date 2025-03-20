const fs = require("fs");

exports.GetAllDataFromFile = (dataPath, callback) => {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

exports.SaveDataInFile = (dataPath, data) => {
  fs.writeFile(dataPath, JSON.stringify(data), function (error) {
    if (error) {
      console.log(error);
    }
  });
};
