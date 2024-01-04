let Ajax = (function () {

    let ajax = function (url, method, parameters = {}) {
        let configurations = {
            method: method,
            url: url,
        };

        if (!jQuery.isEmptyObject(parameters)) {
            Object.assign(configurations, {data: parameters})
        }

        return $.ajax(configurations);
    };

    let post = function (url, parameters) {
        return ajax(url, 'POST', parameters)
    };

    let get = function (url) {
        return ajax(url, 'GET')
    };

    let put = function (url, parameters) {
        return ajax(url, 'PUT', parameters)
    };

    let remove = function (url) {
        return ajax(url, 'DELETE')
    };

    return {
        post: post,
        get: get,
        put: put,
        delete: remove,
    }
})();
