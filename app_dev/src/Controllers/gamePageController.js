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
    Pages.display('end', $('#container'), function () {
        $('#retry').on('click', gamePageController.retry);
        $('#share').on('click', gamePageController.share);
    });
};


/**
 *
 * Lorsque l'utilisateur retry
 *
 */
gamePageController.retry = function () {
    $('#retry').unbind('click');
    $('#share').unbind('click');

    gamePageController.homeAction();
};


/**
 *
 * Lorsque l'utilisateur partage son score
 *
 */
gamePageController.share = function () {
    var points = $(this).attr('data-points');
    var music = musicsModel.getChosen();

    var defisUrl =  "http://"+ window.location.host +"#/defis/"+ musicsModel.getChosenId() +"/"+ Container.user.get('userid');
    var message = "Essais de battre "+ points +" points sur '"+ music.title +"' de "+ music.artist;
    // Debug
    //defisUrl = "http://facebook.com";


    var facebookUrl = "https://www.facebook.com/dialog/feed?";
    facebookUrl += "app_id=354808114719015&";
    facebookUrl += "display=popup&";
    facebookUrl += "link="+ defisUrl +"&";
    facebookUrl += "name=Rhythmnastic&";
    facebookUrl += "description=Move your fingers&";
    //facebookUrl += "picture=&";
    facebookUrl += "caption="+ message +"&";
    facebookUrl += "redirect_uri=http://facebook.com";

    window.open(facebookUrl, 'Partage facebook', 'width=600, height=300');
};
