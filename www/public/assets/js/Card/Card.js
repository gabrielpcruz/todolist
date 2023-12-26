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
        $(".card").on('dblclick', Card.eventEditCard);
    }

    let create = function (text) {
        let card = $('<div>');

        card.addClass('card p-2')
        card.attr('draggable', 'true');
        card.text(text)

        return card;
    };

    let replaceTextAreaForCard  = function (event) {
        let { target } = event;

        let text = $(target).val();

        let card = Card.create(text);

        card.attr('id', $(target).data('id'))
        card.data('position', $(target).data('position'))
        Kanban.addEventsToCard(card);

        card[0].addEventListener('dblclick', Card.eventEditCard);

        let board = Board.getParentBoardByTextAreaNewCard(target);

        card.data('board_id', $(board).attr('id').replace('board-', ''));

        let cardId = card.attr('id');

        if (cardId !== undefined) {
            console.log(card)
            console.log($(card).position().top)
            console.log($(target).data('position'))
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

        let text = $(target).text();

        let form = createFormNewCard(text);
        let board = Board.getParentBoardByAddCardButton(target);

        $(form).find('textarea').attr('data-position', $(target).position().top);
        $(form).find('textarea').attr('data-id', $(target).attr('id'));

        Board.insertCardIntoBoadPosition(board[0], form[0], $(target).position().top);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);

        this.remove();
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

    return {
        handleNewCard,
        handleEditCard,
        create,
        replaceTextAreaForCard,
        eventEditCard,
        eventNewCard,
        createFormNewCard,
    }
})();
