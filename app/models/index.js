'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Store = require("./store.model.js")(sequelize, Sequelize);
db.Population = require("./population.model.js")(sequelize, Sequelize);

// db.users = require("./user.model.js")(sequelize, Sequelize);
// db.treasures = require("./treasure.model.js")(sequelize, Sequelize);
// db.transfers = require("./transfer.model.js")(sequelize, Sequelize);
// db.sells = require("./sell.model.js")(sequelize, Sequelize);
// db.buys = require("./buy.model.js")(sequelize, Sequelize);

// db.users.hasMany(
//     db.treasures,
//     {
//         foreignKey: 'userGuid',
//         as: 'treasures'
//     }
// );
// db.treasures.belongsTo(db.users, { foreignKey: 'userGuid', as: 'vender' });

// db.users.hasMany(
//     db.buys,
//     {
//         foreignKey: 'buyerGuid'
//     }
// );
// db.buys.belongsTo(db.users, { foreignKey: 'buyerGuid', as: 'buyer' });

// db.users.hasMany(
//     db.transfers,
//     {
//         foreignKey: 'receiverGuid'
//     }
// );
// db.transfers.belongsTo(db.users, { foreignKey: 'receiverGuid', as: 'receiver' });


// db.treasures.hasOne(
//     db.transfers,
//     {
//         foreignKey: 'treasureGuid'
//     }
// );
// db.transfers.belongsTo(db.treasures, { foreignKey: 'treasureGuid', as: 'treasure' });

// db.treasures.hasOne(
//     db.sells,
//     {
//         foreignKey: 'treasureGuid'
//     }
// );
// db.sells.belongsTo(db.treasures, { foreignKey: 'treasureGuid', as: 'treasure' });


// db.sells.hasOne(
//     db.buys,
//     {
//         foreignKey: 'sellGuid'
//     }
// );
// db.buys.belongsTo(db.sells, { foreignKey: 'sellGuid' });

module.exports = db;
