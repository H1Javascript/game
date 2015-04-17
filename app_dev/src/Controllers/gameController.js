var gameController = {
    // Jeu
    partitionIndex: 0,
    refresh: null,
    startTime: 0,
    alreadyPressed: false,
    points: 0,
    endCallback: function () {},

    // Elements jQuery
    container: null,
    touches: null,
    pointsContainer: null
};


/**
 *
 * Definie les parametres
 *
 */
gameController.setParams = function (container, touches, pointsContainer) {
    this.container = container;
    this.touches = touches;
    this.pointsContainer = pointsContainer;
};


/**
 *
 * Definie le callback de fin du jeu
 * @param function callback
 *
 */
gameController.setEndCallback = function (callback) {
    this.endCallback = callback
};


/**
 *
 * Recupere le temps ecoule depuis le debut du jeu
 * @return int
 *
 */
gameController.getTimeOffset = function () {
    return new Date().getTime() - gameController.startTime;
};


/**
 *
 * Ajoute les points aux points utilisateur
 * @param int points
 *
 */
gameController.addPoints = function (points) {
    this.points += points;
};


/**
 *
 * Definie l'etat actuel de la reponse
 * @param string text
 * @param string classe
 *
 */
gameController.setState = function (text, classe) {
    gameController.container.children('h1').html(text);
    gameController.container.addClass(classe);

    setTimeout(function () {
        gameController.container.children('h1').html('');
        gameController.container.removeClass(classe);
    }, 300);
};


/**
 *
 * Recupere les points utilisateurs
 * @param int
 *
 */
gameController.getPoints = function () {
    return this.points;
};


/**
 *
 * Commence a ecouter les touches du clavier
 *
 */
gameController.startListening = function () {
    Container.music.play();

    gameController.startTime = new Date().getTime();
    gameController.setParams(
        $('#playerIndicator'),
        $('#playerKeys').children('button'),
        $('#points')
    );
    gameController.refresh = setInterval(gameController.displayBounds, (1000 / 10));

    $(document).on('keyup', gameController.listenKeys);
};


/**
 *
 * Reset le jeu
 *
 */
gameController.reset = function () {
    clearInterval(gameController.refresh);
    $(document).unbind('keyup');

    gameController.points = 0;
    gameController.refresh = 0;
    gameController.partitionIndex = 0;
    gameController.startTime = 0;
    gameController.alreadyPressed = false;
};


/**
 *
 * Fonction declanchee lorsque le jeu est fini
 *
 */
gameController.gameEnded = function () {
    var points = gameController.getPoints();
    gameController.reset();
    gameController.endCallback(points);
    Container.music.stop();
};


/**
 *
 * Verifie les touches pressees
 *
 */
gameController.listenKeys = function (event) {
    event.preventDefault();
    var keyCode = event.keyCode;
    var direction = "";

    switch (keyCode) {
        case 71: // G
            direction = "up";
            break;
        case 70: // F
            direction = "left";
            break;
        case 74: // J
            direction = "right";
            break;
        case 72: // H
            direction = "bottom";
            break;
    }

    if (direction != "") {
        gameController.check(direction);
        $('#playerKeys .'+ direction).addClass('pressed');
        setTimeout(function () { $('#playerKeys .pressed').removeClass('pressed'); }, 1000);
    }
};


/**
 *
 * Met a jour le timer
 *
 */
gameController.updateTimer = function () {
    var currentTime = parseInt(Container.music.getTime());
    currentTimeMinute = Math.floor(currentTime / 60);
    currentTimeSeconds = currentTime - (currentTimeMinute * 60);

    var totalTime = Math.floor(Container.music.musicElement.duration);
    var totalTimeMinute = Math.floor(totalTime / 60);
    var totalTimeSeconds = totalTime - (totalTimeMinute * 60);

    totalTimeMinute = (totalTimeMinute > 9) ? totalTimeMinute : "0"+ totalTimeMinute;
    totalTimeSeconds = (totalTimeSeconds > 9) ? totalTimeSeconds : "0"+ totalTimeSeconds;
    totalTime = totalTimeMinute +":"+ totalTimeSeconds;

    currentTimeMinute = (currentTimeMinute > 9) ? currenTimeMinute : "0"+ currentTimeMinute;
    currentTimeSeconds = (currentTimeSeconds > 9) ? currentTimeSeconds : "0"+ currentTimeSeconds;
    currentTime = currentTimeMinute +":"+ currentTimeSeconds;

    $('#timer .full').html(totalTime);
    $('#timer .current').html(currentTime);
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

    // Si la touche a deja ete presse
    if (gameController.alreadyPressed) return false;

    // Si la touche est la bonne
    // On calcul le nombre de point que l'on donne
    if (direction == partition.type) {
        points = (5 - Math.round(((partition.timestamp - gameController.getTimeOffset()) / 100)));
    }

    // On ajoute les points
    if (points > 0) {
        gameController.addPoints(points * 100);
        gameController.pointsContainer.html(gameController.getPoints());
    }

    var message = "";
    var state = "";

    if (points >= 4) {
        state = "perfect";
        message = "Parfait";
    } else if (points >= 2) {
        message = "Bien";
        state = "notbad";
    } else if (points == 1) {
        message = "Pas mal";
        state = "notbad";
    } else {
        state = "fail";

    }

    gameController.setState(message, state);
    gameController.alreadyPressed = true;
};


/**
 *
 * Affiche les ronds
 *
 */
gameController.displayBounds = function () {
    // Quand la partition est terminee
    // On arrête le jeu
    if (gameController.partitionIndex >= Container.partition.get().length) {
        gameController.gameEnded();
        return false;
    }

    // Met a jour le timer
    gameController.updateTimer();

    var partition = Container.partition.get(gameController.partitionIndex);
    var difference = Math.round((partition.timestamp - gameController.getTimeOffset()) / 100);

    // On affiche les ronds 9s avant si l'element n'est pas deja affiche
    for (var note = gameController.partitionIndex; note < Container.partition.get().length; note++) {
        var diff = Math.round((Container.partition.get(note).timestamp - gameController.getTimeOffset()) / 100);
        var partitionElementLength = $('[data-index="'+ note +'"]').length;

        if (diff <= 9 && partitionElementLength == 0) {
            gameController.container.append('<div class="round '+ Container.partition.get(note).type +'" data-index="'+ note +'"></div>');
        }
    }

    // On passe au suivant 4s apres
    if (difference < -1) {
        gameController.alreadyPressed = false;
        gameController.partitionIndex++;
    }
};
