const display = document.querySelector('.display');
const keys = document.querySelector('.keys');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.textContent;
        const keyValue = key.textContent;

        if (!action.match(/[0-9]/)) {
            if (action === '=') {
                display.value = eval(display.value);
            } else if (action === 'C') {
                display.value = '';
            } else {
                display.value += keyValue;
            }
        } else {
            display.value += keyValue;
        }
    }
});
