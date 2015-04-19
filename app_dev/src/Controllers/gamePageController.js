var gamePageController = {
    defis: false,
    pointsToReach: 0
};


/**
 *
 * /play
 * Affiche le jeu
 *
 */
gamePageController.homeAction = function () {

    if (!musicsModel.existsChosen()) {
        window.location.hash = "/musics";
        return false;
    }

    Pages.setParam('music', musicsModel.getChosen());
    Pages.setParam('defis', gamePageController.defis);
    Pages.setParam('scoreToReach', gamePageController.pointsToReach);

    Pages.display('game', $('#container'), function () {
        Container.add('music', new musicControllerInterface(musicsModel.getChosen().music));
        Container.add('partition', new partitionControllerInterface(musicsModel.getChosen().partition, function () {
            gamePageController.clickToPlay();
        }));
    });
};


/**
 *
 * /defis/{music}:{score}
 * Defis
 *
 */
gamePageController.defisAction = function (params) {
    var music = params[0];
    var score = params[1];
    var isLogged = sessionModel.isLoggedIn();

    if (!isLogged) {
        window.location.hash = "/";
        return false;
    }

    isLogged.pull();
    Container.add('user', isLogged);

    gamePageController.defis = true;
    gamePageController.pointsToReach = score;
    musicsModel.setChosen(music);

    gamePageController.homeAction();
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
    var endPage = "end";

    Container.user.set('xp', Container.user.get('xp') + points);
    Container.user.push();

    if (gamePageController.defis) {
        Pages.setParam('pointsToReach', gamePageController.pointsToReach);
        endPage = "end_defis";
    }

    Pages.setParam('points', points);
    Pages.setParam('music', musicsModel.getChosen());
    Pages.display(endPage, $('#container'), function () {
        $('#retry').on('click', gamePageController.retry);
        $('#share').on('click', gamePageController.share);
        $('#continue').on('click', gamePageController.continue);
    });
};


/**
 *
 * Desecoute les evenements
 *
 */
gamePageController.unbind = function () {
    $('#retry').unbind('click');
    $('#continue').unbind('click');
    $('#share').unbind('click');
};


/**
 *
 * Lorsque l'utilisateur retry
 *
 */
gamePageController.retry = function () {
    gamePageController.unbind();
    gamePageController.homeAction();
};


/**
 *
 * Lorsque l'utilisateur continue
 *
 */
gamePageController.continue = function () {
    if (gamePageController.defis) {
        gamePageController.defis = false;
        gamePageController.pointsToReach = 0;
    }

    gamePageController.unbind();

    window.location.hash = "/musics";
};


/**
 *
 * Lorsque l'utilisateur partage son score
 *
 */
gamePageController.share = function () {
    var points = $(this).attr('data-points');
    var music = musicsModel.getChosen();

    var defisUrl =  encodeURIComponent("http://rhythmnastic.herokuapp.com#/defis/"+ musicsModel.getChosenId() +":"+ points);
    var message = "Essais de battre "+ points +" points sur '"+ music.title +"' de "+ music.artist;
    // Debug
    //defisUrl = "http://facebook.com";


    var facebookUrl = "https://www.facebook.com/dialog/feed?";
    facebookUrl += "app_id=354808114719015&";
    facebookUrl += "display=popup&";
    facebookUrl += "link="+ defisUrl +"&";
    facebookUrl += "name=Rhythmnastic&";
    facebookUrl += "caption=Move your fingers&";
    facebookUrl += "description="+ message +"&";
    facebookUrl += "picture=http://rhythmnastic.herokuapp.com/resources/images/musics/"+ musicsModel.getChosenId() +".jpg&";
    facebookUrl += "redirect_uri=http://facebook.com";

    window.open(facebookUrl, 'Partage facebook', 'width=600, height=300');
};
