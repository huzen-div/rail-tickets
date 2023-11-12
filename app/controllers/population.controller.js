const population = require("../datas/population.json");
const populationConvert = require("../datas/population-convert.json");
const PopulationService = require("../services/population.service");

const { uuid } = require('uuidv4');
const db = require("../models");
const { Population } = db;
const Op = db.Sequelize.Op;



const futureName = "population";
exports.create = async (req, res) => {
    try {
        let req = populationConvert;
        const response = await PopulationService.create(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while creating the ${futureName}.`
        });
    }
};

exports.convertExcelToJson = async (req, res) => {
    const Utils = require("../utils/hashedPassword");
    try {
        const response = await Utils.convertExcelToJson(
            './app/datas/populationOri.xlsx',
            './app/datas/population-convert.json',
            'population'
        );
        res.send({
            success: true,
            message: "แปลงไฟล์สำเร็จ",
            // data: response
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const response = await PopulationService.findAll(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};

exports.findAllList = async (req, res) => {
    try {
        const response = await PopulationService.findAllList(req);
        res.send(response);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};

exports.findPopulation = async (req, res) => {
    try {
        res.send({
            data: {
                population
            }
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while retrieving ${futureName}.`
        });
    }
};