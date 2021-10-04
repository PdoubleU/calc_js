import Calculator from "./Calculator"

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const negativeButton = document.querySelector('[data-negative]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
  })

negativeButton.addEventListener('click', () => calculator.appendSymbol())