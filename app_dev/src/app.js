var Container = new ContainerInterface();


// Configurations template
Pages.setTemplatePath('libraries/views');


// Quand on est sur mobile
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    Pages.display('mobile', $('#container'));
    return false;
}


// Container
Container.add('storageOnline', new storageOnlineInterfaceComponent({secret: '', key: ''}, 'assets.repoleak.com', 'HETIC/Rhythmnastic/Database/'));


// Listening Routes
Routing.add('/', indexPageController.homeAction, true);
Routing.add('/signup', signupPageController.homeAction, true);
Routing.add('/musics', musicsPageController.homeAction, true);
Routing.add('/play', gamePageController.homeAction, true);
Routing.add('/defis/([0-9]+):([0-9]+)', gamePageController.defisAction, true); // musique ; score


Routing.run();
