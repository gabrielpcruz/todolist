// const dropzones = document.querySelectorAll(".dropzone");

const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone');

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("is-dragging");
});

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("is-dragging");
});

// dropzones.forEach((dropzone) => {
//     dropzone.addEventListener("dragover", (e) => {
//         const dragging = document.querySelector(".is-dragging");
//         const applyAfter = getNewPosition(dropzone, e.clientY);
//
//         if (applyAfter) {
//             applyAfter.insertAdjacentElement("afterend", dragging);
//         } else {
//             dropzone.prepend(dragging);
//         }
//     });
// });

function getNewPosition(dropzone, posY) {
    const cards = dropzone.querySelectorAll(".card:not(.is-dragging)");
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;

        if (posY >= boxCenterY) result = refer_card;
    }

    return result;
}

// CARDS

cards.forEach(card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})


function dragstart(event) {
    dropzones.forEach( dropzone => dropzone.classList.add('highlight'))
    dropzones.forEach( dropzone => dropzone.classList.add('dropzone-dragging'))
}

function drag(event) {
}

function dragend(event) {
    dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))
    dropzones.forEach( dropzone => dropzone.classList.remove('dropzone-dragging'))
}


// DROPZONES

dropzones.forEach( dropzone => {
    dropzone.addEventListener('dragenter', dragenter)
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})

function dragenter(event) {

}

function dragover(event) {
    const dragging = document.querySelector(".is-dragging");
    const applyAfter = getNewPosition(this, event.clientY);

    if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
        this.prepend(dragging);
    }
}

function dragleave(event) {


}

function drop(event) {

}