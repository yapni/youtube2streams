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

/* Listen for changes in URL and pass changed URL to content script */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        // Send changed url to content script in the specified tab
        console.log("changed url from background")
        chrome.tabs.sendMessage(tabId, {
            message: "changed_url",
            url: changeInfo.url
        });
    }
});