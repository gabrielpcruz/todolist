let Ajax = (function () {

    let post = function (url, parameters = {}) {

        console.log('a')

        return $.ajax({
            method: 'POST',
            url: url,
            data: parameters
        });
    };

    let get = function (url, parameters = {}) {

    };

    return {
        post: post,
        get: get,
    }
})();
