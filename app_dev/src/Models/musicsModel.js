var musicsModel = {
    musics: {
        "1": {
            artist: "U2",
            title: "Beautiful day",
            music: "https://api.soundcloud.com/tracks/195390349/stream?client_id=YOUR_CLIENT_ID",
            partition: "resources/partitions/test.json"
        },
        "2": {
            artist: "Taylor Swift",
            title: "Blank space",
            music: "",
            partition: "resources/partitions/test.json"
        },
        "3": {
            artist: "Daft Punk",
            title: "Get lucky",
            music: "",
            partition: "resources/partitions/test.json"
        },
        "4": {
            artist: "Kayplex",
            title: "Lights",
            music: "",
            partition: "resources/partitions/test.json"
        },
        "5": {
            artist: "Misterwives",
            title: "Our own house",
            music: "",
            partition: "resources/partitions/test.json"
        },
        "6": {
            artist: "Gesafelstein",
            title: "Pursuit",
            music: "",
            partition: "resources/partitions/test.json"
        },
    },
    chosen: 0
};


/**
 *
 * Recupere les musiques
 *
 */
musicsModel.get = function () {
    return this.musics;
};


/**
 *
 * Definie la musique choisie
 *
 */
musicsModel.setChosen = function (music) {
    this.chosen = music;
};


/**
 *
 * Recupere la musique choisie
 * @return object
 *
 */
musicsModel.getChosen = function () {
    return this.musics[this.chosen];
};


/**
 *
 * Verifie que le chosen est ok
 * @return boolean
 *
 */
musicsModel.existsChosen = function () {
    if (!this.musics[this.chosen]) return false;

    return true;
}
