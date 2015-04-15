var gameController = {
    partitionIndex: 0,
    refresh: null,
    startTime: 0,
    alreadyPressed: false,
};


gameController.getTimeOffset = function () {
    return new Date().getTime() - gameController.startTime;
};


/**
 *
 * Commence a ecouter les touches du clavier
 *
 */
gameController.startListening = function () {
    Container.music.play();

    gameController.startTime = new Date().getTime();
    gameController.refresh = setInterval(gameController.displayBounds, (1000 / 10));

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
 * Verifie la touche appuyee
 * @param string direction
 *
 */
gameController.check = function (direction) {
    var points = 0;
    var partition = Container.partition.get(gameController.partitionIndex);

    if (gameController.alreadyPressed) return false;

    if (direction == partition.type) {
        points = (5 - Math.round(((partition.timestamp - gameController.getTimeOffset()) / 100)));
    }

    //console.log((partition.timestamp - gameController.getTimeOffset()) +" -- "+ Container.partition.get(gameController.partitionIndex).type);

    if (points > 0) {
        // ajoute points
        $('#points').html(parseInt($('#points').html()) + (points * 100));
    }

    // affiche texte
    var text = "";

    if (points >= 4) {
        $('#playerIndicator').addClass('perfect');
        text = "Parfait";
    } else if (points >= 2) {
        text = "Bien";
        $('#playerIndicator').addClass('notbad');
    } else if (points == 1) {
        text = "Pas mal";
        $('#playerIndicator').addClass('notbad');
    } else {
        $('#playerIndicator').addClass('fail');
    }

    $('#playerIndicator h1').html(text);

    setTimeout(function () {
        $('#playerIndicator h1').html('');
        $('#playerIndicator').removeClass('perfect').removeClass('notbad').removeClass('fail');
    }, 300);

    gameController.alreadyPressed = true;
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
            gameController.check("up");
            break;
        case 37:
            gameController.check("left");
            break;
        case 39:
            gameController.check("right");
            break;
        case 40:
            gameController.check("bottom");
            break;
    }
};


/**
 *
 * Affiche les ronds
 *
 */
gameController.displayBounds = function () {
    if (gameController.partitionIndex >= Container.partition.get().length) {
        clearInterval(gameController.refresh);
        Container.music.stop();
        console.log('Fin du jeu');
        return false;
    }

    var partition = Container.partition.get(gameController.partitionIndex);
    var difference = Math.round((partition.timestamp - gameController.getTimeOffset()) / 100);

    if (difference == 9 && $('[data-index="'+ gameController.partitionIndex +'"]').length == 0) {
        $('#playerIndicator').append('<div class="round '+ Container.partition.get(gameController.partitionIndex).type +'" data-index="'+ gameController.partitionIndex +'"></div>');
    }

    if (difference < -4) {
        gameController.alreadyPressed = false;
        gameController.partitionIndex++;
    }
};
