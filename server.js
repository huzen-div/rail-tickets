const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "https://huzen-div.github.io"
};

global.__basedir = __dirname + "/"; //global.__basedir = __dirname + "/..";

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to trendzon application." });
});

const PORT = process.env.PORT || 8090;

// require("./app/routes/store.routes")(app);
require("./app/routes/population.routes")(app);
require("./app/routes/financial.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});