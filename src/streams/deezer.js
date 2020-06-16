const utils = require('../utils/utils');

/**
 * Get the Deezer tracks information based on the search result for query_title
 * @param {string} query_title Query used to search for the tracks in Deezer
 */
async function getTracks(query_title) {
    const url = "https://api.deezer.com/search/track";
    const query = {
        q: query_title,
        output: "json"
    };
    const full_api_url = utils.constructURLWithQueryStr(url, query);

    const response = await fetch(full_api_url, {"method": "GET"});

    return response.json();
}

/**
 * Gets the link to Deezer for the corresponding track
 * @param {string} title Title of the Youtube Video as a query to iTunes/Apple Music
 */
async function getLink(title) {
    const results = await getTracks(title);
    return results.data[0].link;
}

export {getLink};