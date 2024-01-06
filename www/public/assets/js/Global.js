let Global = (function() {
    let redirect = function ($url) {
        window.location.href = $url;
    };

    let reload = function () {
        location.reload();
    };

    let showToast = function (message) {
        let toast = $('#liveToast');
        let toastBody = ".toast-body";

        toast.find(toastBody).html(message);

        bootstrap.Toast.getOrCreateInstance(toast).show();

        toast.on('hide.bs.toast', function (event) {
            toast.find(toastBody).html('');
        });
    };

    return {
        redirect: redirect,
        reload: reload,
        showToast: showToast,
    }
})();