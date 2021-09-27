let firstOperand = ''
let secondOperand = ''
let currentOperation = ''
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById("equals")
const clearButton = document.getElementById("clear")
const deleteButton = document.getElementById("delete")
const decimalButton = document.getElementById("decimal")
const previousScreen = document.getElementById('previous-screen')
const currentScreen = document.getElementById('current-screen')
const percentButton = document.getElementById("percent")

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNum)
decimalButton.addEventListener('click', appendDecimal)
percentButton.addEventListener('click', percent)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentScreen.textContent === '0' || shouldResetScreen) {
    resetScreen()
  }
  currentScreen.textContent += number
}

function resetScreen() {
  currentScreen.textContent = ''
  shouldResetScreen = false
}

function clear() {
  currentScreen.textContent = '0'
  previousScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = ''
}

function deleteNum() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
}

function percent() {
  currentScreen.textContent = divide(currentScreen.textContent, 100)
}


function appendDecimal() {
  if (shouldResetScreen) {
    resetScreen()
  }
  if (currentOperation.textContent === '') {
    currentScreen.textContent = '0'
  }
  if (currentScreen.textContent.includes('.')) {
    return
  }
  currentScreen.textContent += '.'
}

function setOperation(operator) {
  if (currentOperation !== '') {
    evaluate()
  }
  firstOperand = currentScreen.textContent
  currentOperation = operator
  previousScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === '' || shouldResetScreen) {
    return
  }
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentScreen.textContent
  currentScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
  previousScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = ''
}

function add(a, b) {
  return Math.round((a + b) * 100) / 100;
}

function subtract(a, b) {
  return Math.round((a - b) * 100) / 100;
}

function multiply(a, b) {
  return Math.round((a * b) * 100) / 100;
}

function divide(a, b) {
  if (b == 0) {
    return "Cant divide by 0!"
  } else {
  return Math.round((a / b) * 100) / 100;
  }
}

function operate(op, num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  if (op == '+') {
    return add(num1, num2)
  } else if ( op == '-') {
    return subtract(num1, num2)
  } else if (op == '*') {
    return multiply(num1, num2)
  } else if (op == '/') {
    return divide(num1, num2)
  }
}