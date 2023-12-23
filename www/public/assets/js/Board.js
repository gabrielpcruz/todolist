let Board = (function () {
    let getParentBoardByAddCardButton = function (addCardButon) {
        return $(addCardButon).parent().parent();
    };

    let getParentBoardByTextAreaNewCard = function (textAreaNewCard) {
        return $(textAreaNewCard).parent().parent().parent();
    };

    let handleNewCard = function () {
        $(".add-card").on('click', function (event) {
            let { target } = event;

            let board = getParentBoardByAddCardButton(target);

            let form = Card.createFormNewCard();

            $(form).find('textarea').attr('data-position', $(target).offset().top);
            $(form).find('textarea').attr('data-id', $(target).attr('id'));


            board.find('.dropzone').append(form);

            setTimeout(() => {
                form.find('textarea').trigger('focus');
            },100);
        });
    };

    let handleEditCard = function () {
        $(".card").on('dblclick', Card.eventDoubleClick);
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

    return {
        init : function () {
            handleNewCard();
            handleEditCard();
        },
        getParentBoardByTextAreaNewCard,
        getParentBoardByAddCardButton,
        insertCardIntoBoadPosition,
    }
})();

jQuery(function () {
    Board.init()
});