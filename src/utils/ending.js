// List of strings at the end of a youtube video title
var ending_strings = [
    // Surrounded by "[] or ()"
    "[MV]",
    "[M/V]",
    "(M/V)",
    "[Music Video]",
    "(Official Music Video)",
    "(Official Video)",
    "[Official Video]",
    "(Official Audio)",
    "(Audio)",
    "(Lyrics)",
    "(Lyric Video)",
    "(Lyrics Video)",
    "(Official Lyric Video)",
    "(Official Lyrics Video)",
    // Keywords on its own
    "Official Lyric Video",
    "Official Lyrics Video",
    "Official Video",
    "Official M/V",
    "Official MV",
    "Official Music Video",
    "Music Video Official",
    // Can be part of a keyword/on its own
    "Music Video",
    "Audio",
    "Lyrics",
    "M/V",
    "MV",
]

export {ending_strings}