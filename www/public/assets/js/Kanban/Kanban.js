let Kanban = (function () {
    let dropzones = [], cards = [];

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

    let drag = function (event) {}

    let dragend = function (event) {
        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).removeClass('highlight dropzone-dragging')
        });

        if (event) {
            event.preventDefault();

            let { target } = event;

            $(target).removeClass('is-dragging');

            // Aqui posso mandar para o banco de dados, onde o cartão foi solto por último e salvar
            let board = Board.getParentBoardByCard($(event.target));
            event.currentTarget.dataset.board_id = board.attr('id').replace('board-', '');
            event.currentTarget.dataset.position = $(event.target).position().top;

            HandleCardAjax.update($(event.target));

            let cardId = $(event.target).attr('id');

            let othersCards = $(board).find(`.card:not(#${cardId})`);

            othersCards = Array.from(othersCards);

            $.each(othersCards, function (index, card) {
                HandleCardAjax.update($(card))
            })
        }
    }

    let arroz = function (event) {
        let { target } = event;

        $(target).closest('.card').find("[data-state='button']").removeClass('d-none');
    };

    let arroz2 = function (event) {
        let { target } = event;

        $(target).closest('.card').find("[data-state='button']").addClass('d-none');
    };

    let arroz3 = function (event) {
        let { target } = event;

        HandleCardAjax.delete($(target).closest('.card'))
            .done(() => {
                $(target).closest('.card').remove();
            });
    };

    let addEventsToCard = function (card) {
        $(card).on('dragstart', dragstart);
        $(card).on('drag', drag);
        $(card).on('dragend', dragend);
        $(card).on('mouseover', arroz);
        $(card).on('mouseleave', arroz2);
        $($(card).find("[data-state='button']")).on('click', arroz3);
    };

    let dragenter = function (event) {};

    let dragover = function (event) {

        event.stopPropagation();

        let board = $(this).parent();
        let position = event.clientY;
        let cardMoving = $(".is-dragging")[0];

        Board.insertCardIntoBoadPosition(board, cardMoving, position);
    };

    let dragleave = function (event) {};

    let drop = function (event) {};

    let addEventsToDropzone = function (dropzone) {
        $(dropzone).on('dragenter', dragenter);
        $(dropzone).on('dragover', dragover);
        $(dropzone).on('dragleave', dragleave);
        $(dropzone).on('drop', drop);
    };

    let fillKanban = function () {
        Ajax.get('/v1/api/board')
            .done((response) => {
                let boards = JSON.parse(response);

                $.each(boards, function (index, board) {

                    $('#kanban').append(
                        Board.createBoard(board, board.cards)
                    );
                });
            });
    };

    return {
        init: function () {
            fillKanban();
            setTimeout(() => {
                // initCards();
                // initDropzones();
                EventsDispatcher.dispatch();
            }, 900);
        },
        addEventsToCard,
        addEventsToDropzone,
    }
})();

jQuery(function () {
    Kanban.init()
});
