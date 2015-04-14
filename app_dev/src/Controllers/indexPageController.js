var indexPageController = {};


/**
 * /
 * Homepage
 *
 */
indexPageController.homeAction = function () {
    Container.add('music', new musicControllerInterface('http://srv77.clipconverter.cc/download/4pSVbm9ln2ltY7Wr2Nmab7VhnGRtY2xwmZmVtHyc0aJ3oqeuy9XXnas%3D/Alesso%20-%20Heroes%20%28we%20could%20be%29%20ft.%20Tove%20Lo.mp3'));

    gameController.startListening();
};
