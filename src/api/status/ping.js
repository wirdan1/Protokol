const os = require('os');

module.exports = function (app) {
    const startTime = Date.now();
    let totalRequest = 0;
    const totalFitur = 16;
    const domain = 'admindanzgtg.biz.id';

    function formatRuntime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    app.use((req, res, next) => {
        totalRequest++;
        next();
    });

    app.get('/api/status', (req, res) => {
        const runtime = formatRuntime(Date.now() - startTime);

        res.json({
            status: true,
            creator: "Hookrest Team",
            result: {
                status: "Aktif",
                totalrequest: totalRequest.toString(),
                totalfitur: totalFitur.toString(),
                runtime,
                domain
            }
        });
    });
};
