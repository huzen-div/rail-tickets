module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
        storeGuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        storeName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        storeImage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        storePhoneNumber: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        storeLocation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        storeEmail: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        storePassword: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        storeIsPublish: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    return Store;
};