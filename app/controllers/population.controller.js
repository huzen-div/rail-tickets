const population = require("../datas/population.json");
const populationConvert = require("../datas/population-convert.json");
const PopulationService = require("../services/population.service");

const { uuid } = require('uuidv4');
const db = require("../models");
const { Population } = db;
const Op = db.Sequelize.Op;
const readXlsxFile = require("read-excel-file/node");


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

exports.upload = async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path = __basedir + "/app/resources/static/assets/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let excelDatas = [];
            rows.forEach((row) => {
                let excelData = {
                    country: row[0],
                    continent: row[1],
                    year: row[2],
                    population: row[3],
                };
                excelDatas.push(excelData);
            });
            res.send({
                success: true,
                message: "Uploaded the file successfully. File name: " + req.file.originalname,
                data: excelDatas,
            });
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while upload ${futureName} ${req.file.originalname}.`
        });
    }
};