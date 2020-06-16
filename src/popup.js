import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/button';
import '@fortawesome/fontawesome-free/css/all.min.css';

chrome.storage.sync.get(["spotify_link", "applemusic_link", "deezer_link"], function(result) {
    // Spotify
    if (typeof result.spotify_link != "undefined") {
        $("#spotify_btn").attr("disabled", false);
        $("#spotify_btn").on("click", function() {
            window.open(result.spotify_link);
        });
    }

    // Apple Music
    if (typeof result.applemusic_link != "undefined") {
        $("#applemusic_btn").attr("disabled", false);
        $("#applemusic_btn").on("click", function() {
            window.open(result.applemusic_link);
        });
    }

    // Deezer
    if (typeof result.deezer_link != "undefined") {
        $("#deezer_btn").attr("disabled", false);
        $("#deezer_btn").on("click", function() {
            window.open(result.deezer_link);
        });
    }
});