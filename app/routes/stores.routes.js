module.exports = app => {
    var router = require("express").Router();
    const stores = require("../controllers/store.controller.js");

    router.post("/", stores.create);
    
    router.get("/", stores.findAll);

    router.get("/:storeGuid", stores.findOne);

    app.use('/api/stores', router);
};