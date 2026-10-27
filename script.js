const button = document.querySelectorAll('button');
const display = document.getElementById('display');
const clearButton = document.getElementById('clearButton');
const evalBtn = document.getElementById('evaluator');

let showingResult = false;

function appendToDisplay(num) {
    const operators = ['+', '-', '*', '/', '%'];

    if(showingResult) {
        if(operators.includes(num)) {
            showingResult = false;
            display.value + num;
        }else {
        display.value = '';
        showingResult = false;
        }
    }
    display.value += num;
}

function clearDisplay() {
    display.value = '';
}

function backSpace() {
    let text = display.value;
    display.value = text.slice(0,text.length - 1);
}

function calculate() {
    try{
        display.value = eval(display.value);
        showingResult = true;
    } catch(e) {
        display.value = 'Error';
        showingResult = true;
    }
}

evalBtn.addEventListener('click', calculate);

function convertValue() {
    const display = document.getElementById('display');
    let val = display.value; // e.g. "12+5"

    // Step 1: List of characters that count as "operators"
    const operators = ['+', '-', '*', '/', '%'];

    // Step 2: Check if the display has at least one operator in it
    let hasOperator = false;
    for (let i = 0; i < val.length; i++) {
        if (operators.includes(val[i])) {
            hasOperator = true;
        }
    }

    // If there's no operator, we still might just have a single number - that's fine too.
    // (Remove this "return" if you want +/- to work even with no operator present)
    // if (!hasOperator) return;

    // Step 3: Find where the LAST number starts
    // We walk backwards from the end of the string until we hit an operator
    let endOfNumber = val.length; // where the last number ends (end of string)
    let startOfNumber = val.length; // we'll move this back as we find digits

    for (let i = val.length - 1; i >= 0; i--) {
        const char = val[i];

        if (char >= '0' && char <= '9' || char === '.') {
            // it's a digit or decimal point, keep moving backward
            startOfNumber = i;
        } else if (char === '-' && i === startOfNumber - 1) {
            // this dash could be a NEGATIVE SIGN, not an operator
            // check what comes before it
            const charBeforeDash = val[i - 1];
            if (i === 0 || operators.includes(charBeforeDash)) {
                // yes, it's a negative sign attached to our number
                startOfNumber = i;
            }
            break; // stop, we found the full number
        } else {
            // we hit a real operator, stop here
            break;
        }
    }

    // Step 4: Pull out the pieces of the string
    const before = val.slice(0, startOfNumber);   // everything before the number
    const lastNumber = val.slice(startOfNumber, endOfNumber); // the number itself
    
    // Step 5: Flip the sign
    let newNumber;
    if (lastNumber[0] === '-') {
        // it's negative, make it positive by removing the "-"
        newNumber = lastNumber.slice(1);
    } else {
        // it's positive, make it negative by adding a "-"
        newNumber = `(${lastNumber*-1})`;
    }

    // Step 6: Put the string back together and update the display
    val = before + newNumber;
    display.value = val; 

}