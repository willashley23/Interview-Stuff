
function bind(obj, method) {
    return function() {return method.apply(obj,arguments);};
}

