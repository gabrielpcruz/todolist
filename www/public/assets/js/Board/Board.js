let Board = (function () {
    /**
     *
     * @param boarId
     * @returns {string}
     */
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

    /**
     *
     * @param target
     * @returns {*|jQuery}
     */
    let getBoardByTarget = function (target) {
        return $(target).closest('.board');
    };

    /**
     *
     * @param board
     * @param cardMoving
     * @param posY
     * @returns {*}
     */
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

    /**
     *
     * @param board
     * @param cardMoving
     * @param position
     */
    let insertCardIntoBoadPosition = function (board, cardMoving, position) {
        let dropzone = $(board).find('.dropzone');

        let card = getNewPosition(board, cardMoving, position);

        if (card) {
            $(card).after(cardMoving);
        } else {
            dropzone.prepend(cardMoving);
        }
    }

    /**
     *
     * @param board
     * @returns {*|jQuery|HTMLElement}
     */
    let makeHeadBoard = function (board) {
        let divHeadBoard = $('<div>');
        let divHeadBoardTitle = $('<p>');

        divHeadBoardTitle.addClass('fw-semibold');
        divHeadBoardTitle.html(`${board.name}`);

        divHeadBoard.addClass('head-board rounded-1 d-flex justify-content-start');
        divHeadBoard.append(divHeadBoardTitle);

        return divHeadBoard;
    };

    /**
     *
     * @param board
     * @returns {*|jQuery|HTMLElement}
     */
    let makeBodyBoard = function (board) {
        let divBoardBody = $('<div>');
        divBoardBody.addClass('dropzone rounded-3 d-flex flex-column');

        Kanban.addEventsToDropzone(divBoardBody);

        return divBoardBody;
    };

    /**
     *
     * @param board
     * @returns {*|jQuery|HTMLElement}
     */
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
            cards.sort((a, b) => a.position - b.position);

            $.each(cards, function (index, card) {
                let divCard = Card.createDivCard(
                    card.position,
                    card.description,
                    card.id,
                    board.id,
                    card.user_name
                );

                Board.insertCardIntoBoadPosition(divBoard, divCard, card.position);
            });
        }

        return divBoard;
    }

    return {
        getBoardByTarget,
        insertCardIntoBoadPosition,
        createBoard,
        getLabelStatusByBoardId,
    }
})();