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
            const specSymbols = ["'", "\"", "(", ")", "`"];
            if (item.length >= 2 && specSymbols.indexOf(item[0]) !== -1 &&
                specSymbols.indexOf(item[item.length - 1]) !== -1) {
                item = item.slice(1, item.length - 1)
            }
            return item;
        })
        .filter(function (item) {
            return item.length >= minSymbols && !item.match(/[\d|[^A-Za-z0-9_-]]/) && !words[item.toLowerCase()];
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
