/**
 *
 * Initialise le model
 * @param object aws
 * @param int userID
 *
 */
var userModelInterface = function (aws, userID) {
    this.datas = {};
    this.aws = aws;
    this.userID = userID;
};


/**
 *
 * Charge les donnee depuis le S3
 *
 */
userModelInterface.prototype.pull =  function () {
    var that = this;

    this.aws.get(this.userID +'.json', function (error, data) {
        if (error) {
            console.log(error);
            return false;
        }

        that.datas = JSON.parse(data);
    });
};


/**
 *
 * Envoie les donnees temporaires sur le S3
 *
 */
userModelInterface.prototype.push =  function () {
    var dataFormated = JSON.stringify(this.datas);

    this.aws.write({
        fileName: this.userID +'.json',
        content: dataFormated
    }, function (error, data) {
        if (error) {
            console.log(error);
            return false;
        }
    });
};


/**
 *
 * Recupere une information
 * @param string data
 * @return mixed
 *
 */
userModelInterface.prototype.get =  function (key) {
    if (!key) {
        return this.datas;
    }

    return this.datas[key];
};


/**
 *
 * Ecrit une information
 * @param string key
 * @param mixed value
 *
 */
userModelInterface.prototype.set =  function (key, value) {
    this.datas[key] = value;
};
