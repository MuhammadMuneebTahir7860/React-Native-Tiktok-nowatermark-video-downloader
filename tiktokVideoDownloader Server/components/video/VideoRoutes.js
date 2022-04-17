const express = require('express');
const router = express.Router();

const {videoDownloader} = require('./VideoController');

router.post('/videoDownloader', (req, res) => {
    videoDownloader(req, res);
});

module.exports=router;