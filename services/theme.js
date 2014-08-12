/**
 * Created by i070970 on 8/12/14.
 */
exports.getThemes = function(req, res) {
    res.json({
        status: 'OK',
        results: [
            'amelia',
            'cerulean',
            'cosmo',
            'cyborg',
            'darkly',
            'default',
            'flatly',
            'journal',
            'lumen',
            'readable',
            'simplex',
            'slate',
            'spacelab',
            'superhero',
            'united',
            'yeti'
        ]
    });
};