module.exports = (sequelize, Sequelize) => {
    const Population = sequelize.define("population", {
        guid: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        country: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        continent: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        year: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        population: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
    });

    return Population;
};