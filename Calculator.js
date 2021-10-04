
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    isInputTooLong(currentInput) {
        return currentInput.replaceAll(/\s/g, '').length > 7 ? true : false
    }

    appendSymbol(){
        if (!this.currentOperand.length) {
            this.currentOperand = '-'
            return this.updateDisplay()
        }
        if (this.currentOperand === '-') {
            this.currentOperand = ''
            return this.updateDisplay()
        }
    }

    appendNumber(number) {
        if(this.isInputTooLong(this.currentOperandTextElement.innerText)) return

        if (number === ',' && this.currentOperand.includes(',')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
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
        const prev = parseFloat(this.previousOperand?.replace(/,/, '.'))
        const current = parseFloat(this.currentOperand?.replace(/,/, '.'))

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

        if(number === '-') return number

        let integerDisplay
        const stringNumber = number.toString()

        const integerDigits = /\./.test(stringNumber) ? parseFloat(stringNumber.split('.')[0]) : parseFloat(stringNumber.split(',')[0])

        const decimalDigits = /\./.test(stringNumber) ? stringNumber.split('.')[1] : stringNumber.split(',')[1]

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pl-PL', { maximumFractionDigits: 0 })
        }

        if (integerDisplay.replaceAll(/\s/g, '').length > 10) return parseInt(integerDisplay.replaceAll(/\s/g, '')).toExponential(4).replace(/\./, ',');

        if (integerDigits.toLocaleString().length + decimalDigits?.toLocaleString().length > 10) {
            return parseFloat(`${integerDisplay}.${decimalDigits}`).toExponential(4).toString().replace(/\./, ',');
        }

        if (decimalDigits != null) {
            return `${integerDisplay},${decimalDigits}`
        }

        else {
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