let Card = (function () {

    let modal =  new bootstrap.Modal('#new-card');

    let handleNewCard = function () {
        modal.show();
    }

    let create = function (text) {
        let card = $('<div>');

        card.addClass('card p-2')
        card.attr('draggable', 'true');
        card.text(text)

        return card;
    };

    let replaceTextAreaForCard  = function (event) {
        let { target } = event;

        let text = $(target).val();

        let card = Card.create(text);
        card.attr('id', $(target).data('id'))
        Kanban.addEventsToCard(card[0]);

        card[0].addEventListener('dblclick', eventDoubleClick);

        let board = Board.getParentBoardByTextAreaNewCard(target);

        Board.insertCardIntoBoadPosition(board[0], card[0], $(target).data('position'));


        this.remove();
    }

    let eventDoubleClick = function (event) {
        let { target } = event;

        let text = $(target).text();

        let form = createFormNewCard(text);
        let board = Board.getParentBoardByAddCardButton(target);

        $(form).find('textarea').attr('data-position', $(target).offset().top);
        $(form).find('textarea').attr('data-id', $(target).attr('id'));

        Board.insertCardIntoBoadPosition(board[0], form[0], $(target).offset().top);

        setTimeout(() => {
            form.find('textarea').trigger('focus');
        },100);

        this.remove();
    }

    let createFormNewCard = function (value) {
        let form = $('<form>');
        form.attr('id', 'new-card');

        let textarea = $("<textarea>");
        textarea.addClass('card card-editing p-2');
        textarea.attr('resize', 'none')
        textarea.attr('dir', 'auto');
        textarea.attr('placeholder', 'Insira um título para este cartão');
        textarea.attr('autofocus', 'true');

        if (value) {
            textarea.val(value);
        }

        textarea[0].addEventListener('keyup', resizeTextAreaByContent);
        textarea[0].addEventListener('input', resizeTextAreaByContent);
        textarea[0].addEventListener('paste', resizeTextAreaByContent);

        form.append(textarea);

        form[0].addEventListener('focusout', Card.replaceTextAreaForCard);

        return form;
    };

    let resizeTextAreaByContent = function (event) {
        let { target } = event;

        let lineLength = 27;

        let lines = ($(target).val().length / lineLength);
        let rest = ($(target).val().length % lineLength);

        // min-height + lines x line-height + padding + border
        let newHeight = 40 + lines * 20 + 12 + 2;

        if (rest >= 20) {
            this.style.height = newHeight + "px"
        }
    };

    return {
        handleNewCard,
        create,
        replaceTextAreaForCard,
        eventDoubleClick,
        createFormNewCard,
    }
})();
