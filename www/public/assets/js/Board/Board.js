let Board = (function () {
    let getLabelStatusByBoardId = function (boarId) {
        switch (parseInt(boarId)) {
            case 1:
                return 'TODO';
            case 2:
                return 'DOING';
            case 3:
                return 'DONE';
            default:
                return 'TODO'
        }
    }

    let getParentBoardByAddCardButton = function (addCardButon) {
        return $(addCardButon).parent().parent();
    };

    let getParentBoardByTextAreaNewCard = function (textAreaNewCard) {
        return $(textAreaNewCard).parent().parent().parent();
    };

    let getParentBoardByCard = function (card) {
        return $(card).parent().parent();
    };

    let getNewPosition = function (board, cardMoving, posY) {
        let result;

        const cards = $(board).find(`.card:not(${$(cardMoving).attr('id')})`);

        $.each(cards, function (index, card) {
            const box = card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;

            if (posY >= boxCenterY) {
                result = card
            }
        });

        return result;
    };

    let insertCardIntoBoadPosition = function (board, cardMoving, position) {
        let dropzone = $(board).find('.dropzone');

        let card = getNewPosition(board, cardMoving, position);

        if (card) {
            $(card).after(cardMoving);
        } else {
            dropzone.prepend(cardMoving);
        }
    }

    let makeHeadBoard = function (board) {
        let divHeadBoard = $('<div>');
        let divHeadBoardTitle = $('<p>');

        divHeadBoardTitle.addClass('fw-semibold');
        divHeadBoardTitle.html(`${board.name}`);

        divHeadBoard.addClass('head-board rounded-1 d-flex justify-content-start');
        divHeadBoard.append(divHeadBoardTitle);

        return divHeadBoard;
    };

    let makeBodyBoard = function (board) {
        let divBoardBody = $('<div>');
        divBoardBody.addClass('dropzone rounded-3 d-flex flex-column');

        Kanban.addEventsToDropzone(divBoardBody);

        return divBoardBody;
    };

    let makeFooterBoard = function (board) {
        let divBoardFooter = $('<div>');

        if (board.id == 1) {
            divBoardFooter.addClass('footer-board rounded-1 d-grid gap-2');

            let divBoardFooterButton = $('<button>');

            divBoardFooterButton.addClass('add-card btn btn-secondary');
            divBoardFooterButton.html('Adicionar um cartão');
            divBoardFooter.append(divBoardFooterButton);
        }

        return divBoardFooter;
    };

    let makeCardBoard = function (board, card) {
        let divCard = $('<div>');

        divCard.attr('id', card.id);
        divCard.attr('draggable', 'true');
        divCard.addClass('card p-2');
        divCard.attr('data-board_id', board.id);

        let spanText = $('<span>');
        spanText.attr('data-state', 'text');

        spanText.html(card.description);

        let spanStatus = $('<span>');
        spanStatus.html(Board.getLabelStatusByBoardId(board.id));
        spanStatus.addClass('status-card');

        let spanEditCard = $('<span>');
        spanEditCard.attr('data-state', 'button');
        spanEditCard.addClass('d-none');
        spanEditCard.addClass('delete-card');
        spanEditCard.html('<i class="bi bi-trash-fill"></i>');

        $(spanText).on('dblclick', Card.eventEditCard);
        $(spanEditCard).on('dblclick', Card.eventEditCard);
        $(spanStatus).on('dblclick', Card.eventEditCard);

        divCard.append(spanText);
        divCard.append(spanEditCard);
        divCard.append(spanStatus);

        Kanban.addEventsToCard(divCard);

        return divCard;
    };

    /**
     * @param board
     * @param cards
     * @returns {*|jQuery|HTMLElement|JQuery<HTMLElement>}
     */
    let createBoard = function (board, cards = []) {
        let divBoard = $('<div>');

        let boardId = `board-${board.id}`;

        divBoard.attr('id', boardId);
        divBoard.addClass('board rounded-3 p-2');

        let divHeadBoard = makeHeadBoard(board);
        let divBoardBody = makeBodyBoard(board);
        let divBoardFooter = makeFooterBoard(board);

        divBoard.append(divHeadBoard);
        divBoard.append(divBoardBody);
        divBoard.append(divBoardFooter);

        if (cards.length) {
            cards.sort((a,b) => a.position - b.position);

            $.each(cards, function (index, card) {
                let divCard = makeCardBoard(board, card);

                Board.insertCardIntoBoadPosition(divBoard, divCard, card.position);
            });
        }

        return divBoard;
    }

    return {
        getParentBoardByTextAreaNewCard,
        getParentBoardByAddCardButton,
        getParentBoardByCard,
        insertCardIntoBoadPosition,
        createBoard,
        getLabelStatusByBoardId,
        makeCardBoard
    }
})();

jQuery(function () {

});