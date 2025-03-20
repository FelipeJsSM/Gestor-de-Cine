const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars"); 
const { registerHelpers } = require("./util/handlebars-helpers");

const adminSeriesRouter = require("./routes/adminseries");
const adminGenreRouter = require("./routes/admingenre");
const homeRouter = require("./routes/home");
const errorController = require("./controllers/ErrorController");

registerHelpers();

app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin/series", adminSeriesRouter);
app.use("/admin/genres", adminGenreRouter);
app.use(homeRouter);
app.use("/", errorController.Get404);

app.listen(5001);