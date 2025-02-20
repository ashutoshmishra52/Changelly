function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('show');
}

function startExchange() {
    alert("Exchange feature coming soon!");
}

function exchangeNow() {
    alert("Exchange processing...");
}

function calculateExchange() {
    let fromAmount = document.getElementById("from").value;
    let toAmount = document.getElementById("to");
    
    if (fromAmount) {
        toAmount.value = (fromAmount * 1.1).toFixed(4); // Dummy conversion rate
    } else {
        toAmount.value = "";
    }
}
