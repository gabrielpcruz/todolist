let EventsDispatcher = (function () {

    let dispatch = function () {
        Card.handleNewCard();
        Card.handleEditCard();
    };

    return {
        dispatch:dispatch
    }
})();