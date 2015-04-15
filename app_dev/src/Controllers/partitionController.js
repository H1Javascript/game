/**
 *
 * Charge la partition d'une musique
 * @param string partitionUrl
 *
 */
var partitionControllerInterface = function (partitionUrl, callback) {
    this.partition = {};
    var that = this;

    this.load(partitionUrl, function (partition) {
        that.partition = partition;
        callback();
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
 * @param int index
 *
 */
partitionControllerInterface.prototype.get = function (index) {
    if (index >= 0) return this.partition[index];

    return this.partition;
};
