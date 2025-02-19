async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        let response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${fromCurrency}${toCurrency}`);
        let data = await response.json();
        return parseFloat(data.price);
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
    }
}

async function calculateExchange() {
    let fromAmount = document.getElementById('from').value;
    let toAmount = document.getElementById('to');

    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (fromCurrency === toCurrency) {
        toAmount.value = fromAmount;
    } else {
        let rate = await getExchangeRate(fromCurrency, toCurrency);
        if (rate) {
            let result = fromAmount * rate;
            toAmount.value = result.toFixed(6);
        } else {
            alert("Exchange rate not available! Try again later.");
        }
    }
}

async function exchangeNow() {
    let fromAmount = document.getElementById('from').value;
    let fromCurrency = document.getElementById('fromCurrency').value;

    let response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: fromAmount, currency: fromCurrency })
    });

    let result = await response.json();
    if (result.code === "SUCCESS") {
        alert("Payment link: " + result.data.checkoutUrl);
        window.location.href = result.data.checkoutUrl;
    } else {
        alert("Payment failed: " + result.msg);
    }
}

function startExchange() {
    document.querySelector('.exchange').scrollIntoView({ behavior: 'smooth' });
}
