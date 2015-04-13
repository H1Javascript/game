var Routing = {
    url: [],
    events: [],


    /**
     *
     * Ajoute une route
     * @param string name
     * @param function callback
     * @param boolean isUrl
     *
     */
    add: function (name, callback, isUrl) {
        if (!isUrl) {
            this.events[name] = callback;
            return true;
        }

        this.url[name] = callback;
        return true;
    },


    /**
     *
     * Verifie les routes et trouve les correspondances
     * @return bool
     *
     */
    check: function () {
        var uri = (window.location.hash).replace('#', '');

        for (schema in this.url) {
            var matchResult = uri.match('^'+ schema +'$');

            if (matchResult) {
                var parameters = [];

                for (var i = 1; i < matchResult.length; i++) {
                    parameters[i - 1] = matchResult[i];
                }

                Routing.url[schema](parameters);
                return true;
            }
        }

        return false;
    },


    /**
     *
     * Lance le routeur
     *
     */
    run: function () {
        Routing.check();

        $(window).on('hashchange', function () {
            Routing.check();
        });
    }
};