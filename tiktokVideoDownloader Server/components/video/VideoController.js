const tiktok = require('tiktok-scraper-without-watermark');
// const url = 'https://www.tiktok.com/@youneszarou/video/6942436555692805381'


module.exports.videoDownloader = async (req, res) => {
    const { url } = req.body;
    console.log(url);
    try {
        const data = await tiktok.tiktokdownload(url);
        res.json(data);
    }
    catch (err) {
        res.json(err);
    }
}