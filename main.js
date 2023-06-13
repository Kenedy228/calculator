let inputField = document.querySelector(".text_input");

const numbers = [
    document.querySelector("[data-value = '0']"),
    document.querySelector("[data-value = '1']"),
    document.querySelector("[data-value = '2']"),
    document.querySelector("[data-value = '3']"),
    document.querySelector("[data-value = '4']"),
    document.querySelector("[data-value = '5']"),
    document.querySelector("[data-value = '6']"),
    document.querySelector("[data-value = '7']"),
    document.querySelector("[data-value = '8']"),
    document.querySelector("[data-value = '9']"),
]

const operations = [
    document.querySelector("[data-value = 'AC']"),
    document.querySelector("[data-value = '+']"),
    document.querySelector("[data-value = '-']"),
    document.querySelector("[data-value = '*']"),
    document.querySelector("[data-value = '/']"),
    document.querySelector("[data-value = '=']"),
    document.querySelector("[data-value = '+/-']"),
    document.querySelector("[data-value = '%']"),
    document.querySelector("[data-value = '.']"),
]

let num = [];
let op = [];
let countEquals = 0;
let previousNumber = 0;
let previousOperation = "";
let equalsPushed = false;

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        e.preventDefault();
        numbersHandler(e);
    })
})

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        e.preventDefault();
        operationsHandler(e);
    })
})

function numbersHandler(e) {
    if (equalsPushed) {
        inputField.value = "";
        num.splice(0);
        op.splice(0);
        countEquals = 0;
        previousNumber = 0;
        previousOperation = "";
        equalsPushed = false;
    }
    inputField.value += e.target.textContent;
}

function operationsHandler(e) {
    if (inputField.value.length > 0) {
        switch (e.target.dataset.value) {
            case "+/-": 
                inputField.value = +inputField.value * -1;
                break;
            case "%":
                inputField.value = +inputField.value / 100;
                break;
            case ".":
                if (inputField.value.indexOf(".") == -1) inputField.value += ".";
                break;
            case "AC":
                inputField.value = "";
                num.splice(0);
                op.splice(0);
                countEquals = 0;
                previousNumber = 0;
                previousOperation = "";
                break;
            case "=":
                equalsPushed = true;
                if(countEquals == 0) {
                    num.push(+inputField.value);
                    let result = num[0];
                    for (let i = 0; i < op.length; i++) {
                        switch (op[i]) {
                            case "+":
                                result += num[i + 1];
                                break;
                            case "-":
                                result -= num[i + 1];
                                break;
                            case "*":
                                result *= num[i + 1];
                                break;
                            case "/":
                                result /= num[i + 1];
                                break;
                        }
                    }
                inputField.value = result;
                previousNumber = num[num.length - 1];
                previousOperation = op[op.length - 1];
                num.splice(0, num.length);
                op.splice(0);
                countEquals++
                break;
                } else {
                    let result = +inputField.value;
                    switch (previousOperation) {
                        case "+":
                            result += previousNumber;
                            break;
                        case "-":
                            result -= previousNumber;
                            break;
                        case "*":
                            result *= previousNumber;
                            break;
                        case "/":
                            result /= previousNumber;
                            break;
                    }
                    inputField.value = result;
                    break;
                }
                
            default:
                equalsPushed = false;
                countEquals = 0;
                op.push(e.target.dataset.value);
                num.push(+inputField.value);
                inputField.value = "";
                break;
        }   
    }

}

inputField.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (equalsPushed) {
        inputField.value = "";
        num.splice(0);
        op.splice(0);
        countEquals = 0;
        previousNumber = 0;
        previousOperation = "";
        equalsPushed = false;
    }
    if (48 <= e.keyCode && e.keyCode <= 57) {
        inputField.value += e.key;
    } else if (e.keyCode == 190 && inputField.value.indexOf(".") == -1 && inputField.value.length > 0) {
        inputField.value += e.key;
    }

    if (inputField.value.indexOf(" ") != -1) {
        inputField.value = "";
    }

})