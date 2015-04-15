var indexPageController = {};


/**
 * /
 * Homepage
 *
 */
indexPageController.homeAction = function () {
    Pages.display('home', $('#container'), function () {
        setTimeout(function () { $('h1').addClass('active'); }, 500);
        setTimeout(function () { $('.startingText').addClass('active'); }, 2000);

        $(document).on('keyup', indexPageController.homeKeyUp);
    });
};


/**
 *
 * Lorsque l'utilisateur appuis sur une touche
 *
 */
indexPageController.homeKeyUp = function () {
    setTimeout(function () { window.location.hash = "/signup"; }, 1000);
    setTimeout(function () { $('h1').removeClass('active'); }, 500);
    $('.startingText').removeClass('active');
};
