let WebSocketClient = (function () {
    let socket = false;

    let connect = function () {
        socket = new WebSocket('ws://localhost:8080');
    }
    let getSocket = function () {
        if (!socket) {
            connect();
        }

        return socket;
    }

    let report = function (type, object) {
        getSocket().send(JSON.stringify({'type': type, 'object' : object}));
    }

    let movement = function (message) {
        let card = JSON.parse(message.object);

        Card.updateStatusCard($(`#` + card.id), card.board_id);

        Board.insertCardIntoBoadPosition(
            $(`#board-` + card.board_id)[0],
            $(`#` + card.id)[0],
            card.position
        );
    }

    let exclude = function (message) {
        let card = JSON.parse(message.object);

        $(`#` + card.id).remove();
    }

    let insert = function (message) {
        let card = JSON.parse(message.object);

        let a = Board.makeCardBoard(card, card);

        Board.insertCardIntoBoadPosition(
            $(`#board-` + card.board_id)[0],
            a[0],
            card.position
        );
    }

    let edit = function (message) {
        let card = JSON.parse(message.object);

        $(`#` + card.id).find("[data-state='text']").html(card.description);
    }

    let upstream = function () {
        getSocket().onmessage =  function (event) {
            let { data } = event;
            let message = JSON.parse(data);

            if (message.type == "movement") {
                movement(message);
            }

            if (message.type == "exlude") {
                exclude(message);
            }

            if (message.type == "insert") {
                insert(message);
            }

            if (message.type == "edit") {
                edit(message)
            }
        };
    }

    return {
        init: function () {
          upstream();
        },
        report:report,
    }
})();

jQuery(function () {
    WebSocketClient.init();
});

