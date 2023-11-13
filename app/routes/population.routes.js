module.exports = app => {
    var router = require("express").Router();
    const upload = require("../middlewares/upload");
    const populations = require("../controllers/population.controller.js");
    
    router.post("/", populations.create);

    router.get("/", populations.findPopulation);

    router.get("/all", populations.findAll);//get all from db

    router.get("/all-list", populations.findAllList);//get all from json

    router.get("/convert-excel-to-json", populations.convertExcelToJson);

    router.post("/upload", upload.single("file"), populations.upload);

    app.use('/api/populations', router);
};