const spinner = document.getElementById('spinner');
const info = document.getElementById('info');
const setRespondBtn = document.getElementById('js-setrespond');
const jsTradeId = document.getElementById('tradeId');

let deploy = false;

function loading() {
  spinner.classList.remove('hiding');
  info.classList.remove('hiding');
  info.innerText = "등록중 입니다. 잠시만 기다려 주세요";
}

function setRespond() {
  loading();
  tradeId = parseInt(jsTradeId.innerText);
  myContract.methods.respondAgree(tradeId).send({ from: userAccounts[0]})
  .on('receipt', function(receipt){
    console.log(receipt);
    var value = receipt.events.RespondAgree.returnValues
    if(value.isFinished){
      info.innerText = "최종합의가 완료되었습니다. 돈을 판매자에게 최종 입금합니다.";
    }
    else {
    info.innerText = "등록완료";
    }
    spinner.classList.add('hiding');
    deploy = true;
  })
  .on('error', function(error) {
    console.log('등록실패');
  })
}

function init() {
  setRespondBtn.addEventListener('click', setRespond);
}

init();