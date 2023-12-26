let Debounce = (function () {
    let debounce = function (func, timeout = 300){
        let timer;

        return (...args) => {
            if (!timer) {
                func.apply(this, args);
            }

            clearTimeout(timer);

            timer = setTimeout(() => {
                timer = undefined;
            }, timeout);
        };
    }

    return {
        debounce
    }
})();