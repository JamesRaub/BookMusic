/**
 * Created by tal on 8/28/16.
 */

var data = require("./database.js");

module.exports = function(desired, cb) {
    var minError = Math.abs(desired - data[0].valence);
    var minTrack = data[0].id;

    var len = data.length;
    var count = 1;

    data.forEach(function(element) {
        var error = Math.abs(desired - element.valence);
        if (error < minError) {
            minError = error;
            minTrack = element.uri;
            console.log("--------------\n--------------\n-------------\n-----------------")
        }

        if (count < len) {
          count++;
        } else {
          cb(null, minTrack);
        }
    });
};
