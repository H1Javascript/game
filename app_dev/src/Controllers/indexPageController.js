var indexPageController = {};


/**
 * /
 * Homepage
 *
 */
indexPageController.homeAction = function () {
    Container.add('music', new musicControllerInterface('https://api.soundcloud.com/tracks/195390349/stream?client_id=YOUR_CLIENT_ID'));
    Container.add('partition', new partitionControllerInterface('resources/partitions/test.json', gameController.startListening));
};
