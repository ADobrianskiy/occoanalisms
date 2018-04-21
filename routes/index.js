var express = require('express');
var router = express.Router();

const minSymbols = 3;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var words = require("./../words_dictionary")


router.post('/api/analyze', function (req, res) {
    var content = req.body.content;
    const matches = content
        .split(/\s/)
        .map(function (item) {

                
            var r = /^[”“'"()\[\]{},.’?:-;*]|['"()\[\]{},.’”“?:-;*]$/gi;

            return item.replace(r, "").replace(r, "").replace(r, "").replace(/’s$/gi, "");
        })
        .filter(function (item) {
            return !item.match(/\d/gi) && item.length >= minSymbols && !item.match(/[\d|[^A-Za-z0-9_-]]/) && !words[item.toLowerCase()];
        })
        .filter(onlyUnique)
        .sort(function (a, b) {
            return a < b;
        });

    res.send({
        matches: matches,
        processed: true
    });
});

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


module.exports = router;
