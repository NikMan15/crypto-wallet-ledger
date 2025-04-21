document.getElementById("txForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const amount = document.getElementById("amount").value;

    await fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, amount }),
    });

    loadLedger();
    e.target.reset();
});

document.getElementById("balanceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const address = document.getElementById("balanceAddress").value;
    const res = await fetch(`/balance/${address}`);
    const data = await res.json();
    document.getElementById("balanceResult").textContent = 
        `Balance for ${data.address}: ${data.balance}`;
});


function animateBlock(blockDiv) {
    blockDiv.classList.add("block");
    blockDiv.style.animation = "zoomIn 0.5s ease";
}

async function loadLedger() {
    const res = await fetch("/ledger");
    const ledger = await res.json();

    const ledgerDiv = document.getElementById("ledger");
    ledgerDiv.innerHTML = "";

    ledger.forEach((block, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>Block ${index}</strong>
            <p><strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}</p>
            <p><strong>Transactions:</strong> ${JSON.stringify(block.transactions)}</p>
        `;
        animateBlock(div);
        ledgerDiv.appendChild(div);
    });
}

loadLedger();

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

