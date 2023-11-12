const StoreService = require("../services/store.service");
const futureName = "store";

exports.create = async (req, res) => {
    try {
        const response = await StoreService.create(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while creating the ${futureName}.`
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const response = await StoreService.findAll(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const response = await StoreService.findOne(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};