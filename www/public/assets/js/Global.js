let Global = (function() {
    let redirect = function ($url) {
        window.location.href = $url;
    };

    let reload = function () {
        location.reload();
    };

    return {
        redirect: redirect,
        reload: reload,
    }
})();