var gamePageController = {};


/**
 *
 * Affiche le jeu
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
 * Demarre le jeu
 *
 */
gamePageController.clickToPlay = function () {
    gameController.startListening();
    gameController.setEndCallback(gamePageController.afterEndOfGame);
};


/**
 *
 * Lorsque le jeu est fini
 * @param int points
 *
 */
gamePageController.afterEndOfGame = function (points) {
    Container.user.set('xp', Container.user.get('xp') + points);
    Container.user.push();

    Pages.setParam('points', points);
    Pages.setParam('music', musicsModel.getChosen());
    Pages.display('end', $('#container'));
};
