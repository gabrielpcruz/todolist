let HandleCardAjax = (function () {

    let insert = function (card) {
        console.log(card)

        let cardObject = {
            description: $(card).text(),
            position: $(card).data('position')
        };

        return Ajax.post('/v1/api/card', {card: cardObject});
    };

    return {
        insert:insert
    }
})();
