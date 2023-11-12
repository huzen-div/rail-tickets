const { uuid } = require('uuidv4');
const db = require("../models");
const { Population } = db;
const Op = db.Sequelize.Op;
const populationMockList = require("../datas/population-mockup-query.json");

const futureName = "population"

const PopulationService = {
    validateCreate: async (req) => {
        let message = [];
        // if (!req.body.country) {
        //     message.push("country can not be empty!");
        // }
        // if (!req.body.continent) {
        //     message.push("continent can not be empty!");
        // }
        // if (!req.body.year) {
        //     message.push("year can not be empty!");
        // }
        // if (!req.body.population) {
        //     message.push("population can not be empty!");
        // }
        return message;
    },
    create: async (req) => {
        const message = await PopulationService.validateCreate(req);
        if (message.length > 0) {
            return { success: false, message };
        }

        let requestDatas = [];
        for(let item of req){
            const requestData = {
                guid: uuid(),
                country: item.country,
                continent: item.continent,
                year: item.year,
                population: item.population,
            };
            requestDatas.push(requestData);
        }

        const resultCreate = await Population.bulkCreate(requestDatas);
        if (resultCreate) {
            return {
                success: true,
                message: 'ทำรายการสำเร็จ',
                data: resultCreate
            };
        }
        else {
            return {
                success: false,
                message:
                    err.message || `Some error occurred while create the ${futureName}.`
            };
        }
    },
    findAll: async (req) => {
        let condition = {};
        if (req.body.filters) {
            condition = { ...condition, ...req.body.filters };
        }

        const resultFind = await Population.findAll({
            where: condition,
        });

        if (resultFind.length > 0) {
            return {
                success: true,
                message: 'สำเร็จ',
                data: resultFind
            };
        } else {
            return {
                success: false,
                message: `Not found ${futureName}.`
            };
        }
    },
    findAllList: async (req) => {
        return {
            success: true,
            message: 'สำเร็จ',
            data: populationMockList
        };
    },
    validateFindOne: async (req) => {
        let message = [];
        if (!req.params.populationGuid) {
            message.push("populationGuid can not be empty!");
        }
        return message;
    },
    findOne: async (req) => {
        const message = await PopulationService.validateFindOne(req);
        if (message.length > 0) {
            return { success: false, message };
        }
    
        let condition = {};
        condition.populationGuid = req.params.populationGuid;

        const resultFind = await Population.findOne({
            where: condition,
        });
        
        if (resultFind) {
            return {
                success: true,
                message: 'สำเร็จ',
                data: resultFind
            };
        } else {
            return {
                success: false,
                message: `Not found ${futureName}.`
            };
        }
    }
}
module.exports = PopulationService;