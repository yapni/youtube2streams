const configs = require('../configs');
const utils = require('../utils/utils');

/**
 * Get the access token info requried for making Spotify API requests.
 */
async function getAccessTokenInfo() {
    const url = "https://accounts.spotify.com/api/token";
    const client_id = configs.keys.SPOTIFY_CLIENT_ID;
    const client_secret = configs.keys.SPOTIFY_CLIENT_SECRET;
    
    // Form data
    const data = new URLSearchParams({"grant_type": "client_credentials"})
    
    const response = await fetch(url, {
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": "Basic " + btoa(client_id + ":" + client_secret)
        },
        "body": data
    });

    return response.json();
}

/**
 * Gets Spotify's access token required to access its API.
 * @param {function} callback Function to call after token is fetched
 */
function getAccessToken(callback) {
    // Check if token exists first. Since the token will always be stored with
    // the expiry, we just have to check if the expiry exists in storage.
    chrome.storage.sync.get("spotify_access_token_expiry", async function(result) {
        const now = Date.now()
        if (typeof result.spotify_access_token_expiry == "undefined" ||
            now >= result.spotify_access_token_expiry) {
            // Token does not exist in storage or has expired:
            // Get new access token
            let data = await getAccessTokenInfo();

            // Save access token and expiry datetime
            const expiry = Date.now() + (data.expires_in * 1000);
            chrome.storage.sync.set({spotify_access_token: data.access_token});
            chrome.storage.sync.set({spotify_access_token_expiry: expiry});
            
            callback(data.access_token);
        }
        else {
            // Token exists and has not expired:
            // Get access token
            chrome.storage.sync.get("spotify_access_token", function(result) {
                callback(result.spotify_access_token);
            });
        }
    });
}

/**
 * Get the Spotify tracks info based on the search result from query_title
 * @param {string} query_title Query used to search for the tracks in Spotify
 * @param {string} access_token Spotify access token
 */
async function getTracks(query_title, access_token) {
    const url = "https://api.spotify.com/v1/search";
    const query = {q: query_title, type: "track"};
    const full_api_url = utils.constructURLWithQueryStr(url, query)
    
    const response = await fetch(full_api_url, {
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "authorization": "Bearer " + access_token
        }
    });
    
    return response.json();
}

/**
 * Gets the link to Spotify for the corresponding track
 * @param {string} title Title of the Youtube Video as a query to Spotify
 * @param {string} access_token Spotify API access token
 */
async function getLink(title, access_token) {
    const data = await getTracks(title, access_token);
    return data.tracks.items[0].external_urls.spotify;
}

export {getAccessToken, getLink};