let HandleCardAjax = (function () {

    let insert = function (card) {

        let cardObject = {
            description: $(card).text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id').replace('board-', ''),
        };

        return Ajax.post('/v1/api/card', cardObject);
    };

    let updateBoard = function (card) {

        let cardId = $(card).attr('id');
        let boardId = $(card).data('board_id').replace('board-', '');

        return Ajax.put(`/v1/api/card/${cardId}/board/${boardId}`);
    };

    return {
        insert:insert,
        updateBoard:updateBoard,
    }
})();
