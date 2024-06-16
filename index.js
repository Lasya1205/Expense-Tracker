const balance=document.getElementById("balance");
const incomeMoney=document.getElementById("income-money");
const expenseMoney=document.getElementById("expense-money");
const list=document.getElementById("transcationList");
const form=document.getElementById("form");
const text=document.getElementById("text-box");
const amount=document.getElementById("amount-box");

let transactions=[];

function addTransaction(e){
  e.preventDefault();
  if(text.value.trim==="" || amount.value.trim===""){
    alert("Please enter a text and amount");
  }
  else{
    const transaction={
      id:generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value="";
    amount.value="";
  }
}

function generateID(){
  return Math.floor(Math.random()*100000000);
}

function addTransactionDOM(transaction){
  const sign=transaction.amount<0?"-":"+";
  const item=document.createElement("li");
  item.classList.add(
    transaction.amount<0?"negative":"positive"
  );
  item.innerHTML=`
  ${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})" >x</button>
  `;
  list.appendChild(item);
}

function removeTransaction(id){
  transactions=transactions.filter(transaction=>transaction.id !== id);
  Init();
}


function updateValues(){
  const amounts=transactions.map(transaction=>transaction.amount);
  const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
  const income=amounts.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
  const expense=(amounts.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);
  balance.innerText=`$${total}`;
  incomeMoney.innerText=`$${income}`;
  expenseMoney.innerText=`$${expense}`;
}

function Init(){
  list.innerHTML="";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
Init();

form.addEventListener("submit",addTransaction);
