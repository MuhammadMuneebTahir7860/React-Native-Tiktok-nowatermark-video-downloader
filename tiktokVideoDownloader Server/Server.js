const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
// create express app
const app = express();
// routes(app);
const videoDownloader=require('./components/video/VideoRoutes');
// define port to run express app
const port = process.env.PORT || 5000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Add endpoint

app.get("/", function (req, res) {
    res.send("Server is working");
});
app.use('/video',videoDownloader);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});