const bcrypt = require('bcryptjs');

const Utils = {
    genHash: async (password) => {
        const saltRounds = 10;
        const hash = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        return hash;
    },
    compareHash: async (password, hash) => {
        const isMatch = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function (err, isMatch) {
                if (err) reject(err)
                resolve(isMatch)
            });
        })
        return isMatch;
    },
    convertExcelToJson: async (inputFile, outputFile, sheetName) => {
        const exceljs = require('exceljs');
        const jsonfile = require('jsonfile');
        const fs = require('fs');
        const path = inputFile;
        const excel = fs.realpathSync(path);
        const wb = new exceljs.Workbook;
        return new Promise(function (resolve, reject) {
            try {
                const jsonResponse = [];
                wb.xlsx.readFile(excel).then(async function () {
                    const worksheet = wb.getWorksheet(sheetName);
                    for (const row of worksheet.getSheetValues()) {
                        const rowObject = {};
                        if (row) {
                            for (const [colNumber, cell] of row.entries()) {
                                if (cell) {
                                    if (colNumber === 1) {
                                        rowObject.country = cell;
                                    }
                                    else if (colNumber === 2) {
                                        rowObject.continent = cell;
                                    }
                                    else if (colNumber === 3) {
                                        rowObject.year = cell;
                                    }
                                    else if (colNumber === 4) {
                                        rowObject.population = cell;
                                    }
                                    else {
                                        rowObject[`col${colNumber}`] = cell;
                                    }
                                }
                            }
                            jsonResponse.push(rowObject);
                        }
                    }
                    jsonfile.writeFileSync(outputFile, jsonResponse, { spaces: 4 });
                    resolve(jsonResponse);
                })
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        })
    },
    // convertExcelToJson: async (inputFile, outputFile, sheetName) => {
    //     const exceljs = require('exceljs');
    //     const jsonfile = require('jsonfile');
    //     const fs = require('fs');
    //     const path = inputFile;
    //     const excel = fs.realpathSync(path);
    //     const wb = new exceljs.Workbook;
    //     return new Promise(function (resolve, reject) {
    //         try {
    //             const jsonResponse = [];
    //             wb.xlsx.readFile(excel).then(async function () {
    //                 const worksheet = wb.getWorksheet(sheetName);
    //                 for (var i = 1; i <= worksheet.actualRowCount; i++) {
    //                     const rowObject = {};
    //                     for (var j = 1; j <= worksheet.actualColumnCount; j++) {
    //                         let data = worksheet.getRow(i).getCell(j).toString();
    //                         if (j === 1) {
    //                             rowObject.country = data;
    //                         }
    //                         else if (j === 2) {
    //                             rowObject.continent = data;
    //                         }
    //                         else if (j === 3) {
    //                             rowObject.year = data;
    //                         }
    //                         else if (j === 4) {
    //                             rowObject.population = data;
    //                         }
    //                     }
    //                     jsonResponse.push(rowObject);
    //                 }
    //                 jsonfile.writeFileSync(outputFile, jsonResponse, { spaces: 4 });
    //                 resolve(jsonResponse);
    //             })
    //         } catch (error) {
    //             console.error('Error:', error);
    //             reject(error);
    //         }
    //     })
    // },
}
module.exports = Utils;