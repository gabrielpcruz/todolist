let Kanban = (function () {
    let dropzones = [], cards = [];

    let listAllCards = function () {
        if (cards.length === 0) {
            cards = $('.card');
        }

        return cards;
    };

    let listAllDropzones = function () {
        if (dropzones.length === 0) {
            dropzones = $('.dropzone');
        }

        return dropzones;
    };

    let dragstart = function (event) {
        $(event.target).addClass('is-dragging');

        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).addClass('highlight dropzone-dragging')
        });
    }

    let drag = function (event) {
    }

    let dragend = function (event) {
        $(event.target).removeClass('is-dragging');

        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).removeClass('highlight dropzone-dragging')
        });
    }

    let addEventsToCard = function (card) {
        $(card).on('dragstart', dragstart);
        $(card).on('drag', drag);
        $(card).on('dragend', dragend);
    };

    let initCards = function () {
        $.each(listAllCards(), function (index, card) {
            addEventsToCard(card)
        });
    };

    let getNewPosition = function (dropzone, posY) {
        let result;

        const cards = $(dropzone).find(".card:not(.is-dragging)");

        $.each(cards, function (index, card) {
            const box = card.getBoundingClientRect();
            const boxCenterY = box.y + box.height / 2;

            if (posY >= boxCenterY) {
                result = card
            }
        });

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

    let dragleave = function (event) {

    };

    let drop = function (event) {

    };

    let initDropzones = function () {
        $.each(listAllDropzones(), function (index, dropzone) {
            $(dropzone).on('dragenter', dragenter)
            $(dropzone).on('dragover', dragover)
            $(dropzone).on('dragleave', dragleave)
            $(dropzone).on('drop', drop)
        });
    };

    return {
        init: function () {
            initCards();
            initDropzones();
        },
        addEventsToCard: addEventsToCard
    }
})();

jQuery(function () {
    Kanban.init()
});
