var musicsModel = {
    musics: {
        "1": {
            artist: "U2",
            title: "Beautiful day",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/U2_Beautiful_Day.mp3",
            partition: "resources/partitions/u2beautiful.json"
        },
        "2": {
            artist: "Taylor Swift",
            title: "Blank space",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Taylor_Swift_Blank_Space.mp3",
            partition: "resources/partitions/swiftblank.json"
        },
        "3": {
            artist: "Daft Punk",
            title: "Get lucky",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Daft_Punk_Get_Lucky.mp3",
            partition: "resources/partitions/daftlucky.json"
        },
        "4": {
            artist: "Klayplex",
            title: "Lights",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Klaypex_Lights.mp3",
            partition: "resources/partitions/klayplexlights.json"
        },
        "5": {
            artist: "Misterwives",
            title: "Our own house",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/MisterWives+_Our_Own_House.mp3",
            partition: "resources/partitions/misterwivesour.json"
        },
        "6": {
            artist: "Gesafelstein",
            title: "Pursuit",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Gesaffelstein_Pursuit.mp3",
            partition: "resources/partitions/gesapursuit.json"
        },
        "7": {
            artist: "Wiz Kahlifa ft. Charlie Puth",
            title: "See you again",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Wiz_Khalifa_See_You_Again.mp3",
            partition: "resources/partitions/wizseeyou.json"
        },
        "8": {
            artist: "Maroon 5",
            title: "Sugar",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Maroon_Sugar.mp3",
            partition: "resources/partitions/maroonsugar.json"
        },
        "9": {
            artist: "Bruno Mars",
            title: "Uptown Funk",
            music: "https://s3-eu-west-1.amazonaws.com/assets.repoleak.com/HETIC/Rhythmnastic/Musics/Bruno_Mars_Uptown_Funk.mp3",
            partition: "resources/partitions/brunouptown.json"
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
 * Recupere l'id de la musique choisie
 * @return int
 *
 */
musicsModel.getChosenId = function () {
    return this.chosen;
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
