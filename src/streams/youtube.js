const configs = require('../configs');
const ending = require('../utils/ending');
const utils = require('../utils/utils');

/** 
 * Gets the video info from the url.
 * @param {string} url The youtube video URL
 */
async function getVideoInfo(url) {
    const video_id = url.split("?v=")[1];
    const api_url = "https://www.googleapis.com/youtube/v3/videos";
    const query = {
        part: "snippet",
        id: video_id,
        key: configs.keys.YOUTUBE_API_KEY
    }
    const full_api_url = utils.constructURLWithQueryStr(api_url, query);

    // Send API request
    const response = await fetch(full_api_url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    return response.json();
}

/**
 * Strip keywords in the title so it can be "searchable" on the streaming sites
 * @param {string} original_title The original youtube video title
 */
function getProperTitle(original_title) {
    let trimmed_title = original_title;
    for (const ending_str of ending.ending_strings) {
        if (original_title.includes(ending_str)) {
            trimmed_title = original_title.replace(ending_str, "");
            break;
        }
    }
    return trimmed_title.trim();
}

/**
 * Gets the Song and Artist title using Youtube's API.
 * Returns a "proper title" which is a string that contains both the song and artist name.
 * @param {string} url The URL of the Youtube video
 */
async function getSongAndArtist(url) {
    const vid_info = await getVideoInfo(url);
    const proper_title = getProperTitle(vid_info.items[0].snippet.title);
    return proper_title;
}

export {getSongAndArtist};