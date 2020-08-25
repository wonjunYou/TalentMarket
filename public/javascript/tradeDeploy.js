const spinner = document.getElementById('spinner');
const info = document.getElementById('info');
const setTradeBtn = document.getElementById('js-setTrade');
const tradeIdIp = document.getElementById('tradeId');
const talent = document.getElementById('talentId');
const jsdivded = document.getElementById('js-divded');
const jsprice = document.getElementById('price');
const jsSellerAddress = document.getElementById('sellerAddress');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function setTrade(divded, talentId, price, sellerAddress) {
  myContract.methods.setTrade(sellerAddress, price, talentId, userAccounts[0], divded).send({ from: userAccounts[0], value: web3js.utils.toWei(`${price/100}`)})
  .on('receipt', function(receipt) {
    console.log(receipt);
    const value = receipt.events.NewTrade.returnValues;
    info.innerText = "등록완료";
    spinner.classList.add("hiding");
    tradeIdIp.value = parseInt(value.trId);
    deploy = true;
  })
  .on('error', function(error) {
    console.log('등록실패');
  })
}

function init() {
  setTradeBtn.addEventListener('click', function() {
    loading();
    let divded = parseInt(jsdivded.innerText);
    let talentId = talent.innerText;
    let price = parseFloat(jsprice.innerText);
    let sellerAddress = jsSellerAddress.innerText;
    setTrade(divded, talentId, price * 100, sellerAddress);
  });
}

init();