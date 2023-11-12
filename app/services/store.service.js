const { uuid } = require('uuidv4');
const db = require("../models");
const { Store } = db;
const Op = db.Sequelize.Op;
const futureName = "store";

const StoreService = {
    validateCreate: async (req) => {
        let message = [];
        if (!req.body.storeName) {
            message.push("storeName can not be empty!");
        }
        if (!req.body.storePhoneNumber) {
            message.push("storePhoneNumber can not be empty!");
        }
        if (!req.body.storeEmail) {
            message.push("storeEmail can not be empty!");
        }
        if (!req.body.storePassword) {
            message.push("storePassword can not be empty!");
        }
        return message;
    },
    create: async (req) => {
        const message = await StoreService.validateCreate(req);
        if (message.length > 0) {
            return { success: false, message };
        }

        const requestData = {
            storeGuid: uuid(),
            storeName: req.body.storeName,
            storeImage: req.body.storeImage,
            storePhoneNumber: req.body.storePhoneNumber,
            storeLocation: req.body.storeLocation,
            storeEmail: req.body.storeEmail,
            storePassword: req.body.storePassword,
        };

        var condition = {};
        condition.storeName = requestData.storeName;
        let resultFind = await Store.findOne({
            attributes: ['storeName'],
            where: condition
        });
        if (resultFind) {
            return {
                success: false,
                message: `มีร้านค้านี้อยู่ในระบบแล้ว`
            };
        }
        else {
            const resultCreate = await Store.create(requestData);
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
        }
    },
    findAll: async (req) => {
        let condition = {};
        if (req.body.filters) {
            condition = { ...condition, ...req.body.filters };
        }

        const resultFind = await Store.findAll({
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
    validateFindOne: async (req) => {
        let message = [];
        if (!req.params.storeGuid) {
            message.push("storeGuid can not be empty!");
        }
        return message;
    },
    findOne: async (req) => {
        const message = await StoreService.validateFindOne(req);
        if (message.length > 0) {
            return { success: false, message };
        }
    
        let condition = {};
        condition.storeGuid = req.params.storeGuid;

        const resultFind = await Store.findOne({
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
module.exports = StoreService;