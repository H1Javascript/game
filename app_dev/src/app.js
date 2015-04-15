var Container = new ContainerInterface();

// Configurations template
Pages.setTemplatePath('libraries/views');

// Listening Routes
Routing.add('/', indexPageController.homeAction, true);
Routing.add('/signup', signupPageController.homeAction, true);


Routing.run();
