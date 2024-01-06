let Global = (function() {
    let redirect = function ($url) {
        window.location.href = $url;
    };

    let reload = function () {
        location.reload();
    };

    let showToast = function (message) {
        let myToast = bootstrap.Toast.getOrCreateInstance($('#liveToast'));
        $('#liveToast')
            .find('.toast-body')
            .html(message);

        myToast.show(1);

        $('#liveToast').on('hide.bs.toast', function (event) {
            $('#liveToast')
                .find('.toast-body')
                .html('');
        });


    };

    return {
        redirect: redirect,
        reload: reload,
        showToast: showToast,
    }
})();