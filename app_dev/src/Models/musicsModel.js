var musicsModel = {
    musics: {
        "1": {
            artist: "U2",
            title: "Beautiful day",
            music: "http://srv60.clipconverter.cc/download/4pmaaWpg5KWmqW9o4pSXanJimWpqbGm0qc%2FMqHyf1qiZpa2d2A%3D%3D/U2%20-%20Beautiful%20Day.mp3",
            partition: "resources/partitions/u2.json"
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
