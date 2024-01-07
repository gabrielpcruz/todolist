let Kanban = (function () {
    let dropzones = [], cards = [];

    /**
     *
     * @returns {*[]}
     */
    let listAllDropzones = function () {
        if (dropzones.length === 0) {
            dropzones = $('.dropzone');
        }

        return dropzones;
    };

    /**
     *
     * @param event
     */
    let dragstart = function (event) {
        if (event) {
            $(event.target).addClass('is-dragging');
        }

        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).addClass('highlight dropzone-dragging')
        });
    }


    /**
     *
     * @param event
     */
    let dragend = function (event) {
        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).removeClass('highlight dropzone-dragging')
        });

        if (event) {
            event.preventDefault();
            let card = $(event.target);

            $(card).removeClass('is-dragging');

            let board_id = Board.getBoardByTarget(card).attr('id').replace('board-', '');

            $(event.target).data('board_id', board_id);
            $(event.target).data('position', $(card).position().top);

            Card.updateStatusCard($(event.target).attr('id'), board_id);

            Kanban.handleCardOnDone(card, board_id);

            HandleCardAjax.update(card).done(() => {
                WebSocketClient.report('dragging', Card.json(card))
            });
        }
    }

    /**
     *
     * @param event
     */
    let showDeleteButton = function (event) {
        let {target} = event;
        let card = $(target).closest('.card');

        card.find("[data-state='button']").removeClass('d-none');
    };

    /**
     *
     * @param event
     */
    let hideDeleteButton = function (event) {
        let {target} = event;
        let card = $(target).closest('.card');

        card.find("[data-state='button']").addClass('d-none');
    };

    /**
     *
     * @param event
     */
    let removeCard = function (event) {
        let {target} = event;

        let card = $(target).closest('.card');

        HandleCardAjax
            .delete(card)
            .done(() => {
                card.remove();
                WebSocketClient.report('remove', Card.json(card));
                Global.showToast(`Cartão excluído com sucesso!`);
            });
    };

    /**
     *
     * @param card
     */
    let addEventsToCard = function (card) {
        $(card).on('dragstart', dragstart);
        $(card).on('dragend', dragend);
        $(card).on('mouseover', showDeleteButton);
        $(card).on('mouseleave', hideDeleteButton);
        $($(card).find("[data-state='button']")).on('click', removeCard);
    };

    let cardOnDone = function (card) {
        $(card).find("span[data-state='button']").removeClass('d-none');
        $(card).off();
        $(card).find('span').off('dblclick');
        $(card).removeAttr('draggable');
    }

    let handleCardOnDone = function (card, board_id) {
        if (parseInt(board_id) === 3) {
            cardOnDone(card);
        }
    }

    /**
     *
     * @param event
     */
    let dragover = function (event) {
        event.stopPropagation();

        let board = $(this).parent();
        let position = event.clientY;
        let cardMoving = $(".is-dragging");

        Board.insertCardIntoBoadPosition(board, cardMoving, position);
    };

    /**
     *
     * @param dropzone
     */
    let addEventsToDropzone = function (dropzone) {
        $(dropzone).on('dragover', dragover);
    };

    /**
     *
     */
    let fillKanban = function () {
        Ajax.get('/v1/api/board')
            .done((response) => {
                let boards = JSON.parse(response);

                $.each(boards, function (index, board) {
                    $('#kanban').append(
                        Board.createBoard(board, board.cards)
                    );
                });

                setTimeout(() => {
                    HandleCardEvents.handleNewCard();
                    HandleCardEvents.handleEditCard();
                }, 100);
            });
    };

    return {
        init: function () {
            fillKanban();
        },
        addEventsToCard,
        handleCardOnDone,
        addEventsToDropzone,
    }
})();

jQuery(function () {
    Kanban.init()
});
