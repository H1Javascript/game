/**
 *
 * Charge la partition d'une musique
 * @param string partitionUrl
 *
 */
var partitionControllerInterface = function (partitionUrl) {
    this.partition = {};
    var that = this;

    this.load(partitionUrl, function (partition) {
        that.partition = partition;
    });
};


/**
 *
 * Telecharge et interprete la partition
 * @param string partitionUrl
 * @param function callback
 *
 */
partitionControllerInterface.prototype.load = function (partitionUrl, callback) {
    $.get(partitionUrl, function (data) {
        callback(data);
    });
};


/**
 *
 * Recupere la partition d'un moment donne
 * @param int moment
 *
 */
partitionControllerInterface.prototype.get = function (moment) {
    return this.partition[moment];
};


/**
 *
 * Verifie l'existance d'une partition pour le moment X
 * @param int moment
 * @param string key
 * @return bool
 *
 */
partitionControllerInterface.prototype.exists = function (moment, key) {
    if (!key && !this.partition[moment]) {
        return false;
    }

    if (key && !this.partition[moment]) {
        return false;
    }

    if (key && this.partition[moment] != key) {
        return false;
    }

    return true;
};
