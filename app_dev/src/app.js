Routing.add('/([a-z]+)/([0-9]+)', function (params) {
    var username = params[0];
    var music = params[1];

    alert(music);
}, true);


Routing.run();
