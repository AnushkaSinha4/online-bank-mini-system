// Store all accounts
let accounts = {};

// ===== DISPLAY OUTPUT FUNCTION =====
function displayOutput(msg, type) {
    let outputDiv = document.getElementById("output");
    outputDiv.innerText = msg;

    if (type === "green") {
        outputDiv.style.background = "#d4edda"; // light green
        outputDiv.style.color = "#155724"; // dark green text
    } else {
        outputDiv.style.background = "#f8d7da"; // light red
        outputDiv.style.color = "#721c24"; // dark red text
    }
}


// ===== CREATE ACCOUNT =====
function createAccount() {
    let accNo = document.getElementById("createAccNo").value;
    let name = document.getElementById("createName").value;
    let kyc = document.getElementById("createKYC").checked;

    if (!accNo || !name) {
        displayOutput("Please fill all fields", "red");
        return;
    }

    if (accounts[accNo]) {
        displayOutput("Account already exists!", "red");
        return;
    }

    accounts[accNo] = {
        accNo: accNo,
        holderName: name,
        balance: 0,
        isKYCVerified: kyc
    };

    displayOutput(`Account ${accNo} created successfully`, "green");
}

// ===== DEPOSIT MONEY =====
function depositMoney() {
    let accNo = document.getElementById("depositAccNo").value;
    let amount = Number(document.getElementById("depositAmount").value);

    let acc = accounts[accNo];
    if (!acc) {
        displayOutput("Account not found!", "red");
        return;
    }

    if (amount <= 0) {
        displayOutput("Invalid deposit amount!", "red");
        return;
    }

    acc.balance += amount;
    displayOutput(`Deposit successful. Balance: ₹${acc.balance}`, "green");
}

// ===== WITHDRAW MONEY =====
function withdrawMoney() {
    let accNo = document.getElementById("withdrawAccNo").value;
    let amount = Number(document.getElementById("withdrawAmount").value);

    let acc = accounts[accNo];
    if (!acc) {
        displayOutput("Account not found!", "red");
        return;
    }

    if (amount <= 0) {
        displayOutput("Invalid withdrawal amount!", "red");
        return;
    }

    if (acc.balance < amount) {
        displayOutput("Insufficient balance!", "red");
        return;
    }

    acc.balance -= amount;
    displayOutput(`Withdrawal successful. Balance: ₹${acc.balance}`, "green");
}

// ===== TRANSFER MONEY =====
function transferMoney() {
    let senderNo = document.getElementById("senderAccNo").value;
    let receiverNo = document.getElementById("receiverAccNo").value;
    let amount = Number(document.getElementById("transferAmount").value);

    let sender = accounts[senderNo];
    let receiver = accounts[receiverNo];

    if (!sender || !receiver) {
        displayOutput("Sender or Receiver account not found!", "red");
        return;
    }

    if (!sender.isKYCVerified) {
        displayOutput("Sender KYC not verified!", "red");
        return;
    }

    if (amount <= 0) {
        displayOutput("Invalid transfer amount!", "red");
        return;
    }

    if (sender.balance < amount) {
        displayOutput("Insufficient balance!", "red");
        return;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    displayOutput(
        `Transfer successful! Sender Balance: ₹${sender.balance} | Receiver Balance: ₹${receiver.balance}`,
        "green"
    );
}