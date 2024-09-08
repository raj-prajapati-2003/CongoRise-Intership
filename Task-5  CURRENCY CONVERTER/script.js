const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // You can use other APIs too.
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const resultDisplay = document.getElementById('result');

let exchangeRates = {};

// Fetch exchange rates from the API
async function fetchExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        exchangeRates = data.rates;
        populateCurrencyOptions();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

// Populate currency options dynamically
function populateCurrencyOptions() {
    const currencies = Object.keys(exchangeRates);
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    currencies.forEach(currency => {
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
}

// Perform currency conversion
function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Please enter a valid amount.';
        return;
    }

    if (from === to) {
        resultDisplay.textContent = 'Select different currencies to convert.';
        return;
    }

    const rateFrom = exchangeRates[from];
    const rateTo = exchangeRates[to];
    const convertedAmount = (amount / rateFrom) * rateTo;

    resultDisplay.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
}

// Initialize the app
fetchExchangeRates();
convertButton.addEventListener('click', convertCurrency);
