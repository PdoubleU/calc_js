
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    clear() {
        console.log('clear screen')
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === ',' && this.currentOperand.includes(',')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        console.log(operation)
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'x':
            computation = prev * current
            break
        case '/':
            computation = prev / current
            break
        default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split(',')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
        this.previousOperandTextElement.innerText = ''
        }
    }
}

export default Calculator;