/** 
 * Returns a URL query string based on the key-value in the queries object 
 */
function constructQueryStr(queries) {
    let query_str = "";
    for (const [key, value] of Object.entries(queries)) {
        let encoded_value = (typeof value == "string") ? value.split(" ").join("%20") : value;
        query_str = query_str + key + "=" + encoded_value + "&";
    }
    return query_str.slice(0, -1);
}

/** 
 * Returns a URL with query string 
 * @param {string} url The URL address
 * @param {object} queries An object containing the queries 
 */
function constructURLWithQueryStr(url, queries) {
    let query_str = constructQueryStr(queries);
    return url + "?" + query_str;
}

export {constructQueryStr, constructURLWithQueryStr}