/**
 * Created by tal on 8/28/16.
 */

var SpotifyWebApi = require('spotify-web-api-node');

var go = function() {
    var scopes = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
            'playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read', 'user-library-read',
            'user-library-modify', 'user-read-private', 'user-read-birthdate', 'user-read-email', 'user-top-read'],
        redirectUri = 'http://localhost:8888/callback',
        clientId = '5c352b51039646128c2b9ab2c19a17e5',
        state = 'not-broken';

    //scopes = ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
//    'playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read', 'user-library-read',
  //      'user-library-modify', 'user-read-private', 'user-read-birthdate', 'user-read-email', 'user-top-read'],

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
    var spotifyApi = new SpotifyWebApi({
        redirectUri : redirectUri,
        clientId : clientId
    });

// Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    return authorizeURL;
};

module.exports = go;
