const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");

const app = express();
const ledger = new Blockchain();

app.use(express.static("public"));
app.use(bodyParser.json());

// Endpoint to send coins (add transaction)
app.post("/send", (req, res) => {
    const { from, to, amount } = req.body;
    const transaction = { from, to, amount };
    ledger.addBlock([transaction]);
    res.send({ message: "Transaction recorded!" });
});

// Endpoint to get the blockchain
app.get("/ledger", (req, res) => {
    res.send(ledger.chain);
});

app.get("/balance/:address", (req, res) => {
    const address = req.params.address;
    let balance = 0;

    blockchain.forEach(block => {
        block.transactions.forEach(tx => {
            if (tx.from === address) balance -= tx.amount;
            if (tx.to === address) balance += tx.amount;
        });
    });

    res.json({ address, balance });
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
