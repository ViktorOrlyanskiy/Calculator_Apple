"use strict"

// элементы документа
const output = document.querySelector('.output');
const buttons = document.querySelectorAll('button');


// глобальные переменные
let result = '';
let arr = { num1: '0', num2: '', result: '0' }
let flagAction = '';

function xxx() {
    console.log(result)
    console.log(arr)
}


document.onkeydown = (event) => {
    buttons.forEach(elem => {

        if (elem.value == event.key) {
            console.log(event.key)
            console.log(elem.value)
            elem.click();
        }
    })

}

// событие: читает числа с кнопок и записывает в output
const numberBtn = document.querySelectorAll('.black');
numberBtn.forEach(button => {
    button.onclick = () => {

        removeActiveClass(buttons);

        if (button.value == '0') {
            if (result == '') {
                output.innerHTML = '0';
                result = '0'; // добавил может повлиять на расчет
                changesSizeNumbers();
            } else {
                if (result.length < 9) {
                    result += button.innerHTML;
                }
                // output.innerHTML = result;

            }
        }

        else if (button.value == '.') {
            if (result.indexOf('.') == -1) {
                if (result == '') {
                    result += '0.';
                } else {
                    result += '.';
                }
                // output.innerHTML = result;

            }
        }

        else {
            if (result.length < 9) {
                result += button.innerHTML;
            }
            // output.innerHTML = result;

        }

        output.innerHTML = convertsResult(result);

        changesValueClearBtn();
        changesSizeNumbers();

    }
})

// событие: клик по С/AC
const clearBtn = document.querySelector('.clear');
clearBtn.onclick = clearOutput;

// событие: клик по +/- (изменяет знак числа) 
const signChange = document.querySelector('.sign-change');
signChange.onclick = () => {
    if (result.indexOf('-') == -1) {
        result = '-' + result;
    }
    else {
        result = result.substr(1);
    }

    output.innerHTML = convertsResult(result);
    changesSizeNumbers();
}

// событие: клик по %
const percentBtn = document.querySelector('.percent-btn');
percentBtn.onclick = () => {
    result = Number(result) / 100;
    output.innerHTML = convertsResult(result);
}

// событие: клик по '/'
const division = document.querySelector('.division');
division.onclick = () => {
    removeActiveClass(buttons)
    division.classList.add('orange-active')
    flagAction = 'division';

    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }

        else {
            if (arr.num2 == '0') {
                arr.result = 'Ошибка';

            } else {
                arr.num1 = arr.num2;
                arr.result = Number(arr.result) / Number(arr.num2);
            }
        }
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// событие: клик по 'x'
const multiplication = document.querySelector('.multiplication');
multiplication.onclick = () => {
    removeActiveClass(buttons)
    multiplication.classList.add('orange-active')
    flagAction = 'multiplication';

    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }
        else {
            arr.num1 = arr.num2;
            arr.result = Number(arr.result) * Number(arr.num2)
        }
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// событие: клик по '-'
const subtraction = document.querySelector('.subtraction');
subtraction.onclick = () => {
    removeActiveClass(buttons)
    subtraction.classList.add('orange-active');
    flagAction = 'subtraction';

    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }
        else {
            arr.num1 = arr.num2;
            arr.result = Number(arr.result) - Number(arr.num2)
        }
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// событие: клик по '+'
const addition = document.querySelector('.addition');
addition.onclick = () => {
    removeActiveClass(buttons)
    addition.classList.add('orange-active');
    flagAction = 'addition';
    arr.num2 = result;

    if (arr.num2 !== '') {
        arr.num1 = arr.num2;
        arr.result = Number(arr.num2) + Number(arr.result);
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// событие: клик по '='
const resultBtn = document.querySelector('.result-btn');
resultBtn.onclick = () => {

    let buttons = document.querySelectorAll('button');
    // обнуляет все если кнопка действия активна
    buttons.forEach(elem => {
        if (elem.classList.contains('orange-active')) {
            clearOutput();
        }
    })

    removeActiveClass(buttons)

    if (flagAction == 'addition') {
        addNumber();
    }
    else if (flagAction == 'subtraction') {
        subtractNumber();
    }
    else if (flagAction == 'multiplication') {
        multipliesNumber();
    }
    else if (flagAction == 'division') {
        dividesNumber();
    }
}


// функиция: складывает числа
function addNumber() {
    arr.num2 = result;

    if (arr.num2 !== '') {
        arr.num1 = arr.num2;
        arr.result = Number(arr.num2) + Number(arr.result);
    }

    else if (arr.num2 == '') {
        arr.result = Number(arr.num1) + Number(arr.result);
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();

}

// функция: вычитает числа
function subtractNumber() {
    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }
        else {
            arr.num1 = arr.num2;
            arr.result = Number(arr.result) - Number(arr.num2)
        }
    }

    else if (arr.num2 == '') {
        arr.result = Number(arr.result) - Number(arr.num1)
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// функиция: умножает числа
function multipliesNumber() {
    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }
        else {
            arr.num1 = arr.num2;
            arr.result = Number(arr.result) * Number(arr.num2)
        }
    }

    else if (arr.num2 == '') {
        arr.result = Number(arr.result) * Number(arr.num1);
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}

// функция: делит числа
function dividesNumber() {
    arr.num2 = result;

    if (arr.num2 !== '') {

        if (arr.num1 == '0') {
            arr.result = arr.num2;
            arr.num1 = arr.num2;
        }

        else {
            if (arr.num2 == '0') {
                arr.result = 'Ошибка';

            } else {
                arr.num1 = arr.num2;
                arr.result = Number(arr.result) / Number(arr.num2);
            }
        }
    }

    else if (arr.num2 == '') {
        if (arr.result !== 'Ошибка') {
            arr.result = Number(arr.result) / Number(arr.num1)
        }
    }

    output.innerHTML = convertsResult(arr.result);
    result = '';
    changesSizeNumbers();
}


/* ============ функции ============ */

// функция: удаляет .active-slide передаваемой коллекции
function removeActiveClass(row) {
    row.forEach(elem => {
        elem.classList.remove('orange-active');
    });
}

// функция: чистит output
function clearOutput() {
    if (clearBtn.innerHTML == 'C') {
        output.innerHTML = 0;
        result = '';

        // возвращает активную кнопку
        if (flagAction == 'addition') {
            addition.classList.add('orange-active')
        }
        else if (flagAction == 'subtraction') {
            subtraction.classList.add('orange-active')
        }
        else if (flagAction == 'multiplication') {
            multiplication.classList.add('orange-active')
        }
        else if (flagAction == 'division') {
            division.classList.add('orange-active')
        }
    }

    else if (clearBtn.innerHTML = 'AC') {
        output.innerHTML = 0;
        result = '';
        arr = { num1: '0', num2: '', result: '0' };
        flagAction = '';
        removeActiveClass(buttons);
    }

    changesValueClearBtn();
    changesSizeNumbers();
}

// функция: изменяет значение кнопки clearBtn 
function changesValueClearBtn() {
    if (output.innerHTML !== '0') {
        clearBtn.innerHTML = 'C';
    } else if (output.innerHTML == '0') {
        clearBtn.innerHTML = 'AC';
    }
}

// функция: уменьшает размер цифр output
function changesSizeNumbers() {

    if (output.innerHTML.length < 7) {
        output.style.fontSize = '80px';
    }
    if (output.innerHTML.length >= 7 && output.innerHTML.length < 10) {
        output.style.fontSize = '60px';
    }
    if (output.innerHTML.length >= 10) {
        output.style.fontSize = '45px';
    }

}

// функция: преобразует результат для вывода в output
function convertsResult(num) {

    // округляет если передано число
    if (typeof (num) == 'number') {
        num = roundsNumber(num);
    }


    // локальные переменные
    let arrayNum = String(num).split('.');
    let arrayNew = [];
    let numNew = '';

    // не считает если число >= 1млрд
    if (num > 999999999) {
        numNew = 'Ошибка';
        return numNew;
    }

    // добавляет пробелы в целое число
    for (let i = arrayNum[0].length - 1, k = 1; i >= 0; i--, k++) {

        if (k % 3 == 0) {
            arrayNew.unshift(arrayNum[0][i]);
            arrayNew.unshift(' ');
        } else {
            arrayNew.unshift(arrayNum[0][i]);
        }
    }

    numNew = removeFirstSpace(arrayNew).join('')
    if (arrayNum.length > 1) {
        arrayNum[1] = removeLastNull(arrayNum[1]);
        numNew = `${numNew},${arrayNum[1]}`
    }
    return numNew;


    /* вспомогательные функции */
    // функция: округляет число до 9 цифр
    function roundsNumber(num) {
        let arrayNum = String(num).split('.');
        if (String(num).length > 9) {

            if (arrayNum[0].length >= 9) {
                return Math.round(num);
            } else {
                return num.toFixed((9 - arrayNum[0].length))
            }

        } else {
            return num;
        }
    }

    // функция: удаляет пробелы из начала массива
    function removeFirstSpace(array) {
        if (array[0] == ' ') {
            array.shift();
        }
        return array;
    }
    // функция: удаляет послединий ноль у дроби
    function removeLastNull(array) {
        if (array[array.length] == '0') {
            array.pop();
        }
        return array;
    }
    /* ======================================== */
}