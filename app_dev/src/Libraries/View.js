/**
 *
 * Initialise le view avec le contenue
 * @param string content
 * @param object compilatorInstance
 *
 */
var ViewInterface = function (content, compilatorInstance) {
    this.content = content;
    this.compiledContent = null;
    this.params = {};
    this.compilator = compilatorInstance;
};


/**
 *
 * Compile le contenue
 * @param object vars
 * @return string
 *
 */
ViewInterface.prototype.compile = function (vars) {
    for (key in vars) {
        this.setParam(key, vars[key]);
    }

    var template = this.compilator.compile(this.content);
    this.compiledContent = template(this.getParams());

    return this.compiledContent;
};


/**
 *
 * Recupere le contenue avant compilation
 * @return string
 *
 */
ViewInterface.prototype.getUncompiled = function () {
    return this.content;
};


/**
 *
 * Recupere le contenue compile
 * @return string
 *
 */
ViewInterface.prototype.getCompiled = function () {
    return this.compiledContent;
};


/**
 *
 * Definie un parametre a passer a la vue
 * @param string/object key
 * @param string value
 *
 */
ViewInterface.prototype.setParam = function (key, value) {
    if (typeof key == 'object') {
        this.params = key;
        return true;
    }

    this.params[key] = value;
    return true;
};


/**
 *
 * Recupere les parametres a passer dans la vue
 * @return object
 *
 */
ViewInterface.prototype.getParams = function () {
    return this.params;
};


/**
 *
 * Supprime une variable
 * @return object
 *
 */
ViewInterface.prototype.unsetParam = function (key) {
    return this.params.slice(key);
};
