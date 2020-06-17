import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/button';
import '@fortawesome/fontawesome-free/css/all.min.css';

chrome.storage.sync.get(["spotify_link", "applemusic_link", "deezer_link"], function(result) {
    let error_msg_element = $("<div class='text-danger' style='font-size:11px'>Song not found</div>");

    // Spotify
    if (typeof result.spotify_link != "undefined") {
        $("#spotify_btn").attr("disabled", false);
        $("#spotify_btn").on("click", function() {
            window.open(result.spotify_link);
        });
    }
    else {
        error_msg_element.clone().appendTo("#spotify_btn")
    }

    // Apple Music
    if (typeof result.applemusic_link != "undefined") {
        $("#applemusic_btn").attr("disabled", false);
        $("#applemusic_btn").on("click", function() {
            window.open(result.applemusic_link);
        });
    }
    else {
        error_msg_element.clone().appendTo("#applemusic_btn")
    }

    // Deezer
    if (typeof result.deezer_link != "undefined") {
        $("#deezer_btn").attr("disabled", false);
        $("#deezer_btn").on("click", function() {
            window.open(result.deezer_link);
        });
    }
    else {
        error_msg_element.clone().appendTo("#deezer_btn")
    }
});