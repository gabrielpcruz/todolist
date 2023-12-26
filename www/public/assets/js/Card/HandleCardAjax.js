let HandleCardAjax = (function () {

    let insert = function (card) {

        let cardObject = {
            description: $(card).text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id'),
        };

        return Ajax.post('/v1/api/card', cardObject);
    };

    let update = function (card) {

        let cardId = $(card).attr('id');

        let cardObject = {
            id: cardId,
            description: $(card).text(),
            position: $(card).position().top,
            board_id: $(card).data('board_id'),
        };


        return Ajax.put(`/v1/api/card/${cardId}`, cardObject);
    };

    return {
        insert:insert,
        update:update,
    }
})();
