module.exports = app => {
    var router = require("express").Router();
    const upload = require("../middlewares/upload");
    const financials = require("../controllers/financial.controller");

    router.post("/upload", upload.single("file"), financials.upload);
    
    // router.get("/financials", financials.financials);

    app.use("/api/financials", router);
};