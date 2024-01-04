let HandleCardAjax = (function () {

    /**
     *
     * @param card
     * @returns {*}
     */
    let insert = function (card) {

        let cardObject = {
            description: $(card).find("[data-state='text']").text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id'),
        };

        return Ajax.post('/v1/api/card', cardObject);
    };

    /**
     *
     * @param card
     * @returns {*}
     */
    let update = function (card) {

        let cardId = $(card).attr('id');

        let cardObject = {
            id: cardId,
            description: $(card).find("[data-state='text']").text(),
            position: $(card).data('position'),
            board_id: $(card).data('board_id'),
        };

        return Ajax.put(`/v1/api/card/${cardId}`, cardObject);
    };

    /**
     *
     * @param card
     * @returns {*}
     */
    let remove = function (card) {

        let cardId = $(card).attr('id');

        return Ajax.delete(`/v1/api/card/${cardId}`);
    };

    return {
        insert:insert,
        update:update,
        delete:remove,
    }
})();
