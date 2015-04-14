var ContainerInterface = function () {};


/**
 *
 * Ajoute une instance au Container
 * @param string key
 * @param object instance
 *
 */
ContainerInterface.prototype.add = function (key, instance) {
    this.__defineGetter__(key, function () { return instance });
};
