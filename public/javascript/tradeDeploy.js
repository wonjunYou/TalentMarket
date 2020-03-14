const spin = document.getElementById('spinner');
const info = document.getElementById('info');
const setTradeBtn = document.getElementById('js-setTrade');
const tradeIdIp = document.getElementById('tradeId');
const talent = document.getElementById('talentId');
const jsdivded = document.getElementById('js-divded');
const jsprice = document.getElementById('price');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function setTrade(divded, talentId, price) {
  myContract.methods.setTrade(userAccounts[0], divded, talentId).send({ from: userAccounts[0], value: web3js.utils.toWei(`${price/100}`)})
  .on('receipt', function(receipt) {
    console.log(receipt);
    info.innerText = "등록완료";
    spinner.classList.add("hiding");
  })
  .on('error', function(error) {
    console.log('등록실패');
  })
}

function init() {
  setTradeBtn.addEventListener('click', function() {
    loading();
    let divded = parseInt(jsdivded.innerText);
    let talentId = parseInt(talent.innerText);
    let price = parseInt(jsprice.innerText);
    setTrade(divded, talentId, price);
  });
}

init();