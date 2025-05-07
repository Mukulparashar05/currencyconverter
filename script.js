const baseurl = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json"

const dropdown = document.querySelectorAll(".dropdown select");

const button = document.querySelector("button")

const fromcurrency = document.querySelector(".FROM select")
const tocurrency = document.querySelector(".to select")
const message = document.querySelector(".msg p")
for (let select of dropdown) {
    for (const code in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = code
        newoption.value = code
        if (select.name === "from" && code === "USD") {
            newoption.selected = true
        }
        else if (select.name === "to" && code === "INR") {
            newoption.selected = "selected"
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {

    let currencycode = element.value
    let countrycode = countryList[currencycode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc

}

button.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector(".amount input")
    let amountvalue = amount.value
    if (amountvalue === "" || amountvalue <= 0) {
        alert("Please enter a valid amount")
        return
    }
    const url = `${baseurl}?from=${fromcurrency.value.toLowerCase()}&to=${tocurrency.value.toLowerCase()}&amount=${amountvalue}`
    let response = await fetch(url)
    let data = await response.json()
    let eurRates = data['eur']
    let fromRate = eurRates[fromcurrency.value.toLowerCase()]
    let toRate = eurRates[tocurrency.value.toLowerCase()]

    if (!fromRate || !toRate) {
        alert("Invalid currency code selected.")
        return
    }

    amountvalue = Number(amountvalue)

    let amountInEUR = amountvalue / fromRate
    let finalAmount = (amountInEUR * toRate).toFixed(2)
    message.innerText = ` ${amountvalue} ${fromcurrency.value} = ${finalAmount} ${tocurrency.value}`
})