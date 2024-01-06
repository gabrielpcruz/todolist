let WebSocketClient = (function () {
    let socketUrl = '192.168.1.12';

    let socket = false;

    let connect = function () {
        socket = new WebSocket(`ws://${socketUrl}:8080`);
    }
    let getSocket = function () {
        if (!socket) {
            connect();
        }

        return socket;
    }

    let report = function (type, object) {
        getSocket().send(JSON.stringify({'type': type, 'object': object}));
    }

    let create = function (message) {
        let cardObject = JSON.parse(message.object);

        let card = Card.createDivCard(
            cardObject.position,
            cardObject.description,
            cardObject.id,
            cardObject.board_id,
            cardObject.user_name
        );

        Board.insertCardIntoBoadPosition(
            $(`#board-${cardObject.board_id}`),
            card,
            cardObject.position
        );
    }

    let dragging = function (message) {
        let card = JSON.parse(message.object);

        Card.updateStatusCard(card.id, card.board_id);

        Board.insertCardIntoBoadPosition(
            $(`#board-${card.board_id}`),
            $(`#${card.id}`),
            card.position
        );
    }

    let update = function (message) {
        let card = JSON.parse(message.object);

        $(`#${card.id}`).find("[data-state='text']").html(card.description);
    }

    let remove = function (message) {
        let card = JSON.parse(message.object);

        $(`#` + card.id).remove();
    }

    let upstream = function () {
        getSocket().onmessage = function (event) {
            let {data} = event;
            let message = JSON.parse(data);

            if (message.type === "create") {
                create(message);
            }

            if (message.type === "dragging") {
                dragging(message);
            }

            if (message.type === "update") {
                update(message)
            }

            if (message.type === "remove") {
                remove(message);
            }
        };
    }

    return {
        init: function () {
            upstream();
        },
        report: report,
    }
})();

jQuery(function () {
    WebSocketClient.init();
});

