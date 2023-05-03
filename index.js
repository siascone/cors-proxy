const express = require("express");
const cors = require("cors");
const axios = require("axios");

if (process.env.NODE_ENV === "development") {
    console.log('in development mode')
    require("dotenv").config();
}

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    if (req.query.q) {
        let url = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}`
        let q = req.query.q;
        let aqi = req.query.aqi
        let fetchUrl = `${url}&q=${q}&${aqi}`;
        axios.get(fetchUrl)
            .then(resBody => res.send(resBody.data));
    } else {
        res.send("Hello World!");
    }
});

app.listen(5001, () => {
    console.log("Listening on PORT: 5001")
})

// test query with /?q=boulder&aqi=no