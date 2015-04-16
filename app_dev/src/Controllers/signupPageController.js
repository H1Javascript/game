var signupPageController = {};


/**
 * /signup
 * Signup
 *
 */
signupPageController.homeAction = function () {
    var isLogged = sessionModel.isLoggedIn();

    // Si l'utilisateur est deja connecte
    if (isLogged) {
        isLogged.pull();
        Container.add('user', isLogged);
        window.location.hash = "/musics";
        return false;
    }

    Pages.display('signup', $('#container'), function () {
        $('#signupForm').on('submit', signupPageController.submitPseudo);
    });
};


/**
 *
 * Lorsque l'utilisateur soumet son pseudo
 *
 */
signupPageController.submitPseudo = function (event) {
    event.preventDefault();
    var username = $('#username').val();
    var userid = Math.ceil(Math.random() * 100000);

    Container.add('user', new userModelInterface(Container.storageOnline, userid));
    Container.user.set('username', username);
    Container.user.set('xp', 0);
    Container.user.set('scores', {});
    Container.user.push();

    window.location.hash = "/musics";
}
