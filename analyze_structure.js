const Epub = require('epub2').EPub;
const path = require('path');
const fs = require('fs');

const epubPath = path.join(__dirname, '鱼羊野史（全六卷）.epub');
const epub = new Epub(epubPath);

let totalH3 = 0;
let totalH4 = 0;
let processed = 0;
const total = 31;

epub.on('end', function() {
    console.log('Total spine items: ' + epub.spine.contents.length);

    epub.spine.contents.forEach(function(item) {
        epub.getChapter(item.id, function(err, text) {
            processed++;
            if (err || !text) {
                checkDone();
                return;
            }
            var h3Count = (text.match(/<h3[^>]*>/g) || []).length;
            var h4Count = (text.match(/<h4[^>]*>/g) || []).length;
            if (h3Count > 0 || h4Count > 0) {
                console.log(item.id + ': h3=' + h3Count + ' h4=' + h4Count);
            }
            totalH3 += h3Count;
            totalH4 += h4Count;
            checkDone();
        });
    });

    function checkDone() {
        if (processed >= total) {
            console.log('\nTotal h3 (date chapters): ' + totalH3);
            console.log('Total h4 (individual stories): ' + totalH4);
        }
    }
});

epub.parse();
