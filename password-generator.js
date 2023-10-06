const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const upperEl = document.getElementById('uppercase')
const lowerEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

//create object
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password){
        return
    }
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard')
})
generateEl.addEventListener('click', ()=> {
    const length = +lengthEl.value
    console.log(length)
    const hasLower = lowerEl.checked
    const hasUpper = upperEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolEl.checked
    //get true(checked) false(unchecked)
    console.log(hasLower, hasUpper, hasNumber, hasSymbol)
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = ''
    //count how many checkboxes are clicked
    const typesCount = lower + upper + number + symbol
    console.log(typesCount)
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    console.log(typesArr)
    //generate nothing all checkboxes are empty
    if(typesCount === 0){
        return ''
    }
    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            console.log(type)
            const funcName = Object.keys(type)[0]
            console.log(funcName)
            generatedPassword += randomFunc[funcName]()
        })
    }
    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}
// https://www.w3schools.com/charsets/ref_html_ascii.asp
//check the accii code lower cases are 97-122
function getRandomLower() {
    //multiply any number up to 26 because alphabet has 26 characters and 97
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
//get a
console.log(getRandomLower())

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

console.log(getRandomUpper())

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

console.log(getRandomNumber())

function getRandomSymbol() {
    const symbol = "!@#$%^&*(){}[]=<>/,."
    return symbol[Math.floor(Math.random() * symbol.length)]
}