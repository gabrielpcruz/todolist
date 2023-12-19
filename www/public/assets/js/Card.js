let Card = (function () {

    let modal =  new bootstrap.Modal('#new-card');

    let handleNewCard = function () {
        modal.show();
    }

    let create = function (text) {
        let card = $('<div>');

        card.addClass('card p-2')
        card.attr('draggable', 'true');
        card.text(text)

        return card;
    };

    return {
        handleNewCard:handleNewCard,
        create:create,
    }
})();
