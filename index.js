// global var

let getBalance = 0;
let balanceLoan = 0;
let paidLoan = true;
let mySalary = 0;
let laptops = [];
let URL = "https://noroff-komputer-store-api.herokuapp.com/computers";

showHide();
// balance section
document.getElementById("balance").innerHTML = getBalance;
//Loan section
/**
 * User input the amount of loan
 * if input is double your balance, reject
 * If the loan is not paid then reject
 * After the loan set user in debt
 */
function getLoan() {
  let userInput = prompt("Number");
  if (userInput <= getBalance * 2 && paidLoan === true) {
    balanceLoan = userInput;
    document.getElementById("balance-loan").innerHTML = userInput;
    document.getElementById("balance-loan-placeholder").innerHTML =
      "Loan Balance";
    paidLoan = false;
    showHide();
  } else {
    alert("The bank does not accept the loan");
    showHide();
  }
}

//

document.getElementById("salary").innerHTML = mySalary;
function addSalary() {
  console.log(mySalary);
  mySalary = mySalary + 100;
  document.getElementById("salary").innerHTML = mySalary;
}

// banking section

function bankTransfer() {
  /**
   * Check if the loan is paid
   * If loan is paid deduct 10% from mySalary-
   * Reduce balanceLoan with the amount deducted-
   * Transfer to getBalance
   */
  if (paidLoan === true) {
    getBalance = getBalance + mySalary;
    document.getElementById("balance").innerHTML = getBalance;
    mySalary = 0;
    document.getElementById("salary").innerHTML = mySalary;
  } else if (paidLoan === false) {
    /**
     * Check if loan is over 0
     * if loan is over 0
     * transfer all the remainig money to the salary
     *
     */
    console.log("balance", balanceLoan);
    if (balanceLoan - mySalary * 0.1 > 0) {
      getBalance = getBalance + mySalary * 0.9;
      balanceLoan = balanceLoan - mySalary * 0.1;
    } else if (balanceLoan - mySalary * 0.1 < 0) {
      balanceLoan = 0;
      getBalance = getBalance + mySalary;
      paidLoan = true;
 
    }

    mySalary = 0;
    document.getElementById("salary").innerHTML = mySalary;
    document.getElementById("balance").innerHTML = getBalance;
    document.getElementById("balance-loan").innerHTML = balanceLoan;
  }
  mySalary = 0;
}
/**
 * If there is a loan
 * show button repay
 *
 */
function showHide() {
  var x = document.getElementById("repay-button");
  if (paidLoan === false) {
    x.style.display = "block";
  } else if (paidLoan === true) {
    x.style.display = "none";
  }
}
/**
 * Repay full loan
 * If repayed then the rest of amount goes to salary
 */
function repayLoan() {
  var x = document.getElementById("repay-button");
  if (paidLoan === false) {
    x.style.display = "block";
    if(mySalary > 0  && mySalary <= balanceLoan ){
        console.log("hello")
        balanceLoan = balanceLoan - mySalary
        mySalary   = 0
        


    }else if(balanceLoan - mySalary < 0){
        const amountLeft = balanceLoan - mySalary
        getBalance = Math.abs(amountLeft) + getBalance
        mySalary = 0

       
    }
    document.getElementById("salary").innerHTML = mySalary;
    document.getElementById("balance-loan").innerHTML = balanceLoan;
    document.getElementById("balance").innerHTML = getBalance;
    paidLoan = true;
    showHide();
  } else if (paidLoan === true) {
    x.style.display = "none";
  }
}

/**
 * fetch api
 *
 */

const selectsElement = document.getElementById("selectDiv");

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptops(laptops));

const addLaptops = (laptops) => {
  laptops.forEach((x) => addLaptop(x));
};

const addLaptop = (laptop) => {
  const selectElement = document.createElement("option");
  selectElement.value = laptop.id;
  selectElement.appendChild(document.createTextNode(laptop.title));
  selectsElement.appendChild(selectElement);
};

const selectLaptop = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  laptopPrice.innerText = "price:" + selectedLaptop.price;
  laptopTitle.innerText = selectedLaptop.title;
  laptopDesc.innerText = selectedLaptop.specs;
};

selectsElement.addEventListener("change", selectLaptop);
selectsElement.addEventListener("click", handleLaptop);
