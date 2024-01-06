let Card = (function () {

    /**
     *
     * @param value
     * @returns {*|jQuery|HTMLElement}
     */
    let createFormNewCard = function (value = false) {
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

        $(form).on('focusout', HandleCardEvents.eventReplaceForCard);

        return form;
    };

    /**
     * Esse método foi criado para redimensionar o tamanho do textarea
     * a medida em que o usuário digita.
     *
     * @param event
     */
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

    /**
     *
     * @param card_id
     * @param board_id
     */
    let updateStatusCard = function (card_id, board_id) {
        $(`#${card_id}`).find('.status-card').html(Board.getLabelStatusByBoardId(board_id));
    };

    /**
     *
     * @param card
     * @returns {string}
     */
    let json = function (card) {
        return JSON.stringify(Card.object(card));
    };

    /**
     *
     * @param card
     * @returns {{board_id: (*|jQuery), description: (*|jQuery), id: (jQuery|*), position: (*|jQuery)}}
     */
    let object = function (card) {
        return {
            id: $(card).attr('id'),
            description: $(card).find("[data-state='text']").text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id'),
            user_name: $(card).find('.user-card').text(),
        };
    };

    /**
     *
     * @param position
     * @param description
     * @param card_id
     * @param board_id
     * @returns {*|jQuery|HTMLElement}
     */
    let createDivCard = function (
        position,
        description = false,
        card_id = false,
        board_id = false,
        user_name = false
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

        if (user_name) {
            card.append(createSpanCardUser(user_name));
        }

        card.append(createSpanCardEdit());

        Kanban.addEventsToCard(card);

        return card;
    }

    /**
     *
     * @param description
     * @returns {*|jQuery|HTMLElement}
     */
    let createSpanCardDescription = function (description = false) {
        let span = $('<span>');

        span.attr('data-state', 'text');
        $(span).on('dblclick', HandleCardEvents.eventEditCard);

        if (description) {
            span.html(description);
        }

        return span;
    }

    /**
     *
     * @param board_id
     * @returns {*|jQuery|HTMLElement}
     */
    let createSpanCardStatus = function (board_id) {
        let span = $('<span>');

        span.addClass('status-card');
        $(span).on('dblclick', HandleCardEvents.eventEditCard);

        span.html(Board.getLabelStatusByBoardId(board_id));

        return span;
    }

    /**
     *
     * @param board_id
     * @returns {*|jQuery|HTMLElement}
     */
    let createSpanCardUser = function (user_name) {
        let span = $('<span>');

        span.addClass('user-card text-uppercase');
        $(span).on('dblclick', HandleCardEvents.eventEditCard);

        span.html(user_name);

        return span;
    }

    /**
     *
     * @returns {*|jQuery|HTMLElement}
     */
    let createSpanCardEdit = function () {
        let span = $('<span>');

        span.attr('data-state', 'button');
        span.addClass('d-none');
        span.addClass('delete-card');
        $(span).on('dblclick', HandleCardEvents.eventEditCard);

        span.html('<i class="bi bi-trash-fill"></i>');

        return span;
    }

    return {
        createFormNewCard,
        createDivCard,
        createSpanCardUser,
        updateStatusCard,
        json,
        object
    }
})();
