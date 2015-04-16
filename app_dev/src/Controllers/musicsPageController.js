var musicsPageController = {};


/**
 * /musics
 * Choix de la musique
 *
 */
musicsPageController.homeAction = function () {
    var isLogged = sessionModel.isLoggedIn();

    // Si l'utilisateur n'est pas connecte
    if (!isLogged) {
        window.location.hash = "/";
        return false;
    }

    isLogged.pull();
    Container.add('user', isLogged);

    Pages.setParam({
        'user':   Container.user.getFromCache(),
        'musics': musicsModel.get()
    });
    Pages.display('musics', $('#container'), function () {
        $('[data-play]').on('click', musicsPageController.play);
    });
};


/**
 *
 * Lorsque l'utilisateur choisis sa musique
 *
 */
musicsPageController.play = function () {
    var musicID = $(this).attr('data-play');

    musicsModel.setChosen(musicID);
    window.location.hash = "/play";
};
