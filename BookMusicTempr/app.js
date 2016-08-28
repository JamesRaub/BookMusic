/**
 * Created by tal on 8/27/16.
 */

var SpotifyWebApi = require('spotify-web-api-node');
var server = require('./server.js');


//spotifyApi.searchTracks('Love', function(err, data) {
//    if (err) {
//        console.error('Something went wrong', err.message);
//        return;
//    }
//
//    // Print some information about the results
//    console.log('I got ' + data.body.tracks.total + ' results!');
//
//    // Go through the first page of results
//    var firstPage = data.body.tracks.items;
//    console.log('The tracks in the first page are.. (popularity in parentheses)');
//
//    /*
//     * 0: All of Me (97)
//     * 1: My Love (91)
//     * 2: I Love This Life (78)
//     * ...
//     */
//    firstPage.forEach(function(track, index) {
//        console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
//    });
//});

var scopes = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
        'playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read', 'user-library-read',
        'user-library-modify', 'user-read-private', 'user-read-birthdate', 'user-read-email', 'user-top-read'],
    redirectUri = 'https://localhost:8888/callback',
    clientId = '5c352b51039646128c2b9ab2c19a17e5',
    state = 'not-broken';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId : clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

console.log(authorizeURL);
