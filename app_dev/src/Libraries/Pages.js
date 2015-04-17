var Pages = {
    templatePath: "",
    params: {},
};


/**
 *
 * Definie le path vers les templates
 * @param string path
 *
 */
Pages.setTemplatePath = function (path) {
    this.templatePath = path;
};


/**
 *
 * Recupere le contenue non compile d'une page
 * @param string template
 * @param function callback
 *
 */
Pages.request = function (template, callback) {
    $.get(this.templatePath +"/"+ template +".html", function (content) {
        callback(content);
    });
};


/**
 *
 * Recupere la page et l'inclue dans le container
 * @param string page
 * @param object container
 * @param function callback
 *
 */
Pages.display = function (page, container, callback) {
    this.request(page, function (uncompiledContent) {
        var View = new ViewInterface(uncompiledContent, Handlebars);
        View.setParam(Pages.params);
        View.compile();

        container.html(View.getCompiled());
        Pages.resetParams();

        if (callback) callback();
    });
};


/**
 *
 * Definie les variables a passer dans la vue
 * @param string/object key
 * @param string value
 * @return boolean
 *
 */
Pages.setParam = function (key, value) {
    if (typeof key == 'object') {
        this.params = key;
        return true;
    }

    this.params[key] = value;
    return true;
};


/**
 *
 * Reset les parametres a passer dans la vue
 *
 */
Pages.resetParams = function () {
    this.params = {};
};
