var gameController = {};


/**
 *
 * Commence a ecouter les touches du clavier
 *
 */
gameController.startListening = function () {
    $(document).on('keyup', gameController.listenKeys);
};


/**
 *
 * Arrete d'ecouter les touches du clavier
 *
 */
gameController.endListening = function () {

};


/**
 *
 * Verifie les touches pressees
 *
 */
gameController.listenKeys = function (event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
        case 38:
            
            break;
    }
};
