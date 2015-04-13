/**
 *
 * Initialise le stockage en ligne
 * @param object credentials
 * @param string bucket
 * @param string root
 *
 */
var storageOnlineInterfaceComponent = function (credentials, bucket, root) {
    if (!root) var root = './';

    AWS.config.update({accessKeyId: credentials.key, secretAccessKey: credentials.secret});
    AWS.config.region = "eu-west-1";
    this.bucketName = bucket;
    this.root = root;

    this.bucket = new AWS.S3({
        params: {
            Bucket: bucket
        }
    });
};


/**
 *
 * Ecrit un fichier
 * @param string datas (datas.fileName ; datas.content)
 * @param function callback
 *
 */
storageOnlineInterfaceComponent.prototype.write = function (datas, callback) {
    this.bucket.upload({
        Key: this.root + datas.fileName,
        ACL: 'public-read',
        Body: datas.content,
        Bucket: this.bucketName,
        ContentType: 'application/json'
    }, callback);
};


/**
 *
 * Recupere un fichier
 * @param string fileName
 * @param function callback
 *
 */
storageOnlineInterfaceComponent.prototype.get = function (fileName, callback) {
    this.bucket.getObject({
        Key: this.root + fileName,
        Bucket: this.bucketName
    }, function (err, data) {
        callback(err, data.Body.toString());
    });
};
