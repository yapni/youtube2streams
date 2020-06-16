const utils = require('../utils/utils');

/**
 * Get the Apple Music tracks information based on the search result for query_title
 * @param {string} query_title Query used to search for the tracks in iTunes/Apple Music
 */
async function getTracks(query_title) {
    const url = "https://itunes.apple.com/search";
    const query = {
        term: query_title,
        media: "music",
        entity: "song",
        limit: 1
    };
    const full_api_url = utils.constructURLWithQueryStr(url, query);

    const response = await fetch(full_api_url, {"method": "GET"});

    return response.json();
}

/**
 * Gets the link to Apple Music for the corresponding track
 * @param {string} title Title of the Youtube Video as a query to iTunes/Apple Music
 */
async function getLink(title) {
    const data = await getTracks(title);
    return data.results[0].trackViewUrl;
}

export {getLink};