var sessionModel = {};


/**
 *
 * Verifie si l'utilisateur est deja connecte
 *
 */
sessionModel.isLoggedIn = function () {
    var userInfos = localStorage.getItem('userinfos');

    if (!userInfos) {
        return false;
    }

    userInfos = JSON.parse(userInfos);
    var userModel = new userModelInterface(Container.storageOnline, userInfos.userid);

    return userModel;
};
