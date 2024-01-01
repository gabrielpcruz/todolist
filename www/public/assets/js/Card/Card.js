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

    let create = function (text) {
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

        spanText[0].addEventListener('dblclick', Card.eventEditCard);
        spanEditCard[0].addEventListener('dblclick', Card.eventEditCard);
        spanStatus[0].addEventListener('dblclick', Card.eventEditCard);


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

        let card = Card.create(text);


        card.attr('id', $(target).data('id'));
        card.data('position', $(target).data('position'));

        Kanban.addEventsToCard(card);


        let board = Board.getParentBoardByTextAreaNewCard(target);

        let board_id = $(board).attr('id').replace('board-', '');

        Card.updateStatusCard(card, board_id);

        card.data('board_id', board_id);

        let cardId = card.attr('id');

        if (cardId !== undefined) {
            HandleCardAjax.update(card)
                .fail((response) => {
                    console.log("error:" + response)
                })
                .done((response) => {
                    console.log(response)
                    Board.insertCardIntoBoadPosition(board[0], card[0], $(target).data('position'));
                })
                .always(() => {
                    this.remove();
                });
        } else {
            HandleCardAjax.insert(card)
                .fail((response) => {
                    console.log("error:" + response)
                })
                .done((response) => {
                    console.log(card)
                    let cardResponse = JSON.parse(response);
                    $(card).attr('id', cardResponse.cardId)
                    Board.insertCardIntoBoadPosition(board[0], card[0], $(target).data('position'));
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

        Board.insertCardIntoBoadPosition(board[0], form[0], $(card).position().top);

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

        textarea[0].addEventListener('keyup', resizeTextAreaByContent);
        textarea[0].addEventListener('input', resizeTextAreaByContent);
        textarea[0].addEventListener('paste', resizeTextAreaByContent);

        form.append(textarea);

        form[0].addEventListener('focusout', Card.replaceTextAreaForCard);

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
    }

    return {
        handleNewCard,
        handleEditCard,
        create,
        replaceTextAreaForCard,
        eventEditCard,
        eventNewCard,
        createFormNewCard,
        updateStatusCard,
    }
})();
