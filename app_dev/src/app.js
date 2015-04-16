var Container = new ContainerInterface();


// Configurations template
Pages.setTemplatePath('libraries/views');


// Container
Container.add('storageOnline', new storageOnlineInterfaceComponent({secret: 'Ns/cn0NTQkYdRLJfYT3pFd+eATJt+6RNzw3HVuY5', key: 'AKIAIS5UWNY6W6BZVIAA'}, 'assets.repoleak.com', 'HETIC/Rhythmnastic/Database/'));


// Listening Routes
Routing.add('/', indexPageController.homeAction, true);
Routing.add('/signup', signupPageController.homeAction, true);


Routing.run();
