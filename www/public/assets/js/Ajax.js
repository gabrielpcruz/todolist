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

    return {
        post: post,
        get: get,
    }
})();
