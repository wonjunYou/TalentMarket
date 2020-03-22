const spinner = document.getElementById('spinner');
const info = document.getElementById('info');
const setRequestBtn = document.getElementById('js-setrequest');
const jsTradeId = document.getElementById('tradeId');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function setTrade() {
  loading();
  tradeId = parseInt(jsTradeId.innerText);
  myContract.methods.requestAgree(tradeId).send({ from: userAccounts[0]})
  .on('receipt', function(){
    info.innerText = "등록완료";
    spinner.classList.add('hiding');
    deploy = true;
  })
  .on('error', function(error) {
    console.log('등록실패');
  })
}

function init() {
  setRequestBtn.addEventListener('click', setTrade);
}

init();