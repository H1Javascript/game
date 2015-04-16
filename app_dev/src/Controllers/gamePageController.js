var gamePageController = {};


/**
 *
 * Demarre le jeu
 *
 */
gamePageController.homeAction = function () {

    if (!musicsModel.existsChosen()) {
        window.location.hash = "/musics";
        return false;
    }

    Pages.setParam('music', musicsModel.getChosen());
    Pages.display('game', $('#container'), function () {
        Container.add('music', new musicControllerInterface(musicsModel.getChosen().music));
        Container.add('partition', new partitionControllerInterface(musicsModel.getChosen().partition, function () {
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


gamePageController.afterEndOfGame = function (points) {


};
