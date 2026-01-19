let accounts = {};

function displayOutput(msg, type) {
    let outputDiv = document.getElementById("output");
    outputDiv.innerText = msg;

    if (type === "green") {
        outputDiv.style.background = "#d4edda";
        outputDiv.style.color = "#155724";
    } else {
        outputDiv.style.background = "#f8d7da";
        outputDiv.style.color = "#721c24";
    }
}

function clearOutput() {
    let outputDiv = document.getElementById("output");
    outputDiv.innerText = "";
    outputDiv.style.background = "white";
}

function createAccount() {
    let accNo = createAccNo.value;
    let name = createName.value;
    let kyc = createKYC.checked;

    if (!accNo || !name) return displayOutput("Please fill all fields!", "red");

    if (accounts[accNo]) return displayOutput("Account already exists!", "red");

    accounts[accNo] = { accNo, holderName: name, balance: 0, isKYCVerified: kyc };

    displayOutput("✔ Account created successfully!", "green");
    showAccounts();
}

function depositMoney() {
    let acc = accounts[depositAccNo.value];
    let amount = Number(depositAmount.value);

    if (!acc) return displayOutput("Account not found!", "red");
    if (amount <= 0) return displayOutput("Invalid amount!", "red");

    acc.balance += amount;

    displayOutput("✔ Deposit successful! Balance: ₹" + acc.balance, "green");
    showAccounts();
}

function withdrawMoney() {
    let acc = accounts[withdrawAccNo.value];
    let amount = Number(withdrawAmount.value);

    if (!acc) return displayOutput("Account not found!", "red");
    if (amount <= 0) return displayOutput("Invalid amount!", "red");
    if (acc.balance < amount) return displayOutput("Insufficient balance!", "red");

    acc.balance -= amount;

    displayOutput("✔ Withdrawal successful! Balance: ₹" + acc.balance, "green");
    showAccounts();
}

function transferMoney() {
    let sender = accounts[senderAccNo.value];
    let receiver = accounts[receiverAccNo.value];
    let amount = Number(transferAmount.value);

    if (!sender || !receiver) return displayOutput("Account not found!", "red");
    if (!sender.isKYCVerified) return displayOutput("Sender KYC not verified!", "red");
    if (amount <= 0) return displayOutput("Invalid amount!", "red");
    if (sender.balance < amount) return displayOutput("Insufficient balance!", "red");

    sender.balance -= amount;
    receiver.balance += amount;

    displayOutput("✔ Transfer successful!", "green");
    showAccounts();
}

function showAccounts() {
    let tableBody = document.querySelector("#accountTable tbody");
    tableBody.innerHTML = "";

    let count = 0;

    for (let key in accounts) {
        count++;
        let acc = accounts[key];

        let kyc = acc.isKYCVerified ?
            "<span style='color:green'>Yes</span>" :
            "<span style='color:red'>No</span>";

        tableBody.innerHTML += `
            <tr>
                <td>${acc.accNo}</td>
                <td>${acc.holderName}</td>
                <td>₹ ${acc.balance}</td>
                <td>${kyc}</td>
            </tr>`;
    }

    if (count === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No accounts found</td></tr>";
    }

    document.getElementById("totalCount").innerText = count;
}