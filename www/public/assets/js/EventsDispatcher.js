let EventsDispatcher = (function () {

    let dispatch = function () {
        Card.handleNewCard();
        Card.handleEditCard();
    };

    return {
        dispatch:dispatch
    }
})();

jQuery(function () {
    setTimeout(() => {
        EventsDispatcher.dispatch();
    }, 1000)
});