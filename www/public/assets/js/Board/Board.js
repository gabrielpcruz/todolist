let Board = (function () {
    let getParentBoardByAddCardButton = function (addCardButon) {
        return $(addCardButon).parent().parent();
    };

    let getParentBoardByTextAreaNewCard = function (textAreaNewCard) {
        return $(textAreaNewCard).parent().parent().parent();
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
            card.insertAdjacentElement("afterend", cardMoving);
        } else {
            dropzone.prepend(cardMoving);
        }
    }

    /**
     * TODO refatorar, isso aqui já me da uma boa parte das partes complicadas
     * @param board
     * @param cards
     * @returns {*|jQuery|HTMLElement|JQuery<HTMLElement>}
     */
    let createBoard = function (board, cards = []) {
        let divBoard = $('<div>');

        let boardId = `board-${board.id}`;

        divBoard.attr('id', boardId);
        divBoard.addClass('board rounded-3 p-2');

        let divHeadBoard = $('<div>');
        let divHeadBoardTitle = $('<p>');

        divHeadBoardTitle.addClass('fw-semibold');
        divHeadBoardTitle.html(`${board.name}`);

        divHeadBoard.addClass('head-board rounded-1 d-flex justify-content-start');
        divHeadBoard.append(divHeadBoardTitle);

        let divBoardBody = $('<div>');
        divBoardBody.addClass('dropzone rounded-3 d-flex flex-column');

        let divBoardFooter = $('<div>');
        let divBoardFooterButton = $('<button>');

        divBoardFooterButton.addClass('add-card btn btn-secondary');
        divBoardFooterButton.html('Adicionar um cartão');

        divBoardFooter.addClass('footer-board rounded-1 d-grid gap-2');
        divBoardFooter.append(divBoardFooterButton);

        divBoard.append(divHeadBoard);
        divBoard.append(divBoardBody);
        divBoard.append(divBoardFooter);

        if (cards.length) {
            cards.sort((a,b) => a.position - b.position);

            $.each(cards, function (index, card) {
                let divCard = $('<div>');

                divCard.attr('id', card.id);
                divCard.attr('draggable', 'true');
                divCard.addClass('card p-2');
                divCard.html(card.description);

                Kanban.addEventsToCard(divCard);

                Board.insertCardIntoBoadPosition(divBoard, divCard[0], card.position);
            });
        }

        return divBoard;
    }

    return {
        getParentBoardByTextAreaNewCard,
        getParentBoardByAddCardButton,
        insertCardIntoBoadPosition,
        createBoard
    }
})();

jQuery(function () {

});