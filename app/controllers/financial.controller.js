const db = require("../models");
const Store = db.Store;

const readXlsxFile = require("read-excel-file/node");

const futureName = "financial";
const upload = async (req, res) => {
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
                    segment: row[0],
                    country: row[1],
                    product: row[2],
                    discountBrand: row[3],
                    unitsSold: row[4],
                    manufacturingPrice: row[5],
                    salePrice: row[6],
                };
                excelDatas.push(excelData);
            });
            res.send({
                message: "Uploaded the file successfully. File name: " + req.file.originalname,
                data: excelDatas,
            });

            // Store.bulkCreate(financials)
            //     .then(() => {
            //         res.status(200).send({
            //             message: "Uploaded the file successfully: " + req.file.originalname,
            //         });
            //     })
            //     .catch((error) => {
            //         res.status(500).send({
            //             message: "Fail to import data into database!",
            //             error: error.message,
            //         });
            //     });
        });
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || `Some error occurred while upload ${futureName} ${req.file.originalname}.`
        });
    }
};

// const financials = (req, res) => {
//     Store.findAll()
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving financials.",
//             });
//         });
// };

module.exports = {
    upload,
    // financials,
};