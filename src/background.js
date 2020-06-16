const appleMusic = require('./streams/applemusic');
const spotify = require('./streams/spotify');
const youtube = require('./streams/youtube');

/*  Condition for page action: on a youtube video page
    A youtube video URL look like https://www.youtube.com/watch?v=... */
var page_action_rule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: "www.youtube.com",
                schemes: ["https"],
                pathContains: "watch",
                queryPrefix: "v"
            }
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}

/* First load */
chrome.runtime.onInstalled.addListener(function() {
    // Rule for page action
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([page_action_rule])
    });
});

/* Listen for changes in URL */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Check if user is in a Youtube watch page
    let youtube_watch_reg = /https:\/\/www.youtube\.com\/watch\?v=.+$/;
    if (changeInfo.url && changeInfo.url.match(youtube_watch_reg)) {
        // Clear storage first so user don't get outdated links
        chrome.storage.sync.remove(["applemusic_link", "deezer_link", "spotify_link"]);

        // Process the Youtube title and then get the corresponding streaming links
        youtube.getSongAndArtist(changeInfo.url).then(title => {
            // Get the links to all of the streaming sites and store them in storage

            //DEBUG
            console.log("title obtained ", title);

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