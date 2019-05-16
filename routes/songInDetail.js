const express = require('express');
const router = express.Router();


//scraping tool
const puppeteer = require('puppeteer');

//get song in depth details from scraping shazam
router.get("/:songKey/:songAlias", (req, res) => {
    let songKey = (req.params.songKey);
    let songAlias = (req.params.songAlias);
    let urlSong = `https://www.shazam.com/track/${songKey}/${songAlias}`;
    let response = {};
    (async () => {
        const browser = await puppeteer.launch({ 'args' : [
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ] });
        const page = await browser.newPage();
        try {
            await page.goto(urlSong);
            await page.waitForSelector('.lyrics');
            await page.waitForSelector('div.vd-box.img-on.animEnd > a');
            const lyricsText = await page.evaluate(() => document.querySelector('.lyrics').innerText);
            const youtubeLink = await page.evaluate(() => document.querySelector('div.vd-box.img-on.animEnd > a').href);
            const topSongs = await page.evaluate(() => {
                const songs = Array.from(document.querySelectorAll('div.title a.ellip'))
                return songs.map(item => item.innerHTML)
            });
            response["lyricsText"] = lyricsText;
            response["youtubeLink"] = "https://www.youtube.com/embed/" + youtubeLink.split('watch?v=')[1];
            response["topTenSongs"] = topSongs;
            res.json(response);

        } catch (error) {
            browser.close();
            res.json({ message: "failed!" });
        }
    })();
});


module.exports = router;
