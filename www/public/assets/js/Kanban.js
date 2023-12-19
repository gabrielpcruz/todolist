let Kanban = (function () {
    let dropzones = [], cards = [];

    let listAllCards = function () {
        if (cards.length === 0) {
            cards = document.querySelectorAll('.card');
        }

        return cards;
    };

    let listAllDropzones = function () {
        if (dropzones.length === 0) {
            dropzones = document.querySelectorAll('.dropzone');
        }

        return dropzones;
    };

    let dragstart = function (event) {
        listAllDropzones().forEach( dropzone => dropzone.classList.add('highlight'))
        listAllDropzones().forEach( dropzone => dropzone.classList.add('dropzone-dragging'))
    }

    let drag = function (event) {
    }

    let dragend = function (event) {
        listAllDropzones().forEach( dropzone => dropzone.classList.remove('highlight'))
        listAllDropzones().forEach( dropzone => dropzone.classList.remove('dropzone-dragging'))
    }

    let addEventsToCard = function (card) {
        card.addEventListener('dragstart', dragstart);
        card.addEventListener('drag', drag);
        card.addEventListener('dragend', dragend);
    };

    let initCards = function () {
        listAllCards().forEach(card => addEventsToCard(card));
    };

    let getNewPosition = function (dropzone, posY) {
        let result;

        const cards = dropzone.querySelectorAll(".card:not(.is-dragging)");

        for (let refer_card of cards) {
            const box = refer_card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;

            if (posY >= boxCenterY) result = refer_card;
        }

        return result;
    };

    let dragenter = function (event) {

    };

    let dragover = function (event) {
        const dragging = document.querySelector(".is-dragging");
        const applyAfter = getNewPosition(this, event.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            this.prepend(dragging);
        }
    };

    let dragleave = function(event) {

    };

    let drop = function (event) {

    };

    let initDropzones = function () {
        listAllDropzones().forEach( dropzone => {
            dropzone.addEventListener('dragenter', dragenter)
            dropzone.addEventListener('dragover', dragover)
            dropzone.addEventListener('dragleave', dragleave)
            dropzone.addEventListener('drop', drop)
        })
    };

    return {
        init: function () {
            initCards();
            initDropzones();

            document.addEventListener("dragstart", (e) => {
                e.target.classList.add("is-dragging");
            });

            document.addEventListener("dragend", (e) => {
                e.target.classList.remove("is-dragging");
            });
        },
        addEventsToCard:addEventsToCard
    }
})();

jQuery(function () {
    Kanban.init()
});
