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

    return {
        socket:getSocket,
        report:report,
    }
})();


