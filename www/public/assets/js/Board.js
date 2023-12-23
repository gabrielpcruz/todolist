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

            board.find('.dropzone').append(form);

            setTimeout(() => {
                form.find('textarea').trigger('focus');
            },100);
        });
    };

    let handleEditCard = function () {
        $(".card").on('dblclick', Card.eventDoubleClick);
    };

    return {
        init : function () {
            handleNewCard();
            handleEditCard();
        },
        getParentBoardByTextAreaNewCard,
        getParentBoardByAddCardButton,
    }
})();

jQuery(function () {
    Board.init()
});