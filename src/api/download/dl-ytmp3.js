const axios = require('axios');

module.exports = function(app) {
    async function fetchYTMP3(url) {
        if (!url) throw new Error('Parameter URL diperlukan.');
        const endpoint = `https://api.akuari.my.id/downloader/youtubeaudio?link=${encodeURIComponent(url)}`;
        const { data } = await axios.get(endpoint);
        if (!data || !data.status) throw new Error('Gagal mengambil data.');
        return data;
    }

    app.get('/download/ytmp3', async (req, res) => {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ status: false, message: 'Masukkan parameter url.' });
        }

        try {
            const result = await fetchYTMP3(url);
            res.json({ status: true, result });
        } catch (err) {
            res.status(500).json({ status: false, error: err.message });
        }
    });
};
