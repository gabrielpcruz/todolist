let Kanban = (function () {
    let dropzones = [], cards = [];

    let listAllCards = function () {
        if (cards.length === 0) {
            cards = $('.card');
        }

        return cards;
    };

    let listAllDropzones = function () {
        if (dropzones.length === 0) {
            dropzones = $('.dropzone');
        }

        return dropzones;
    };

    let dragstart = function (event) {
        if (event) {
            $(event.target).addClass('is-dragging');
        }

        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).addClass('highlight dropzone-dragging')
        });
    }

    let drag = function (event) {
    }

    let dragend = function (event) {
        if (event) {
            $(event.target).removeClass('is-dragging');
        }

        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).removeClass('highlight dropzone-dragging')
        });
    }

    let addEventsToCard = function (card) {
        $(card).on('dragstart', dragstart);
        $(card).on('drag', drag);
        $(card).on('dragend', dragend);
    };

    let initCards = function () {
        $.each(listAllCards(), function (index, card) {
            addEventsToCard(card)
        });
    };

    let dragenter = function (event) {

    };

    let dragover = function (event) {
        let board = $(this).parent();
        let position = event.clientY;
        let cardMoving = $(".is-dragging")[0];

        Board.insertCardIntoBoadPosition(board, cardMoving, position);
    };



    let dragleave = function (event) {

    };

    let drop = function (event) {

    };

    let initDropzones = function () {
        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).on('dragenter', dragenter)
            $(dropzone).on('dragover', dragover)
            $(dropzone).on('dragleave', dragleave)
            $(dropzone).on('drop', drop)
        });
    };











    let fillKanban = function () {
        Ajax.get('/v1/api/board').done((response) => {
            let boards = JSON.parse(response);

            $.each(boards, function (index, board) {

                $('#kanban').append(
                    Board.createBoard(board, board.cards)
                );
            });
        })
    };

    return {
        init: function () {
            initCards();
            initDropzones();
            fillKanban();
        },
        addEventsToCard,
    }
})();

jQuery(function () {
    Kanban.init()
});
