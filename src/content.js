const appleMusic = require('./streams/applemusic');
const spotify = require('./streams/spotify');
const youtube = require('./streams/youtube');

/* Listen to messages from background.js for changed URLs */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "changed_url") {
        // Clear storage first so user don't get outdated links
        chrome.storage.sync.remove(["applemusic_link", "deezer_link", "spotify_link"]);

        // Process the Youtube title and then get the corresponding streaming links
        youtube.getSongAndArtist(request.url).then(title => {
            // Get the links to all of the streaming sites and store them in storage

            // Apple Music
            appleMusic.getLink(title).then(applemusic_link => {
                chrome.storage.sync.set({applemusic_link: applemusic_link});
            });

            // Spotify
            spotify.getAccessToken(function(access_token) {
                spotify.getLink(title, access_token).then(spotify_link => {
                    chrome.storage.sync.set({spotify_link: spotify_link});
                });
            });
        });
    }
});
