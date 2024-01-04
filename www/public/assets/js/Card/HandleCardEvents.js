let HandleCardEvents = (function () {

    let handleNewCard = function () {
        $(".add-card").on('click', HandleCardEvents.eventNewCard);
    }

    let handleEditCard = function () {
        $(".span").on('dblclick', HandleCardEvents.eventEditCard);
    }

    let eventNewCard = function (event) {
        let { target } = event;

        let board = Board.getBoardByAddCard(target);

        let form = Card.createFormNewCard();

        $(form).find('textarea').attr('data-position', $(target).position().top);
        $(form).find('textarea').attr('data-id', $(target).attr('id'));


        board.find('.dropzone').append(form);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);
    };

    let eventEditCard = function (event) {
        let { target } = event;

        if ($(target).parent('.card').length < 1) {
            return;
        }

        let card = $(target).closest('.card');

        let text = $(card).find("[data-state='text']").text();

        let form = Card.createFormNewCard(text);
        let board = Board.getBoardByAddCard(card);

        $(form).find('textarea').attr('data-position', $(card).position().top);
        $(form).find('textarea').attr('data-id', $(card).attr('id'));

        Board.insertCardIntoBoadPosition(board, form, $(card).position().top);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);

        $(card).remove();
    }

    let eventReplaceForCard  = function (event) {
        let { target } = event;

        let text = $(target).val();

        if (!text.trim()) {
            this.remove();
            return false;
        }

        let board = Board.getBoardByTextArea(target);

        let board_id = $(board).attr('id').replace('board-', '');

        let card = Card.createDivCard(
            $(target).data('position'),
            text,
            $(target).data('id'),
            board_id
        );

        Card.updateStatusCard(card.attr('id'), board_id);

        if (card.attr('id') !== undefined) {
            HandleCardAjax.update(card)
                .done((response) => {
                    Board.insertCardIntoBoadPosition(board, card, $(target).data('position'));
                    WebSocketClient.report('update', Card.json(card))

                })
                .always(() => {
                    this.remove();
                });
        } else {
            HandleCardAjax.insert(card)
                .done((response) => {
                    let cardResponse = JSON.parse(response);
                    $(card).attr('id', cardResponse.cardId)
                    Board.insertCardIntoBoadPosition(board, card, $(card).data('position'));
                    WebSocketClient.report('create', Card.json(card))
                })
                .always(() => {
                    this.remove();
                });
        }
    }

    return {
        handleNewCard,
        handleEditCard,


        eventReplaceForCard,
        eventEditCard,
        eventNewCard,
    }
})();