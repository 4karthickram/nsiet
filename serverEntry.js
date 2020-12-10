
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 9000;
const csv = require('csvtojson')


app.listen(port, () => {
    console.log(`server listening at port ${port}`);
})

app.use(bodyParser.json())

app.get("/search", (req, res) => {
    csv().fromFile("./sample.csv").then((jsonObj) => {
        let results = [];
        let searchField = "Region";
        let searchVal = req.query.word;
        if (searchVal.match(/\d/g)) {
            res.send({ errorCode: 1, errorMessage: "Numbers cannot be searched in dictionary" })
        } else {
            for (let i = 0; i < jsonObj.length; i++) {
                if (jsonObj[i][searchField].includes(searchVal)) {
                    results.push(jsonObj[i][searchField]);
                }
            }
            res.send(results)
        }
    })
})

