let Ajax = (function () {

    let post = function (url, parameters = {}) {

        return $.ajax({
            method: 'POST',
            url: url,
            data: parameters
        });
    };

    let get = function (url, parameters = {}) {
        return $.ajax({
            method: 'GET',
            url: url
        });
    };

    let put = function (url, parameters = {}) {
        return $.ajax({
            method: 'PUT',
            url: url,
            data: parameters

        });
    };

    return {
        post: post,
        get: get,
        put: put,
    }
})();
