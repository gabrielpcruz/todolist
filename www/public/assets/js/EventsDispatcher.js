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
    EventsDispatcher.dispatch();
});