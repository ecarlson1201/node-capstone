function addEntry() {
    
};

function editSchedule() {
    $('.time-entry').after(renderDeleteButton());
};

function renderDeleteButton() {
    return `
        <button class="delete">x</button>
    `;
};