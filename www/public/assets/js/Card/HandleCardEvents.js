let HandleCardEvents = (function () {

    /**
     *
     */
    let handleNewCard = function () {
        $(".add-card").on('click', HandleCardEvents.eventNewCard);
    }

    /**
     *
     */
    let handleEditCard = function () {
        $(".span").on('dblclick', HandleCardEvents.eventEditCard);
    }

    /**
     *
     * @param event
     */
    let eventNewCard = function (event) {
        let { target } = event;

        let board = Board.getBoardByTarget(target);

        let form = Card.createFormNewCard();

        $(form).find('textarea').attr('data-position', $(target).position().top);
        $(form).find('textarea').attr('data-id', $(target).attr('id'));


        board.find('.dropzone').append(form);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);
    };

    /**
     *
     * @param event
     */
    let eventEditCard = function (event) {
        let { target } = event;

        if ($(target).parent('.card').length < 1) {
            return;
        }

        let card = $(target).closest('.card');

        let text = $(card).find("[data-state='text']").text();

        let form = Card.createFormNewCard(text);
        let board = Board.getBoardByTarget(card);

        $(form).find('textarea').attr('data-position', $(card).position().top);
        $(form).find('textarea').attr('data-id', $(card).attr('id'));

        Board.insertCardIntoBoadPosition(board, form, $(card).position().top);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);

        $(card).remove();
    }

    /**
     *
     * @param event
     * @returns {boolean}
     */
    let eventReplaceForCard  = function (event) {
        let { target } = event;

        let text = $(target).val();

        if (!text.trim()) {
            this.remove();
            return false;
        }

        let board = Board.getBoardByTarget(target);

        let board_id = $(board).attr('id').replace('board-', '');

        let card = Card.createDivCard(
            $(target).data('position'),
            text,
            $(target).data('id'),
            board_id
        );

        handleAjaxMethod(target,card, board);
    }

    /**
     *
     * @param target
     * @param card
     * @param board
     */
    let handleAjaxMethod = function (target, card, board) {
        let board_id = $(board).attr('id').replace('board-', '');
        let card_id = card.attr('id');

        let callbackFunction = function (response) {
            let toastMessage = 'criado';
            let reportType = 'create';
            let position = $(card).data('position');

            let responseObject = JSON.parse(response);

            if (Object.hasOwn(responseObject, 'id')) {
                $(card).attr('id', responseObject.id);
                $(card).append(Card.createSpanCardUser(responseObject.user_name));
            }

            if (card_id !== undefined) {
                toastMessage = 'atualizado';
                reportType = 'update';
                position = $(target).data('position');
                Card.updateStatusCard(card_id, board_id);
            }

            Board.insertCardIntoBoadPosition(board, card, position);
            WebSocketClient.report(reportType, Card.json($(card)));
            Global.showToast(`Cartão ${toastMessage} com sucesso!`);
        }

        if (card_id === undefined) {
            HandleCardAjax.insert(card).done(callbackFunction).always(() => {
                $(target).remove()
            });
        } else {
            HandleCardAjax.update(card)
                .done(callbackFunction)
                .fail(() => {
                    Global.showToast(`Erro inesperado, a página será recarregada!`);
                    setTimeout(() => {
                        Global.reload()
                    }, 2000);
                })
                .always(() => {
                    $(target).remove();
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