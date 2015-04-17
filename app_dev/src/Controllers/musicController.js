/**
 *
 * Charge une musique
 * @param string music
 *
 */
var musicControllerInterface = function (music) {
    var musicElement = $('<audio src="'+ music +'">');
    $('#musics').html('');
    $('#musics').append(musicElement);

    this.musicElement = $('#musics audio').get(0);
};


/**
 *
 * Joue la musique
 *
 */
musicControllerInterface.prototype.play = function () {
    this.musicElement.play();
};


/**
 *
 * Recupere la duree
 *
 */
musicControllerInterface.prototype.getDuration = function () {
    this.musicElement.duration;
};


/**
 *
 * Arrete la musique
 *
 */
musicControllerInterface.prototype.stop = function () {
    this.musicElement.pause();
    this.musicElement.currentTime = 0;
};


/**
 *
 * Recupere le temps actuelle de jeu de la musique (en seconde)
 * @return float
 *
 */
musicControllerInterface.prototype.getTime = function () {
    var currentTime = this.musicElement.currentTime +"";
    currentTime = currentTime.split('.');
    currentTime = currentTime[0] +"."+ currentTime[1][0];

    return parseFloat(currentTime);
};


/**
 *
 * Met en pause la musique
 *
 */
musicControllerInterface.prototype.pause = function () {
    this.musicElement.pause();
};
