let HandleCardAjax = (function () {

    let insert = function (card) {

        let cardObject = {
            description: $(card).text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id').replace('board-', ''),
        };

        return Ajax.post('/v1/api/card', cardObject);
    };

    return {
        insert:insert
    }
})();
