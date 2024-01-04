let Card = (function () {

    let eventNewCard = function (event) {
        let { target } = event;

        let board = Board.getParentBoardByAddCardButton(target);

        let form = Card.createFormNewCard();

        $(form).find('textarea').attr('data-position', $(target).position().top);
        $(form).find('textarea').attr('data-id', $(target).attr('id'));


        board.find('.dropzone').append(form);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);
    };

    let handleNewCard = function () {
        $(".add-card").on('click', Card.eventNewCard);
    }

    let handleEditCard = function () {
        $(".span").on('dblclick', Card.eventEditCard);
    }

    let createFromText = function (text) {
        let card = $('<div>');

        card.addClass('card p-2')
        card.attr('draggable', 'true');

        let spanText = $('<span>');
        spanText.attr('data-state', 'text');

        spanText.html(text);

        let spanStatus = $('<span>');
        spanStatus.html('');
        spanStatus.addClass('status-card');

        let spanEditCard = $('<span>');
        spanEditCard.attr('data-state', 'button');
        spanEditCard.addClass('d-none');
        spanEditCard.addClass('delete-card');
        spanEditCard.html('<i class="bi bi-trash-fill"></i>');

        $(spanText).on('dblclick', Card.eventEditCard);
        $(spanEditCard).on('dblclick', Card.eventEditCard);
        $(spanStatus).on('dblclick', Card.eventEditCard);


        card.append(spanText);
        card.append(spanEditCard);
        card.append(spanStatus);

        return card;
    };

    let replaceTextAreaForCard  = function (event) {
        let { target } = event;

        let text = $(target).val();

        if (!text.trim()) {
            this.remove();
            return false;
        }

        let board = Board.getParentBoardByTextAreaNewCard(target);

        let board_id = $(board).attr('id').replace('board-', '');

        let card = Card.createDivCard(
            $(target).data('position'),
            text,
            $(target).data('id'),
            board_id
        );

        Card.updateStatusCard(card, board_id);

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

    let eventEditCard = function (event) {
        let { target } = event;

        if ($(target).parent('.card').length < 1) {
            return;
        }

        let card = $(target).closest('.card');

        let text = $(card).find("[data-state='text']").text();

        let form = createFormNewCard(text);
        let board = Board.getParentBoardByAddCardButton(card);

        $(form).find('textarea').attr('data-position', $(card).position().top);
        $(form).find('textarea').attr('data-id', $(card).attr('id'));

        Board.insertCardIntoBoadPosition(board, form, $(card).position().top);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);

        $(card).remove();
    }

    let createFormNewCard = function (value) {
        let form = $('<form>');
        form.attr('id', 'new-card');

        let textarea = $("<textarea>");
        textarea.addClass('card card-editing p-2');
        textarea.attr('resize', 'none')
        textarea.attr('dir', 'auto');
        textarea.attr('placeholder', 'Insira um título para este cartão');
        textarea.attr('autofocus', 'true');

        if (value) {
            textarea.val(value);
        }

        $(textarea).on('keyup', resizeTextAreaByContent);
        $(textarea).on('input', resizeTextAreaByContent);
        $(textarea).on('paste', resizeTextAreaByContent);

        form.append(textarea);

        $(form).on('focusout', Card.replaceTextAreaForCard);

        return form;
    };

    let resizeTextAreaByContent = function (event) {
        let { target } = event;

        let lineLength = 27;

        let lines = ($(target).val().length / lineLength);
        let rest = ($(target).val().length % lineLength);

        // min-height + lines x line-height + padding + border
        let newHeight = 38 + lines * 20 + 12 + 2;

        if (rest >= 20) {
            this.style.height = newHeight + "px"
        }
    };

    let updateStatusCard = function (card, board_id) {
        $(card).find('.status-card').html(Board.getLabelStatusByBoardId(board_id));
    };

    let json = function (card) {
        return JSON.stringify(Card.object(card));
    };

    let object = function (card) {
        return {
            id: $(card).attr('id'),
            description: $(card).find("[data-state='text']").text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id'),
        };
    };

    let createDivCard = function (
        position,
        description = false,
        card_id = false,
        board_id = false
    ) {
        let card = $('<div>');

        card.attr('draggable', 'true');
        card.addClass('card p-2');

        card.attr('data-position', position);

        if (card_id) {
            card.attr('id', card_id);
        }

        if (board_id) {
            card.attr('data-board_id', board_id);
        }

        card.append(createSpanCardDescription(description));
        card.append(createSpanCardStatus(board_id));
        card.append(createSpanCardEdit());

        Kanban.addEventsToCard(card);

        return card;
    }

    let createSpanCardDescription = function (description = false) {
        let span = $('<span>');

        span.attr('data-state', 'text');
        $(span).on('dblclick', Card.eventEditCard);

        if (description) {
            span.html(description);
        }

        return span;
    }

    let createSpanCardStatus = function (board_id ) {
        let span = $('<span>');

        span.addClass('status-card');
        $(span).on('dblclick', Card.eventEditCard);

        span.html(Board.getLabelStatusByBoardId(board_id));

        return span;
    }

    let createSpanCardEdit = function () {
        let span = $('<span>');

        span.attr('data-state', 'button');
        span.addClass('d-none');
        span.addClass('delete-card');
        $(span).on('dblclick', Card.eventEditCard);

        span.html('<i class="bi bi-trash-fill"></i>');

        return span;
    }

    return {
        handleNewCard,
        handleEditCard,
        createFromText,
        createDivCard,
        replaceTextAreaForCard,
        eventEditCard,
        eventNewCard,
        createFormNewCard,
        updateStatusCard,
        json,
        object,
    }
})();
