var gamePageController = {};


/**
 *
 * Demarre le jeu
 *
 */
gamePageController.homeAction = function () {
    Pages.display('game', $('#container'), function () {
        Container.add('music', new musicControllerInterface('https://api.soundcloud.com/tracks/195390349/stream?client_id=YOUR_CLIENT_ID'));
        Container.add('partition', new partitionControllerInterface('resources/partitions/test.json', function () {
            gamePageController.clickToPlay();
        }));
    });
};


/**
 *
 *
 */
gamePageController.clickToPlay = function () {
    gameController.startListening();
    gameController.setEndCallback(gamePageController.afterEndOfGame);
};


gamePageController.afterEndOfGame = function () {
    // Callback de la fin du jeu

};
