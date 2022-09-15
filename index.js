const screen1 = document.querySelector('.screen-1')
const screen2 = document.querySelector('.screen-2')
const screenTemp = document.querySelector('.screen-temp')
const values = document.querySelectorAll('.value')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const del = document.querySelector('.del')

let x = "";
let y = "";
let result = null;
let finalAction = "";
let fraction = false;

values.forEach(value => {
    value.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !fraction) {
            fraction = true;
        } else if (e.target.innerText === "." && fraction) {
            return;
        }
        y += e.target.innerText;
        screen2.innerText = y;
    })
})
operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!y) return;
        fraction = false;
        const sign = e.target.innerText;
        console.log(sign)
        if (x && y && finalAction) {
            initCalculation();
        } else {
            result = parseFloat(y)
        }
        updateScreen(sign);
        finalAction = sign;
        console.log(result);


    })


})

function updateScreen(name = "") {
    x += y + " " + name + " ";
    screen1.innerText = x;
    screen2.innerText = "";
    y = "";
    screenTemp.innerText = result;
}

function initCalculation() {
    console.log(result);
    if (finalAction === "X") {
        result = parseFloat(result) * parseFloat(y);
    } else if (finalAction === "+") {

        result = parseFloat(result) + parseFloat(y);
    } else if (finalAction === "-") {
        console.log(result);
        console.log(parseFloat(y));
        result = parseFloat(result) - parseFloat(y);
    } else if (finalAction === "/") {
        if (parseFloat(y) === 0) {
            throw new Error("Ошибка")

        }
        result = parseFloat(result) / parseFloat(y);
    } else if (finalAction === "%") {
        result = parseFloat(result) % parseFloat(y);
    }

    if (result % 1 !== 0) {
        result = result.toFixed(length(result));
    }
    console.log(result);
}

function length(n) {
    if (n.toString().includes('.')) {
        let value = n.toString().split('.').pop().length;
        if (value <= 8) return value;
        else return 8;
    }
    else return 0;
}

equal.addEventListener("click", (e) => {
    if (!x || !y) return;
    fraction = false;
    initCalculation();
    updateScreen();
    screen2.innerText = result;
    screenTemp.innerText = "";
    y = result;
    x = "";
})

clear.addEventListener("click", (e) => {
    screen1.innerText = "";
    screen2.innerText = "0";
    x = "";
    y = "";
    result = "";
    screenTemp.innerText = "";
})

del.addEventListener("click", (e) => {
    screen2.innerText = "";
    y = "";
})






